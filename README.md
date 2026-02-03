# BGT PWA

## Scripts disponibles: 
Estos comandos se ejecutan con `npm run <script>` para desarrollo, build, preview y testing:
- `dev`: Levanta el servidor de desarrollo en Vite
- `build`: Compila la app para producción
- `preview`: Sirve la app compilada para verificar el resultado final
- `test`: Ejecuta los tests con Vitest

> Para debugging en VS Code es necesario tener `.vscode/launch.json`

## Testing
- Framework: [Vitest](https://vitest.dev/)
- Utilidades: [Vue Test Utils](https://test-utils.vuejs.org/), [jsdom](https://github.com/jsdom/jsdom)

Los test unitarios se ubican junto al archivo que testean, siguiendo esta convención:

```
src/
├── components/
│   ├── Button.vue
│   └── Button.spec.ts
├── composables/
│   ├── useTimer.ts
│   └── useTimer.spec.ts
├── stores/
│   ├── gameStore.ts
│   └── gameStore.spec.ts
```

Dentro del directorio src/test hay funciones utilitarias para el setup y para crear una instancia de Vuetify en cada test.

### Convención de atributos para Test (`data-testid`)
Para seleccionar elementos en los test se usa el atributo `data-testid`. Este atributo debe **definirse en el componente Vue real, no en los stubs**. Esto asegura que las pruebas validen la funcionalidad del componente y no del stub temporal.

### ⚠️​ Testing eventos emitidos en formularios 
- **Problema:** Cuando se usa `vee-validate` con `defineEmits`, el evento no se captura si se dispara desde el botón (`@click`) o el formulario (`@submit`). Esto se debe a que `handleSubmit` encapsula la lógica y el `emit` no se registra en el wrapper.
- **Solución:** llamar directamente al método expuesto con `defineExpose`. 

```typescript
await wrapper.vm.submitForm();
expect(wrapper.emitted("playerAdded")).toEqual([
  [{ playerName: "Stephen King" }]
]);
```
(Link al test entero)[https://github.com/pazspera/bgt-pwa/blob/main/src/components/organisms/AddPlayerSheet.spec.ts]

### ⚠️ Testing de composables

#### Doble mocking (`spyOn` y `fetch`)
Para testear fallos de servicios (como un error de red), usar solo `getPlayerSpy.mockRejectedValue` falla.
- **Problema:** En Node.js, la línea `await fetch(...)` se ejecuta antes que el spy pueda actuar. Esto causa un *error de red genérico* que sobreescribe el mensaje de error del test. 
- **Solución:** Usar un *doble mocking*. Se mockea el `fetch` global (`vi.spyOn(global, "fetch")`) con el *mismo mensaje de error que espera el test*, asegurando que se capture el mensaje correcto.

```typescript
const errorMessage = "Error en el servidor al obtener jugadores";
getPlayersSpy.mockRejectedValue(new Error(errorMessage));

vi.spyOn(global, "fetch").mockRejectedValue(new Error(errorMessage))
```
(Link al test entero)[https://github.com/pazspera/bgt-pwa/blob/main/src/composables/usePlayers.spec.ts]

#### Captura de promesa rechazada en tests de error
Al probar un error, la función del composable devuelve una promesa rechazada. 
- **Problema:** Si se usa solo `await promise;`, Vitest detiene el test por una Promesa no manejada (Uncaught Rejection). Esto impide que se verifique el resto del test.
- **Solución:** Envolver el `await promise;` en un `try/catch` en el test para "silenciar" ese rechazo y permitir que el código continúe.

```typescript
const promise = fetchPlayer(playerId);
expect(loading.value).toBe(true);

try { await promise; } catch(e) {}
```
(Link al test, revisar casos de error response)[https://github.com/pazspera/bgt-pwa/blob/main/src/composables/usePlayer.spec.ts]

## Sistema de diseño 

### Estructura de componentes
La estructura del proyecto utiliza Atomic Design para la organización de componentes y vistas. Carpetas a utilizar 

- atoms: Elementos básicos como Button.vue, Icon.vue
- molecules: Combinaciones de elementos básicos como FormField.vue, PlayerCard.vue
- organisms: Bloques más complejos con funcionalidad avanzada como Header.vue, ContactForm.vue
- sections: Componentes que sean secciones de contenido reutilizables, como HeroSection.vue. Este proyecto no va a trabajar con templates. 
- views: Vistas completas como Home.vue, Boardgames.vue. Cumple la funcionalidad de pages en el sistema de Atomic Design tradicional.

### Componentes tipografía
- H1: DisplayTitle
- H2: SectionTitle
- H3: SubsectionTitle
- H4: BlockHeading
- H5: CardHeading
- H6: MinorHeading
- Subtitle 1: LeadText
- Subtitle 2: SupportText
- body 1: BodyText
- body 2: DetailText
- Caption: CaptionText
- Button: ButtonLabel
- Link (Router-link): NavigationLink
- Link (a tag): ExternalLink

| Token              | Mínimo (rem/px) | Máximo (px) |
|-------------------|------------------|-------------|
| `--font-size-xxs` | 0.7rem / 11.2px  | 12px        |
| `--font-size-xs`  | 0.8rem / 12.8px  | 14px        |
| `--font-size-sm`  | 0.9rem / 14.4px  | 16px        |
| `--font-size-md`  | 1rem / 16px      | 18px        |
| `--font-size-lg`  | 1.125rem / 18px  | 20px        |
| `--font-size-xl`  | 1.25rem / 20px   | 24px        |
| `--font-size-2xl` | 1.5rem / 24px    | 28px        |
| `--font-size-3xl` | 1.75rem / 28px   | 32px        |
| `--font-size-4xl` | 2rem / 32px      | 36px        |
| `--font-size-5xl` | 2.25rem / 36px   | 40px        |
| `--font-size-6xl` | 2.5rem / 40px    | 44px        |
| `--font-size-7xl` | 2.75rem / 44px   | 48px        |
| `--font-size-8xl` | 3.5rem / 56px    | 56px        |
| `--font-size-9xl` | 4.25rem / 68px   | 68px        |
