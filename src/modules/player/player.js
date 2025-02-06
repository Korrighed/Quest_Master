import {LevelSystem} from './level-system.js'

export default class Player {
  constructor() {
    this._maxHp = 10;
    this._force = 3; 
    this._xp = 0;    
    this.hp = this._maxHp; 
    this.force = this._force; 
    this.xp = this._xp; 
    this._x = 0;
    this._y = 0;
    this._level = 1;
    this.levelSystem = new LevelSystem(this);
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


  _dispatchStatsUpdate(stat) {
      document.dispatchEvent(new CustomEvent('playerStatsUpdated', {
          detail: { stat, value: this[`_${stat}`] }
      }));
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

  get xp() { return this._xp; }
  set xp(value) {
    this._xp = value;
    this._dispatchStatsUpdate('xp');
  }

  get level() { return this._level; }
  set level(value) {
      this._level = value;
      this._dispatchStatsUpdate('level');
      console.log(this._level); 
  }
  gainXP(amount) {
      this.xp = this._xp + amount; // Utilise le setter
  }


}