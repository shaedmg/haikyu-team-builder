// Core types and interfaces for Haikyu Team Builder

export type Position = 'MB' | 'WS' | 'OP' | 'S' | 'L';
export type Rarity = 'SP' | 'UR' | 'SSR' | 'SR' | 'R' | 'N';
export type Language = 'es' | 'en';
export type SortBy = 'name' | 'rarity';

// Re-export enhanced interfaces
export * from './interfaces.js';

// Base character data (now includes name directly)
export interface BaseCharacter {
    id: number;
    school: string;
    name_jp?: string | null;
    name: string;
    variant?: string | null;
    rarity: Rarity;
    position: Position;
    profile_image_url?: string;
    personal_page_url?: string | null;
    height?: number;
    power?: number;
}

// Character interface (simplified since name is now included)
export interface Character extends BaseCharacter { }

// Bond bonus interface
export interface BondBonus {
    attribute: {
        es: string;
        en: string;
    };
    levels: {
        es: string[];
        en: string[];
    };
}

// Bond ability interface
export interface BondAbility {
    name: {
        es: string;
        en: string;
    };
    description: {
        es: string;
        en: string;
    };
    levels: {
        es: string[];
        en: string[];
    };
}

// Bond effect by character interface
export interface BondEffectByCharacter {
    character_id: number;
    bonuses: BondBonus[];
    abilities?: BondAbility[];
}

// Bond interface
export interface Bond {
    id: number;
    name: {
        es: string;
        en: string;
    };
    participants: number[];
    is_link_skill: boolean;
    effects_by_character?: BondEffectByCharacter[];
    effect_summary?: {
        es: string;
        en: string;
    };
    type?: string;
    currentCount?: number;
    requiredCount?: number;
    isActive?: boolean;
    missingCount?: number;
}

// Data structures
export interface CharactersData {
    characters: Record<number, BaseCharacter>;
}

export interface BondsData {
    bonds: Bond[];
}

export interface TeamPosition {
    position: string;
    character: Character | null;
    positionCode: Position;
}

export interface CurrentTeam {
    [positionKey: string]: Character | null;
}

export interface SchoolStats {
    [schoolName: string]: {
        count: number;
        characters: Character[];
    };
}

export interface TranslationStrings {
    // Header
    title: string;
    subtitle: string;

    // Main sections
    schoolBonds: string;
    bonds: string;
    selectPlayers: string;

    // Positions
    opposite: string;
    middleBlocker: string;
    wingSpiker: string;
    setter: string;
    libero: string;

    // Modal
    height: string;
    position: string;
    power: string;
    selectPlayer: string;
    playerBonds: string;

    // Position Selector
    selectPlayerFor: string;
    forThisPosition: string;

    // Sorting
    sortBy: string;
    sortByName: string;
    sortByRarity: string;

    // Rotation
    rotateTooltip: string;

    // Team/Bonds Status Messages
    noPlayersSelected: string;
    noBondsAvailable: string;
    noDetailedEffects: string;
    bondType: string;
    linkSkill: string;
    kizunaSkill: string;
    effectsFor: string;
    level: string;
    specialEffect: string;

    // Bond Effects
    characterEffects: string;
    effectsPerCharacter: string;
    kizunaSkillType: string;
    noLevelsAvailable: string;

    // Schools
    schools: {
        [schoolName: string]: string;
    };

    // Other
    and: string;
    members: string;
    school: string;

    // Language selector
    language: string;

    // Attributes (for bonds)
    attributes: {
        [attributeName: string]: string;
    };

    // Meta tags (optional)
    pageTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
}

export interface Translations {
    [language: string]: TranslationStrings;
}

export interface DragState {
    draggedPlayer: Character | null;
    draggedFromTeam: boolean;
    dragSuccess: boolean;
    isDragging: boolean;
    dragStartTime: number;
}

export interface PositionMapping {
    [positionKey: string]: Position;
}
