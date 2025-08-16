// Image Manager - Gestiona las imágenes locales de personajes
import { Player } from './types.js';

export interface ImageMapping {
    [playerId: string]: {
        original_url: string;
        local_path: string;
        character_name: string;
        variant: string | null;
    };
}

export class ImageManager {
    private static instance: ImageManager;
    private imageMapping: ImageMapping = {};
    private imageMappingLoaded: boolean = false;

    private constructor() { }

    public static getInstance(): ImageManager {
        if (!ImageManager.instance) {
            ImageManager.instance = new ImageManager();
        }
        return ImageManager.instance;
    }

    /**
     * Carga el mapeo de imágenes desde el archivo JSON
     */
    public async loadImageMapping(): Promise<void> {
        if (this.imageMappingLoaded) return;

        try {
            const response = await fetch('./image-mapping.json');
            this.imageMapping = await response.json();
            this.imageMappingLoaded = true;
            console.log('✅ Image mapping loaded successfully');
        } catch (error) {
            console.warn('⚠️ Could not load image mapping, falling back to external URLs:', error);
            this.imageMapping = {};
            this.imageMappingLoaded = true;
        }
    }

    /**
     * Obtiene la URL de imagen local para un jugador
     */
    public getPlayerImageUrl(player: Player): string {
        // Asegurarse de que el mapeo esté cargado
        if (!this.imageMappingLoaded) {
            console.warn('Image mapping not loaded yet, using fallback');
            return this.getFallbackImageUrl(player);
        }

        // Buscar en el mapeo local primero
        const mapping = this.imageMapping[player.id.toString()];
        if (mapping && mapping.local_path) {
            // Verificar si es la variante correcta
            if (mapping.variant === player.variant) {
                return mapping.local_path;
            }
        }

        // Buscar por nombre y variante si no se encuentra por ID exacto
        const alternativeMapping = Object.values(this.imageMapping).find(
            (mapping) =>
                mapping.character_name === player.name &&
                mapping.variant === player.variant
        );

        if (alternativeMapping) {
            return alternativeMapping.local_path;
        }

        // Fallback a la imagen externa o placeholder
        return this.getFallbackImageUrl(player);
    }

    /**
     * Obtiene una URL de imagen de respaldo
     */
    private getFallbackImageUrl(player: Player): string {
        // Si existe profile_image_url, úsala (para compatibilidad con imágenes que no se descargaron)
        if (player.profile_image_url) {
            return player.profile_image_url;
        }

        // Generar placeholder con iniciales
        const initial = player.name.charAt(0).toUpperCase();
        return `https://via.placeholder.com/150x150/667eea/white?text=${initial}`;
    }

    /**
     * Verifica si una imagen local existe
     */
    public async imageExists(imagePath: string): Promise<boolean> {
        try {
            const response = await fetch(imagePath, { method: 'HEAD' });
            return response.ok;
        } catch {
            return false;
        }
    }

    /**
     * Precargar imágenes críticas para mejor rendimiento
     */
    public preloadCriticalImages(players: Player[]): void {
        // Precargar las primeras 20 imágenes para mejorar la experiencia inicial
        const criticalPlayers = players.slice(0, 20);

        criticalPlayers.forEach(player => {
            const imageUrl = this.getPlayerImageUrl(player);
            if (imageUrl.startsWith('./assets/')) {
                const img = new Image();
                img.src = imageUrl;
            }
        });
    }

    /**
     * Obtiene estadísticas de uso de imágenes locales vs externas
     */
    public getImageStats(players: Player[]): {
        total: number;
        local: number;
        external: number;
        missing: number;
    } {
        let local = 0;
        let external = 0;
        let missing = 0;

        players.forEach(player => {
            const imageUrl = this.getPlayerImageUrl(player);

            if (imageUrl.startsWith('./assets/')) {
                local++;
            } else if (imageUrl.startsWith('http')) {
                external++;
            } else {
                missing++;
            }
        });

        return {
            total: players.length,
            local,
            external,
            missing
        };
    }

    /**
     * Optimiza las imágenes para diferentes tamaños
     */
    public getOptimizedImageUrl(player: Player, size: 'small' | 'medium' | 'large' = 'medium'): string {
        const baseUrl = this.getPlayerImageUrl(player);

        // Si es una imagen local, podríamos implementar diferentes tamaños en el futuro
        // Por ahora, retornamos la imagen original
        return baseUrl;
    }

    /**
     * Genera HTML de imagen con lazy loading y fallback
     */
    public generateImageHTML(player: Player, options: {
        alt?: string;
        className?: string;
        size?: 'small' | 'medium' | 'large';
        lazy?: boolean;
    } = {}): string {
        const {
            alt = player.name,
            className = 'player-image',
            size = 'medium',
            lazy = true
        } = options;

        const imageUrl = this.getOptimizedImageUrl(player, size);
        const fallbackUrl = this.getFallbackImageUrl(player);

        return `
      <img 
        src="${imageUrl}" 
        alt="${alt}"
        class="${className}"
        ${lazy ? 'loading="lazy"' : ''}
        onerror="this.src='${fallbackUrl}'"
        title="${player.name}${player.variant ? ` (${player.variant})` : ''}"
      />
    `;
    }
}
