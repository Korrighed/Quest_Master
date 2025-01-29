export default class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  // Nouvelle méthode pour gérer l'apparition initiale
  spawn(stateMatrix, map) {
    stateMatrix[this.y][this.x] = 'player';
    map.updateCell(this.x, this.y, 'player');
  }

  get position() {
    return { x: this.x, y: this.y };
  }

  setPosition(pos) {
    this.x = pos.x;
    this.y = pos.y;
  }
}