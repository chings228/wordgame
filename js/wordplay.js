import GameInterface from "./gameinterface.js";

export default class GameWord{


    guessCounter = 0;
    wordcount = 0;
    word;

    hintTimer;
    hintCounter = 0;

    isKeyboard = true;

    isEnd = false;

    defaultTimerHintStart = 2000

    // variable depend on answer length 
    timerHintStart 


    timerHintNextCharacterShow = 800

    timerNextWordShow = 1000

    totalScore = 0;

    pointForQuestion = 100;


    points = [];
    words = [];

    //speedfactor = 0.2
    speedfactor = 1;
 

    constructor(){

        console.log("gameword constructor")

        this.timerHintNextCharacterShow *= this.speedfactor
        this.timerNextWordShow *= this.speedfactor
        this.defaultTimerHintStart *= this.speedfactor


        document.addEventListener("keydown",e=>{

            if (this.isKeyboard){
                this.keytype(e)
            }
           
        })



   




        
    }







    keytype(e){

  

            let key = e.key;

            let keycode = e.keyCode;

           

            if (keycode == 8 && this.guessCounter > 0) {



                this.guessCounter--

                let elementdiv = `#word_${this.guessCounter} > .gamewordcharacter`
                $(elementdiv).html('')
            }
            else{

                if (((keycode >= 65 && keycode <= 90) || keycode == 189 || keycode == 32 || (keycode >= 48 && keycode <= 57)) && this.guessCounter < this.word.length ){


                    var elementdiv = `#word_${this.guessCounter} > .gamewordcharacter`


                    $(elementdiv).html(key.toUpperCase())



                    this.guessCounter++


                    if (this.guessCounter > this.word.length - 1){

                        console.log("check answer")
                        this.checkanswer();
                    }

                }





            }


        






    }



    checkanswer(){

        var guess = ''

        for (var i=0 ; i<this.word.length ; i++){


            var elementdiv = `#word_${i} > .gamewordcharacter`

            guess += $(elementdiv).html()
        }

        // console.log(guess)

        // console.log(this.word)



        if  (guess == this.word){



            var mark = 100;

            
            // animation score 


            clearTimeout(this.hintTimer)

            if (this.hintCounter > 0){
                mark *= 0.8;

                if (this.hintCounter > 1){

                    var numberOfWord = this.word.length-1;

                    mark *= ( (numberOfWord - this.hintCounter + 1) / numberOfWord)

                }




            }






            ////////


            $("#gamepointgain").html(`+${Math.round(mark)}`)

            document.getElementById('gamepointgain').style.animation="pointgainanimation 0.5s cubic-bezier(1, 0.03, 1, 1)";


            this.totalScore += mark

            this.points.push(Math.round(mark))

            console.log(this.totalScore)

            var that = this
            setTimeout(function(){

                $("#score").html(Math.round(that.totalScore))
            },500)
          
            
            
            this.isKeyboard = false

            console.log("bingo")
            this.isKeyboard= false;
            this.goNextWord()

            

            

        }

       
    }



    goNextWord(){

        clearTimeout(this.hintTimer)

        this.guessCounter = 0;
        this.hintCounter = 0;

        console.log("go Next word");

        var flag = gamecontrol.goNextQuestion()

        console.log("gamecontrol",flag)

        if (flag != 0){

            var that = this
            setTimeout(function(){

                document.getElementById('gamepointgain').style.animation="";

                that.guessCounter = 0;
                that.hintCounter = 0;
    
                gamecontrol.setQuestion()
    
                that.isKeyboard = true
    
    
           

            },this.timerNextWordShow)

        }
        else{
            console.log("end of test")
            this.endOfTest()
        }



    }





    endOfTest(){

        this.isEnd = true;
        this.isKeyboard = false;

        clearTimeout(this.hintTimer)

        console.log(this.points)


        console.log(gamecontrol.words)
        var html = `<div class=dialog_result_container>`

        var counter = 0
        this.points.forEach(e=>{

            console.log(e)

            var word = gamecontrol.words[counter].word.toUpperCase();

            

            html += `
            <div class=dialog_result_row>
            <div class=dialog_result_word>${word}</div>

            <div class= dialog_result_mark>${e}</div>
            </div>
            
            `

            counter++;
        })

        html += `</div>`

        bootbox.dialog({
            
            title : "Result",
            message:html
           

        })

        
    }




    setupword(data){

        this.word = data.word.toUpperCase()


        // increase additional time for start hint 


        var additonalstarthinttimefactor = Math.floor(this.word.length / 7) 

        //console.log(additonalstarthinttimefactor)

        this.timerHintStart  = this.defaultTimerHintStart + additonalstarthinttimefactor * 500

        //console.log(this.word.length,this.timerHintStart)
        
        var gameinterface = new GameInterface(data)

        gameinterface.setupContent(e=>{

           // console.log(e)

            if (e){


                //console.log(word)
                

                // timer for starting show hint 

                var that = this

                setTimeout(function(){


                    that.showHint()

                },this.timerHintStart)


            }


        })





        
            
    }


    showHint(){


        if (this.isEnd){
            return
        }



        var character = this.word.charAt(this.hintCounter)




        var elementdiv = `#word_${this.hintCounter} > .gamewordcharacterhint`


        $(`#word_${this.hintCounter}`).css("border-color","blue")

        $(elementdiv).html(character.toUpperCase())




        if (this.hintCounter < this.word.length - 1 ){

            this.hintCounter ++

            var that = this

            that.hintTimer = setTimeout(function(){


                that.showHint()
            },this.timerHintNextCharacterShow)

        }
        else{

            //this.isKeyboard = false

            console.log("hint finish jump next")

          this.points.push(0)

          console.log(this.points)

            this.goNextWord()

        }


    }


}