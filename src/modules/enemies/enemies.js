export default class Enemies {
  static spawn(stateMatrix, map) {
    const availableCells = this._getEmptyCells(stateMatrix);
    const positions = this._shuffleAndSelect(availableCells);
    
    positions.forEach(({ x, y }) => {
      stateMatrix[y][x] = 'enemy';
      map.updateCell(x, y, 'enemy');
    });
  }

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
    // Fisher-Yates adapté + sélection aléatoire du nombre (10-50)
    let count = Math.min(cells.length, Math.floor(Math.random() * 41) + 10);
    
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }
    
    return cells.slice(0, count);
  }
}