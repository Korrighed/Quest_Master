export default class Player {
  constructor() {
    this._maxHp = 10;
    this._force = 3;
    this._hp = this._maxHp;
    this._xp = 0;
    this._x = 0;
    this._y = 0; 
  }
  get maxHp() { return this._maxHp; }
  set maxHp(value) { this._maxHp = value; }

  get hp() { return this._hp; }
  set hp(value) {
    this._hp = Math.max(0, Math.min(value, this._maxHp));
    document.dispatchEvent(new CustomEvent('playerStatsUpdated', {
      detail: { stat: 'hp', value: this._hp }
    }));
  }

  get force() { return this._force; }
  set force(value) {
    this._force = value;
    document.dispatchEvent(new CustomEvent('playerStatsUpdated', {
      detail: { stat: 'force', value: this._force }
    }));
  }

  get xp() { return this._xp; }
  set xp(value) {
    this._xp = value;
    document.dispatchEvent(new CustomEvent('playerStatsUpdated', {
      detail: { stat: 'xp', value: this._xp }
    }));
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