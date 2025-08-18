import { Character, DragState, PositionMapping, CurrentTeam } from '../types/index.js';
import { isValidPosition, isDuplicatePlayer } from '../services/dragValidation.js';

export interface DragContext {
    dragState: DragState;
    positionMappings: PositionMapping;
    getCurrentTeam: () => CurrentTeam;
    placePlayerInPosition: (player: Character, positionElement: HTMLElement) => void;
    getDraggedFromPosition: () => string | undefined;
    setDraggedFromPosition: (pos?: string) => void;
}

export function addDragListeners(element: HTMLElement, player: Character, ctx: DragContext): void {
    element.addEventListener('dragstart', (e) => {
        ctx.dragState.draggedPlayer = player;
        ctx.dragState.draggedFromTeam = false;
        ctx.dragState.dragSuccess = false;
        e.dataTransfer!.effectAllowed = 'move';
        e.dataTransfer!.setData('text/plain', player.id.toString());
        element.style.opacity = '0.5';
    });
    element.addEventListener('dragend', () => {
        element.style.opacity = '1';
        clearHighlights();
        ctx.dragState.draggedPlayer = null;
        ctx.dragState.draggedFromTeam = false;
        ctx.dragState.dragSuccess = false;
    });
}

export function setupDragAndDrop(ctx: DragContext): void {
    const courtPositions = document.querySelectorAll('.position');
    courtPositions.forEach(position => {
        const posElement = position as HTMLElement;
        posElement.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer!.dropEffect = 'move';
            if (
                ctx.dragState.draggedPlayer &&
                isValidPosition(ctx.dragState.draggedPlayer, posElement.className, ctx.positionMappings) &&
                !isDuplicatePlayer(
                    ctx.dragState.draggedPlayer,
                    posElement.className,
                    ctx.positionMappings,
                    ctx.getCurrentTeam(),
                    ctx.dragState.draggedFromTeam,
                    ctx.getDraggedFromPosition()
                )
            ) {
                posElement.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
                posElement.style.transform = 'scale(1.02)';
            } else {
                posElement.style.backgroundColor = '';
                posElement.style.transform = '';
            }
        });
        posElement.addEventListener('dragleave', () => {
            posElement.style.backgroundColor = '';
            posElement.style.transform = '';
        });
        posElement.addEventListener('drop', (e) => {
            e.preventDefault();
            posElement.style.backgroundColor = '';
            posElement.style.transform = '';
            if (
                ctx.dragState.draggedPlayer &&
                isValidPosition(ctx.dragState.draggedPlayer, posElement.className, ctx.positionMappings) &&
                !isDuplicatePlayer(
                    ctx.dragState.draggedPlayer,
                    posElement.className,
                    ctx.positionMappings,
                    ctx.getCurrentTeam(),
                    ctx.dragState.draggedFromTeam,
                    ctx.getDraggedFromPosition()
                )
            ) {
                ctx.dragState.dragSuccess = true;
                ctx.placePlayerInPosition(ctx.dragState.draggedPlayer, posElement);
                clearHighlights();
            }
        });
    });

    document.addEventListener('dragstart', () => {
        if (ctx.dragState.draggedPlayer) highlightValidPositions(ctx.dragState.draggedPlayer, ctx);
    });
    document.addEventListener('dragend', () => clearHighlights());
}

export function highlightValidPositions(player: Character, ctx: DragContext): void {
    const courtPositions = document.querySelectorAll('.position');
    courtPositions.forEach((position) => {
        const posElement = position as HTMLElement;
        if (
            isValidPosition(player, posElement.className, ctx.positionMappings) &&
            !isDuplicatePlayer(
                player,
                posElement.className,
                ctx.positionMappings,
                ctx.getCurrentTeam(),
                ctx.dragState.draggedFromTeam,
                ctx.getDraggedFromPosition()
            )
        ) {
            posElement.style.backgroundColor = 'rgba(76, 175, 80, 0.3)';
            posElement.style.border = '3px solid #4CAF50';
        }
    });
}

export function clearHighlights(): void {
    const courtPositions = document.querySelectorAll('.position');
    courtPositions.forEach((position) => {
        const posElement = position as HTMLElement;
        posElement.style.backgroundColor = '';
        posElement.style.border = '';
        posElement.style.transform = '';
    });
}
