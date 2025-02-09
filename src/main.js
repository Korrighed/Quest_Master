import GameManager from "./game-manager.js";
import "./styles/game-view.css";
import "./styles/game-view-mobile.css";
import 'bootstrap/dist/css/bootstrap.min.css';

async function startGame() {
    const gameManager = new GameManager();
    await gameManager.setup();
}

startGame().catch(error => console.error('Erreur au démarrage:', error));