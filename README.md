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
- Utilidades: [Vue Test Utils](https://test-utils.vuejs.org/), [happy-dom](https://github.com/capricorn86/happy-dom)

Los test unitarios se ubican junto al archivo que testean, siguiendo esta convención:

src/ ├── components/ │   ├── Button.vue │   └── Button.spec.ts ├── composables/ │   ├── useTimer.ts │   └── useTimer.spec.ts ├── stores/ │   ├── gameStore.ts │   └── gameStore.spec.ts


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

| Token              | Mínimo (rem/px) | Máximo (px) | Uso sugerido                          |
|-------------------|------------------|-------------|---------------------------------------|
| `--font-size-xxs` | 0.7rem / 11.2px  | 12px        | Microtext, disclaimers, tooltips      |
| `--font-size-xs`  | 0.8rem / 12.8px  | 14px        | CaptionText, ExternalLink             |
| `--font-size-sm`  | 0.9rem / 14.4px  | 16px        | DetailText, SupportText               |
| `--font-size-md`  | 1rem / 16px      | 18px        | BodyText, LeadText                    |
| `--font-size-lg`  | 1.125rem / 18px  | 20px        | ButtonLabel, NavigationLink           |
| `--font-size-xl`  | 1.25rem / 20px   | 24px        | CardHeading, BlockHeading             |
| `--font-size-2xl` | 1.5rem / 24px    | 28px        | SubsectionTitle                       |
| `--font-size-3xl` | 1.75rem / 28px   | 32px        | SectionTitle                          |
| `--font-size-4xl` | 2rem / 32px      | 36px        | DisplayTitle (mobile)                 |
| `--font-size-5xl` | 2.25rem / 36px   | 40px        | DisplayTitle (tablet)                 |
| `--font-size-6xl` | 2.5rem / 40px    | 44px        | DisplayTitle (desktop)                |
| `--font-size-7xl` | 2.75rem / 44px   | 48px        | Optional large display                |
| `--font-size-8xl` | 3.5rem / 56px    | 56px        | Hero titles, landing headers          |
| `--font-size-9xl` | 4.25rem / 68px   | 68px        | Massive display, marketing emphasis   |
