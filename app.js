let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "green", "purple", "white"];
let started = false;
let level = 0;
let highestLevel = localStorage.getItem("highestLevel") || 0;

let h2 = document.querySelector("h2")
let h3 = document.querySelector(".highest")

document.addEventListener("keypress", function (){
    if(started == false){
        console.log("game is started")
        started = true;

        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash")
    setTimeout(function(){
        btn.classList.remove("flash");
    } , 250 )
}

function userFlash(btn){
    btn.classList.add("userflash")
    setTimeout(function(){
        btn.classList.remove("userflash");
    } , 250 )
}


function levelUp (){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;


    //random button choosing
     let rdmIdx = Math.floor(Math.random()*3);
     let rdmColor =  btns[rdmIdx];
     let rdmbtn = document.querySelector(`.${rdmColor}`);
     gameSeq.push(rdmColor);
     console.log(gameSeq);
     gameFlash(rdmbtn);

}


function checkAns(idx){

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
          setTimeout(levelUp, 1000)  
          if (level > highestLevel) {
            highestLevel = level;
            localStorage.setItem("highestLevel", highestLevel);
            h3.innerText = `Highest Level: ${highestLevel}`;
        }  }
    }
    else{
        h2.innerHTML = `Game Over!! Yous score was <b>${level}</b> Press any Key to start`
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        } , 100)
        reset();
    }
}


function btnPress(){
     let btn = this;
     userFlash(btn);

     userColor = btn.getAttribute("id");
     userSeq.push(userColor);

     checkAns(userSeq.length-1);

}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress)
}


function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

h3.innerText = `Highest Level: ${highestLevel}`;





