







export default class GameInterface{


    data


    constructor(data){


        this.data = data
        console.log(data)


        this.adjustGuessConfig()

        this.setupAnswerField()

        this.setupContent()


    }



    adjustGuessConfig(){



        var factor = 1



        console.log(this.data.word.length)

        if (this.data.word.length > 20){
            factor = 0.4;
        }
        else if (this.data.word.length > 15){

            factor = 0.6;

        }

        else   if (this.data.word.length > 10){

            factor = 0.8;

            
        }



        var guessheight = 80 * factor;
        var guesswidth = 60 * factor;
        var guessfontsize = 50 * factor;

        $("body").get(0).style.setProperty("--guesswordcharacter-height",`${guessheight}px`)
        $("body").get(0).style.setProperty("--guesswordcharacter-width",`${guesswidth}px`)
        $("body").get(0).style.setProperty("--guesswordcharacter-fontsize",`${guessfontsize}px`)

    }


    setupContent(){

        var type = this.data.type

        console.log(type)

        if (type == "image"){

            $(".gametext").css("display","none")
            $(".gamevoice").css("display","none")
            $(".gameimg").css("display","flex")

            this.setupContentImg()

        }
        else if (type == "text"){
            $(".gametext").css("display","flex")
            $(".gamevoice").css("display","none")
            $(".gameimg").css("display","none")

        }
        else{

            $(".gametext").css("display","none")
            $(".gamevoice").css("display","flex")
            $(".gameimg").css("display","none")

        }








    }


    setupContentImg(){

        var imglink = this.data.image


        console.log(imglink)


        var html = `<img src='demo/img/${imglink}'>`

        $(".gameimg").html(html)

    }


    setupContentText(){

    }

    setupContentVoice(){


    }


    setupAnswerField(){

        var wordcontainer = $(".gameword");


        var htmltext = '';



        for(var i=0; i<this.data.word.length; i++){

            //console.log(i)

            htmltext += `
            
               <div class='gamewordcharactercontainer' id='word_${i}'>

                <div class='gamewordcharacter'></div>
                <div class='gamewordcharacterhint'></div>

               </div>
            
            
            `


        }

        wordcontainer.html(htmltext)


    }













}