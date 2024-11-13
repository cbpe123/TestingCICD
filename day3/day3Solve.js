const fs = require("fs");
let rawSchematic = fs.readFileSync("./input.txt").toString().split("\n");
// let rawSchematic = fs.readFileSync("./test.txt").toString().split("\r\n");
// % * # & $ @ / = + -
//     /[\%,\*,\#,\&,\$,\@,\/,\=,\+,\-]/    REGEX TO MATCH SPECIAL CHARACTERS

// numbers = [
//     {

//        coords: [
//            {
        //         x: 1
        //         y: 1
        //     }
        //    ]
        // id: 1234
//     }
// ]

// specialCharacters = [
//     {
//         x: 0,
//         y: 0,
//         char: $
//     }
// ]

let specialCharacters = _findSpecialCharacters(rawSchematic);
let partNumbers = _findPartNumbers(rawSchematic);
// console.log(specialCharacters);
// console.log(partNumbers);
let sum = _sumValidPartNumbers()
console.log("The sum of part numbers is", sum);
let gearRatioSum = _getGearRatioSum();
console.log(gearRatioSum);
function _findSpecialCharacters(schematic) {
    let ret = [];
    schematic.forEach((rawRow, y) => {
        let matches = [...rawRow.matchAll(/[\%,\*,\#,\&,\$,\@,\/,\=,\+,\-]/g)];
        matches.forEach((match) => {
            ret.push({
                x: match.index,
                y: y,
                char: match[0]
            });
        }); 
    });
    return ret;
}

function _findPartNumbers(schematic){
    let ret = [];
    schematic.forEach((row, y) => {
        let matches = [...row.matchAll(/\d+/g)];
        matches.forEach((match) => {
            let partNumber = {};
            partNumber.id = parseInt(match[0]);
            partNumber.coords = [];
            for(let index in match[0]){
                partNumber.coords.push({
                    x: parseInt(index) + match.index,
                    y: y,
                    digit: match[0][index]
                })
            }
            ret.push(partNumber);
        });
    });
    return ret;
}

function _sumValidPartNumbers(){
    let sum = 0;
    partNumbers.forEach((partNumber) =>{
        if(_isValidPartNumber(partNumber)){
            console.log(partNumber.id + " is valid");
            sum += partNumber.id;
        }
        else{
            console.log(partNumber.id + " is invalid");
        }
    });
    return sum;
}

function _isValidPartNumber(partNumber){
    // let valid = false;
    return partNumber.coords.some((coord) => {
        return specialCharacters.some((character) => {
            return Math.abs(coord.x-character.x) <= 1 && Math.abs(coord.y - character.y) <= 1;
        })
    });
}

function _getGearRatioSum(){
    let sum = 0;
    specialCharacters.forEach((specialCharacter) =>{
        // _isValidGear(specialCharacter);
        if(specialCharacter.char === "*"){
            let adjacentPartNumbers = _getAdjacentPartNumbers(specialCharacter);
            if(adjacentPartNumbers.length === 2){
                sum += adjacentPartNumbers[0].id * adjacentPartNumbers[1].id;
            }
        }
    });
    return sum;
}

function _getAdjacentPartNumbers(specialCharacter){
    let ret = [];
    partNumbers.forEach((partNumber) =>{
        let isAdjacent = partNumber.coords.some((coord) => {
            return Math.abs(coord.x-specialCharacter.x) <= 1 && Math.abs(coord.y - specialCharacter.y) <= 1;
        });
        if(isAdjacent){
            ret.push(partNumber);
        }
    });
    return ret;
}