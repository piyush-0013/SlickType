const typing_ground = document.querySelector("#textarea");
const show_sentence = document.querySelector("#showSentence");
const score = document.querySelector("#score");
const btn = document.querySelector("#btn");
const ins = document.querySelector("#instruc");
const show_time = document.querySelector("#show-time");

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


function calcSpeed(totalTime) {
    var typed = typing_ground.value.trim().split(" ");
    var actual = show_sentence.innerHTML.split(" ");
    var count = 0;

    for (var i = 0; i < typed.length && i < actual.length; i++) {
        if (typed[i] != actual[i]) {
            count++;
        }
    }

    if (typed.length == 1) {
        score.innerHTML = "Speed: 0 WPM <br> Accuracy: 0%";
    }
    else {
        var finalSpeed = Math.round((typed.length - count) * 60 / totalTime);
        score.innerHTML = "Speed: " + finalSpeed + " WPM <br> Accuracy: " + Math.round(100 * (typed.length - count) / typed.length) + "%";
    }

    score.style.visibility = "visible";
}

function endTyping() {
    btn.innerText = "Start";
    showTimer();

    let date = new Date();
    endTime = date.getTime();

    totalTime = (endTime - startTime) / 1000;
    // console.log(totalTime);

    calcSpeed(totalTime);

    typing_ground.value = "";
    ins.style.visibility = "visible";
}

let intervalID2;

function ender() {
    document.addEventListener("keydown", function(Event){
        if (Event.key === " "){
            console.log("yes");
            var typed = typing_ground.value.split(" ");
            var actual = show_sentence.innerHTML.split(" ");
            
            if (typed.length >= actual.length-1){
                btn.click();
            }
        }
    })
}

let intervalID, elapsedTime = 0;

function showTimer() {
    if (btn.innerText === "Done") {
        intervalID = setInterval(function () {
            elapsedTime++;
            show_time.innerHTML = elapsedTime;
            ender();
        }, 1000);
    }
    else if (btn.innerText === "Start") {
        elapsedTime = "";
        clearInterval(intervalID);
        show_time.innerHTML = "";
    }
}

function startTyping() {
    score.style.visibility = "hidden";
    var sent = "";
    for (var i = 0; i < 20; i++) {
        var randNumber = Math.floor(Math.random() * poolLen);
        sent += wordPool[randNumber] + " ";
    }
    show_sentence.innerHTML = sent;
    ins.style.visibility = "hidden";
    btn.innerText = "Done";

    function keydownHandler() {
        if (btn.innerText === "Done") {
            let date = new Date();
            startTime = date.getTime();

            showTimer();
            ender();
            typing_ground.removeEventListener('keydown', keydownHandler);
        }
    }

    typing_ground.addEventListener('keydown', keydownHandler);

}

btn.addEventListener('click', function () {
    document.querySelector(".timer-div").style.visibility = "visible";
    switch (btn.innerText.toLowerCase()) {
        case "start":
            typing_ground.removeAttribute('disabled');
            typing_ground.focus();
            startTyping();
            break;

        case "done":
            typing_ground.setAttribute('disabled', 'true');
            endTyping();
            break;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === "Enter") {
        btn.click();
    }
});
