# BGT PWA

## Estructura de componentes

La estructura del proyecto utiliza Atomic Design para la organización de componentes y vistas. Carpetas a utilizar 

- atoms: Elementos básicos como Button.vue, Icon.vue
- molecules: Combinaciones de elementos básicos como FormField.vue, PlayerCard.vue
- organisms: Bloques más complejos con funcionalidad avanzada como Header.vue, ContactForm.vue
- sections: Componentes que sean secciones de contenido reutilizables, como HeroSection.vue. Este proyecto no va a trabajar con templates. 
- views: Vistas completas como Home.vue, Boardgames.vue. Cumple la funcionalidad de pages en el sistema de Atomic Design tradicional.

## Componentes tipografía

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

