

export default class GameWord{


    counter = 0;
    wordcount = 0;


    constructor(){

        console.log("gameword constructor")

        
    }


    addKeyboardListener(){

        document.addEventListener('keydown',e=>{
            console.log(this.counter)

   

            var key = e.key;
            var code = e.code;
            var keycode = e.keyCode;
            var isShift = e.shiftKey;

          
            console.log(keycode)



            

            if (keycode == 8 && this.counter > 0) {



                this.counter--

                var elementdiv = `#word_${this.counter} > .gamewordcharacter`
                $(elementdiv).html('')
            }
            else{

                if (((keycode >= 65 && keycode <= 90) || keycode == 189 || keycode == 32 || (keycode >= 48 && keycode <= 57)) && this.counter <=  this.wordcount - 1){


                    var elementdiv = `#word_${this.counter} > .gamewordcharacter`

                    console.log(elementdiv)
                    console.log($(elementdiv))

                    $(elementdiv).html(key.toUpperCase())





                    this.counter++
                }

                else{

                    // check answer 
                }



            }


        })






    }


    setupword(wordcount){

        this.wordcount = wordcount

        var wordcontainer = $(".gameword");


        var htmltext = '';



        for(var i=0; i<wordcount; i++){

            console.log(i)

            htmltext += `
            
               <div class='gamewordcharactercontainer' id='word_${i}'>

                <div class='gamewordcharacter'></div>
                <div class='gamewordcharacterhint'></div>

               </div>
            
            
            `


        }

        wordcontainer.html(htmltext)

        this.addKeyboardListener()
            
    }


}