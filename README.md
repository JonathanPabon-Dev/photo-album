## Estructura proyecto

| Carpeta      | Uso                                  |
| ------------ | ------------------------------------ |
| `assets`     | Imágenes, iconos y recursos propios  |
| `components` | Componentes reutilizables            |
| `features`   | Funcionalidades del negocio          |
| `layouts`    | Estructuras generales de las páginas |
| `pages`      | Pantallas completas                  |
| `routes`     | Configuración de navegación          |
| `services`   | Comunicación con Supabase/APIs       |
| `types`      | Tipos TypeScript compartidos         |
| `utils`      | Funciones auxiliares                 |

## Supabase considerations

pnpm exec supabase projects list
pnpm exec supabase link
pnpm exec supabase migration list
pnpm exec supabase db push --dry-run
pnpm exec supabase migration repair 20260809222000 --status applied
pnpm exec supabase db push
