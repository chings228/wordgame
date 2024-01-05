

export default class GameControl{

    words;

    counter = 0;

    manifest;

    constructor(){


        // console.log(gameword)

    }

    goNextQuestion(){

        if (this.counter == this.words.length - 1){
            return 0;
        }

        this.counter++;
        return this.counter
    }


    start(){


        console.log("start")
        //console.log(this.words[this.counter])

        
        this.setQuestion()

    }


    setQuestion(){

        var question =  this.words[this.counter];

        //console.log(question)


        //console.log(question.word)
        //console.log(question.word.length)

        gameword.setupword(question)

    }



    load(){

        $.get('./demo/json/test4.txt')
        .then(e=>{

            //console.log(e)
    
            var data = JSON.parse(e)
    
            //console.log(data)

            this.words = data.words;
            this.manifest = data.manifest;



            this.start()
    
    
        })



    }



}