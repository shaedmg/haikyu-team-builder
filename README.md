
# Haikyu team builder / Haikyuu team builder

[Visita la app aquí](https://shaedmg.github.io/haikyu-team-builder/)

# 🏐 Haikyu Flight High - Team Builder

Un team builder interactivo inspirado en el anime/manga Haikyu!! que permite crear formaciones de voleibol con personajes del anime.

## 🎯 Características

- **Cancha de voleibol realista** con 7 posiciones específicas según las reglas del voleibol
- **Posiciones correctas**:
  - Libero (L) - Abajo izquierda
  - 2 Middle Blockers (MB) - Lados opuestos
  - 2 Wing Spikers (WS) - Lados opuestos
  - 1 Opposite (OP) - Opuesto al Setter
  - 1 Setter (S) - Opuesto al Opposite
- **Interfaz visual atractiva** similar al juego original
- **Sistema de drag and drop** para asignar jugadores
- **Validación de posiciones** basada en las posiciones reales de los personajes
- **Datos de personajes** de Haikyu!! con estadísticas
- **Guardado y carga** de formaciones

## 🚀 Cómo usar

1. **Abrir el proyecto**: Simplemente abre `index.html` en tu navegador web
2. **Seleccionar posición**: Haz clic en una posición vacía de la cancha (aparecerá resaltada)
3. **Elegir jugador**: Haz clic en un jugador del panel lateral para ver sus detalles
4. **Asignar jugador**: Presiona "Seleccionar Jugador" en el modal para asignarlo a la posición
5. **Remover jugador**: Haz clic en un jugador ya asignado para removerlo
6. **Equipo completo**: Cuando tengas todas las posiciones llenas, verás una notificación

## Deploy (GitHub Pages)

This project is configured with a GitHub Actions workflow (`.github/workflows/deploy.yml`). On every push to `master` or `main` it will:

1. Install dependencies (npm ci)
2. Compile TypeScript (`npm run build` -> outputs to `dist/`)
3. Copy static files (html, css, assets, json data, service worker, manifest) into a temporary `build/` folder
4. Inject the short commit SHA into `sw.js` (updates `CACHE_VERSION` and `CACHE_NAME`) to force clients to fetch the new service worker and avoid stale caches
5. Publish the artifact to GitHub Pages

After the first successful run, enable Pages in the repository settings (Deploy from GitHub Actions). Subsequent pushes auto-update the site.

### Cache Busting

The service worker version strings are replaced with the current commit hash (first 8 chars). Any deployment invalidates previous caches because the cache name changes. If you also want to force reload of `init.js`, you can add a query param in `index.html` like `dist/init.js?v=__BUILD_HASH__` via a sed step in the workflow.

### Local Testing of SW

Run `npm start` then open DevTools > Application > Service Workers. After modifying `sw.js`, reload with "Update on reload" enabled to bypass stale caches.

### Private vs Public Repository

GitHub Pages supports private repos only on paid plans. For a free public site, make the repository public. If you need to keep source private, consider deploying to Netlify/Vercel instead.

### Custom Domain

If you add a custom domain, create a `CNAME` file with the domain name at the project root and commit it. Update canonical/meta tags to reflect the new domain.

## 📁 Estructura del proyecto

```
haikyu_builder/
├── index.html          # Archivo principal HTML
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
└── README.md          # Este archivo
```

## 🎮 Controles

- **Click izquierdo** en posición vacía: Seleccionar posición para asignar
- **Click izquierdo** en jugador del panel: Abrir modal de detalles
- **Click izquierdo** en jugador asignado: Remover de la posición
- **Botón "Seleccionar Jugador"**: Asignar jugador a posición seleccionada

## 🏐 Posiciones en el voleibol

La aplicación respeta las posiciones reales del voleibol:

1. **Posición 1** (OP) - Opposite/Opuesto - Frente derecha
2. **Posición 2** (WS) - Wing Spiker - Atrás derecha
3. **Posición 3** (MB) - Middle Blocker - Frente centro
4. **Posición 4** (WS) - Wing Spiker - Atrás izquierda
5. **Posición 5** (S) - Setter - Frente izquierda
6. **Posición 6** (MB) - Middle Blocker - Atrás centro
7. **Libero** (L) - Posición especial defensiva

## 🎨 Personalización

### Agregar nuevos personajes

Edita el array `players` en `script.js`:

```javascript
{
    id: 16,
    name: "Nombre del Personaje",
    position: "WS", // WS, MB, OP, S, L
    height: "175.0 cm",
    power: 85,
    image: "URL_de_la_imagen",
    team: "Nombre del Equipo",
    specialty: "Habilidad Especial"
}
```

### Modificar estilos

Los estilos principales están en `styles.css`. Puedes modificar:

- Colores del tema
- Tamaño de la cancha
- Efectos visuales
- Responsive design

## 🔧 Tecnologías utilizadas

- **HTML5** - Estructura
- **CSS3** - Estilos y animaciones
  - Flexbox y Grid Layout
  - Gradientes y efectos visuales
  - Animaciones CSS
- **TypeScript** - Desarrollo tipado y modular
  - Event listeners
  - LocalStorage para persistencia
  - DOM manipulation
  - Arquitectura orientada a componentes

## 🤖 Desarrollo con Vibe Coding - Experimento Técnico

**⚠️ NOTA IMPORTANTE: Esta es una prueba experimental de metodologías de vibe coding. Los resultados presentados forman parte de un estudio de caso y no representan una metodología de desarrollo establecida o recomendada para entornos de producción.**

Este proyecto fue desarrollado como **experimento técnico** utilizando **metodologías de vibe coding**, una aproximación experimental al desarrollo de software que combina la intuición creativa con prácticas de programación estructuradas.

### ¿Qué es Vibe Coding? (Metodología Experimental)

El vibe coding es una **metodología en fase de investigación** que estamos probando para evaluar su viabilidad. Los principios experimentales incluyen:

- **Flujo creativo continuo**: Desarrollo iterativo basado en la inspiración y el momentum del proyecto
- **Arquitectura emergente**: Permitir que la estructura del código evolucione orgánicamente según las necesidades
- **Feedback inmediato**: Ciclos cortos de desarrollo, prueba y refinamiento
- **Contexto compartido**: Colaboración fluida entre desarrollador y herramientas de IA

### Implementación Experimental en este Proyecto

Este team builder de Haikyu!! sirve como **caso de prueba** para los principios del vibe coding:

- **Desarrollo modular e iterativo**: Cada componente fue desarrollado de forma independiente como experimento
- **Tipado dinámico con TypeScript**: Estructura de código que se adapta durante el proceso experimental
- **Arquitectura responsive**: El sistema responde a diferentes casos de uso (resultados del experimento)
- **Optimización progresiva**: Mejoras implementadas según el flujo experimental

### Resultados del Experimento

**✅ Aspectos exitosos observados:**

- ⚡ **Desarrollo acelerado**: Prototipo funcional en sesiones experimentales
- 🎯 **Calidad emergente**: Arquitectura resultante del desarrollo orgánico
- 🔄 **Iteración eficiente**: Capacidad de pivotear durante el experimento
- 🧩 **Modularidad natural**: Componentes bien definidos surgieron naturalmente

**⚠️ Limitaciones y áreas de mejora identificadas:**

- 📚 **Documentación**: Los procesos requieren mejor documentación sistemática
- 🔄 **Repetibilidad**: La metodología necesita mayor estructura para ser repetible
- 👥 **Escalabilidad**: Falta validar efectividad en equipos más grandes
- 📊 **Métricas**: Se requieren mejores indicadores de progreso y calidad
- 🛠️ **Herramientas**: Necesidad de herramientas específicas para soportar la metodología

### Conclusiones del Experimento

Este proyecto sirve como **prueba de concepto inicial** que sugiere potencial en el vibe coding, pero también revela que:

1. **Se requiere más investigación** para establecer mejores prácticas
2. **Los procesos necesitan refinamiento** para ser aplicables en producción
3. **La metodología muestra promesa** pero no está lista para adopción general
4. **Se necesitan más casos de estudio** para validar los resultados

**Disclaimer:** Este es un proyecto experimental. Los resultados y metodologías presentadas están en fase de investigación y no deben considerarse como estándares establecidos de la industria.

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge (versiones modernas)
- ✅ Responsive design (móvil y desktop)
- ✅ No requiere frameworks externos

## 🎯 Próximas características

- [ ] Más personajes de otros equipos
- [ ] Sistema de estadísticas del equipo
- [ ] Múltiples formaciones guardadas
- [ ] Modo competitivo
- [ ] Efectos de sonido
- [ ] Animaciones de entrada de jugadores

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Puedes:

1. Agregar más personajes
2. Mejorar el diseño visual
3. Implementar nuevas características
4. Reportar bugs

## 📜 Licencia

Este proyecto es solo para fines educativos y de entretenimiento. Haikyu!! es propiedad de Haruichi Furudate.

---

¡Disfruta creando tu equipo de ensueño de Haikyu!! 🏐✨
