const fs = require('fs');

// Convert characters.json to TypeScript
function convertCharactersToTS() {
  const charactersData = JSON.parse(
    fs.readFileSync('./characters.json', 'utf8')
  );

  const tsContent = `import { CharactersData } from './types/index.js';

export const charactersData: CharactersData = ${JSON.stringify(
    charactersData,
    null,
    2
  )};`;

  fs.writeFileSync('./src/characters.ts', tsContent);
  console.log('✅ characters.ts created');
}

// Convert bonds.json to TypeScript
function convertBondsToTS() {
  const bondsData = JSON.parse(fs.readFileSync('./bonds.json', 'utf8'));

  // Add missing IDs and fix format issues
  bondsData.bonds = bondsData.bonds.map((bond, index) => {
    // Add ID if missing
    if (!bond.id) {
      bond.id = index + 1;
    }

    // Fix abilities format if present
    if (bond.effects_by_character) {
      bond.effects_by_character = bond.effects_by_character.map((effect) => {
        if (effect.abilities) {
          effect.abilities = effect.abilities.map((ability) => {
            // Convert ability fields to multilingual format if needed
            if (typeof ability.name === 'string') {
              ability.name = {
                es: ability.name,
                en: ability.name, // Default to Spanish
              };
            }
            if (typeof ability.description === 'string') {
              ability.description = {
                es: ability.description,
                en: ability.description, // Default to Spanish
              };
            }
            if (Array.isArray(ability.levels)) {
              ability.levels = {
                es: ability.levels,
                en: ability.levels, // Same values
              };
            }
            return ability;
          });
        }
        return effect;
      });
    }

    return bond;
  });

  const tsContent = `import { BondsData } from './types/index.js';

export const bondsData: BondsData = ${JSON.stringify(bondsData, null, 2)};`;

  fs.writeFileSync('./src/bonds.ts', tsContent);
  console.log('✅ bonds.ts created');
}

// Run conversions
convertCharactersToTS();
convertBondsToTS();

console.log('🎉 JSON to TypeScript conversion complete!');
console.log('You can now delete the JSON files and update imports.');
