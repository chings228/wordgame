
import GameControl from "./gamecontrol.js"
import GameWord from "./wordplay.js"


var gameword , gamecontrol




$(function(){

    

    if (window.location.hostname != "dev.fillanswer.com") {

            console.log = function () { };

        
    }

    console.log("jquery")


    console.log(qid);

    console.log(window.location)

    gameword = new GameWord()

    window.gameword = gameword

    gamecontrol = new GameControl()

    window.gamecontrol = gamecontrol

    console.log(title,description);

    document.title = title;

    const titleHypen = title.replace(" ","-");

    window.history.pushState('data',title, `${window.location.origin}/q/${qid}/${titleHypen}`)

    bootbox.setDefaults({

        backdrop: true,
        closeButton: true,
        centerVertical: true
    })



    gamecontrol.load()


    // $("#sharebtn").click(e=>{
    //     console.log("share")


//         if (navigator.share) {
//             navigator.share({
//                 title: 'Web Share API Draft',
//                 text: 'Take a look at this spec!',
//                 url: 'https://wicg.github.io/web-share/#share-method',
//               })
//               .then(() => console.log('Successful share'))
//               .catch((error) => console.log('Error sharing', error));
//           } else {
//             console.log('Share not supported on this browser, do it the old way.');
//           }
//     })


//     if (window.navigator.maxTouchPoints > 1){
//         alert("this is mobile")
//     }
//     else{
//         alert("this is desktop")
//     }



//     const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
// if (isMobile) {
//   /* your code here */
//   alert("useragent this is mobile")
// }
// else{
//     alert("ua desktop")
// }

})





