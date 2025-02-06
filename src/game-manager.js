import Player from './modules/player/player.js';
import Spawner from './modules/enemies/spawner.js';
import { Movement } from './modules/player/movement.js';
import Map from './modules/map/map.js';
import UI from './modules/ui/ui.js';
import { CombatLog } from './modules/combat/combat-log.js';
import { CombatUI } from './modules/ui/combat-ui.js';
import  { CombatSystem } from './modules/combat/combat-systeme.js'; 
import EndgameUI from './modules/ui/endgame-ui.js';
import CombatEndgame from './modules/combat/combat-endgame.js'; 

export default class GameManager {
  constructor() {
      this.stateMatrix = Array(10).fill().map(() => Array(8).fill(null));
      this.map = new Map('map');
      this.player = new Player();
      this.ui = UI;
      this.endgameUI = new EndgameUI();
  }
  async setup() {
    window.gameState = {
      player: this.player
  };

    CombatLog.init();
    await CombatUI.init();
    
    CombatSystem.init(this);
    
    this.movement = new Movement(
        this.player,
        this.stateMatrix,
        (oldPos, newPos) => this._handlePositionUpdate(oldPos, newPos)
    );
    
    this._initEventListeners();
    this.init();
    return this;
  }

  init() {
    this.map.generateGrid();
    this.ui.createArrowControls('player-ui');
    this.movement.initArrowListeners();
    this._spawnEntities();
  }

  _initEventListeners() {
    // Écoute des résultats de combat
    document.addEventListener('combatWon', (e) => {
      const { x, y } = this.player.position;
      this.stateMatrix[y][x] = 'player';
      this.map.updateCell(x, y, 'player');
    });
    document.addEventListener('gameOver', () => {
      console.log("Game Over!"); 
        this.endgameUI.show('Défaite', 'Le dragon vous a réduit en cendre!');
        this._disableControls();
    });
    document.addEventListener('dragonSlain', () => {
      const victoryCondition = CombatEndgame.checkEndgame(this.player, { type: 'dragon' });
      if (victoryCondition === 'victory') {
        this.endgameUI.show('VICTOIRE', 'Le dragon est vaincu son trésort vous appartiens !');
        this._disableControls();
      }
    });
    document.addEventListener('playerStatsUpdated', () => {
      window.gameState = {
          player: this.player
      };
    });
  }
  _spawnEntities() {
    this.player.spawn(this.stateMatrix, this.map);
    Spawner.spawn(this.stateMatrix, this.map);
  }

  _handlePositionUpdate(oldPos, newPos) {
    const monster = this.stateMatrix[newPos.y][newPos.x];
    
    if (monster?.type) { 
      document.dispatchEvent(new CustomEvent('playerMoved', {
        detail: { oldPos, newPos, monster }
      }));
    } else {
      this._updateGameState(oldPos, newPos);
    }
  }

  _updateGameState(oldPos, newPos) {
    this.map.updateCell(oldPos.x, oldPos.y, 'empty');
    this.map.updateCell(newPos.x, newPos.y, 'player');
  }

  _disableControls() {
    this.movement.arrowControls.forEach(control => 
      control.style.pointerEvents = 'none'
    );
    document.removeEventListener('keydown', this.movement.handleKeyPress);
  }

  getState() {
    return {
      player: this.player,
      matrix: this.stateMatrix,
      map: this.map
    };
  }

  reset() {
    this.stateMatrix = Array(10).fill().map(() => Array(8).fill(null));
    this.player = new Player();
    window.gameState = {
      player: this.player
  };
  this.init();
  }
}