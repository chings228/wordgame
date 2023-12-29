

export default class GameWord{


    guessCounter = 0;
    wordcount = 0;
    word;

    hintTimer;
    hintCounter = 0;

    isKeyboard = true;


    timerHintStart = 2000
    timerHintNextCharacterShow = 1000


    constructor(){

        console.log("gameword constructor")


        document.addEventListener("keydown",e=>{

            if (this.isKeyboard){
                this.keytype(e)
            }
           
        })

        
    }







    keytype(e){

            console.log(this.guessCounter)

   

            var key = e.key;

            var keycode = e.keyCode;


            if (keycode == 8 && this.guessCounter > 0) {



                this.guessCounter--

                var elementdiv = `#word_${this.guessCounter} > .gamewordcharacter`
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

        console.log(guess)


        if  (guess == this.word){

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

        console.log(gamecontrol)

        if (gamecontrol.goNextQuestion() != 0){

            var that = this
        setTimeout(function(){

          

                that.guessCounter = 0;
                that.hintCounter = 0;
    
                gamecontrol.setQuestion()
    
                that.isKeyboard = true
    
    
           

        },1000)

    }
    else{
        console.log("end of test")
        this.endOfTest()
    }


        

    }





endOfTest(){

    console.log("end of test")

    bootbox.alert({
        
        message:"sfsfsfsf",
        centerVertical:true

    })
}




    setupword(word){

        console.log(word)
        this.word = word 


        var wordcontainer = $(".gameword");


        var htmltext = '';



        for(var i=0; i<this.word.length; i++){

            //console.log(i)

            htmltext += `
            
               <div class='gamewordcharactercontainer' id='word_${i}'>

                <div class='gamewordcharacter'></div>
                <div class='gamewordcharacterhint'></div>

               </div>
            
            
            `


        }

        wordcontainer.html(htmltext)


        // timer for starting show hint 

        var that = this

        setTimeout(function(){


            that.showHint()

        },this.timerHintStart)

        
            
    }


    showHint(){



        var character = this.word.charAt(this.hintCounter)




        var elementdiv = `#word_${this.hintCounter} > .gamewordcharacterhint`



        $(elementdiv).html(character.toUpperCase())




        if (this.hintCounter < this.word.length - 1 && this.isKeyboard == true){

            this.hintCounter ++

            var that = this

            that.hintTimer = setTimeout(function(){


                that.showHint()
            },this.timerHintNextCharacterShow)

        }
        else{

            //this.isKeyboard = false

            console.log("next")

            this.goNextWord()

        }


    }


}