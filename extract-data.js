const fs = require('fs');
const data = JSON.parse(
  fs.readFileSync('./haikyu_fly_high_full_v3.json', 'utf8')
);

// Extract unique bond names
const bondNames = [...new Set(data.bonds.map((bond) => bond.name))];
console.log('Unique bond names (' + bondNames.length + '):');
bondNames.sort().forEach((name) => console.log('"' + name + '"'));

console.log('\n\n=== ATTRIBUTES ===');
// Extract unique attributes
const attributes = new Set();
data.bonds.forEach((bond) => {
  if (bond.effects_by_character) {
    bond.effects_by_character.forEach((effect) => {
      if (effect.bonuses) {
        effect.bonuses.forEach((bonus) => {
          attributes.add(bonus.attribute);
        });
      }
    });
  }
});

const uniqueAttributes = [...attributes];
console.log('Unique attributes (' + uniqueAttributes.length + '):');
uniqueAttributes.sort().forEach((attr) => console.log('"' + attr + '"'));
