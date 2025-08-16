const fs = require('fs');
const data = JSON.parse(
  fs.readFileSync('./haikyu_fly_high_full_v3.json', 'utf8')
);
const levels = new Set();
data.bonds.forEach((bond) => {
  if (bond.effects_by_character) {
    bond.effects_by_character.forEach((effect) => {
      if (effect.bonuses) {
        effect.bonuses.forEach((bonus) => {
          if (bonus.levels) {
            bonus.levels.forEach((level) => levels.add(level));
          }
        });
      }
    });
  }
});
console.log('Unique level values:');
[...levels].sort().forEach((level) => console.log('"' + level + '"'));
