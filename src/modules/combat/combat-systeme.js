import { Goblin, Ogre } from '../enemies/monsters.js';
import { Encounter } from './encouter.js';

export class CombatSystem {
  static init(gameState) {
    document.addEventListener('playerMoved', (e) => {
      const { oldPos, newPos, monster } = e.detail;
      
      if (monster instanceof Goblin || monster instanceof Ogre) {
        const encounter = new Encounter(gameState.player, monster);
        const result = encounter.resolve();

        if (result.victoire) {
          gameState.stateMatrix[newPos.y][newPos.x] = 'player';
          gameState.map.updateCell(oldPos.x, oldPos.y, 'empty');
          gameState.map.updateCell(newPos.x, newPos.y, 'player');
          
          if (monster.xpValue > 0) { 
            gameState.player.gainXP(monster.xpValue);
          }


          document.dispatchEvent(new CustomEvent('combatWon', { 
            detail: { monster, player: gameState.player } 
          }));
        } else {
          gameState.stateMatrix[oldPos.y][oldPos.x] = null;
          gameState.map.updateCell(oldPos.x, oldPos.y, 'empty');
          document.dispatchEvent(new CustomEvent('gameOver'));
        }
      }
    });
  }
}