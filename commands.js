export function checkCommand(user, s) {
    let array = s.split(' ')
    let str = ''
    if(array.length <= 1) {
        let tmp = []
        tmp.push(user)
        str = runFunction(array[0].substring(1), tmp);
    } else {
        let functionName = array[0]
        array.shift()
        array.unshift(user)
        str = runFunction(functionName.substring(1), array)
    }
    return str
}

function runFunction(name, args)
{
    // ERR -> window is not defined -> možno použiť eval??
    var fn = window[name];
    if(typeof fn !== 'function')
        return;

    return fn.apply(window, args);
}

// Commandy
function duel(player, obet) {
    return 'Hrac ' + player + ' zautocil na hraca ' + obet
}

function garbage(player) {
    console.log('Hracovi ' + player + ' padol konsky kokot')
}