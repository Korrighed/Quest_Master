export default class Player {
  constructor() {
    this.maxHp = 10;
    this.force = 3;
    this.hp = this.maxHp;
    this.xp = 0;
    this._x = 0;
    this._y = 0; 
  }

  gainXP(amount) {
    this.xp += amount;
    console.log(`+${amount} XP (Total: ${this.xp})`);
  }

  get position() {
    return { x: this._x, y: this._y };
  }

  setPosition(pos) {
    this._x = pos.x;
    this._y = pos.y;
  }

  spawn(stateMatrix, map) {
    stateMatrix[this._y][this._x] = 'player';
    map.updateCell(this._x, this._y, 'player');
  }
}