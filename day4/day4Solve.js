const fs = require("fs");
let rawCards = fs.readFileSync("./input.txt").toString().split("\n");
// let rawCards = fs.readFileSync("./test.txt").toString().split("\r\n");

let cards = _parseCards(rawCards);
console.log(cards);
let totalPoints = _sumWinningCards(cards);
console.log(totalPoints);
let totalCards = _calculateNumberOfCards(cards);
console.log(totalCards)
function _parseCards(rawCards){
    let ret = [];
    rawCards.forEach((rawCard) => {
        let newCard = {
            id: 0,
            winningNumbers: [],
            yourNumbers: []
        };
        newCard.id = parseInt(rawCard.split(":")[0].replace(/\s+/g, " ").split(" ")[1]);
        let allNumbers = rawCard.split(":")[1];
        newCard.winningNumbers = allNumbers.split("|")[0].trim().replace(/\s+/g, " ").split(" ").map((stringNum) => {
            return parseInt(stringNum);
        });
        newCard.yourNumbers = allNumbers.split("|")[1].trim().replace(/\s+/g, " ").split(" ").map((stringNum) => {
            return parseInt(stringNum);
        });
        ret.push(newCard);
    });
    return ret;
}

function _sumWinningCards(cards){
    return cards.reduce((totalSum, card) => {
        return totalSum + _calculateCardPoints(card)
    }, 0); 
}

function _calculateCardPoints(card){
    let counter = 0;
    card.yourNumbers.forEach((yourNumber)=>{
        if(card.winningNumbers.indexOf(yourNumber) > -1){
            counter++;
        }
    })
    // console.log("card number", card.id, "points", counter>0 ? Math.pow(2,counter-1):0)
    return counter>0 ? Math.pow(2,counter-1):0; 
}

function _calculateNumberOfCards(cards){
    let cardCounter = {};
    cards.forEach((card) => {
        let winningNumbers = _calculateWinningNumbers(card);
        if(!cardCounter[card.id]){
            cardCounter[card.id] = 1;
        }
        else{
            cardCounter[card.id] = cardCounter[card.id] + 1;
        }
        for(let ii = 1; ii <= winningNumbers; ii++){
            cardCounter[card.id+ii] = (cardCounter[card.id+ii] || 0) +  cardCounter[card.id];
        }
    });
    console.log(cardCounter);
    let sum = 0;
    Object.values(cardCounter).forEach((value) => {
        sum += value;
    });
    return sum;
}

function _calculateWinningNumbers(card){
    let counter = 0;
    card.yourNumbers.forEach((yourNumber)=>{
        if(card.winningNumbers.indexOf(yourNumber) > -1){
            counter++;
        }
    })
    // console.log("card number", card.id, "points", counter>0 ? Math.pow(2,counter-1):0)
    return counter;
}
