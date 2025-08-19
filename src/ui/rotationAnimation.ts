import { Character, Position } from '../types/index.js';

export type RotationContext = {
    currentTeam: { [key: string]: Character | null | undefined };
    positionMappings: { [key: string]: Position };
    renderPlayerInPosition: (player: Character, el: HTMLElement) => void;
    renderEmptyPosition: (el: HTMLElement, positionClass: string) => void;
    updateTeamStats: () => void;
};

const ROTATION_SEQUENCE = [
    'position-1', // OP
    'position-6', // MB
    'position-5', // WS
    'position-2', // S
    'position-3', // MB
    'position-4', // WS
];

export function rotatePlayersClockwise(ctx: RotationContext): void {
    const positionContents: { [key: string]: Character | null } = {};
    const positionMappingsCopy: { [key: string]: Position } = {};

    ROTATION_SEQUENCE.forEach(pos => {
        positionContents[pos] = ctx.currentTeam[pos] || null;
        const mapping = ctx.positionMappings[pos];
        if (mapping) positionMappingsCopy[pos] = mapping;
    });

    const rotationButton = document.getElementById('rotationButton');
    if (rotationButton) {
        rotationButton.classList.add('rotating');
        setTimeout(() => rotationButton.classList.remove('rotating'), 600);
    }

    animatePositionMovement(ROTATION_SEQUENCE, () => {
        const newPositionMappings: { [key: string]: Position } = {};
        ROTATION_SEQUENCE.forEach((pos, index) => {
            const nextIndex = (index + 1) % ROTATION_SEQUENCE.length;
            const nextPos = ROTATION_SEQUENCE[nextIndex];
            if (nextPos && positionMappingsCopy[pos]) {
                newPositionMappings[nextPos] = positionMappingsCopy[pos];
            }
        });

        const newPositionContents: { [key: string]: Character | null } = {};
        ROTATION_SEQUENCE.forEach((pos, index) => {
            const nextIndex = (index + 1) % ROTATION_SEQUENCE.length;
            const nextPos = ROTATION_SEQUENCE[nextIndex];
            if (nextPos) newPositionContents[nextPos] = positionContents[pos] ?? null;
        });

        Object.assign(ctx.positionMappings, newPositionMappings);
        ROTATION_SEQUENCE.forEach(pos => { delete ctx.currentTeam[pos]; });
        Object.assign(ctx.currentTeam, newPositionContents);

        ROTATION_SEQUENCE.forEach(pos => {
            const positionElement = document.querySelector(`.${pos}`) as HTMLElement;
            if (!positionElement) return;
            if (ctx.currentTeam[pos]) {
                ctx.renderPlayerInPosition(ctx.currentTeam[pos]!, positionElement);
            } else {
                ctx.renderEmptyPosition(positionElement, pos);
            }
        });

        ctx.updateTeamStats();
    });
}

function animatePositionMovement(rotationSequence: string[], callback: () => void): void {
    const positions: { [key: string]: { x: number; y: number } } = {};
    rotationSequence.forEach(pos => {
        const element = document.querySelector(`.${pos}`) as HTMLElement;
        if (element) {
            const rect = element.getBoundingClientRect();
            positions[pos] = { x: rect.left, y: rect.top };
        }
    });

    const animations: Array<{ element: HTMLElement; deltaX: number; deltaY: number; }> = [];
    rotationSequence.forEach((pos, index) => {
        const nextIndex = (index + 1) % rotationSequence.length;
        const nextPos = rotationSequence[nextIndex];
        if (!nextPos) return;
        const currentPos = positions[pos];
        const targetPos = positions[nextPos];
        if (currentPos && targetPos) {
            const deltaX = targetPos.x - currentPos.x;
            const deltaY = targetPos.y - currentPos.y;
            const element = document.querySelector(`.${pos}`) as HTMLElement;
            if (element) animations.push({ element, deltaX, deltaY });
        }
    });

    animations.forEach(({ element, deltaX, deltaY }) => {
        element.style.transition = 'transform 0.8s ease-in-out';
        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        element.style.zIndex = '1000';
    });

    setTimeout(() => {
        animations.forEach(({ element }) => {
            element.style.transition = '';
            element.style.transform = '';
            element.style.zIndex = '';
        });
        callback();
    }, 800);
}
