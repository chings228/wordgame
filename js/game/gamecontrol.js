

export default class GameControl{

    words;

    counter = 0;

    manifest;

    constructor(){


        // console.log(gameword)

        console.log("game control construccotr")

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


        bootbox.dialog({

            
            
            title : `${this.manifest.title}`,
            message : `${this.manifest.description}`,
            buttons:{

                cancel:{
                    label:"Cancel"
                },
                start:{
                    label : "Start",
                    className : 'btn-info',
                    callback : ()=>{

                        this.counter = 0;
                        gameword.reset()
                        this.setQuestion()
                        
                        
                    }

                }

            }
        })


        
      

    }


    setQuestion(){

        var question =  this.words[this.counter];


        gameword.setupword(question)

    }



    load(){

        $.get(`../../userdata/question/${qid}.txt`)
        .then(e=>{


            var data = JSON.parse(e)
  
            
            this.manifest = data.manifest;


            this.words = data.words;

            if (this.manifest.isRandom){

                console.log("random")

                this.words = this.words.sort( () => Math.random() - 0.5) 

                
            }

            console.log(this.words)

            this.start()
    
    
        })



    }



}