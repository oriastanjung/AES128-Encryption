const inputArray =[
    ["53", "41", "41", "4E"],
    ["4D", "52", "4E", "47"],
    ["4B", "41", "42", "53"],
    ["48", "50", "41", "41"],
  ];
  
function tekeColumnArrayAs1D(array, position){
    const result = [
        array[0][position-1],
        array[1][position-1],
        array[2][position-1],
        array[3][position-1],
    ]
    return result

}

module.exports = {
    tekeColumnArrayAs1D
}