# BGT PWA - Agentes

## Descripción del Proyecto

BGT PWA es una Progressive Web App para rastrear y gestionar juegos de mesa, partidas y jugadores. Migrada a Vite con soporte offline y arquitectura moderna.

## Stack Tecnológico

- **Frontend**: Vue 3 (Composition API)
- **Build Tool**: Vite 7
- **UI Framework**: Vuetify 3
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Form Validation**: VeeValidate + Yup
- **Icons**: FontAwesome + Material Design Icons
- **Testing**: Vitest + Vue Test Utils + jsdom
- **API Mocking**: MSW (Mock Service Worker)
- **PWA**: vite-plugin-pwa

## Rutas de la Aplicación

| Path | Componente | Descripción |
|------|------------|-------------|
| `/` | BoardGamesView | Vista principal de juegos de mesa |
| `/jugadores` | PlayersView | Gestión de jugadores |
| `/editar-jugador/:id?` | EditPlayer | Editar/crear jugador |
| `/partidas` | GamesView | Vista de partidas jugadas |
| `/agregar-partida` | AddGame | Registrar nueva partida |

## Estructura de Atomic Design

```
src/components/
├── atoms/          # Elementos básicos (Button, Typography, Logo)
├── molecules/      # Combinaciones simples (PlayerCard, BoardgameCard, ThemeToggler)
├── organisms/      # Bloques complejos (NavBar, AddPlayerSheet, CardGrid)
```

## Stores (Pinia)

- **PlayerStore**: Gestión de jugadores (localStorage)
- **GameStore**: Gestión de partidas (localStorage)
- **BoardGameStore**: Gestión de juegos de mesa (localStorage)

## API Services

- `collectionApiService`: Conexión a API de colecciones de juegos
- `gameApiService`: Operaciones de partidas
- `playerApiService`: CRUD de jugadores

## Composables Principales

- `useCollectionsApi`: Fetch de colección de juegos de mesa
- `useGamesApi`: Operaciones de partidas
- `usePlayerApi`: Operaciones de jugador individual
- `usePlayersApi`: Lista de jugadores
- `useAppSnackbar`: Feedback visual de la app
- `useCheckDbHealth`: Verificación de salud de la API
- `useServerTime`: Sincronización de tiempo del servidor

## Comandos Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview de build
npm run test         # Tests con Vitest
npm run test:ui      # Tests con UI
npm run test:coverage # Coverage de tests
```

## Configuración de Testing

- Framework: Vitest con jsdom
- Setup: `src/tests/setup.ts`
- Mocks de Vuetify: `__mocks__/styleMock.js`
- Atributo para tests: `data-testid` en componentes reales

## Características PWA

- Service Worker con auto-update
- Tema claro/oscuro
- Responsive design
- Instalable en dispositivos móviles

## Variables de Entorno

- `VITE_API_BASE_URL`: URL base de la API
- `VITE_MOCK_API`: Habilitar mocking de API (true/false)

## Docker

- Dockerfile: Producción (multi-stage)
- Dockerfile.dev: Desarrollo con hot-reload
- Puerto de desarrollo: 3000

## Desarrollo

- Se usa el alias @ para las rutas de componentes
- Se mantiene el uso de rutas relativas para types usados en defineProps(), sino genera un error