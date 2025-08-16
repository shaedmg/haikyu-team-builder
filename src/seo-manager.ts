// SEO Optimization utilities
export interface SEOMetadata {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
    canonical?: string;
}

export class SEOManager {
    private static instance: SEOManager;

    private constructor() { }

    public static getInstance(): SEOManager {
        if (!SEOManager.instance) {
            SEOManager.instance = new SEOManager();
        }
        return SEOManager.instance;
    }

    /**
     * Actualiza las meta tags de SEO
     */
    public updateMetaTags(metadata: SEOMetadata): void {
        // Actualizar título
        document.title = metadata.title;

        // Actualizar meta description
        this.updateMetaTag('description', metadata.description);

        // Actualizar meta keywords
        this.updateMetaTag('keywords', metadata.keywords.join(', '));

        // Actualizar Open Graph tags
        this.updateMetaProperty('og:title', metadata.title);
        this.updateMetaProperty('og:description', metadata.description);
        this.updateMetaProperty('og:type', 'website');

        if (metadata.ogImage) {
            this.updateMetaProperty('og:image', metadata.ogImage);
        }

        // Actualizar Twitter Card tags
        this.updateMetaProperty('twitter:card', 'summary_large_image');
        this.updateMetaProperty('twitter:title', metadata.title);
        this.updateMetaProperty('twitter:description', metadata.description);

        // Actualizar canonical URL
        if (metadata.canonical) {
            this.updateCanonicalUrl(metadata.canonical);
        }
    }

    /**
     * Actualiza una meta tag específica
     */
    private updateMetaTag(name: string, content: string): void {
        let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;

        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }

        meta.content = content;
    }

    /**
     * Actualiza una meta property específica
     */
    private updateMetaProperty(property: string, content: string): void {
        let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;

        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }

        meta.content = content;
    }

    /**
     * Actualiza la URL canónica
     */
    private updateCanonicalUrl(url: string): void {
        let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

        if (!link) {
            link = document.createElement('link');
            link.rel = 'canonical';
            document.head.appendChild(link);
        }

        link.href = url;
    }

    /**
     * Genera datos estructurados JSON-LD para el juego
     */
    public generateGameStructuredData(): void {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Haikyu Flight High Team Builder",
            "description": "Interactive team builder for Haikyu!! volleyball positions inspired by the anime/manga",
            "applicationCategory": "Game",
            "operatingSystem": "Web Browser",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "author": {
                "@type": "Person",
                "name": "Angelo"
            },
            "genre": ["Sports", "Volleyball", "Anime", "Strategy"],
            "keywords": "haikyu, volleyball, team builder, anime, manga, sports game, interactive",
            "screenshot": "./assets/images/screenshot.png",
            "softwareVersion": "2.0.0",
            "dateModified": new Date().toISOString(),
            "inLanguage": "es-ES",
            "isBasedOn": {
                "@type": "CreativeWork",
                "name": "Haikyu!!",
                "author": "Haruichi Furudate"
            }
        };

        // Crear o actualizar el script JSON-LD
        let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;

        if (!script) {
            script = document.createElement('script');
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }

        script.textContent = JSON.stringify(structuredData, null, 2);
    }

    /**
     * Optimiza las imágenes para SEO
     */
    public optimizeImages(): void {
        const images = document.querySelectorAll('img');

        images.forEach((img) => {
            // Agregar loading lazy si no existe
            if (!img.getAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // Asegurar que todas las imágenes tengan alt text
            if (!img.alt || img.alt.trim() === '') {
                const src = img.src;
                if (src.includes('characters/')) {
                    // Extraer nombre del archivo para generar alt text
                    const filename = src.split('/').pop() || '';
                    const name = filename.replace(/^\d+_/, '').replace(/\.(png|jpg|jpeg)$/i, '').replace(/_/g, ' ');
                    img.alt = `${name} - Haikyu character`;
                } else {
                    img.alt = 'Haikyu Flight High Team Builder';
                }
            }
        });
    }

    /**
     * Genera un sitemap simple para el proyecto
     */
    public generateSitemap(): string {
        const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '');

        const urls = [
            {
                loc: baseUrl + '/',
                lastmod: new Date().toISOString().split('T')[0],
                changefreq: 'weekly',
                priority: '1.0'
            }
        ];

        let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
        sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        urls.forEach(url => {
            sitemap += '  <url>\n';
            sitemap += `    <loc>${url.loc}</loc>\n`;
            sitemap += `    <lastmod>${url.lastmod}</lastmod>\n`;
            sitemap += `    <changefreq>${url.changefreq}</changefreq>\n`;
            sitemap += `    <priority>${url.priority}</priority>\n`;
            sitemap += '  </url>\n';
        });

        sitemap += '</urlset>';

        return sitemap;
    }

    /**
     * Analiza el rendimiento de carga de imágenes
     */
    public analyzeImagePerformance(): Promise<{
        totalImages: number;
        localImages: number;
        externalImages: number;
        averageLoadTime: number;
        slowImages: string[];
    }> {
        return new Promise((resolve) => {
            const images = document.querySelectorAll('img');
            let loadedCount = 0;
            let totalLoadTime = 0;
            const slowImages: string[] = [];
            const localImages: string[] = [];
            const externalImages: string[] = [];

            images.forEach((img) => {
                const startTime = performance.now();

                // Clasificar imágenes
                if (img.src.startsWith('./assets/') || img.src.includes('/assets/')) {
                    localImages.push(img.src);
                } else if (img.src.startsWith('http')) {
                    externalImages.push(img.src);
                }

                const handleLoad = () => {
                    const loadTime = performance.now() - startTime;
                    totalLoadTime += loadTime;
                    loadedCount++;

                    // Marcar imágenes que tardan más de 500ms
                    if (loadTime > 500) {
                        slowImages.push(img.src);
                    }

                    if (loadedCount === images.length) {
                        resolve({
                            totalImages: images.length,
                            localImages: localImages.length,
                            externalImages: externalImages.length,
                            averageLoadTime: totalLoadTime / images.length,
                            slowImages
                        });
                    }
                };

                if (img.complete) {
                    handleLoad();
                } else {
                    img.addEventListener('load', handleLoad);
                    img.addEventListener('error', handleLoad);
                }
            });

            // Si no hay imágenes, resolver inmediatamente
            if (images.length === 0) {
                resolve({
                    totalImages: 0,
                    localImages: 0,
                    externalImages: 0,
                    averageLoadTime: 0,
                    slowImages: []
                });
            }
        });
    }
}
