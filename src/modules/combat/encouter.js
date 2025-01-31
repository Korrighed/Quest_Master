export class Encounter {
    constructor(player, monster) {
        this.player = player;
        this.monster = monster;
        this.logs = [];
    }

    resolve() {
        let result = { victoire: false, playerDead: false };

        while (this.player.hp > 0 && this.monster.hp > 0) {

            const playerForce = Number(this.player.force);
            this.monster.hp -= playerForce; 
            this.logs.push(`Joueur attaque: ${this.monster.name} -${playerForce}PV (reste ${this.monster.hp})`);

            if (this.monster.hp <= 0) break;
            const monsterForce = Number(this.monster.force);
            this.player.hp = Math.max(this.player.hp - monsterForce, 0);
            this.logs.push(`${this.monster.name} attaque: Joueur -${monsterForce}PV (reste ${this.player.hp})`);
        }

        result.victoire = this.monster.hp <= 0;
        result.playerDead = this.player.hp <= 0;

        if (result.victoire) {
            this.player.hp = this.player.maxHp;
            this.logs.push(`Victoire! Joueur soigné (${this.player.hp}/${this.player.maxHp} PV)`);
        }
        
        this.logs.forEach(log => console.log(log));
        console.log(result.victoire ? 'VICTOIRE' : 'GAME OVER');

        return result;
    }
}