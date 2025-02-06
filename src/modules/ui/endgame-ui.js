export default class EndgameUI {
    constructor() {
        this.modal = document.createElement('div');
        this.modal.id = 'endgame-modal';
        this.modal.className = 'endgame-modal';
        document.body.appendChild(this.modal);
        this._bindEvents();
    }

    _bindEvents() {
        this.modal.addEventListener('click', (e) => {
            if (e.target.id === 'restart-btn') {
                window.location.reload(); // Rafraîchissement direct
            }
        });
    }

    show(title, message) {
        this.modal.innerHTML = `
        <div class="endgame-content">
          <h2>${title}</h2>
          <p>${message}</p>
          <button id="restart-btn">↻ Recommencer</button>
        </div>
      `;
        this.modal.style.display = 'flex';
    }

    hide() {
        this.modal.style.display = 'none';
    }
}
