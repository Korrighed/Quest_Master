import Player from './modules/player/player.js';
import Spawner from './modules/enemies/spawner.js';
import { Movement } from './modules/player/movement.js';
import Map from './modules/map/map.js';
import UI from './modules/ui/ui.js';
import { Encounter } from './modules/combat/encouter.js'

export default class GameManager {
  constructor() {
    this.stateMatrix = Array(10).fill().map(() => Array(8).fill(null));
    this.map = new Map('map');
    this.player = new Player();
    this.ui = UI;
    this.movement = new Movement(
      this.player,
      this.stateMatrix,
      (oldPos, newPos) => this._handlePositionUpdate(oldPos, newPos)
    );
  }

  init() {
    this.map.generateGrid();
    this.ui.createArrowControls('player-ui');
    this.movement.initArrowListeners();
    this._spawnEntities();
    window.addEventListener('keydown', (e) => this.movement.handleKeyPress(e));
  }

  _spawnEntities() {
    // Délégation aux modules spécialisés
    this.player.spawn(this.stateMatrix, this.map);
    Spawner.spawn(this.stateMatrix, this.map);
  }

  _handlePositionUpdate(oldPos, newPos) {
    const monster = this.stateMatrix[newPos.y][newPos.x];
    
    if (monster?.type) { 
      const encounter = new Encounter(this.player, monster);
      const result = encounter.resolve();
  
      if (result.victoire) {
        this.stateMatrix[newPos.y][newPos.x] = 'player';
        this.map.updateCell(newPos.x, newPos.y, 'player');
      } else {
        // Revert position
        this.player.setPosition(oldPos);
        this.map.updateCell(newPos.x, newPos.y, monster.type);
        this.map.updateCell(oldPos.x, oldPos.y, 'player');
        return; // Stop le processus
      }
    }
  
    // Mise à jour normale si pas de monstre
    this.stateMatrix[oldPos.y][oldPos.x] = null;
    this.stateMatrix[newPos.y][newPos.x] = 'player';
    this.map.updateCell(oldPos.x, oldPos.y, 'empty');
    this.map.updateCell(newPos.x, newPos.y, 'player');
  }
}