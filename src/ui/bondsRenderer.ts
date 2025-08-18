import { Character } from '../types/index.js';

export interface BondLike {
    name: any;
    participants: number[];
    is_link_skill?: boolean;
    effects_by_character?: any[];
    effect_summary?: any;
}

export interface BondRenderDeps {
    players: Character[];
    getPlayerImageUrl: (player: Character) => string;
    formatBonusText: (val: string) => string;
    getInitialBonusLevel: (bonus: any) => string;
}

// Extracted HTML generation for bond details
export function generateBondEffectHTML(
    bond: BondLike,
    currentPlayerIds: number[] = [],
    deps: BondRenderDeps
): string {
    const { players, getPlayerImageUrl, formatBonusText, getInitialBonusLevel } = deps;
    const currentLanguage = window.languageManager ? window.languageManager.getCurrentLanguage() : 'es';
    const bondName = typeof bond.name === 'object' ? (bond.name as any)[currentLanguage] || (bond.name as any).es : bond.name;

    if (!bond.effects_by_character || bond.effects_by_character.length === 0) {
        const t = window.languageManager
            ? window.languageManager.t.bind(window.languageManager)
            : (key: string) => {
                const fallbacks: Record<string, string> = {
                    noDetailedEffects: 'Vínculo sin efectos detallados:',
                    bondType: 'Tipo:',
                    linkSkill: 'Link Skill',
                    kizunaSkill: 'Kizuna Skill',
                };
                return fallbacks[key] || key;
            };
        return `<div class="bond-effect simple-bond">
      <p>${t('noDetailedEffects')} ${bondName}</p>
      <p>${t('bondType')} ${bond.is_link_skill ? t('linkSkill') : t('kizunaSkill')}</p>
    </div>`;
    }

    if (bond.effects_by_character && bond.effects_by_character.length > 0) {
        let effectsHTML = '<div class="bond-effect attribute-bond">';
        effectsHTML += '<div class="bond-participants-horizontal">';

        bond.participants.forEach((participantId: number) => {
            const player = players.find(p => p.id === participantId);
            const isInTeam = currentPlayerIds.includes(participantId);
            const playerImageUrl = player ? getPlayerImageUrl(player) : '';
            const borderClass = isInTeam ? 'participant-in-team' : 'participant-missing';
            if (playerImageUrl) {
                effectsHTML += `<img src="${playerImageUrl}" alt="${player ? player.name : participantId}" class="participant-image ${borderClass}" title="${player ? player.name : `ID: ${participantId}`}">`;
            }
        });

        effectsHTML += '</div>';
        effectsHTML += '<div class="bonifications-section">';
        const t = window.languageManager
            ? window.languageManager.t.bind(window.languageManager)
            : (key: string) => {
                const fallbacks: Record<string, string> = {
                    effectsPerCharacter: 'Efectos por Personaje:',
                };
                return fallbacks[key] || key;
            };
        effectsHTML += `<h4 class="bonifications-title">${t('effectsPerCharacter')}</h4>`;

        bond.effects_by_character.forEach(characterEffect => {
            const player = players.find(p => p.id === characterEffect.character_id);
            const playerName = player ? player.name : `ID: ${characterEffect.character_id}`;
            const playerImageUrl = player ? getPlayerImageUrl(player) : null;
            effectsHTML += `<div class="character-effect-container">
        <div class="character-header">
          ${playerImageUrl ? `<img src="${playerImageUrl}" alt="${playerName}" class="character-effect-image">` : ''}
          <div class="character-info">
            <div class="character-name">${playerName}</div>
            <div class="character-school">${player ? player.school : ''}</div>
          </div>
        </div>`;

            characterEffect.bonuses.forEach((bonus: any, bonusIndex: number) => {
                const rawAttributeName = typeof bonus.attribute === 'object'
                    ? (bonus.attribute[currentLanguage] || bonus.attribute.es || bonus.attribute)
                    : bonus.attribute;
                const attributeName = window.languageManager ? window.languageManager.translateAttribute(rawAttributeName) : rawAttributeName;
                effectsHTML += `<div class="bonus-container">
          <div class="bonus-attribute">${attributeName}</div>
          <div class="level-selector" data-character-id="${characterEffect.character_id}" data-attribute="${rawAttributeName}">`;

                if (bonus.levels) {
                    const lang = window.languageManager?.getCurrentLanguage() || 'es';
                    let levelsArray;
                    if (Array.isArray(bonus.levels)) {
                        levelsArray = bonus.levels;
                    } else if (typeof bonus.levels === 'object') {
                        levelsArray = bonus.levels[lang] || bonus.levels.es || bonus.levels;
                    }
                    if (Array.isArray(levelsArray) && levelsArray.length > 0) {
                        levelsArray.forEach((_lvl: string, index: number) => {
                            const levelNum = index + 1;
                            const isActive = index === 0;
                            const escapedBondName = bondName.replace(/'/g, "\\'");
                            effectsHTML += `<button class="level-btn ${isActive ? 'active' : ''}" data-level="${levelNum}" onclick="window.teamBuilder.setBondLevel('${escapedBondName}', ${characterEffect.character_id}, '${rawAttributeName}', ${levelNum})">Lv.${levelNum}</button>`;
                        });
                    } else {
                        const noLevelsText = window.languageManager ? window.languageManager.t('noLevelsAvailable') : 'Sin niveles disponibles';
                        effectsHTML += `<span class="no-levels">${noLevelsText}</span>`;
                    }
                } else {
                    const noLevelsText = window.languageManager ? window.languageManager.t('noLevelsAvailable') : 'Sin niveles disponibles';
                    effectsHTML += `<span class="no-levels">${noLevelsText}</span>`;
                }

                effectsHTML += `</div><div class="current-effect"><span class="effect-value" data-character-id="${characterEffect.character_id}" data-attribute="${rawAttributeName}">${formatBonusText(getInitialBonusLevel(bonus))}</span></div></div>`;
            });

            effectsHTML += `</div>`; // end character-effect-container
        });

        effectsHTML += '</div></div>';
        return effectsHTML;
    } else if (bond.is_link_skill) {
        const t = window.languageManager
            ? window.languageManager.t.bind(window.languageManager)
            : (key: string) => {
                const fallbacks: Record<string, string> = {
                    kizunaSkillType: '🔗 Habilidad Kizuna',
                    specialEffect: 'Efecto especial',
                };
                return fallbacks[key] || key;
            };
        const effectDescription = bond.effect_summary && bond.effect_summary[currentLanguage]
            ? bond.effect_summary[currentLanguage]
            : bond.effect_summary && bond.effect_summary.es
                ? bond.effect_summary.es
                : t('specialEffect');
        return `<div class="bond-effect kizuna-skill">
      <div class="effect-type">${t('kizunaSkillType')}</div>
      <div class="effect-description">${effectDescription}</div>
    </div>`;
    }
    return '<div class="bond-effect">Tipo de bond no reconocido</div>';
}
