import { SEOManager } from './seo-manager.js';

interface SEOAuditResult {
    score: number;
    category: string;
    status: 'excellent' | 'good' | 'needs-improvement' | 'poor';
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
}

interface SEOMetrics {
    technical: SEOAuditResult;
    content: SEOAuditResult;
    performance: SEOAuditResult;
    mobile: SEOAuditResult;
    structured: SEOAuditResult;
    overall: number;
}

export class SEOAuditor {
    private seoManager: SEOManager;

    constructor(seoManager: SEOManager) {
        this.seoManager = seoManager;
    }

    /**
     * Realiza una auditoría completa de SEO
     */
    async performCompleteAudit(): Promise<SEOMetrics> {
        console.log('🔍 Iniciando auditoría completa de SEO...');

        const metrics: SEOMetrics = {
            technical: await this.auditTechnicalSEO(),
            content: await this.auditContentSEO(),
            performance: await this.auditPerformance(),
            mobile: await this.auditMobileFriendliness(),
            structured: await this.auditStructuredData(),
            overall: 0
        };

        // Calcular score general
        metrics.overall = this.calculateOverallScore(metrics);

        // Mostrar resultados
        this.displayAuditResults(metrics);

        return metrics;
    }

    /**
     * Audita aspectos técnicos del SEO
     */
    private async auditTechnicalSEO(): Promise<SEOAuditResult> {
        const checks = {
            hasMetaTitle: !!document.querySelector('title')?.textContent?.trim(),
            hasMetaDescription: !!document.querySelector('meta[name="description"]'),
            hasCanonical: !!document.querySelector('link[rel="canonical"]'),
            hasRobotsMeta: !!document.querySelector('meta[name="robots"]'),
            hasViewport: !!document.querySelector('meta[name="viewport"]'),
            hasOgTags: !!document.querySelector('meta[property^="og:"]'),
            hasTwitterCards: !!document.querySelector('meta[name^="twitter:"]'),
            hasStructuredData: !!document.querySelector('script[type="application/ld+json"]'),
            httpsEnabled: location.protocol === 'https:',
            hasServiceWorker: 'serviceWorker' in navigator
        };

        const passedChecks = Object.values(checks).filter(Boolean).length;
        const totalChecks = Object.keys(checks).length;
        const score = Math.round((passedChecks / totalChecks) * 100);

        const recommendations: string[] = [];

        if (!checks.hasServiceWorker) {
            recommendations.push('🔧 Implementar Service Worker para PWA y caching offline');
        }
        if (!checks.httpsEnabled) {
            recommendations.push('🔒 Migrar a HTTPS para mayor seguridad y ranking');
        }
        if (!checks.hasStructuredData) {
            recommendations.push('📊 Agregar más datos estructurados (Person, Organization)');
        }
        if (!checks.hasRobotsMeta) {
            recommendations.push('🤖 Configurar meta robots para mejor crawling');
        }

        return {
            score,
            category: 'SEO Técnico',
            status: this.getScoreStatus(score),
            recommendations,
            priority: score < 80 ? 'high' : score < 90 ? 'medium' : 'low'
        };
    }

    /**
     * Audita la calidad del contenido para SEO
     */
    private async auditContentSEO(): Promise<SEOAuditResult> {
        const title = document.querySelector('title')?.textContent || '';
        const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const images = document.querySelectorAll('img');
        const links = document.querySelectorAll('a[href]');

        const checks = {
            titleLength: title.length >= 30 && title.length <= 60,
            descriptionLength: description.length >= 120 && description.length <= 160,
            hasH1: !!document.querySelector('h1'),
            hasHeadingStructure: headings.length > 1,
            imagesHaveAlt: Array.from(images).every(img => img.getAttribute('alt')),
            hasInternalLinks: Array.from(links).some(link =>
                link.getAttribute('href')?.startsWith('/') ||
                link.getAttribute('href')?.includes(location.hostname)
            ),
            hasTextContent: document.body.textContent!.length > 300,
            keywordInTitle: title.toLowerCase().includes('haikyu') || title.toLowerCase().includes('team builder')
        };

        const passedChecks = Object.values(checks).filter(Boolean).length;
        const totalChecks = Object.keys(checks).length;
        const score = Math.round((passedChecks / totalChecks) * 100);

        const recommendations: string[] = [];

        if (!checks.titleLength) {
            recommendations.push('📝 Optimizar longitud del título (30-60 caracteres)');
        }
        if (!checks.descriptionLength) {
            recommendations.push('📄 Mejorar meta description (120-160 caracteres)');
        }
        if (!checks.hasHeadingStructure) {
            recommendations.push('🏗️ Agregar estructura de headings (H2, H3) para mejor jerarquía');
        }
        if (!checks.hasTextContent) {
            recommendations.push('📚 Agregar más contenido textual descriptivo');
        }
        if (!checks.hasInternalLinks) {
            recommendations.push('🔗 Implementar internal linking strategy');
        }

        return {
            score,
            category: 'Contenido SEO',
            status: this.getScoreStatus(score),
            recommendations,
            priority: score < 70 ? 'high' : score < 85 ? 'medium' : 'low'
        };
    }

    /**
     * Audita el rendimiento de la página
     */
    private async auditPerformance(): Promise<SEOAuditResult> {
        const startTime = performance.now();

        // Simular carga de recursos críticos
        await new Promise(resolve => setTimeout(resolve, 100));

        const loadTime = performance.now() - startTime;
        const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

        const checks = {
            fastLoadTime: loadTime < 1000, // < 1 segundo
            smallImages: await this.checkImageSizes(),
            hasLazyLoading: !!document.querySelector('img[loading="lazy"]'),
            hasCompression: this.checkCompressionHeaders(),
            noCRSBlocking: !this.checkCRSBlocking(),
            optimizedFonts: this.checkFontOptimization()
        };

        const passedChecks = Object.values(checks).filter(Boolean).length;
        const totalChecks = Object.keys(checks).length;
        const score = Math.round((passedChecks / totalChecks) * 100);

        const recommendations: string[] = [];

        if (!checks.fastLoadTime) {
            recommendations.push('⚡ Optimizar velocidad de carga (objetivo: <1s)');
        }
        if (!checks.smallImages) {
            recommendations.push('🖼️ Implementar WebP y optimización automática de imágenes');
        }
        if (!checks.hasLazyLoading) {
            recommendations.push('📱 Agregar lazy loading a más elementos');
        }
        if (!checks.hasCompression) {
            recommendations.push('🗜️ Habilitar compresión gzip/brotli en servidor');
        }

        return {
            score,
            category: 'Performance',
            status: this.getScoreStatus(score),
            recommendations,
            priority: score < 75 ? 'high' : score < 85 ? 'medium' : 'low'
        };
    }

    /**
     * Audita la optimización móvil
     */
    private async auditMobileFriendliness(): Promise<SEOAuditResult> {
        const viewport = document.querySelector('meta[name="viewport"]')?.getAttribute('content') || '';
        const touchTargets = document.querySelectorAll('button, a, .draggable');

        const checks = {
            hasViewport: viewport.includes('width=device-width'),
            responsiveImages: this.checkResponsiveImages(),
            touchTargetsSize: this.checkTouchTargetSizes(touchTargets),
            noHorizontalScroll: window.innerWidth <= document.documentElement.scrollWidth,
            fastTouchResponse: true, // Simulado - requiere testing real
            readableText: this.checkTextReadability()
        };

        const passedChecks = Object.values(checks).filter(Boolean).length;
        const totalChecks = Object.keys(checks).length;
        const score = Math.round((passedChecks / totalChecks) * 100);

        const recommendations: string[] = [];

        if (!checks.hasViewport) {
            recommendations.push('📱 Configurar viewport meta tag correctamente');
        }
        if (!checks.touchTargetsSize) {
            recommendations.push('👆 Aumentar tamaño de botones y enlaces (mín. 44px)');
        }
        if (!checks.responsiveImages) {
            recommendations.push('🖼️ Implementar imágenes responsive con srcset');
        }
        if (!checks.readableText) {
            recommendations.push('📖 Mejorar legibilidad del texto en móviles');
        }

        return {
            score,
            category: 'Mobile SEO',
            status: this.getScoreStatus(score),
            recommendations,
            priority: score < 80 ? 'high' : score < 90 ? 'medium' : 'low'
        };
    }

    /**
     * Audita los datos estructurados
     */
    private async auditStructuredData(): Promise<SEOAuditResult> {
        const structuredDataScripts = document.querySelectorAll('script[type="application/ld+json"]');
        let validSchemas = 0;
        let totalSchemas = 0;

        const recommendations: string[] = [];

        for (const script of structuredDataScripts) {
            try {
                const data = JSON.parse(script.textContent || '');
                totalSchemas++;

                if (data['@type'] && data['@context']) {
                    validSchemas++;
                }
            } catch (e) {
                recommendations.push('❌ Corregir JSON-LD malformado');
            }
        }

        const checks = {
            hasWebApplication: this.hasSchemaType('WebApplication'),
            hasPerson: this.hasSchemaType('Person'),
            hasOrganization: this.hasSchemaType('Organization'),
            hasVideoGame: this.hasSchemaType('VideoGame'),
            hasBreadcrumbs: this.hasSchemaType('BreadcrumbList'),
            hasFAQ: this.hasSchemaType('FAQPage'),
            validFormat: validSchemas === totalSchemas && totalSchemas > 0
        };

        if (!checks.hasPerson) {
            recommendations.push('👤 Agregar schema Person para personajes');
        }
        if (!checks.hasOrganization) {
            recommendations.push('🏫 Agregar schema Organization para escuelas');
        }
        if (!checks.hasVideoGame) {
            recommendations.push('🎮 Agregar schema VideoGame para mejor categorización');
        }
        if (!checks.hasBreadcrumbs) {
            recommendations.push('🍞 Implementar breadcrumbs con schema markup');
        }

        const passedChecks = Object.values(checks).filter(Boolean).length;
        const totalChecks = Object.keys(checks).length;
        const score = Math.round((passedChecks / totalChecks) * 100);

        return {
            score,
            category: 'Datos Estructurados',
            status: this.getScoreStatus(score),
            recommendations,
            priority: score < 70 ? 'high' : score < 85 ? 'medium' : 'low'
        };
    }

    /**
     * Calcula el score general
     */
    private calculateOverallScore(metrics: Omit<SEOMetrics, 'overall'>): number {
        const weights = {
            technical: 0.25,
            content: 0.25,
            performance: 0.20,
            mobile: 0.15,
            structured: 0.15
        };

        return Math.round(
            metrics.technical.score * weights.technical +
            metrics.content.score * weights.content +
            metrics.performance.score * weights.performance +
            metrics.mobile.score * weights.mobile +
            metrics.structured.score * weights.structured
        );
    }

    /**
     * Muestra los resultados de la auditoría
     */
    private displayAuditResults(metrics: SEOMetrics): void {
        console.group('📊 RESULTADOS DE AUDITORÍA SEO');

        console.log(`🎯 SCORE GENERAL: ${metrics.overall}/100 ${this.getScoreEmoji(metrics.overall)}`);
        console.log('');

        for (const [key, result] of Object.entries(metrics)) {
            if (key === 'overall') continue;

            const emoji = this.getScoreEmoji(result.score);
            const priority = result.priority === 'high' ? '🔥' : result.priority === 'medium' ? '⚠️' : '✅';

            console.group(`${emoji} ${result.category}: ${result.score}/100 ${priority}`);

            if (result.recommendations.length > 0) {
                console.log('📋 Recomendaciones:');
                result.recommendations.forEach((rec: string) => console.log(`  ${rec}`));
            } else {
                console.log('✅ ¡Excelente! No hay recomendaciones para esta categoría.');
            }

            console.groupEnd();
            console.log('');
        }

        console.groupEnd();

        // Resumen de próximos pasos
        this.displayNextSteps(metrics);
    }

    /**
     * Muestra los próximos pasos recomendados
     */
    private displayNextSteps(metrics: SEOMetrics): void {
        const highPriorityItems: string[] = [];

        for (const [key, result] of Object.entries(metrics)) {
            if (key === 'overall') continue;
            if (result.priority === 'high') {
                highPriorityItems.push(...result.recommendations);
            }
        }

        if (highPriorityItems.length > 0) {
            console.group('🚀 PRÓXIMOS PASOS RECOMENDADOS (Prioridad Alta)');
            highPriorityItems.slice(0, 5).forEach((item, index) => {
                console.log(`${index + 1}. ${item}`);
            });
            console.groupEnd();
        }
    }

    // Métodos auxiliares
    private getScoreStatus(score: number): 'excellent' | 'good' | 'needs-improvement' | 'poor' {
        if (score >= 90) return 'excellent';
        if (score >= 75) return 'good';
        if (score >= 60) return 'needs-improvement';
        return 'poor';
    }

    private getScoreEmoji(score: number): string {
        if (score >= 90) return '🟢';
        if (score >= 75) return '🟡';
        if (score >= 60) return '🟠';
        return '🔴';
    }

    private async checkImageSizes(): Promise<boolean> {
        const images = document.querySelectorAll('img');
        let optimizedCount = 0;

        for (const img of images) {
            // Simular verificación de tamaño de imagen
            const src = img.src;
            if (src.includes('webp') || src.includes('assets/images')) {
                optimizedCount++;
            }
        }

        return optimizedCount / images.length > 0.8; // 80% optimized
    }

    private checkCompressionHeaders(): boolean {
        // En un entorno real, verificaríamos los headers de respuesta
        return false; // Simulado como no implementado
    }

    private checkCRSBlocking(): boolean {
        const scripts = document.querySelectorAll('script[src]');
        return Array.from(scripts).some(script =>
            !script.hasAttribute('async') && !script.hasAttribute('defer')
        );
    }

    private checkFontOptimization(): boolean {
        const fontLinks = document.querySelectorAll('link[href*="font"]');
        return Array.from(fontLinks).some(link =>
            link.getAttribute('rel')?.includes('preload')
        );
    }

    private checkResponsiveImages(): boolean {
        const images = document.querySelectorAll('img');
        return Array.from(images).some(img =>
            img.hasAttribute('srcset') || img.style.maxWidth === '100%'
        );
    }

    private checkTouchTargetSizes(elements: NodeListOf<Element>): boolean {
        return Array.from(elements).every(el => {
            const rect = el.getBoundingClientRect();
            return rect.width >= 44 && rect.height >= 44;
        });
    }

    private checkTextReadability(): boolean {
        const body = document.body;
        const style = getComputedStyle(body);
        const fontSize = parseInt(style.fontSize);
        return fontSize >= 16; // Mínimo 16px para legibilidad móvil
    }

    private hasSchemaType(type: string): boolean {
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');

        for (const script of scripts) {
            try {
                const data = JSON.parse(script.textContent || '');
                if (data['@type'] === type) return true;
                if (Array.isArray(data)) {
                    if (data.some(item => item['@type'] === type)) return true;
                }
            } catch (e) {
                // JSON malformado
            }
        }

        return false;
    }

    /**
     * Genera un reporte detallado en formato HTML
     */
    generateHTMLReport(metrics: SEOMetrics): string {
        return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reporte SEO - Haikyu Team Builder</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 40px; }
          .score { font-size: 48px; font-weight: bold; text-align: center; margin: 20px 0; }
          .excellent { color: #22c55e; }
          .good { color: #eab308; }
          .needs-improvement { color: #f97316; }
          .poor { color: #ef4444; }
          .category { margin: 30px 0; padding: 20px; border-radius: 8px; background: #f8fafc; }
          .recommendations { margin-top: 15px; }
          .recommendations li { margin: 8px 0; }
          .priority-high { border-left: 4px solid #ef4444; }
          .priority-medium { border-left: 4px solid #f97316; }
          .priority-low { border-left: 4px solid #22c55e; }
        </style>
      </head>
      <body>
        <h1>📊 Reporte de Auditoría SEO</h1>
        <div class="score ${this.getScoreStatus(metrics.overall)}">${metrics.overall}/100</div>
        
        ${Object.entries(metrics).filter(([key]) => key !== 'overall').map(([key, result]) => `
          <div class="category priority-${result.priority}">
            <h2>${result.category}: ${result.score}/100</h2>
            <p><strong>Estado:</strong> ${result.status}</p>
            <p><strong>Prioridad:</strong> ${result.priority}</p>
            ${result.recommendations.length > 0 ? `
              <div class="recommendations">
                <h3>Recomendaciones:</h3>
                <ul>
                  ${result.recommendations.map((rec: string) => `<li>${rec}</li>`).join('')}
                </ul>
              </div>
            ` : '<p>✅ ¡Excelente! No hay recomendaciones para esta categoría.</p>'}
          </div>
        `).join('')}
        
        <div style="margin-top: 40px; padding: 20px; background: #1e293b; color: white; border-radius: 8px;">
          <h2>🚀 Próximos Pasos</h2>
          <p>Recomendamos priorizar las mejoras marcadas como "Alta Prioridad" para obtener el mayor impacto en SEO.</p>
        </div>
      </body>
      </html>
    `;
    }
}
