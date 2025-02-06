export class VictoryHandler {
    constructor(gameState) {
      this.gameState = gameState;
      this.initializeDragonTracking();
    }
    
  
    initializeDragonTracking() {
      document.addEventListener('combat-ended', (e) => {
        if (e.detail.enemyType === 'dragon' && e.detail.isEnemyDefeated) {
          const victoryEvent = new CustomEvent('game-victory');
          document.dispatchEvent(victoryEvent);
        }
      });
    }
  }
  