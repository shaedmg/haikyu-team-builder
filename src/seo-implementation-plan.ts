import { SEOAuditor } from './seo-auditor.js';
import { SEOManager } from './seo-manager.js';

interface SEOImplementationTask {
    id: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    category: 'technical' | 'content' | 'performance' | 'mobile' | 'structured';
    estimatedTime: string; // e.g., "1 hour", "3 days"
    dependencies: string[]; // IDs of tasks that must be completed first
    implementation: () => Promise<boolean>;
    verification: () => Promise<boolean>;
}

export class SEOImplementationPlan {
    private seoManager: SEOManager;
    private auditor: SEOAuditor;
    private tasks: Map<string, SEOImplementationTask> = new Map();

    constructor(seoManager: SEOManager) {
        this.seoManager = seoManager;
        this.auditor = new SEOAuditor(seoManager);
        this.initializeTasks();
    }

    /**
     * Inicializa todas las tareas de implementación disponibles
     */
    private initializeTasks(): void {
        const tasks: SEOImplementationTask[] = [
            {
                id: 'pwa-setup',
                title: 'Configurar Progressive Web App (PWA)',
                description: 'Implementar Service Worker y Web App Manifest para funcionalidad offline y mejor UX',
                priority: 'high',
                category: 'technical',
                estimatedTime: '4-6 horas',
                dependencies: [],
                implementation: this.implementPWA.bind(this),
                verification: this.verifyPWA.bind(this)
            },
            {
                id: 'robots-sitemap',
                title: 'Crear robots.txt y sitemap.xml',
                description: 'Configurar archivos para mejorar el crawling de motores de búsqueda',
                priority: 'high',
                category: 'technical',
                estimatedTime: '1-2 horas',
                dependencies: [],
                implementation: this.implementRobotsSitemap.bind(this),
                verification: this.verifyRobotsSitemap.bind(this)
            },
            {
                id: 'webp-conversion',
                title: 'Conversión automática a WebP',
                description: 'Convertir imágenes PNG/JPG a formato WebP para mejor compresión',
                priority: 'high',
                category: 'performance',
                estimatedTime: '2-3 horas',
                dependencies: [],
                implementation: this.implementWebPConversion.bind(this),
                verification: this.verifyWebPConversion.bind(this)
            },
            {
                id: 'advanced-schemas',
                title: 'Datos estructurados avanzados',
                description: 'Implementar schemas Person, Organization, VideoGame y FAQ',
                priority: 'high',
                category: 'structured',
                estimatedTime: '3-4 horas',
                dependencies: [],
                implementation: this.implementAdvancedSchemas.bind(this),
                verification: this.verifyAdvancedSchemas.bind(this)
            },
            {
                id: 'content-pages',
                title: 'Páginas de contenido adicionales',
                description: 'Crear páginas About, Characters, Schools, FAQ para mejor indexación',
                priority: 'medium',
                category: 'content',
                estimatedTime: '1-2 días',
                dependencies: ['advanced-schemas'],
                implementation: this.implementContentPages.bind(this),
                verification: this.verifyContentPages.bind(this)
            },
            {
                id: 'analytics-setup',
                title: 'Google Analytics y Search Console',
                description: 'Configurar monitoreo y analytics para tracking de SEO',
                priority: 'medium',
                category: 'technical',
                estimatedTime: '2-3 horas',
                dependencies: [],
                implementation: this.implementAnalytics.bind(this),
                verification: this.verifyAnalytics.bind(this)
            },
            {
                id: 'mobile-optimization',
                title: 'Optimización móvil avanzada',
                description: 'Mejorar touch targets, responsive images y UX móvil',
                priority: 'medium',
                category: 'mobile',
                estimatedTime: '4-5 horas',
                dependencies: ['webp-conversion'],
                implementation: this.implementMobileOptimization.bind(this),
                verification: this.verifyMobileOptimization.bind(this)
            },
            {
                id: 'internationalization',
                title: 'Internacionalización (i18n)',
                description: 'Agregar soporte multi-idioma con hreflang tags',
                priority: 'low',
                category: 'content',
                estimatedTime: '1-2 semanas',
                dependencies: ['content-pages'],
                implementation: this.implementInternationalization.bind(this),
                verification: this.verifyInternationalization.bind(this)
            }
        ];

        tasks.forEach(task => this.tasks.set(task.id, task));
    }

    /**
     * Genera un plan de implementación personalizado basado en la auditoría
     */
    async generateCustomPlan(): Promise<SEOImplementationTask[]> {
        console.log('🔍 Analizando estado actual para generar plan personalizado...');

        const auditResults = await this.auditor.performCompleteAudit();
        const recommendedTasks: SEOImplementationTask[] = [];

        // Priorizar tareas basadas en resultados de auditoría
        for (const [taskId, task] of this.tasks) {
            const shouldInclude = this.shouldIncludeTask(task, auditResults);

            if (shouldInclude) {
                recommendedTasks.push(task);
            }
        }

        // Ordenar por prioridad y dependencias
        return this.sortTasksByPriorityAndDependencies(recommendedTasks);
    }

    /**
     * Ejecuta el plan de implementación completo
     */
    async executePlan(tasks: SEOImplementationTask[]): Promise<void> {
        console.log('🚀 Iniciando implementación del plan SEO...');

        const completedTasks: string[] = [];

        for (const task of tasks) {
            // Verificar dependencias
            const dependenciesMet = task.dependencies.every(dep => completedTasks.includes(dep));

            if (!dependenciesMet) {
                console.warn(`⚠️ Saltando tarea ${task.title} - dependencias no cumplidas`);
                continue;
            }

            console.log(`🔧 Implementando: ${task.title}`);
            console.log(`   Estimado: ${task.estimatedTime}`);

            try {
                const success = await task.implementation();

                if (success) {
                    const verified = await task.verification();

                    if (verified) {
                        console.log(`✅ ${task.title} - Completado y verificado`);
                        completedTasks.push(task.id);
                    } else {
                        console.error(`❌ ${task.title} - Implementado pero falló verificación`);
                    }
                } else {
                    console.error(`❌ ${task.title} - Falló implementación`);
                }
            } catch (error) {
                console.error(`💥 Error en ${task.title}:`, error);
            }

            console.log('---');
        }

        console.log(`🎉 Plan completado! ${completedTasks.length}/${tasks.length} tareas exitosas`);
    }

    // Implementaciones específicas de cada tarea

    private async implementPWA(): Promise<boolean> {
        try {
            // Crear Service Worker
            const swContent = this.generateServiceWorkerContent();
            await this.createFile('sw.js', swContent);

            // Crear Web App Manifest
            const manifestContent = this.generateWebAppManifest();
            await this.createFile('manifest.json', manifestContent);

            // Agregar enlaces al HTML
            await this.addManifestLinkToHTML();
            await this.registerServiceWorker();

            return true;
        } catch (error) {
            console.error('Error implementando PWA:', error);
            return false;
        }
    }

    private async implementRobotsSitemap(): Promise<boolean> {
        try {
            // Crear robots.txt
            const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${window.location.origin}/sitemap.xml

# Crawl-delay para ser amigable con los servidores
Crawl-delay: 1

# Bloquear archivos innecesarios
Disallow: /node_modules/
Disallow: /src/
Disallow: /*.json
Disallow: /package*.json`;

            await this.createFile('robots.txt', robotsContent);

            // Crear sitemap.xml
            const sitemapContent = this.generateSitemap();
            await this.createFile('sitemap.xml', sitemapContent);

            return true;
        } catch (error) {
            console.error('Error creando robots.txt y sitemap:', error);
            return false;
        }
    }

    private async implementWebPConversion(): Promise<boolean> {
        try {
            // Crear script de conversión
            const conversionScript = `
        // Script para convertir imágenes a WebP automáticamente
        class WebPConverter {
          static async convertImage(imagePath) {
            // En un entorno real, esto correría en el servidor
            console.log('Convirtiendo a WebP:', imagePath);
            return imagePath.replace(/\\.(png|jpg|jpeg)$/i, '.webp');
          }
          
          static async optimizeAllImages() {
            const images = document.querySelectorAll('img[src*=".png"], img[src*=".jpg"]');
            for (const img of images) {
              const webpSrc = await this.convertImage(img.src);
              // Implementar fallback con <picture> element
              this.addWebPSupport(img, webpSrc);
            }
          }
          
          static addWebPSupport(img, webpSrc) {
            const picture = document.createElement('picture');
            const webpSource = document.createElement('source');
            webpSource.srcset = webpSrc;
            webpSource.type = 'image/webp';
            
            picture.appendChild(webpSource);
            img.parentNode.insertBefore(picture, img);
            picture.appendChild(img);
          }
        }
        
        // Auto-ejecutar al cargar
        document.addEventListener('DOMContentLoaded', () => {
          WebPConverter.optimizeAllImages();
        });
      `;

            await this.createFile('src/webp-converter.js', conversionScript);
            return true;
        } catch (error) {
            console.error('Error implementando conversión WebP:', error);
            return false;
        }
    }

    private async implementAdvancedSchemas(): Promise<boolean> {
        try {
            // Extender SEOManager con nuevos schemas
            const advancedSchemas = {
                VideoGame: {
                    "@context": "https://schema.org",
                    "@type": "VideoGame",
                    "name": "Haikyu Team Builder",
                    "description": "Construye tu equipo ideal de voleibol basado en el anime Haikyu",
                    "genre": ["Sports", "Simulation", "Anime"],
                    "gamePlatform": "Web Browser",
                    "applicationCategory": "GameApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD"
                    }
                },

                Organization: {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Karasuno High School Volleyball Club",
                    "description": "Famous volleyball team from Haikyu anime series",
                    "sport": "Volleyball",
                    "location": {
                        "@type": "Place",
                        "name": "Miyagi Prefecture, Japan"
                    }
                }
            };

            // Agregar a la página
            for (const [schemaType, schemaData] of Object.entries(advancedSchemas)) {
                const script = document.createElement('script');
                script.type = 'application/ld+json';
                script.textContent = JSON.stringify(schemaData);
                document.head.appendChild(script);
            }

            return true;
        } catch (error) {
            console.error('Error implementando schemas avanzados:', error);
            return false;
        }
    }

    private async implementContentPages(): Promise<boolean> {
        try {
            // Crear estructura de páginas
            const pages = [
                {
                    filename: 'about.html',
                    title: 'Sobre Haikyu Team Builder',
                    content: this.generateAboutPageContent()
                },
                {
                    filename: 'characters.html',
                    title: 'Guía de Personajes de Haikyu',
                    content: this.generateCharactersPageContent()
                },
                {
                    filename: 'schools.html',
                    title: 'Escuelas y Equipos de Haikyu',
                    content: this.generateSchoolsPageContent()
                },
                {
                    filename: 'faq.html',
                    title: 'Preguntas Frecuentes',
                    content: this.generateFAQPageContent()
                }
            ];

            for (const page of pages) {
                await this.createFile(page.filename, page.content);
            }

            return true;
        } catch (error) {
            console.error('Error creando páginas de contenido:', error);
            return false;
        }
    }

    private async implementAnalytics(): Promise<boolean> {
        try {
            // Google Analytics 4 setup
            const analyticsScript = `
        <!-- Google Analytics 4 -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
          
          // Custom events para team builder
          gtag('event', 'team_created', {
            'custom_parameter': 'team_builder'
          });
        </script>
      `;

            // Search Console verification
            const searchConsoleScript = `
        <meta name="google-site-verification" content="GOOGLE_VERIFICATION_CODE" />
      `;

            // Agregar al HTML
            document.head.insertAdjacentHTML('beforeend', analyticsScript);
            document.head.insertAdjacentHTML('beforeend', searchConsoleScript);

            return true;
        } catch (error) {
            console.error('Error configurando analytics:', error);
            return false;
        }
    }

    private async implementMobileOptimization(): Promise<boolean> {
        try {
            // CSS para optimización móvil
            const mobileCSS = `
        /* Touch targets optimization */
        button, .draggable, a {
          min-height: 44px;
          min-width: 44px;
          padding: 12px;
        }
        
        /* Responsive images */
        img {
          max-width: 100%;
          height: auto;
        }
        
        /* Mobile-first typography */
        body {
          font-size: 16px;
          line-height: 1.5;
        }
        
        /* Improved mobile navigation */
        @media (max-width: 768px) {
          .team-builder {
            padding: 10px;
          }
          
          .player-card {
            margin: 5px;
          }
        }
      `;

            await this.createFile('src/mobile-optimization.css', mobileCSS);

            // Agregar link al CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'src/mobile-optimization.css';
            document.head.appendChild(link);

            return true;
        } catch (error) {
            console.error('Error implementando optimización móvil:', error);
            return false;
        }
    }

    private async implementInternationalization(): Promise<boolean> {
        try {
            // Crear estructura i18n básica
            const translations = {
                en: {
                    title: "Haikyu Team Builder",
                    description: "Build your ideal volleyball team based on Haikyu anime",
                    // ... más traducciones
                },
                ja: {
                    title: "ハイキュー チームビルダー",
                    description: "ハイキューアニメに基づいて理想のバレーボールチームを作ろう",
                    // ... más traducciones
                }
            };

            await this.createFile('src/translations.json', JSON.stringify(translations, null, 2));

            // Agregar hreflang tags
            const hreflangTags = `
        <link rel="alternate" hreflang="es" href="${window.location.origin}/" />
        <link rel="alternate" hreflang="en" href="${window.location.origin}/en/" />
        <link rel="alternate" hreflang="ja" href="${window.location.origin}/ja/" />
        <link rel="alternate" hreflang="x-default" href="${window.location.origin}/" />
      `;

            document.head.insertAdjacentHTML('beforeend', hreflangTags);

            return true;
        } catch (error) {
            console.error('Error implementando internacionalización:', error);
            return false;
        }
    }

    // Métodos de verificación
    private async verifyPWA(): Promise<boolean> {
        return !!(document.querySelector('link[rel="manifest"]') && 'serviceWorker' in navigator);
    }

    private async verifyRobotsSitemap(): Promise<boolean> {
        try {
            const robotsResponse = await fetch('/robots.txt');
            const sitemapResponse = await fetch('/sitemap.xml');
            return robotsResponse.ok && sitemapResponse.ok;
        } catch {
            return false;
        }
    }

    private async verifyWebPConversion(): Promise<boolean> {
        return document.querySelectorAll('picture source[type="image/webp"]').length > 0;
    }

    private async verifyAdvancedSchemas(): Promise<boolean> {
        const schemas = document.querySelectorAll('script[type="application/ld+json"]');
        return schemas.length >= 3; // Al menos 3 diferentes tipos de schema
    }

    private async verifyContentPages(): Promise<boolean> {
        const pages = ['about.html', 'characters.html', 'schools.html', 'faq.html'];
        const checks = await Promise.all(
            pages.map(async page => {
                try {
                    const response = await fetch(page);
                    return response.ok;
                } catch {
                    return false;
                }
            })
        );
        return checks.every(Boolean);
    }

    private async verifyAnalytics(): Promise<boolean> {
        return !!((window as any).gtag || (window as any).ga);
    }

    private async verifyMobileOptimization(): Promise<boolean> {
        const touchTargets = document.querySelectorAll('button, .draggable, a');
        return Array.from(touchTargets).every(el => {
            const rect = el.getBoundingClientRect();
            return rect.width >= 44 && rect.height >= 44;
        });
    }

    private async verifyInternationalization(): Promise<boolean> {
        return !!document.querySelector('link[rel="alternate"][hreflang]');
    }

    // Métodos auxiliares
    private shouldIncludeTask(task: SEOImplementationTask, auditResults: any): boolean {
        // Lógica personalizada para decidir qué tareas incluir
        if (task.priority === 'high') return true;

        // Incluir tareas medium si el score es bajo en esa categoría
        if (task.priority === 'medium') {
            const categoryScore = auditResults[task.category]?.score || 0;
            return categoryScore < 85;
        }

        // Incluir tareas low solo si todo lo demás está bien
        if (task.priority === 'low') {
            return auditResults.overall > 90;
        }

        return false;
    }

    private sortTasksByPriorityAndDependencies(tasks: SEOImplementationTask[]): SEOImplementationTask[] {
        const priorityOrder = { high: 3, medium: 2, low: 1 };

        return tasks.sort((a, b) => {
            // Primero por prioridad
            const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
            if (priorityDiff !== 0) return priorityDiff;

            // Luego por dependencias (menos dependencias primero)
            return a.dependencies.length - b.dependencies.length;
        });
    }

    private async createFile(filename: string, content: string): Promise<void> {
        // En un entorno real, esto escribiría archivos al sistema
        console.log(`📝 Creando archivo: ${filename}`);

        // Simular creación de archivo
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        // En desarrollo, podríamos usar esto para descargar
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        // a.click(); // Descomenta para auto-descargar
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Generadores de contenido específico
    private generateServiceWorkerContent(): string {
        return `
const CACHE_NAME = 'haikyu-team-builder-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/src/script.js',
  '/assets/images/characters/',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
    `;
    }

    private generateWebAppManifest(): string {
        return JSON.stringify({
            name: "Haikyu Team Builder",
            short_name: "HaikyuTB",
            description: "Construye tu equipo ideal de voleibol basado en Haikyu",
            start_url: "/",
            display: "standalone",
            background_color: "#ffffff",
            theme_color: "#ff6b35",
            icons: [
                {
                    src: "assets/images/icon-192.png",
                    sizes: "192x192",
                    type: "image/png"
                },
                {
                    src: "assets/images/icon-512.png",
                    sizes: "512x512",
                    type: "image/png"
                }
            ]
        }, null, 2);
    }

    private generateSitemap(): string {
        const pages = [
            { url: '/', priority: '1.0', changefreq: 'weekly' },
            { url: '/about.html', priority: '0.8', changefreq: 'monthly' },
            { url: '/characters.html', priority: '0.9', changefreq: 'monthly' },
            { url: '/schools.html', priority: '0.8', changefreq: 'monthly' },
            { url: '/faq.html', priority: '0.7', changefreq: 'monthly' }
        ];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${window.location.origin}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

        return sitemap;
    }

    private generateAboutPageContent(): string {
        return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sobre Haikyu Team Builder - La mejor herramienta para fans de Haikyu</title>
  <meta name="description" content="Conoce más sobre Haikyu Team Builder, la aplicación web que te permite crear equipos de voleibol basados en el popular anime Haikyu!!">
</head>
<body>
  <h1>Sobre Haikyu Team Builder</h1>
  <p>Haikyu Team Builder es una aplicación web interactiva que permite a los fans del anime Haikyu!! crear sus equipos ideales de voleibol...</p>
  <!-- Más contenido SEO-optimizado -->
</body>
</html>`;
    }

    private generateCharactersPageContent(): string {
        return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Guía Completa de Personajes de Haikyu - Todos los Jugadores</title>
  <meta name="description" content="Guía completa de todos los personajes de Haikyu!! con estadísticas, habilidades y información detallada de cada jugador de voleibol.">
</head>
<body>
  <h1>Personajes de Haikyu!!</h1>
  <p>Descubre todos los personajes del anime Haikyu!! con información detallada sobre sus habilidades, estadísticas y equipos...</p>
  <!-- Contenido detallado de personajes -->
</body>
</html>`;
    }

    private generateSchoolsPageContent(): string {
        return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Escuelas y Equipos de Haikyu - Guía Completa</title>
  <meta name="description" content="Conoce todas las escuelas secundarias y sus equipos de voleibol en el anime Haikyu!! Karasuno, Nekoma, Aoba Johsai y más.">
</head>
<body>
  <h1>Escuelas y Equipos de Voleibol</h1>
  <p>Explora todas las escuelas secundarias que aparecen en Haikyu!! y conoce sus equipos de voleibol, jugadores estrella y estilos de juego...</p>
  <!-- Contenido de escuelas -->
</body>
</html>`;
    }

    private generateFAQPageContent(): string {
        return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preguntas Frecuentes - Haikyu Team Builder FAQ</title>
  <meta name="description" content="Encuentra respuestas a las preguntas más frecuentes sobre Haikyu Team Builder, cómo crear equipos y usar la aplicación.">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cómo puedo crear un equipo en Haikyu Team Builder?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Para crear un equipo, simplemente arrastra y suelta los personajes desde la lista hacia las posiciones del campo de voleibol."
        }
      }
    ]
  }
  </script>
</head>
<body>
  <h1>Preguntas Frecuentes</h1>
  <div itemscope itemtype="https://schema.org/FAQPage">
    <!-- FAQ content con schema markup -->
  </div>
</body>
</html>`;
    }

    private async addManifestLinkToHTML(): Promise<void> {
        const link = document.createElement('link');
        link.rel = 'manifest';
        link.href = '/manifest.json';
        document.head.appendChild(link);
    }

    private async registerServiceWorker(): Promise<void> {
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registrado exitosamente');
            } catch (error) {
                console.error('Error registrando Service Worker:', error);
            }
        }
    }
}
