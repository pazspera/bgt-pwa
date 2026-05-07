# Plan de Testing: AddGameDialog.vue

## Introducción

AddGameDialog es un componente crítico que maneja el guardado de partidas (la funcionalidad principal de la app). Es un modal (v-dialog) que contiene un formulario complejo con validaciones de VeeValidate + Yup.

## ¿Por qué es difícil testear este componente?

1. **Es un modal (v-dialog)**: Los modales de Vuetify controlan su visibilidad internamente y manejan el focus, portal, y eventos de teclado. No podemos simplemente montar el componente y esperar que sea visible.

2. **Usa composables que hacen llamadas API**: `usePlayersApi` y `useGamesApi` llaman a APIs reales o mockeadas.

3. **VeeValidate con Yup**: Las validaciones ocurren de forma asíncrona y necesitan que el formulario esté montado correctamente.

4. **Componentes de Vuetify**: v-date-input, v-select (múltiple), v-textarea tienen comportamientos complejos.

## Estrategia de Testing

### 1. Stubbing de Vuetify Dialog
Al igual que `AddPlayerSheet.spec.ts` hace stub de `v-bottom-sheet`, debemos hacer stub de `v-dialog` para que simplemente renderice su contenido sin la lógica de modal.

```typescript
stubs: {
  "v-dialog": {
    template: `<div v-bind="$attrs" data-testid="add-game-dialog">
      <slot/>
    </div>`,
    emits: ["update:modelValue"]
  }
}
```

### 2. Mocking de Composables
Usar `vi.mock()` o mockear retornos de los composables para controlar:
- `usePlayersApi`: Mock de `players`, `loading`, `error`, `fetchPlayers`
- `useGamesApi`: Mock de `saveGame`, `loading`, `errorSaveGame`, `newGame`

### 3. Data-testid Attributes
El componente ya tiene `data-testid="add-game-dialog"`. Necesitamos agregar más para testear:
- `data-testid="date-input"` en v-date-input
- `data-testid="players-select"` en el v-select de jugadores
- `data-testid="winner-select"` en el v-select de ganador
- `data-testid="notes-textarea"` en v-textarea
- `data-testid="btn-save"` en el botón guardar
- `data-testid="btn-cancel"` en el botón cancelar
- `data-testid="loading-row"` para el LoadingRow
- `data-testid="error-alert"` para la alerta de error

## Tests Necesarios

### Grupo 1: Rendering (Renderizado)

| Test | Descripción | Qué verificar |
|------|-------------|---------------|
| 1.1 | Renderiza cuando modelValue es true | El dialog es visible, todos los campos están presentes |
| 1.2 | No renderiza cuando modelValue es false | El componente no muestra contenido (o el dialog no está) |
| 1.3 | Muestra loading state | Cuando `loading=true`, muestra LoadingRow, oculta formulario |
| 1.4 | Muestra error state (primer intento) | Cuando `error` está presente y `errorCount=1`, muestra alerta con mensaje de reintento |
| 1.5 | Muestra error state (segundo intento) | Cuando `errorCount>1`, muestra mensaje de recargar página |
| 1.6 | Renderiza todos los campos del formulario | Date input, players select, winner select, notes textarea, botones |

### Grupo 2: Player Loading (Carga de Jugadores)

| Test | Descripción | Qué verificar |
|------|-------------|---------------|
| 2.1 | Llama a fetchPlayers en onBeforeMount | El mock de fetchPlayers fue llamado una vez |
| 2.2 | Muestra loading mientras carga jugadores | LoadingRow visible, formulario oculto |
| 2.3 | Popula el select de jugadores con los datos recibidos | El v-select tiene las opciones correctas |
| 2.4 | Maneja error al cargar jugadores | Muestra alerta de error, botón de reintento |

### Grupo 3: Form Interactions (Interacciones del Formulario)

| Test | Descripción | Qué verificar |
|------|-------------|---------------|
| 3.1 | Seleccionar fecha | `dateValue` se actualiza correctamente |
| 3.2 | Seleccionar jugadores (múltiple) | `selectedPlayers` se actualiza, el array de jugadores en el form se actualiza |
| 3.3 | Seleccionar ganador | `gameWinner` se actualiza, solo disponible si hay jugadores seleccionados |
| 3.4 | Escribir notas | `notesValue` se actualiza |
| 3.5 | Ganador se deselecciona si se quita el jugador | Si quitas un jugador que era ganador, `gameWinner` vuelve a null |

### Grupo 4: Form Validations (Validaciones)

| Test | Descripción | Qué verificar |
|------|-------------|---------------|
| 4.1 | Fecha es requerida | Error message aparece si no hay fecha |
| 4.2 | Fecha no puede ser futura | Error message si la fecha es mayor a hoy |
| 4.3 | Debe seleccionar al menos min_players | Error si selecciona menos jugadores que el mínimo del juego |
| 4.4 | No puede seleccionar más de max_players | Error si selecciona más jugadores que el máximo |
| 4.5 | Ganador es requerido | Error si no selecciona ganador y tocó el campo |
| 4.6 | Notas tienen máximo 500 caracteres | Error si excede el límite |
| 4.7 | Formato correcto de payload al hacer submit | Los jugadores tienen `player_id` e `is_winner` correctos |

### Grupo 5: Form Submission (Envío del Formulario)

| Test | Descripción | Qué verificar |
|------|-------------|---------------|
| 5.1 | Envío exitoso | Llama a `saveGame`, emite `success`, cierra dialog |
| 5.2 | Error al guardar (400) | Emite `error` con mensaje correcto, no cierra dialog |
| 5.3 | Error al guardar (500) | Emite `error` con mensaje correcto, no cierra dialog |
| 5.4 | Error de red | Emite `error` con mensaje de red |
| 5.5 | Loading state durante guardado | `savingGame` es true mientras guarda |

### Grupo 6: Dialog Closure (Cierre del Dialog)

| Test | Descripción | Qué verificar |
|------|-------------|---------------|
| 6.1 | Click en Cancelar | Emite `update:modelValue` con false, resetea formulario |
| 6.2 | Guardado exitoso cierra dialog | Después de success, el dialog se cierra |
| 6.3 | Resetea formulario al cerrar | `selectedPlayers`, `gameWinner`, `errorCount` vuelven a valores iniciales |

## Estructura del Archivo de Test

```typescript
import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { createVuetifyForTest } from "@/tests/utils/createVuetifyForTest";
import { setTextInputValue } from "@/tests/utils/form-helpers";
import AddGameDialog from "@/components/organisms/AddGameDialog.vue";
import { VDialog, VCard, VSelect, VDateInput, VTextarea, VBtn } from "vuetify/components";

// Mocks
vi.mock("@/composables/usePlayersApi");
vi.mock("@/composables/useGamesApi");

const vuetify = createVuetifyForTest({ 
  VDialog, VCard, VSelect, VDateInput, VTextarea, VBtn 
});

describe("AddGameDialog", () => {
  describe("Rendering", () => { /* tests */ });
  describe("Player Loading", () => { /* tests */ });
  describe("Form Interactions", () => { /* tests */ });
  describe("Form Validations", () => { /* tests */ });
  describe("Form Submission", () => { /* tests */ });
  describe("Dialog Closure", () => { /* tests */ });
});
```

## Cómo hacer los tests paso a paso

### Paso 1: Configurar el mount con stubs adecuados

```typescript
const mountAddGameDialog = (props = {}, mocks = {}) => {
  return mount(AddGameDialog, {
    props: {
      modelValue: true,
      boardgame: {
        id: "game-123",
        name: "Catan",
        min_players: 2,
        max_players: 4,
        // ... otras props necesarias
      },
      ...props
    },
    global: {
      plugins: [vuetify],
      stubs: {
        "v-dialog": {
          template: `<div v-bind="$attrs" data-testid="add-game-dialog">
            <slot/>
          </div>`,
          emits: ["update:modelValue"]
        },
        // Stub otros componentes de Vuetify según necesidad
      }
    }
  });
};
```

### Paso 2: Mock de composables antes de cada test

```typescript
beforeEach(() => {
  vi.clearAllMocks();
  
  // Mock usePlayersApi
  (usePlayersApi as vi.Mock).mockReturnValue({
    players: ref(mockPlayers),
    loading: ref(false),
    error: ref(null),
    fetchPlayers: vi.fn().mockResolvedValue(undefined)
  });
  
  // Mock useGamesApi
  (useGamesApi as vi.Mock).mockReturnValue({
    saveGame: vi.fn().mockResolvedValue(mockGameResponse),
    loading: ref(false),
    errorSaveGame: ref(null),
    newGame: ref(null)
  });
});
```

### Paso 3: Para tests de formulario, interactuar así

```typescript
// Para v-select (jugadores)
await wrapper.find('[data-testid="players-select"]').setValue([player1, player2]);

// Para v-select (ganador)  
await wrapper.find('[data-testid="winner-select"]').setValue(player1);

// Para date-input, puede requerir simular el evento de cambio
// O usar setTextInputValue si tiene un input interno

// Para textarea
await setTextInputValue(wrapper, "notes-textarea", "Notas de prueba");

// Para hacer submit
await wrapper.find('[data-testid="btn-save"]').trigger("click");
```

### Paso 4: Verificar eventos emitidos

```typescript
expect(wrapper.emitted("success")).toBeTruthy();
expect(wrapper.emitted("success")[0]).toEqual(["¡La partida fue guardada exitosamente!"]);

expect(wrapper.emitted("update:modelValue")).toBeTruthy();
expect(wrapper.emitted("update:modelValue")[0]).toEqual([false]);
```

## Consejos importantes

1. **usa `await nextTick()` después de cada interacción** para asegurar que Vue procese los cambios reactivos.

2. **Para VeeValidate**, las validaciones pueden ser asíncronas. Usa `await wrapper.vm.handleSubmit()` o asegúrate de que el formulario esté validado antes de verificar errores.

3. **El stub de v-dialog es clave**: Sin esto, el modal puede no renderizar su contenido en el test porque Vuetify controla la visibilidad con portal.

4. **Mock de fecha**: Si el test usa fechas, mock de `new Date()` para tener consistencia:
```typescript
const mockDate = new Date("2026-05-06");
vi.spyOn(global, "Date").mockImplementation(() => mockDate);
```

5. **Para v-select múltiple**, el modelo es un array. Asegúrate de pasar arrays al hacer `setValue`.

6. **Verificar mensajes de error**: Usa `wrapper.html()` para ver el HTML renderizado y verificar que el mensaje de error esté presente.
