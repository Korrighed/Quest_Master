import { Encounter } from './encounter.js';

export class CombatSystem {
  static init(gameState) {
    document.addEventListener('playerMoved', (e) => {
      const { x, y } = e.detail.newPos;
      const monster = gameState.stateMatrix[y][x];
      
      if (monster instanceof Goblin || monster instanceof Ogre) {
        const encounter = new Encounter(gameState.player, monster);
        const result = encounter.resolve();

        if (result.victoire) {
          gameState.stateMatrix[y][x] = null; // Supprime le monstre
          document.dispatchEvent(new CustomEvent('combatWon', { 
            detail: { monster, player: gameState.player } 
          }));
        } else {
          document.dispatchEvent(new CustomEvent('gameOver'));
        }
      }
    });
  }
}