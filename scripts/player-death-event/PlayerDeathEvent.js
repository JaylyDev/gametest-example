// Script examples for ScriptAPI
// Author: Jayly#1397 <Jayly Discord>

/**
 * @license MIT
 * @author JaylyMC
 */
import { EntityHealthComponent, world, Player } from "mojang-minecraft";
import { deprecate } from "deprecate/deprecate";

/**
 * Contains information related to an player death.
 */
export class PlayerDeathEvent {
  /**
   * @param {Player} player 
   */
  constructor (player) {
    this.player = player;
  };
};

/**
 * Manages callbacks that are connected to when an player dies.
 */
class PlayerDeathEventSignalDeprecated {
  /**
   * Subscribe
   * @param {(arg: PlayerDeathEvent) => void} arg 
   * @return {(arg: PlayerDeathEvent) => void}
   */
  subscribe (arg) {
    arg["playerDeath"] = true;
    /**
     * @type {Player[]}
     */
    const deadPlayers = [];
    let callback = world.events.tick.subscribe(() => {
      for (let player of world.getPlayers()) {
        if (!player.hasComponent("health")) return;
        /**
         * @type {EntityHealthComponent}
         */
        // @ts-ignore
        let health = player.getComponent("health");
        if (health.current === 0 && arg["playerDeath"] === true) {
          const playerIndex = deadPlayers.findIndex(pl => pl.name === player.name);
          if (playerIndex < 0) {
            arg(new PlayerDeathEvent(player));
            deadPlayers.push(player);
            let playerDeathCallback = world.events.tick.subscribe(() => {
              if (health.current > 0) {
                deadPlayers.splice(playerIndex, 1);
                world.events.tick.unsubscribe(playerDeathCallback);
              };
            });
          }      
        } else if (arg["playerDeath"] === false) {
          world.events.tick.unsubscribe(callback);
        };
      }
    });

    return arg;
  };

  /**
   * Unsubscribe
   * @param {(arg: PlayerDeathEvent) => void} arg 
   * @return {void}
   */
  unsubscribe (arg) {
    arg["playerDeath"] = false;
  };
};

/**
 * @deprecated
 */
export const PlayerDeathEventSignal = deprecate(PlayerDeathEventSignalDeprecated.constructor, "PlayerDeathEvent class is deprecated. Use EntityDeathEvent instead.");
