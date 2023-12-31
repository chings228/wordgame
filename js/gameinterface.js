







export default class GameInterface{


    data


    constructor(data){


        this.data = data
        console.log(data)




       

        this.setupAnswerField()

        this.setupContent()


    }


    setupContent(){

        var type = this.data.type

        console.log(type)

        if (type == "image"){

            $(".gametext").css("display","none")
            $(".gamevoice").css("display","none")
            $(".gameimg").css("display","block")

            this.setupContentImg()

        }
        else if (type == "text"){
            $(".gametext").css("display","block")
            $(".gamevoice").css("display","none")
            $(".gameimg").css("display","none")

        }
        else{

            $(".gametext").css("display","none")
            $(".gamevoice").css("display","block")
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