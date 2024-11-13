const fs = require("fs");
let sum = 0;
let input = fs.readFileSync("./day1Data.txt").toString('utf-8').split("\r\n");
console.log(input);


input.forEach((str)=>{
    console.log(str);
    str = str.replace(/one/g, "one1one");
    str = str.replace(/two/g, "two2two");
    str = str.replace(/three/g, "three3three");
    str = str.replace(/four/g, "four4four");
    str = str.replace(/five/g, "five5five");
    str = str.replace(/six/g, "six6six");
    str = str.replace(/seven/g, "seven7seven");
    str = str.replace(/eight/g, "eight8eight");
    str = str.replace(/nine/g, "nine9nine");
    console.log(str);

    //23bszpdxfjmzg
    for(let i of str){
        if(parseInt(i)){
            sum += parseInt(i) * 10;
            break;
        }
    }
    for(let i in str){
        let temp = str[str.length-i-1]
        if(parseInt(temp)){
            sum += parseInt(temp);
            break;
        }
    }
    // console.log(sum);
});
console.log(sum);