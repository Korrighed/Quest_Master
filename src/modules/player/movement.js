export class Movement {
  constructor(player, stateMatrix, onMove) {
    this.player = player;
    this.stateMatrix = stateMatrix;
    this.onMove = onMove;
  }

  initArrowListeners() {
    document.querySelectorAll('.arrow-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const direction = e.target.dataset.direction;
        this.handleMove(direction); // Appel direct (ou via CustomEvent)
      });
    });
  }

  handleMove(direction) { // NOUVELLE METHODE MANQUANTE
    const newPos = this._calculateNewPosition(direction);
    if (this._isValidPosition(newPos)) {
      this._updatePosition(newPos);
    }
  }

  _calculateNewPosition(direction) {
    const { x, y } = this.player.position;
    const moves = {
      up: { x, y: y - 1 },
      down: { x, y: y + 1 },
      left: { x: x - 1, y },
      right: { x: x + 1, y }
    };
    return moves[direction];
  }

  _isValidPosition(pos) {
    return (
      pos.x >= 0 && pos.x < 8 &&
      pos.y >= 0 && pos.y < 10 &&
      this.stateMatrix[pos.y][pos.x] !== 'enemy'
    );
  }

  _updatePosition(newPos) {
    const oldPos = this.player.position;
    this.player.setPosition(newPos);
    this.onMove(oldPos, newPos);
  }
}