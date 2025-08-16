// Type definitions for Haikyu Team Builder

export interface Player {
    id: number;
    school: string;
    name: string;
    name_jp?: string;
    variant?: string | null;
    rarity?: string;
    position: PlayerPosition;
    profile_image_url?: string;
    personal_page_url?: string | null;
    height?: string;
    power?: number;
    image?: string;
    team?: string;
    specialty?: string;
}

export type PlayerPosition = 'L' | 'MB' | 'WS' | 'OP' | 'S';

export interface Bond {
    name: string;
    participants: number[];
    is_link_skill: boolean;
    effect_summary?: string;
    effects_by_character?: CharacterEffect[];
}

export interface CharacterEffect {
    character_id: number;
    bonuses: Bonus[];
}

export interface Bonus {
    attribute: string;
    levels: string[];
}

export interface GameData {
    characters: Player[];
    bonds: Bond[];
}

export interface TeamPosition {
    [key: string]: Player | null;
}

export interface PositionMapping {
    [key: string]: PlayerPosition;
}

export interface SchoolStats {
    [school: string]: number;
}

export interface DraggedPlayerInfo {
    player: Player;
    fromTeam: boolean;
    success: boolean;
}

export interface CourtPosition {
    name: string;
    element: HTMLElement;
    player: Player | null;
}
