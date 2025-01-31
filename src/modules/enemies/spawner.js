import { Goblin, Ogre } from './monsters.js';

export default class Spawner  {
  static _getEmptyCells(matrix) {
    const cells = [];
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (!matrix[y][x]) cells.push({ x, y });
      }
    }
    return cells;
  }

  static _shuffleAndSelect(cells) {
    let count = Math.min(cells.length, Math.floor(Math.random() * 41) + 10);
    
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }
    
    return cells.slice(0, count);
  }
  
  static spawn(stateMatrix, map) {
    const availableCells = this._getEmptyCells(stateMatrix);
    const positions = this._shuffleAndSelect(availableCells);
    
    positions.forEach(({ x, y }) => {
      const MonsterClass = this._getRandomMonsterType();
      const monster = new MonsterClass();
      stateMatrix[y][x] = monster; 
      map.updateCell(x, y, monster.type);
    });
  }

  static _getRandomMonsterType() {
    const types = [Goblin, Goblin, Goblin, Ogre]; // 75% gobelin, 25% ogre
    return types[Math.floor(Math.random() * types.length)];
  }
}