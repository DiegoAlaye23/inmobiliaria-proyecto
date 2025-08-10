# Guía de estilo

Este documento reúne las bases visuales para la interfaz del proyecto.

## Colores

### Modo claro

| Token | Hex | Uso |
| --- | --- | --- |
| `primary.main` | `#1976d2` | Acciones principales y enlaces destacados |
| `secondary.main` | `#f50057` | Acciones secundarias o de énfasis |
| `neutral.main` | `#64748B` | Elementos neutrales y texto complementario |
| `background.default` | `#f5f5f5` | Fondo general de la aplicación |
| `background.paper` | `#ffffff` | Tarjetas y contenedores |

### Modo oscuro

| Token | Hex | Uso |
| --- | --- | --- |
| `primary.main` | `#90caf9` | Acciones principales en modo oscuro |
| `secondary.main` | `#f48fb1` | Acciones secundarias o de énfasis |
| `neutral.main` | `#b0bec5` | Elementos neutrales y texto complementario |
| `background.default` | `#121212` | Fondo general de la aplicación |
| `background.paper` | `#1e1e1e` | Tarjetas y contenedores |

## Tipografía

- **Fuente base:** `Roboto, Helvetica, Arial, sans-serif`
- **Tamaños y pesos:**
  - `h1` – 2rem / 700
  - `h2` – 1.5rem / 700
  - `h3` – 1.25rem / 700
  - `body1` – 1rem
  - `body2` – 0.875rem

## Componentes reutilizables

- `AppButton`: botón estilizado con variantes consistentes. Puede utilizarse así:

```jsx
import { AppButton } from './design-system';

<AppButton>Acción</AppButton>
```

El sistema de diseño se expone desde `src/design-system`, donde también se definen los tokens de color y tipografía.
