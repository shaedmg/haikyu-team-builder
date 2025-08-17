# Haikyu Flight High Team Builder - TypeScript Version

🏐 **Interactive volleyball team builder for Haikyu Flight High characters with TypeScript support!**

## 🚀 Recent Migration to TypeScript

This project has been completely migrated from JavaScript to TypeScript with modern architecture and type safety.

## 🏐 Features

- **Drag & Drop Interface**: Intuitive player placement system
- **Position Validation**: Ensures players are placed in correct positions
- **School Bonuses**: Track school composition for team buffs
- **Bond System**: Kizuna skills and character relationships
- **Player Rotation**: Simulate volleyball position rotations
- **Responsive Design**: Works on desktop and mobile devices
- **TypeScript**: Fully typed for better development experience

## 🛠️ Technologies

- **TypeScript 5.3+**: Type-safe JavaScript
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **ES2020 Modules**: Modern JavaScript modules
- **Node.js**: Development environment

## 📦 Installation

1. Clone or download the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## 🚀 Development

### Build the project:

```bash
npm run build
```

### Start development with auto-compilation:

```bash
npm run build:watch
```

### Start development server:

```bash
npm run dev
```

### Serve the built project:

```bash
npm start
```

## 📁 Project Structure

```
src/
├── types.ts           # TypeScript type definitions
├── script.ts          # Main team builder class
├── extended-players.ts # Additional character data
├── utils.ts           # Utility functions
├── config.ts          # Application configuration
└── main.ts            # Main entry point

dist/                  # Compiled JavaScript output
├── *.js              # Compiled JavaScript files
├── *.d.ts             # Type declaration files
└── *.js.map           # Source maps

haikyu_fly_high_full_v3.json  # Character and bond data
index.html             # Main HTML file
styles.css             # Styling
```

## 🎮 How to Use

1. **Select Players**: Browse available players by position
2. **Drag & Drop**: Place players in court positions
3. **View Details**: Click on players to see their stats
4. **School Composition**: Monitor school bonuses in the sidebar
5. **Bonds**: Check active character relationships
6. **Rotate Team**: Use the rotation button to simulate position changes

## 🧩 Position Types

- **S (Setter)**: Playmaker who sets up attacks
- **MB (Middle Blocker)**: Front row defense and quick attacks
- **WS (Wing Spiker)**: Main attackers on the sides
- **OP (Opposite)**: Right-side attacker and secondary setter
- **L (Libero)**: Defensive specialist

## 🔧 Configuration

Edit `src/config.ts` to customize:

- Data source URL
- Animation timings
- Debug mode
- School buff thresholds

## 📊 Type Safety

The TypeScript version includes comprehensive type definitions:

- Player interfaces with all properties
- Bond system types
- Team composition validation
- Event handler typing
- Configuration interfaces

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes in TypeScript
4. Run `npm run build` to compile
5. Test your changes
6. Submit a pull request

## 📄 License

MIT License - feel free to use and modify for your projects.

## 🎯 Future Enhancements

- [ ] Save/load team compositions
- [ ] Advanced filtering and search
- [ ] Team comparison tools
- [ ] Animation improvements
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Advanced statistics

## 🐛 Bug Reports

If you find any issues, please report them with:

- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Console error messages (if any)

---

Made with ❤️ for Haikyu!! fans
