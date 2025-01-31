import '../../styles/game-view.css';

export default class Map {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.grid = null;
  }
  
    generateGrid() {
      this.grid = document.createElement('div');
      this.grid.className = 'game-grid';
      
      for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 8; x++) {
          const cell = document.createElement('div');
          cell.className = 'grid-cell';
          cell.dataset.x = x; 
          cell.dataset.y = y;
          this.grid.appendChild(cell);
        }
      }
      this.container.appendChild(this.grid);
    }
  
    updateCell(x, y, type) {
      const cell = this.grid.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    
      if (!cell) {
        console.error(`Cell not found at ${x},${y}`);
        return;
      }

    cell.className = 'grid-cell'; 
    switch(type) {
      case 'player':
        cell.classList.add('player-cell');
        break;
      case 'goblin':
      case 'ogre':
        cell.classList.add('enemy-cell', type);
        break;
      default:
        cell.classList.add('empty-cell');
    }
  }
}