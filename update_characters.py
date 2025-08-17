#!/usr/bin/env python3
import json

# Cargar el archivo de mapeo de imágenes
with open('image-mapping.json', 'r', encoding='utf-8') as f:
    image_mapping = json.load(f)

# Crear un diccionario de mapeo de URL original a ruta local
url_to_local = {}
for key, data in image_mapping.items():
    url_to_local[data['original_url']] = data['local_path']

# Cargar el archivo characters-clean.json
with open('characters-clean.json', 'r', encoding='utf-8') as f:
    characters_data = json.load(f)

# Actualizar las URLs de las imágenes
updated_count = 0
for character_id, character in characters_data['characters'].items():
    original_url = character['profile_image_url']
    if original_url and original_url in url_to_local:
        character['profile_image_url'] = url_to_local[original_url]
        updated_count += 1
        print(f"Actualizado personaje {character_id}: {character['name']} - {character.get('variant', 'Sin variante')}")
    elif original_url:
        print(f"ADVERTENCIA: No se encontró mapeo para {character_id}: {character['name']} - URL: {original_url}")

# Guardar el nuevo archivo como characters.json
with open('characters.json', 'w', encoding='utf-8') as f:
    json.dump(characters_data, f, ensure_ascii=False, indent=2)

print(f"\n✅ Proceso completado!")
print(f"📊 Total de personajes actualizados: {updated_count}")
print(f"📁 Archivo guardado como: characters.json")
