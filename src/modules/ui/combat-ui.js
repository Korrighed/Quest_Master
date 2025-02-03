import { CombatLog } from '../combat/combat-log.js'

export class CombatUI {
  static init() {
    this.uiElement = document.getElementById("combat-ui");
    this.logElement = document.createElement("div");
    this.statsElement = document.createElement("div");

    // Structure HTML
    this.uiElement.innerHTML = `
        <div class="stats-display"></div>
        <div class="combat-logs" style="max-height: 200px; overflow-y: auto"></div>
      `;

    // Écouteurs d'événements
    document.addEventListener("playerStatsUpdated", (e) =>
      this._updateStatsDisplay(e)
    );
    document.addEventListener("combatLogEntry", (e) =>
      this._addLogEntry(e.detail)
    );
  }

  static _updateStatsDisplay(event) {
    const stats = CombatLog.getPlayerStats();
    const statsDisplay = this.uiElement.querySelector(".stats-display");
    statsDisplay.innerHTML = `
        PV: ${stats.hp} | XP: ${stats.xp} | Force: ${stats.force}
      `;
  }

  static _addLogEntry(message) {
    const logContainer = this.uiElement.querySelector(".combat-logs");
    const entry = document.createElement("div");
    entry.textContent = message;
    logContainer.appendChild(entry);
    logContainer.scrollTop = logContainer.scrollHeight;
  }
}
