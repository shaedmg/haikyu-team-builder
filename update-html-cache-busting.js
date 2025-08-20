// update-html-cache-busting.js
// Adds cache busting query string to static assets in index.html using the current commit hash

const fs = require('fs');
const path = require('path');

const hash = process.env.GITHUB_SHA
  ? process.env.GITHUB_SHA.slice(0, 8)
  : Date.now();
const htmlPath = path.join(__dirname, 'index.html');

let html = fs.readFileSync(htmlPath, 'utf8');

// Replace styles.css
html = html.replace(
  /href="styles\.css(\?v=[^"]*)?"/g,
  `href="styles.css?v=${hash}"`
);
// Replace dist/init.js
html = html.replace(
  /src="dist\/init\.js(\?v=[^"]*)?"/g,
  `src="dist/init.js?v=${hash}"`
);
// Optionally, add more replacements for other static assets if needed

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('index.html updated with cache busting hash:', hash);
