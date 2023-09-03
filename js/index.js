const typing_ground = document.querySelector("#textarea");
const show_sentence = document.querySelector("#showSentence");
const score = document.querySelector("#score");
const btn = document.querySelector("#btn");
const ins = document.querySelector("#instruc");

let startTime, endTime, totalTime;
const wordPool = [
    'cat', 'dog', 'red', 'blue', 'sun', 'moon', 'eat', 'run', 'fun', 'hot',
    'cold', 'big', 'small', 'joy', 'sad', 'wet', 'dry', 'new', 'old', 'funny',
    'happy', 'fast', 'slow', 'loud', 'quiet', 'hard', 'soft', 'high', 'low',
    'near', 'far', 'rich', 'poor', 'dark', 'light', 'thick', 'thin', 'heavy',
    'lightweight', 'clean', 'dirty', 'smooth', 'rough', 'sharp', 'dull',
    'sweet', 'sour', 'bitter', 'spicy', 'healthy', 'sick', 'strong', 'weak',
    'brave', 'cowardly', 'kind', 'cruel', 'pretty', 'ugly', 'tall', 'short',
    'wide', 'narrow', 'busy', 'lazy', 'calm', 'angry', 'safe', 'dangerous',
    'smart', 'stupid', 'serious', 'simple', 'complex', 'could', 'open',
    'during', 'group', 'present', 'line', 'consider', 'life', 'late',
    'school', 'possible', 'become', 'against'
  ];
  
var poolLen = wordPool.length;

function calcSpeed(totalTime){
    var typed = typing_ground.value.trim().split(" ");
    
    // score.innerHTML = typed.length + "WPM";
    
    if (typed.length == 1){
        score.innerHTML = "0 WPM";
    }
    else{
        var finalSpeed = Math.round(typed.length*60/totalTime);
        score.innerHTML = finalSpeed + " WPM";
    }

    score.style.visibility = "visible";
}

function endTyping(){
    btn.innerText = "Start";

    let date = new Date();
    endTime = date.getTime();

    totalTime = (endTime-startTime)/1000;
    // console.log(totalTime);
    
    calcSpeed(totalTime);

    typing_ground.value = "";
    ins.style.visibility = "visible";
}

function startTyping(){
    score.style.visibility = "hidden";
    var sent = "";
    for (var i=0; i<25; i++){
        var randNumber = Math.floor(Math.random()*poolLen);
        sent += wordPool[randNumber]+" ";
    } 
    show_sentence.innerHTML = sent;

    let date = new Date();
    startTime = date.getTime();

    ins.style.visibility = "hidden";
    btn.innerText = "Done";
}

btn.addEventListener('click', function(){
    switch(btn.innerText.toLowerCase()){
        case "start":
            typing_ground.removeAttribute('disabled');
            typing_ground.focus();
            startTyping();
            break;

        case "done":
            typing_ground.setAttribute('disabled','true');
            endTyping();
            break;
    }
});

document.addEventListener('keyup',function (event) {
    if (event.key === "Enter") {
       btn.click();
    }
});
