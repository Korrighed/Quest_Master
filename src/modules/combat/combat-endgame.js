export default class CombatEndgame {
  static checkEndgame(player) { // Retirer 'enemy' inutile
    return player.hp <= 0 ? 'game-over' : 
          (player.level >= 3 ? 'victory' : false);
  }
}
