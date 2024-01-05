







export default class GameInterface{


    data


    constructor(data){


        this.data = data
        console.log(data)
        this.setupAnswerField()

        this.adjustGuessConfig()

       

        //this.setupContent()


    }





    adjustGuessConfig(){



       const maxGuessWidth = 40

        let fullwidth = $(".gameword").width()



        let marginLeft =  parseInt($(".gamewordcharactercontainer").css("margin-left").replace("px",""))


        let guesswidth = fullwidth / this.data.word.length - marginLeft


        guesswidth = Math.min(maxGuessWidth,guesswidth)

        let guessheight  = guesswidth * 1.8

        let  guessfontsize =  guesswidth * 1



        $("body").get(0).style.setProperty("--guesswordcharacter-height",`${guessheight}px`)
        $("body").get(0).style.setProperty("--guesswordcharacter-width",`${guesswidth}px`)
        $("body").get(0).style.setProperty("--guesswordcharacter-fontsize",`${guessfontsize}px`)

    }


    setupContent(callback){

        var type = this.data.type

        console.log(type)

        if (type == "image"){

            $(".gametext").css("display","none")
            $(".gamevoice").css("display","none")
            $(".gameimg").css("display","flex")

            var imglink = this.data.image


            console.log(imglink)
    
    
            // var html = `<img src='demo/img/${imglink}'>`
    
            // $(".gameimg").html(html)

            var html = `<img id=guessimg>`
            $(".gameimg").html(html)

            var img = document.getElementById("guessimg")

            img.onload =()=>{
                //console.log("img done")
                callback(true)
            }

            img.src = `demo/img/${imglink}`
            



            

        }
        else if (type == "text"){
            $(".gametext").css("display","flex")
            $(".gamevoice").css("display","none")
            $(".gameimg").css("display","none")


            $(".gametextquestion").html(this.data.question)


            console.log(this.data.question.length)
            callback(true)

        }
        else{

            $(".gametext").css("display","none")
            $(".gamevoice").css("display","flex")
            $(".gameimg").css("display","none")


            //callback(true)

            const voicelink = `./demo/voice/${this.data.voice}`;

            let audio = new Audio()

            audio.src = voicelink

            $(audio).on("loadedmetadata",()=>{

                console.log(audio.duration);

                $(".voicebtn").attr("src","./assets/voiceplay_black.svg");

                $(".voicebtn").click(e=>{

                    audio.play()



                })

                audio.onended = ()=>{
                    console.log("on end")

                //     $(".voicebtn").off("click")
                //    audio.src = ''

                   setTimeout(function(){

                    callback(true)
                   },1000)

                    
                    
                }

            })

            

        }



        




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