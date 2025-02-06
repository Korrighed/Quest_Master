
export class CombatLog {
    static init() {
      this.logEntries = [];
      this.playerStats = {hp: 0, xp: 0, force: 0};
  
      document.addEventListener('playerStatsUpdated', (e) => {
        this.playerStats[e.detail.stat] = e.detail.value;
        if (e.detail.stat === 'level') {
          this.logEntries.push(`Niveau ${e.detail.value} atteint!`);
        }
      });
      
      document.addEventListener('combatLogEntry', (e) => {
        this.logEntries.push(e.detail);
      });
    }
  
    static getLogs() {
      return [...this.logEntries];
    }
  
    static getPlayerStats() {
      return { ...this.playerStats };
    }
  }