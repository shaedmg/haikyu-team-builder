Place Inter font subset files here (self-hosted) to avoid external font requests and CSP issues.

Recommended files (WOFF2 only for modern browsers):
- Inter-regular.woff2 (weight 400)
- Inter-semibold.woff2 (weight 600)
- Inter-bold.woff2 (weight 700)

How to obtain:
1. Go to https://fonts.google.com/specimen/Inter
2. Select weights 400, 600, 700.
3. Download family.
4. From the zip, keep only *.woff2 files for those weights.
5. Rename to the filenames above (simpler cache keys) and drop them in this folder.

Optional subsetting (reduce size):
Use glyphhanger or fonttools to subset to basic Latin if you don't need extended sets:
  glyphhanger --subset=./Inter-Regular.woff2 --US-ASCII --formats=woff2

After adding files, Lighthouse will show faster font loading and no external requests.
