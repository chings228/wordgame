import GameInterface from "./gameinterface.js";

export default class GameWord{


    guessCounter = 0;
    wordcount = 0;
    word;

    hintTimer;
    initHintTimer;
    hintCounter = 0;


    isKeyboard = true;

    isEnd = false;

    defaulttimerHintStartVal= 1500

    // variable depend on answer length 
    timerHintStartVal


    timerHintNextCharacterShowVal = 1000

    timerNextWordShowVal = 1000

    totalScore = 0;

    pointForQuestion = 100;


    points = [];
    words = [];

    speedfactor = 0.2
   speedfactor = 1;
 

    constructor(){

        console.log("gameword constructor")

        this.timerHintNextCharacterShowVal *= this.speedfactor
        this.timerNextWordShowVal *= this.speedfactor
        this.defaulttimerHintStartVal*= this.speedfactor


        document.addEventListener("keydown",e=>{

            if (this.isKeyboard){
                this.keytype(e)
            }
           
        })



   




        
    }


    reset(){

        $("#score").html(0);
        this.totalScore = 0;
        this.guessCounter = 0;
        this.hintCounter = 0;
        this.isEnd = false;
        this.points = [];
        this.words = [];
        this.isKeyboard = true;
    


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


                    const elementdiv = `#word_${this.guessCounter} > .gamewordcharacter`


                    $(elementdiv).html(key.toUpperCase())

                    this.changeBottomLineToRedIfNotMatch()

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


            this.totalScore += Math.round(mark)

            this.points.push(Math.round(mark))

            console.log(this.totalScore)

        
            setTimeout(()=>{

                $("#score").html(Math.round(this.totalScore))
            },500)
          
            
            
            this.isKeyboard = false

            console.log("bingo")
            this.isKeyboard= false;
            this.goNextWord()

            

            

        }

       
    }



    goNextWord(){

        clearTimeout(this.hintTimer)
        clearTimeout(this.initHintTimer)


        this.guessCounter = 0;
        this.hintCounter = 0;

        console.log("go Next word");

        var flag = gamecontrol.goNextQuestion()

        console.log("gamecontrol",flag)

        if (flag != 0){

            
            setTimeout(()=>{

                document.getElementById('gamepointgain').style.animation="";

                this.guessCounter = 0;
                this.hintCounter = 0;
    
                gamecontrol.setQuestion()
    
                this.isKeyboard = true
    
    
           

            },this.timerNextWordShowVal)

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
        clearTimeout(this.initHintTimer)

        console.log(this.points)




        console.log(gamecontrol.words)
        var html = `<div class=dialog_result_container>`

        var counter = 0

        console.log(gamecontrol.words , counter)
        this.points.forEach(e=>{

            console.log(e,counter)

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

        console.log(this.totalScore,gamecontrol.words.length);

        console.log(this.totalScore/(gamecontrol.words.length*100));

        bootbox.dialog({
            
            title : `Result - ${Math.round(parseInt(this.totalScore)/(parseInt(gamecontrol.words.length)))}% (${this.totalScore} / ${gamecontrol.words.length * 100}) `,
            message:html,


            buttons:{

                cancel:{
                    label:"Cancel"
                },
                restart:{
                    label:"Restart",
                    className : "btn-info",
                    callback : ()=>{

                        gamecontrol.start()

                    }
                }




            }
           

        })

        
    }




    setupword(data){

        this.word = data.word.toUpperCase()


        // increase additional time for start hint 


        var additonalstarthinttimefactor = Math.floor(this.word.length / 7) 

        //console.log(additonalstarthinttimefactor)

        this.timerHintStartVal = this.defaulttimerHintStartVal+ additonalstarthinttimefactor * 500

        console.log("timerhintstartval",this.word.length,this.timerHintStartVal)
        
        let gameinterface = new GameInterface(data)

        gameinterface.setupContent(e=>{


            var starttime = Date.now();

           console.log("finishinterface start ",starttime)

            if (e){


                //console.log(word)
                

                // timer for starting show hint 

                

               this.initHintTimer = setTimeout(()=>{

                var diff = Date.now() -  starttime;

                console.log("finishinterface end ",diff)
                    this.showHint()

                  

                },this.timerHintStartVal)


            }


        })





        
            
    }


    changeBottomLineToRedIfNotMatch(){

        for (var i =0 ; i<this.word.length ; i++){


            const hintchardiv = `#word_${i} > .gamewordcharacterhint`
            const answerchardiv = `#word_${i} > .gamewordcharacter`

            const hintchar = $(hintchardiv).html();
            const answerchar = $(answerchardiv).html();

            let linecolor = "blue";

            console.log(hintchar,answerchar)



            if (hintchar != '' && answerchar != ''){

                if (hintchar != answerchar){

                    linecolor = "red"
                }


            } 
            else if (hintchar == ''){
                    linecolor = "black"
            }



            $(`#word_${i}`).css("border-color",`${linecolor}`)


        }


    }


    showHint(){


        if (this.isEnd){
            return
        }



        var character = this.word.charAt(this.hintCounter)




        var elementdiv = `#word_${this.hintCounter} > .gamewordcharacterhint`


        $(elementdiv).html(character.toUpperCase())


        this.changeBottomLineToRedIfNotMatch()

        if (this.hintCounter < this.word.length - 1 ){

            this.hintCounter ++



           this.hintTimer = setTimeout(()=>{
                console.log("show next hint ",Date.now())

                this.showHint()
            },this.timerHintNextCharacterShowVal)

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