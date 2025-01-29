import '../../styles/game-view.css';

export default class Map {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.grid = null;
    }
  
    generateGrid() {
      this.grid = document.createElement('div');
      this.grid.className = 'game-grid';
      
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 8; col++) {
          const cell = document.createElement('div');
          cell.className = 'grid-cell';
          cell.dataset.row = row;
          cell.dataset.col = col;
          this.grid.appendChild(cell);
        }
      }
      
      this.container.appendChild(this.grid);
    }
  
    // API minimale pour updates
    updateCell(x, y, type) {
      const cell = this.grid.querySelector(`[data-col="${x}"][data-row="${y}"]`);
      cell.className = `grid-cell ${type}`; // 'player', 'enemy', etc.
    }
  }