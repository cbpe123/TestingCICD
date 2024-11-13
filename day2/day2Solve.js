const fs = require("fs");
let sum = 0;
let input = fs.readFileSync("./day2Data.txt").toString('utf-8').split("\n");
// let input = fs.readFileSync("./test.txt").toString().split("\r\n");
// console.log(input);
// let red = 12;
// let green = 13;
// let blue = 14;

input.forEach((str) => {
    let id = parseInt(str.match(/\d+/)[0]);
    let valid = true;

    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;
    // console.log(id);
    // let number = str.match(/;/g);
    // console.log(number.length)
    str = str.split(":")[1];
    let gameSets = str.split(";");
    gameSets.forEach((set)=>{
        // console.log(set);
        let setRed = 0;
        let setGreen = 0;
        let setBlue = 0;
        set.split(",").forEach((blocks) => {
            blocks = blocks.trim();
            // console.log(blocks.split(" "));
            let color = blocks.split(" ")[1];
            let amount = parseInt(blocks.split(" ")[0]);
            switch (color) {
                case "red": setRed = amount; break;
                case "green": setGreen = amount; break;
                case "blue": setBlue = amount; break;
                default: console.error("something happened"); break;
            }
        });

        if (setRed > maxRed) maxRed = setRed;
        if (setGreen > maxGreen) maxGreen = setGreen;
        if (setBlue > maxBlue) maxBlue = setBlue;

        // if (setRed > red || setGreen > green || setBlue > blue || !valid) {
        //     valid = false;
        //     // console.log(`Game ${id}: ${setRed} ${setGreen} ${setBlue} invalid`);
        // }
        // else {
        //     // console.log(`Game ${id}: ${setRed} ${setGreen} ${setBlue} valid`);
        // }
    });
    // if (valid) sum += id;

    let power = maxRed * maxGreen * maxBlue;
    sum += power;
});
console.log(sum);