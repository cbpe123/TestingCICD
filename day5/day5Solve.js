const fs = require("fs");
let rawAlmanac = fs.readFileSync("./input.txt").toString().split("\n\n");
// let rawAlmanac = fs.readFileSync("./test.txt").toString().split("\r\n\r\n");

// almanac = {
//     "seeds": [],
//     "seed-to-soil map": {
//         sourceStart:0,
//         sourceStop:1,
//         destinationStart:0
//     },
//     "soil-to-fertilizer map":[
//         {sourceStart:0,
//         sourceStop:1,
//         destinationStart:0}
//     ]
//     ...
// }
let almanac = _parseAlmanac(rawAlmanac);
console.log(almanac);
let smallestLocation = _findSmallestLocation();
console.log(smallestLocation);
let smallestLocationV2 = _findSmallestLocationV2();
console.log(smallestLocationV2);

function _parseAlmanac(rawAlmanac){
    let almanac = {};
    rawAlmanac.forEach((entry, index) => {
        let keyName = entry.split(":")[0];
        console.log(keyName);
        let tuples = entry.split("\n")
        // let tuples = entry.split("\r\n")
        tuples.shift();
        if(index !== 0){
            // console.log(tuples);
            let mappingArray = [];
            tuples.forEach((range) => {
                let endRanges = {};
                endRanges.sourceStart = parseInt(range.split(" ")[1]);
                endRanges.sourceStop = endRanges.sourceStart + parseInt(range.split(" ")[2])-1;
                endRanges.destinationStart = parseInt(range.split(" ")[0]);
                mappingArray.push(endRanges)
            });
            almanac[keyName] = mappingArray
        }
        else{
            let seedArray = [];
            tuples[0].split(" ").forEach((seed) =>{
                seedArray.push(parseInt(seed));
            });
            almanac[keyName] = seedArray;
        }
    });
    return almanac;
}

function _findSmallestLocation(){
    let smallestLocation = null;
    almanac.seeds.forEach((seed) => {
        let location = _findLocationForSeed(seed);
        if(!smallestLocation || smallestLocation > location){
            smallestLocation = location;
        }
    });
    return smallestLocation;
}

function _findSmallestLocationV2(){
        //         newSeeds.push(almanac.seeds[ii] + jj);

    let smallestLocation = null;
    // let newSeeds = [];
    for(let ii = 0; ii < almanac.seeds.length-1; ii += 2){
        console.log("started range", almanac.seeds[ii], "length", almanac.seeds[ii+1]);
        for(let jj = 0; jj < almanac.seeds[ii+1]; jj++){
            let location = _findLocationForSeed(almanac.seeds[ii] + jj);
            if(!smallestLocation || smallestLocation > location){
                smallestLocation = location;
            }
        }
        console.log("finished range", almanac.seeds[ii], "length", almanac.seeds[ii+1]);
    }
    // console.log(newSeeds)
    // newSeeds.forEach((seed) => {
    //     let location = _findLocationForSeed(seed);
    //     if(!smallestLocation || smallestLocation > location){
    //         smallestLocation = location;
    //     }
    // });
    return smallestLocation;
}

function _findLocationForSeed(seed){
    let soil = _findMapping(almanac["seed-to-soil map"], seed);
    let fertilizer = _findMapping(almanac["soil-to-fertilizer map"], soil);
    let water = _findMapping(almanac["fertilizer-to-water map"], fertilizer);
    let light = _findMapping(almanac["water-to-light map"], water);
    let temperature = _findMapping(almanac["light-to-temperature map"], light);
    let humidity = _findMapping(almanac["temperature-to-humidity map"], temperature);
    let location = _findMapping(almanac["humidity-to-location map"], humidity);
    return location;
}

function _findMapping(map, value){
    let ret = value;
    map.find((range) => {
        if(range.sourceStart <= value && range.sourceStop >= value){
            ret = value-range.sourceStart + range.destinationStart;
            return true;
        }
        return false;
    });
    return ret;
}