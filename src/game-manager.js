import Player from './modules/player/player.js';
import Enemies from './modules/enemies/enemies.js';
import { Movement } from './modules/player/movement.js';
import Map from './modules/map/map.js';
import UI from './modules/ui/ui.js';

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
    Enemies.spawn(this.stateMatrix, this.map);
  }

  _handlePositionUpdate(oldPos, newPos) {
    // Mise à jour de la matrice et du DOM
    this.stateMatrix[oldPos.y][oldPos.x] = null;
    this.stateMatrix[newPos.y][newPos.x] = 'player';
    this.map.updateCell(oldPos.x, oldPos.y, 'empty');
    this.map.updateCell(newPos.x, newPos.y, 'player');
  }
}