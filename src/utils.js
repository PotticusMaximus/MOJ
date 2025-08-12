function dateSetter(input){
    const rec = input.split('-');
    console.log(input);
    return (`${rec[2]}-${rec[1]}-${rec[0]}`)
}

module.exports = {
    dateSetter
}
