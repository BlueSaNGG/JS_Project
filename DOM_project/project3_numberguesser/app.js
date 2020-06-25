/*
GAME FUNCTION:
-Player must guess a number between a min and max
-Player gets a certain amount of guesses 
-Notify player of guesses remaining
-Notify player of the correct answer if lose
-Let player choose to play again
*/

//Game values
let min =1,
    max =100,
    winningNum=getrandomnum(min,max);
    console.log(winningNum);
    guessLeft=Math.ceil((Math.log(max-min)/Math.log(2))*0.8);

  //UI element
const gameWrapper=document.getElementById('game'),
      minNum=document.querySelector('.min-num'),
      maxNum=document.querySelector('.max-num'),
      guessBtn=document.querySelector('#guess-btn'),
      guessInput=document.querySelector('#guess-input'),
      message=document.querySelector('.message');

//Assign UI min and max
minNum.textContent=min;
maxNum.textContent=max;


//Play again event listener
gameWrapper.addEventListener('mouseup',function(e){  //若为click，则按下去已经gameover，松开来就直接刷新了
  if(e.target.className==='play-again'){
    window.location.reload();
  }
});

//Listen for guess
guessBtn.addEventListener('click',function(){
  let guess=parseInt(guessInput.value);
  console.log(guess);
  //Validate
  if(isNaN(guess) || guess <min || guess >max){
    //不能用guess===NaN  要用isNaN(guess)
    setMessage(`Please enter a number between ${min} and ${max}`,'red');
  }

  //Check if won
  if(guess === winningNum){
    // //Game over - Won
    gameOver(true,`${winningNum} is Correct, YOU WIN`);
  }else{
    //Wrong number
    guessLeft -=1; //剩余的猜测次数

    if(guessLeft === 0){
      // // Game over lost
      gameOver(false,`Game over ,you lost. The correct number was ${winningNum}`);
    }else if(guessLeft>0){
      //Game continues - anwer wrong
      //change border color
      guessInput.style.borderColor='red';
      //Clear input
      guessInput.value="";
      //tell user its the wrong number
      if(guess<winningNum)
        setMessage(`${guess} is smaller than the target number, ${guessLeft} guesses left`);
      else
        setMessage(`${guess} is larger than the target number, ${guessLeft} guesses left`); 
    }
  }
});


//Gameover
function gameOver(won,msg){
    // Game over lost
    let color;
    won === true? color = "green" : color="red";
    //Disable input
    guessInput.disabled=true;   //input不能再输入
    //Change border color
    guessInput.style.borderColor=color;
    //Set message
    setMessage(msg,color);

    //Play again
    guessBtn.value="Play again";
    guessBtn.className +='play-again';
    //因为改类为load之后添加，所以需要用到event继承
}

//Get winning num
function getrandomnum(min, max){
  //js中hoisted 会自动把function放在最前面，所以可以定义在后面
  return Math.floor(min+(max-min)*Math.random()+1);
}

//Set message
function setMessage(msg,color){
  message.style.color=color;
  message.innerHTML+=msg+"<br>";
}