// click top left corner to trigger video for quick QA and debugging
$("div.number").click(function(){
    $('video').exists(function() {
          setTimeout(function(){
              $("#wipe1").addClass( "active" );
              $("video").get(0).play();
          },  200);  
          setTimeout(function(){
              $("#wipe2").addClass( "active" );
          },  400);  
          setTimeout(function(){
              $(".video-trigger").addClass( "active" );
          }, 500);

          setTimeout(function(){
              $(".lower-third").addClass( "active" );
          }, 3000);
      
          setTimeout(function(){
              $(".trailer-text").addClass( "active" );
          }, 3500);
      
          setTimeout(function(){
//              $("body").addClass( "blackout" );
          }, 6500);
    });
});



/////////////////////////////////////////////
//                                         //
//          Animation Opt Engine           //
//                                         //
/////////////////////////////////////////////



// Start FPS analysis
function optEngine(i) {
    
    setTimeout(function(){
        console.log(fps.innerHTML);
    }, 200);
}

    var optLVL = 0;
    var results = document.getElementById("results");

// When the console updates FPS add classes
$('#fps').bind("DOMSubtreeModified",function(){
    
    var str = this.innerHTML;
    var res = str.split("/");
    
    OptFPS = res[0];
    OptPAINT = res[1];
    
    // Watch for 32 FPS, too close!
    if (OptFPS < 25) {
        optLVL = optLVL+1;
        console.log("!FPS DROP: " + OptFPS + "fps Optimize Level: " + optLVL);
    }
    switch(optLVL) {
        case 5: 
            $('.bg').addClass( "paused" );
            console.log('".bg" pasused');
            break
        case 6: 
            $('body').removeClass('flash')
            console.log('.flashing lights disabled');
            break
    }
});


/////////////////////////////////////////////
//                                         //
//           Animation Variables           //
//                                         //
/////////////////////////////////////////////

// General
var seconds = 1000;
var blackoutTimer = 500; // 100ms


// Intro Logo (from 0 seconds)
var introTimer = 1 * seconds;
var slidesTimer = 2 * seconds;
var slidesStart = 3 * seconds; 


// Trivia Slider //

var slideCount = $('.trivia').length;
var slideDuration = 5.5 * seconds;
// Legnth of pivot effect
var slideTransition = 1 * seconds; 
// Total Duration of slides
var totalSlideDuration = (slideDuration*slideCount)+slideDuration;

// Video At End //

// Play video after slides finish
var videoStart = totalSlideDuration - slideTransition ; 
// Assume no video
var videoDuration = 0;

// Grab length of clip, not supported by Chromium
//$('video').exists(function() {
//  var videoDuration = $("video").get(0).duration % 60; 
//  var videoDuration = 11 * seconds; 
//});

  var videoDuration = 11 * seconds; 

console.log("Video Legnth: " + videoDuration/1000 + "s");

// Total Time
var totalSpotTime = videoStart + videoDuration; 
console.log("Total Spot Time: " + totalSpotTime / seconds + "s");

/////////////////////////////////////////////
//                                         //
//           Animation Timeline            //
//                                         //
/////////////////////////////////////////////

function badgeDotAnimation() {
  
//  var START = new Date().getTime();
//  console.log(START);
  
    setTimeout(function(){
        $('body').removeClass('blackout')
        $('body').addClass('flash')
    }, 0);
    
    setTimeout(function(){
        $('body').addClass(" smallLogo ")
    }, introTimer - blackoutTimer); //

    setTimeout(function(){
        $('body').addClass(" purpleSlide ")
    }, slidesTimer);

    setTimeout(function(){
        $('body').addClass(" bodyStart ")
    }, slidesTimer);
    setTimeout(function(){
    }, introTimer);
    setTimeout(function(){
        $('trivia').addClass(" bodyStart ")
    }, introTimer);
    
    //Starts Trivia Snippets
    setTimeout(function(){
    
        $('.trivia').each(function(i){

            var trivia = this;

            setTimeout(function () {
                $(trivia).addClass(" active ");
            }, slideDuration*i);

            setTimeout(function () {
                $(trivia).children( ".intro" ).removeClass(" intro ");;
            }, slideDuration*i);

            setTimeout(function () {
                $(trivia).removeClass(" active ");
            }, (slideDuration*i)+slideDuration-slideTransition);
            
        });
    }, slidesStart);
    
    //Video Plays If It Exists
    $('video').exists(function() {
          setTimeout(function(){
              $("#wipe1").addClass( "active" );
              $("video").get(0).play();
          }, videoStart - 350);  
          setTimeout(function(){
              $("#wipe2").addClass( "active" );
          }, videoStart - 200);  
          setTimeout(function(){
              $(".video-trigger").addClass( "active" );
          }, videoStart);
          setTimeout(function(){
              $(".lower-third").addClass( "active" );
          }, videoStart + 1500);
          setTimeout(function(){
              $(".trailer-text").addClass( "active" );
          }, videoStart + 2000);
    });
    
    setTimeout(function(){
        $('body').addClass('blackout')
    }, totalSpotTime - 1850);
    
    
    /////////////////////////////////////////////
    //                                         //
    //               Web Socket                //
    //                                         //
    /////////////////////////////////////////////

    // Send Stop at calculated stop time.
    // Used custom jQuery plugin for future flexability. 

    setTimeout(function(){
        $.fn.BroadSignAction();
    }, totalSpotTime );
    
}

/////////////////////////////////////////////
//                                         //
//            Start Animation              //
//                                         //
/////////////////////////////////////////////

// Waits for BroadSign to be ready

function BroadSignPlay(){ //set up
    var dd2 = new Date();var hh = dd2.getHours();var mm = dd2.getMinutes();var ss = dd2.getSeconds();
    var data2 = "BroadSignPlay " + hh + ":" + mm + ":" + ss;
    
    // Print start time to console
    console.log('BroadSignPlay() Called At: ' + hh + ":" + mm + ":" + ss )
    
    return badgeDotAnimation();
};

// For testing, triggers animation when blackout is present.
$(".blackout").click(function(){ 
    return badgeDotAnimation();
});

//The following JavaScript snippet will ensure that BroadSignPlay() will be called on the page in
//question, and not on the frameset used in web-redirects

if (top.location != location) {
top.location.href = location.href;
}

