// Core types and interfaces for Haikyu Team Builder

export type Position = 'MB' | 'WS' | 'OP' | 'S' | 'L';
export type Rarity = 'SP' | 'UR' | 'SSR' | 'SR' | 'R' | 'N';
export type Language = 'es' | 'en';
export type SortBy = 'name' | 'rarity';

export interface Character {
  id: number;
  school: string;
  name: string;
  name_jp?: string;
  variant?: string | null;
  rarity: Rarity;
  position: Position;
  profile_image_url?: string;
  personal_page_url?: string | null;
  height?: number;
  power?: number;
}

export interface Bond {
  id: number;
  name: string;
  name_jp?: string;
  participants: number[];
  type?: 'link_skill' | 'kizuna_skill';
  effect?: string;
  detailed_effects?: BondEffect[];
}

export interface BondEffect {
  character_id: number;
  effects: string[];
}

export interface GameData {
  characters: Character[];
  bonds: Bond[];
}

export interface ImageMapping {
  [characterId: string]: string;
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

  // Bond Effects
  characterEffects: string;
  effectsPerCharacter: string;

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

export interface HaikyuTeamBuilderConfig {
  defaultLanguage: Language;
  rarityOrder: Rarity[];
  positionMappings: PositionMapping;
  dragThreshold: number;
}
