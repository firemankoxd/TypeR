export function checkCommand(user, s) {
    let array = s.split(' ')
    let commandName = array[0].substring(1)
    let str = ''
    if(commandName in commands)
        return "JES PICO"
    if(array.length <= 1) {
        let tmp = []
        tmp.push(user)
        // str = runFunction(commandName, tmp);
        
    } else {
        let functionName = array[0]
        array.shift()
        array.unshift(user)
        // str = runFunction(functionName.substring(1), array)
    }
    return str
}

var commands = {
    duel:function(hrac1, hrac2) {return `Hrac ${hrac1} zautocil na hraca ${hrac2}`},
    garbage:function(player) { return `Hracovi ${player} nic nepadlo.`}
}