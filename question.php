<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Word Games</title>
    <link rel="stylesheet" href="../../css/main.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/jqueryui@1.11.1/jquery-ui.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous"></script>
  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
  
  <script src="https://cdn.jsdelivr.net/npm/bootbox@5.5.2/dist/bootbox.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootbox@5.5.2/dist/bootbox.locales.min.js"></script>


    
    
    <?php

        // get qid from the link after mod_rewrite
        if (isset($_GET['qid'])){

            $qid = $_GET['qid'];
            echo("<script>const qid = '$qid'</script>") ;



        }
        else{
            header("Location: https://$_SERVER[HTTP_HOST]");
        }



        $jsonstr = file_get_contents("../userdata/question/$qid.txt");

        $json = json_decode($jsonstr,false);
   

        $title = $json->manifest->title;
        $description = $json->manifest->description;

        echo("<script>const title = '$title' ; const description='$description'</script>");

        $shareurl = "https://".$_SERVER['HTTP_HOST']."/q/$qid/".str_replace(" ","-",$title);

       echo("

       <title>$title</title>
        <meta property='og:title' content='$title' />
 
        <meta property='og:description' content='$description' />

        <meta property='og:url' content='$shareurl'>

        <meta property='twitter:url' content='$shareurl'>
        <meta name='twitter:title' content='$title'>
        <meta name='twitter:description' content='$description'>

        <meta name='description' content='$description'>
        ");

       

        // <!-- HTML Meta Tags -->
        // <title>Kitchen Vocabulary</title>

        
        // <!-- Facebook Meta Tags -->


        // <meta property="og:image" content="">
        
        // <!-- Twitter Meta Tags -->
        // <meta name="twitter:card" content="summary_large_image">
        // <meta property="twitter:domain" content="dev.fillanswer.com">



        // <meta name="twitter:image" content="">



    ?>
     <meta property="og:type" content="website">

    <script type=module src="../../js/game/app.js?v=1" defer></script>






</head>
<body>
    

    <div class=container>

        <div class="gamedetail">

            <div id=score>0</div>

        </div>

        <div class="gamecontent gameimg"></div>

        <div class="gamecontent gametext">
            <div class="gametextquestion"></div>
        </div>

        <div class="gamecontent gamevoice">

            <div class="gamevoicecontainer">

                <img class="voicebtn" src="../../assets/image/voiceplay_musicnote.svg">

            </div>

        </div>



        <div class="gamewordcontainer">



            <div id="gamepointgain">

                
            </div>


            <div class="gameword">


  



            </div>


            
    

        </div>


        
    </div>



</body>
</html>
