import garbageitems from "./items/garbageitems.js";

export function checkCommand(user, s, socket) {
    let array = s.split(" ");
    let commandName = array[0].substring(1).toLowerCase();
    if (!(commandName in commands)) {
      return "Zadany prikaz neexistuje!";
    }
    if (array.length <= 1) {
      return commands[commandName](user);
    } else {
      array.shift();
      return commands[commandName](user, ...array);
    }
}

var commands = {
    duel: function(hrac1, hrac2) {
        // DB THINGS
        return `Hrac ${hrac1} zautocil na hraca ${hrac2}`
    },
    garbage: function(player) {
        // DB THINGS
        let randomNumber = Math.random();
        let garbageitem;
        for (let i = 0; i < garbageitems.length; i++) {
          if (randomNumber <= garbageitems[i].probability) {
            garbageitem = garbageitems[i].garbageitem;
            break;
          } else {
            randomNumber -= garbageitems[i].probability;
          }
        }
        return `Hrac ${player} nasel ${garbageitem}.`;
    },
    help: function() {
        return ["To view all possible commands, enter -commands.", 
                "Another line",
                "And another"]
    },
    bugreport: function(reportMessage) {
        return "";
    },
    playerinfo: function(playerName) {
        return "";
    },
    login: function(username, password) {
        return "";
    },
    register: function(username, password, passwordRepeat) {
        return "";
    }
}