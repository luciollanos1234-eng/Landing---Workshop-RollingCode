# Landing - Workshop RoliingCode

<img width="910" height="300" alt="logo-rolling-blanco" src="https://github.com/user-attachments/assets/a08facb2-8190-4b1a-8685-3c41683a5aad" />


## 📄 Descripción General
Proyecto de desarrollo web realizado en el marco del **Scrum Professional Bootcamp** de Rolling Code School. Consiste en una landing page fiel al diseño proporcionado, destinada a la difusión del evento y la gestión de venta de entradas. Se implementa con tecnologías estándar del entorno frontend y se publica de forma accesible mediante GitHub Pages.

> **Alcance:** Estructura, estilos, componentes interactivos y validación de formularios en el lado del cliente. **No se requiere desarrollo de backend ni persistencia de datos.**

---

## 🎯 Objetivos del Proyecto
- Reproducir fielmente la interfaz definida en el mockup: colores, tipografía, dimensiones y distribución.
- Garantizar la adaptabilidad del diseño a dispositivos móviles, tabletas y escritorio.
- Implementar validación de formularios con mensajes claros y accesibles.
- Aplicar la metodología Scrum durante todo el ciclo de desarrollo.
- Entregar el producto final en un entorno de acceso público.

---

## 🛠️ Stack Tecnológico
| Componente | Tecnología / Versión |
|---|---|
| Estructura | HTML5 |
| Estilos | CSS3 con variables personalizadas |
| Framework de interfaz | Bootstrap 5.3.3 (CDN) |
| Tipografía | Google Fonts — Plus Jakarta Sans |
| Control de versiones | Git & GitHub |
| Despliegue | GitHub Pages |

---

## 🎨 Especificaciones de Diseño

### Paleta de Colores
Definida centralmente en `css/styles.css` mediante variables CSS para facilitar mantenimiento y consistencia:

| Variable | Valor | Aplicación |
|---|---|---|
| `--rc-red` | `#e0202a` | Botones, íconos, etiquetas |
| `--rc-red-dark` | `#a50d14` | Degradado (punto intermedio) |
| `--rc-red-deep` | `#6e070c` | Degradado (punto final) |
| `--rc-black` | `#0b0b0c` | Fondo principal |
| `--rc-surface` | `#111113` | Tarjetas y bloques diferenciados |
| `--rc-white` | `#ffffff` | Títulos y textos sobre fondo oscuro |
| `--rc-text-soft` | `#d4d4d8` | Párrafos, bordes secundarios |
| `--rc-text-mute` | `#a1a1aa` | Textos de apoyo |
| `--rc-gradient` | `linear-gradient(160deg, #e0202a 0%, #a50d14 55%, #6e070c 100%)` | Bloque principal y sección de compra |

### Tipografía
- Fuente base: **Plus Jakarta Sans** (system-ui como respaldo)
- Pesos utilizados: 300 itálico, 400, 600 y 800
- Títulos responsivos mediante `clamp()`:
  - Título principal: `clamp(40px, 6vw, 88px)`
  - Títulos de sección: `clamp(34px, 4.5vw, 56px)`

### Dimensiones y Espaciado
- Ancho máximo del contenedor principal: `1200px` (centrado)
- Separación entre secciones: `96px`
- Radio de esquinas: bloques `40px`, tarjetas `32px`, campos de formulario `14px`, botones en forma de píldora
- Altura mínima de botones: `52px` (barra de navegación: `44px`)

---

## 🚀 Instalación y Ejecución Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/luciollanos1234-eng/rollingDev.git
   cd rollingDev
