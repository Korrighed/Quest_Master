import { Goblin, Ogre, Dragon } from './monsters.js';

export default class Spawner  {
  static SPAWN_RANGE = { min: 10, max: 50 };
  static DRAGON_SPAWN_CHANCE = 1.0;
  static _getEmptyCells(matrix) {
    const cells = [];
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (!matrix[y][x]) cells.push({ x, y }); 
      }
    }
    return cells;
  }
  
  static spawn(stateMatrix, map) {
    const emptyCells = this._getEmptyCells(stateMatrix);
    if (emptyCells.length === 0) return;

    // Étape 1: Mélange Fisher-Yates des cellules
    const shuffledCells = this._shuffle([...emptyCells]);

    // Étape 2: Génération du dragon avec sa logique propre
    let dragonSpawned = false;
    if (Math.random() <= this.DRAGON_SPAWN_CHANCE && shuffledCells.length > 0) {
      const dragonCell = shuffledCells.pop();
      stateMatrix[dragonCell.y][dragonCell.x] = new Dragon();
      map.updateCell(dragonCell.x, dragonCell.y, 'dragon');
      dragonSpawned = true;
    }

    const targetCount = Math.min(
      shuffledCells.length,
      Math.floor(Math.random() * (this.SPAWN_RANGE.max - this.SPAWN_RANGE.min + 1)) + this.SPAWN_RANGE.min
    );

    for (let i = 0; i < targetCount && shuffledCells.length > 0; i++) {
      const {x, y} = shuffledCells.pop();
      const MonsterClass = this._getRandomMonsterType();
      stateMatrix[y][x] = new MonsterClass();
      map.updateCell(x, y, stateMatrix[y][x].type);
    }

    console.log(`[Spawner] ${dragonSpawned ? 'Dragon + ' : ''}${targetCount} monstres générés`);
  }

  static _shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  static _getRandomMonsterType() {
    const SPAWN_WEIGHTS = {
      Goblin: 0.75,
      Ogre: 0.25   
    };
    
    const roll = Math.random();
    return roll < SPAWN_WEIGHTS.Goblin ? Goblin : Ogre;
  }
}