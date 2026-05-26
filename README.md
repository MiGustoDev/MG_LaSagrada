# Mi Gusto x La Sagrada - Landing Page (React)

Una landing page moderna y responsiva para el lanzamiento de "Mi Gusto x La Sagrada", migrada de HTML a React.

## Características

- ✨ Diseño moderno con Tailwind CSS
- 🎨 Tema oscuro (Dark Mode)
- 📱 Responsive design
- 🎬 Efectos paralax en el hero section
- 🎪 Animaciones suaves (float, marquee, etc.)
- 🪟 Glassmorphism cards con efectos hover
- 📊 Secciones de countdown, ingredientes y marquee

## Instalación

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera la compilación de producción
- `npm run preview` - Previsualiza la compilación de producción

## Estructura del Proyecto

```
src/
├── components/
│   ├── Header.jsx           # Navegación superior
│   ├── TitleSection.jsx     # Sección de título
│   ├── HeroSection.jsx      # Sección principal con imagen
│   ├── CountdownSection.jsx # Countdown timer
│   ├── IngredientsSection.jsx # Sección de ingredientes
│   ├── MarqueeSection.jsx   # Animación marquee
│   ├── PreLaunchSection.jsx # Sección pre-lanzamiento con countdown y formulario
│   ├── PreLaunchMarquee.jsx # Marquee de transición (fondo primario)
│   └── Footer.jsx           # Pie de página
├── App.jsx                  # Componente principal
├── main.jsx                 # Punto de entrada
└── index.css               # Estilos globales

tailwind.config.js          # Configuración de Tailwind CSS
vite.config.js             # Configuración de Vite
postcss.config.js          # Configuración de PostCSS
```

## Cambios principales respecto al HTML original

1. **Separación en componentes**: Cada sección es un componente React independiente
2. **Estado reactivo**: Las micro-interacciones usan `useState` y `useEffect`
3. **Efecto parallax**: Implementado con `useEffect` para detectar scroll
4. **Hover effects**: Las tarjetas de ingredientes usan estado para los efectos hover
5. **Countdown funcional**: Temporizador en tiempo real que actualiza cada segundo
6. **Formulario interactivo**: Forma de waitlist con validación y feedback
7. **Configuración Tailwind**: Migrada a un archivo de configuración JS
8. **Estilos personalizados**: Stencil text, flip cards y efectos de marquee

## Características Principales

- **Pre-Lanzamiento**: Sección completa con countdown en vivo, formulario de waitlist y fondo decorativo con parallax
- **Animaciones**: Effectos smooth de scroll parallax, float, marquee y flip cards
- **Responsive**: Diseño completamente responsivo para móvil, tablet y desktop
- **Dark Mode**: Tema oscuro de forma nativa con clase `dark`

## Requisitos

- Node.js 16+ 
- npm 7+

## Licencia

© 2024 MI GUSTO. UN GUSTO HECHO RITUAL.
