export {ReelsSettings}

let ReelsSettings = {
    reelSets:[[3,0,1,0,2,0,4,0,5,0],[3,0,1,0,2,0,4,0,5,0],[3,0,1,0,2,0,4,0,5,0]],
    reelsCount:3,
    initialStopPositions:[0,9,6],
    symbolMap:[
        {id:0,name:"EMPTY"},
        {id:1,name:"BAR"},
        {id:2,name:"BAR_2"},
        {id:3,name:"BAR_3"},
        {id:4,name:"SYM_7"},
        {id:5,name:"CHERRY"}
    ],
    winLines:[0,1,2],
    winLinesNames:["TOP","CENTER","BOTTOM"],
    paytableMap:[
        {lineIds:[0],symbolIds:[5],symbolCount:3,winAmount:2000},
        {lineIds:[1],symbolIds:[5],symbolCount:3,winAmount:1000},
        {lineIds:[2],symbolIds:[5],symbolCount:3,winAmount:4000},
        {lineIds:[0,1,2],symbolIds:[4],symbolCount:3,winAmount:150},
        {lineIds:[0,1,2],symbolIds:[4,5],symbolCount:3,winAmount:75},
        {lineIds:[0,1,2],symbolIds:[3],symbolCount:3,winAmount:50},
        {lineIds:[0,1,2],symbolIds:[2],symbolCount:3,winAmount:20},
        {lineIds:[0,1,2],symbolIds:[1],symbolCount:3,winAmount:10},
        {lineIds:[0,1,2],symbolIds:[1,2,3],symbolCount:3,winAmount:5},
    ]
}