export class LevelSystem {
    static XP_PER_LEVEL = 10;
    static FORCE_PER_LEVEL = 3;

    constructor(player) {
        this.player = player;
    }

    checkLevelUp() {
        const currentLevel = Math.floor(this.player.xp / LevelSystem.XP_PER_LEVEL);
        if (currentLevel > this.player.level) {
            this._levelUp(currentLevel);
        }
    }

    _levelUp(newLevel) {
        const levelsGained = newLevel - this.player.level;
        const forceGain = levelsGained * LevelSystem.FORCE_PER_LEVEL;
        
        this.player.level = newLevel;
        this.player.force += forceGain;

        document.dispatchEvent(new CustomEvent('playerLevelUp', {
            detail: { 
                level: newLevel,
                forceGained: forceGain
            }
        }));
    }
}
