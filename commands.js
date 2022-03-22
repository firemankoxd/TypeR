export function checkCommand(user, s) {
    let array = s.split(' ')
    let commandName = array[0].substring(1)
    if (!(commandName in commands))
        return "Zadany prikaz neexistuje!"
    if(array.length <= 1) {
        return commands[commandName](user)
    } else {
        array.shift()
        return commands[commandName](user, ...array)
    }
}

var commands = {
    duel:function(hrac1, hrac2) {return `Hrac ${hrac1} zautocil na hraca ${hrac2}`},
    garbage:function(player) { return `Hracovi ${player} nic nepadlo.`}
}