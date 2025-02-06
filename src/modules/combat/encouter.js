import { LevelSystem } from '../player/level-system.js';

export class Encounter {
    constructor(player, monster) {
        this.player = player;
        this.monster = monster;
        this.logs = [];
        this.levelSystem = new LevelSystem(player);
    }

    resolve() {
        let result = { victoire: false, playerDead: false };

        while (this.player.hp > 0 && this.monster.hp > 0) {
            const playerForce = Number(this.player.force);
            this.monster.hp -= playerForce; 
            this._dispatchLog(`Joueur attaque: ${this.monster.name} -${playerForce}PV 
                (reste ${this.monster.hp})`);
            if (this.monster.hp <= 0) break;

            const monsterForce = Number(this.monster.force);
            this.player.hp = Math.max(this.player.hp - monsterForce, 0);
            this._dispatchLog(`${this.monster.name} attaque: Joueur -${monsterForce}PV 
                (reste ${this.player.hp})`);
    }

        result.victoire = this.monster.hp <= 0;
        result.playerDead = this.player.hp <= 0;

        if (result.victoire) {
            this.player.xp += this.monster.xpValue;
            this._dispatchLog(`Gain de ${this.monster.xpValue} XP!`);
            this.levelSystem.checkLevelUp();
            
            this.player.hp = this.player.maxHp;
            this.logs.push(`Victoire! Joueur soigné (${this.player.hp}/${this.player.maxHp} PV)`);
        }

        this._dispatchLog('-------------------------');
        
        document.dispatchEvent(new CustomEvent('combatOutcome', { detail: result }));
        return result;
        }
        
        _dispatchLog(message) {
            this.logs.push(message);
            document.dispatchEvent(new CustomEvent('combatLogEntry', { detail: message }));
        }
}
        