export class StatsUI {
    static init() {
        this.statsContainer = document.querySelector(".stats-display");
        
        document.addEventListener("playerStatsUpdated", () => this.updateDisplay());
        document.addEventListener("playerLevelUp", (e) => this.onLevelUp(e.detail));
    }

    static updateDisplay() {
        const stats = this.getPlayerStats();
        this.statsContainer.innerHTML = `
            PV: ${stats.hp} | 
            Niveau: ${stats.level} |
            XP: ${stats.xp} | 
            Force: ${stats.force}
        `;
    }

    static getPlayerStats() {
        return {
            hp: window.gameState?.player?._hp || 0,
            xp: window.gameState?.player?._xp || 0,
            force: window.gameState?.player?._force || 0,
            level: window.gameState?.player?._level || 1
        };
    }

    static onLevelUp({level, forceGained}) {
        const message = `Niveau ${level} atteint ! +${forceGained} Force`;
        document.dispatchEvent(new CustomEvent('combatLogEntry', { 
            detail: message 
        }));
    }
}
