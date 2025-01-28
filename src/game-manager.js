

export default class GameManager {
    constructor() {
      this.appElement = document.getElementById("app"); // Cible le conteneur DOM
    }
  
    init() {
      this.injectBaseUI(); 
      this.loadModules();  
    }
  
    injectBaseUI() {
      this.appElement.innerHTML = `
        <div class="game-container">
          <div id="map"></div>
          <div id="player-ui"></div>
          <div id="combat-log"></div>
        </div>
      `;
    }
  
    async loadModules() {
      const { default: Map } = await import("./modules/map/map.js");
      const map = new Map();
      map.generateGrid(); // Génère et affiche la grille
    }
  }