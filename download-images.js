// Script para extraer y descargar todas las imágenes de personajes
const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

// Leer el archivo JSON
const gameData = JSON.parse(
  fs.readFileSync('./haikyu_fly_high_full_v3.json', 'utf8')
);

// Crear la carpeta de imágenes si no existe
const imagesDir = './assets/images/characters';
if (!fs.existsSync('./assets')) {
  fs.mkdirSync('./assets');
}
if (!fs.existsSync('./assets/images')) {
  fs.mkdirSync('./assets/images');
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// Extraer todas las URLs únicas de imágenes
const imageUrls = new Set();
const urlToCharacterMap = new Map();

gameData.characters.forEach((character) => {
  if (character.profile_image_url) {
    imageUrls.add(character.profile_image_url);

    // Crear un nombre de archivo único basado en el ID y nombre del personaje
    const sanitizedName = character.name.replace(/[^a-zA-Z0-9]/g, '_');
    const variant = character.variant
      ? `_${character.variant.replace(/[^a-zA-Z0-9]/g, '_')}`
      : '';
    const filename = `${character.id}_${sanitizedName}${variant}.png`;

    urlToCharacterMap.set(character.profile_image_url, {
      filename,
      character: character,
    });
  }
});

console.log(`Found ${imageUrls.size} unique image URLs to download`);

// Función para descargar una imagen
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);

    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`✅ Downloaded: ${filepath}`);
            resolve();
          });
        } else {
          reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        }
      })
      .on('error', (error) => {
        fs.unlink(filepath, () => {}); // Delete incomplete file
        reject(error);
      });
  });
}

// Función para agregar delay entre descargas
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Descargar todas las imágenes
async function downloadAllImages() {
  const urlArray = Array.from(imageUrls);
  const total = urlArray.length;
  let downloaded = 0;
  let failed = 0;

  console.log(`Starting download of ${total} images...`);

  for (const url of urlArray) {
    try {
      const { filename } = urlToCharacterMap.get(url);
      const filepath = path.join(imagesDir, filename);

      // Skip if file already exists
      if (fs.existsSync(filepath)) {
        console.log(`⏭️  Skipped (already exists): ${filename}`);
        downloaded++;
        continue;
      }

      await downloadImage(url, filepath);
      downloaded++;

      // Add small delay to be respectful to the server
      await delay(100);
    } catch (error) {
      console.error(`❌ Failed to download ${url}:`, error.message);
      failed++;
    }

    // Progress update
    if ((downloaded + failed) % 10 === 0) {
      console.log(
        `Progress: ${
          downloaded + failed
        }/${total} (${downloaded} success, ${failed} failed)`
      );
    }
  }

  console.log(`\n📊 Download Summary:`);
  console.log(`✅ Successfully downloaded: ${downloaded}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📁 Images saved to: ${imagesDir}`);

  // Generate mapping file
  generateImageMapping();
}

// Generar archivo de mapeo para actualizar las referencias
function generateImageMapping() {
  const mapping = {};

  gameData.characters.forEach((character) => {
    if (character.profile_image_url) {
      const { filename } = urlToCharacterMap.get(character.profile_image_url);
      mapping[character.id] = {
        original_url: character.profile_image_url,
        local_path: `./assets/images/characters/${filename}`,
        character_name: character.name,
        variant: character.variant,
      };
    }
  });

  fs.writeFileSync('./image-mapping.json', JSON.stringify(mapping, null, 2));
  console.log(`\n📝 Image mapping saved to: ./image-mapping.json`);
}

// Ejecutar el proceso de descarga
downloadAllImages().catch(console.error);
