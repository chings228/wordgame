
import GameControl from "./gamecontrol.js"
import GameWord from "./gameword.js"


var gameword , gamecontrol




$(function(){

    console.log("jquery")

    gameword = new GameWord()

    window.gameword = gameword

    gamecontrol = new GameControl()

    window.gamecontrol = gamecontrol


    //  gameword.setupword(8)
    




    //$("#word_1 > .gamewordcharacter").html("c")


    gamecontrol.load()

})





