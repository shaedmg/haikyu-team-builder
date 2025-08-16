// Configuration file for the Haikyu Team Builder application
export interface AppConfig {
    dataUrl: string;
    enableExtendedPlayers: boolean;
    debugMode: boolean;
    animationDuration: number;
    maxPlayersPerTeam: number;
    schoolBuffThreshold: number;
}

export const config: AppConfig = {
    dataUrl: './haikyu_fly_high_full_v3.json',
    enableExtendedPlayers: true,
    debugMode: process.env.NODE_ENV === 'development',
    animationDuration: 800,
    maxPlayersPerTeam: 7,
    schoolBuffThreshold: 4,
};

export const productionConfig: AppConfig = {
    ...config,
    debugMode: false,
};

export const developmentConfig: AppConfig = {
    ...config,
    debugMode: true,
};
