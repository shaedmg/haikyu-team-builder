#!/usr/bin/env python3
import json

def json_to_ts(json_file, ts_file, export_name, type_name):
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    with open(ts_file, 'w', encoding='utf-8') as f:
        f.write(f"import {{ {type_name} }} from './types/index.js';\n\n")
        f.write(f"export const {export_name}: {type_name} = ")
        f.write(json.dumps(data, ensure_ascii=False, indent=2))
        f.write(";\n")

# Convertir characters.json
json_to_ts('characters.json', 'src/charactersData.ts', 'charactersData', 'CharactersData')

# Convertir bonds.json
json_to_ts('bonds.json', 'src/bondsData.ts', 'bondsData', 'BondsData')

print("✅ Archivos JSON convertidos a TypeScript:")
print("📁 src/charactersData.ts")
print("📁 src/bondsData.ts")
