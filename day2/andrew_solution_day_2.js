const fs = require("fs");
let sumValidGameIDs = 0;
let sumGamePowers = 0;
let rawGames = fs.readFileSync("./day2Data.txt").toString('utf-8').split("\n");
// let rawGames = fs.readFileSync("./test.txt").toString().split("\r\n");

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

rawGames.forEach(function(rawGame) {
  let game = _parseGame(rawGame);
  console.log(game);
  if (_isValidGame(game)) {
    console.log('Game is valid!');
    sumValidGameIDs += game.id;
  }
  let power = _calculatePower(game);
  console.log('Power', power);
  sumGamePowers += power;
});

console.log('Sum of valid game ids', sumValidGameIDs);
console.log('Sum of game power', sumGamePowers);

function _parseGame(rawGame) {
  let id = parseInt(rawGame.match(/\d+/)[0]);
  let sets = _parseGameSets(rawGame.split(":")[1].split(";"));
  return {id, sets};
}

function _parseGameSets(rawGameSets) {
  let ret = [];
  rawGameSets.forEach(function(rawSet) {
    let set = {
      red: 0,
      green: 0,
      blue: 0
    };
    rawSet.split(",").forEach((blocks) => {
      let [amount, color] = blocks.trim().split(" ");
      set[color] = parseInt(amount);
    });
    ret.push(set);
  });
  return ret;
}

function _isValidGame(game) {
  return game.sets.every(_isValidSet);
}

function _isValidSet(gameSet) {
  return gameSet.red <= MAX_RED && gameSet.green <= MAX_GREEN && gameSet.blue <= MAX_BLUE;
}

function _calculatePower(game) {
  let maxCubes = _gameMaxCubes(game);
  console.log('Max cubes', maxCubes);
  return maxCubes['red'] * maxCubes['green'] * maxCubes['blue'];
}

function _gameMaxCubes(game) {
  let ret = {red: 0, green: 0, blue: 0};
  let maxRed = game.sets.map((set) => { return set.red}).reduce((max, current) => (current > max) ? current : max);
  let maxGreen = game.sets.map((set) => { return set.green}).reduce((max, current) => (current > max) ? current : max);
  let maxBlue = game.sets.map((set) => { return set.blue}).reduce((max, current) => (current > max) ? current : max);
  ret.red = maxRed;
  ret.green = maxGreen;
  ret.blue = maxBlue;
  return ret;
}