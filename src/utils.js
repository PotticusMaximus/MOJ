function dateSetter(input){
    const rec = input.split('-');
    return (`${rec[2]}-${rec[1]}-${rec[0]}`)
}

module.exports = {
    dateSetter
}
