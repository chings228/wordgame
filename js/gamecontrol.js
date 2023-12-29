export default class GameControl{



    counter = 0;

    data 

    constructor(){


        // console.log(gameword)

    }

    goNextQuestion(){

        if (this.counter == this.data.length - 1){
            return 0;
        }

        this.counter++;
        return this.counter
    }


    start(){


        console.log("start")
        console.log(this.data[this.counter])

        
        this.setQuestion()

    }


    setQuestion(){

        var question =  this.data[this.counter];

        console.log(question)


        console.log(question.word)
        console.log(question.word.length)

        gameword.setupword(question.word.toUpperCase())

    }



    load(){

        $.get('./demo/json/test2.txt')
        .then(e=>{
    
            var data = JSON.parse(e)
    
            console.log(data)

            this.data = data

            console.log(this.data)


            this.start()
    
    
        })



    }



}