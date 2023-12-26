export default class GameControl{



    counter = 0;

    constructor(){


        console.log(gameword)

    }


    start(){




    }



    load(){

        $.get('./demo/json/test1.txt')
        .then(e=>{
    
            var data = JSON.parse(e)
    
            console.log(data)
    
    
        })



    }



}