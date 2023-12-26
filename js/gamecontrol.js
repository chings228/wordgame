export default class GameControl{



    counter = 0;

    data 

    constructor(){


        console.log(gameword)

    }


    start(){


        console.log("start")
        console.log(this.data[this.counter])

        
        this.setQuestion()

    }


    setQuestion(){

        var question =  this.data[this.counter];

        console.log(question)

    }



    load(){

        $.get('./demo/json/test1.txt')
        .then(e=>{
    
            var data = JSON.parse(e)
    
            console.log(data)

            this.data = data

            console.log(this.data)


            this.start()
    
    
        })



    }



}