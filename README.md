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
- **JavaScript ES6+** - Funcionalidad
  - Event listeners
  - LocalStorage para persistencia
  - DOM manipulation

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
