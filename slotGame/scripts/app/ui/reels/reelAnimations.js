export {ReelAnims}

let ReelAnims = {
    start:{ 
        duration:0.5,
        fromVars:{y:0,ease:Back.easeIn.config(1.7)},
        toVars:{y:302.5}
    },
    loop:{ 
        duration:0.5,
        fromVars:{y:0},
        toVars:{y:484}
    },
    stop:{ 
        duration:0.5,
        fromVars:{y:0},
        toVars:{y:363,ease: Back.easeOut.config(1.7)}
    },
    win:{
        duration:0.5,
        toVars:{x:1.5,y:1.5}
    }
}