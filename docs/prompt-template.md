**Tarea: Migración de Vuetify y eliminación de Bootstrap**

- Rama actual: `vuetify-migration`
- Versión actual de Vuetify: `v3.3.13`
- Objetivo: Migrar Vuetify a la versión más reciente disponible (`v3.10.x`) y eliminar el uso de Bootstrap en los componentes `.vue`.

**Acciones requeridas:**

1. Actualizar Vuetify a la última versión estable.
2. Revisar todos los archivos `.vue` dentro de `src/` y `App.vue` en la raíz.
3. Reemplazar clases de Bootstrap (`container`, `row`, `col`) por los componentes de layout de Vuetify:
   - `v-container`
   - `v-row`
   - `v-col`
4. Asegurarse de que el layout se mantenga funcional y visualmente coherente.
5. No modificar rutas, lógica de navegación ni estilos personalizados fuera del layout.

**Notas:**
- Esta rama es experimental. No hacer merge a `main` sin revisión.
- Si se detectan componentes que dependen fuertemente de Bootstrap, documentarlos para refactor posterior.