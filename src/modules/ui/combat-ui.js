import { StatsUI } from './stats-ui.js'; 

export class CombatUI {
    static async init() {
        CombatUI.uiElement = document.getElementById("combat-ui");
        CombatUI.uiElement.innerHTML = `
          <div class="stats-display"></div>
          <div class="combat-logs" style="max-height: 300px; overflow-y: auto"></div>
      `;

      StatsUI.init();
      StatsUI.updateDisplay();
      
        document.addEventListener("combatLogEntry", (e) => this.addLogEntry(e.detail))
    }

    static addLogEntry(message) {
        const logContainer = CombatUI.uiElement.querySelector(".combat-logs");
        const entry = document.createElement("div");
        entry.textContent = message;
        logContainer.appendChild(entry);
        logContainer.scrollTop = logContainer.scrollHeight;
    }
}