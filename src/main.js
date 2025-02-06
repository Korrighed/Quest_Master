import GameManager from "./game-manager.js";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

async function startGame() {
    const gameManager = new GameManager();
    await gameManager.setup();
}

startGame().catch(error => console.error('Erreur au démarrage:', error));