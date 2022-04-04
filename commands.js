export function checkCommand(user, s) {
    let array = s.split(' ')
    let commandName = array[0].substring(1).toLowerCase()
    if (!(commandName in commands))
        return "Zadany prikaz neexistuje!"
        // TODO: Vypis ze prikaz neexistuje len pre jednotlivca
    if(array.length <= 1) {
        return commands[commandName](user)
    } else {
        array.shift()
        return commands[commandName](user, ...array)
    }
}

var commands = {
    duel: function(hrac1, hrac2) {
        // DB THINGS
        return `Hrac ${hrac1} zautocil na hraca ${hrac2}`
    },
    garbage: function(player) { 
        // DB THINGS
        return `Hracovi ${player} nic nepadlo.`
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