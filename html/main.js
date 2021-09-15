//var myHeading = document.querySelector('h1');
//myHeading.textContent = 'Hello world!';

let myVariable = 'Bobo';

document.querySelector('html').onclick = function() {
    alert('Ouch! Stop poking me!');
}

var myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/QQ图片20200928102202.jpg') {
      myImage.setAttribute ('src','images/QQ图片20200928101821.jpg');
    } else {
      myImage.setAttribute ('src','images/QQ图片20200928102202.jpg');
    }
}

var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');

function setUserName() {
  let myName = prompt('Please enter your name.');
  alert('Hello '+myName);
  localStorage.setItem('name', myName);
  myHeading.innerHTML = 'Bobo and ' + myName;
}

if(!localStorage.getItem('name')) {
  setUserName();
} else {
  let storedName = localStorage.getItem('name');
  myHeading.innerHTML = 'Bobo and ' + storedName;
}

myButton.onclick = function() {
  setUserName();
}

let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;
guessField.focus();

function checkGuess() {
  let userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }
  guesses.textContent += userGuess + ' ';

  if (userGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = '!!!GAME OVER!!!';
    setGameOver();
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.append(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll('.resultParas p');
  for (let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * 100) + 1;
}


//1. COMPLETE VARIABLE AND FUNCTION DEFINITIONS//

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

//2. RAW TEXT STRINGS

let storyText='It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.';

let insertX=['Loki',
'Big Bobo',
'Habibi'];

let insertY=['niutou shan',
'the dog park',
'the swimming pool'];

let insertZ=['spontaneously combusted',
'melted into a puddle on the sidewalk',
'turned into a slug and crawled away'];

//3. EVENT LISTENER AND PARTIAL FUNCTION DEFINITION

randomize.addEventListener('click', result);

function result() {
  let newStory=storyText;
  let xItem=randomValueFromArray(insertX);
  let yItem=randomValueFromArray(insertY);
  let zItem =randomValueFromArray(insertZ);
  newStory=newStory.replace(":insertx:",xItem);
  newStory=newStory.replace(":insertx:",xItem);
  newStory=newStory.replace(":inserty:",yItem);
  newStory=newStory.replace(":insertz:",zItem);
  if(customName.value !== '') {
    let name = customName.value;
     newStory=newStory.replace("Bob",name);
  }

  if(document.getElementById("uk").checked) {
    let weight = Math.round(300/2.2) +" kg";
    let temperature =  Math.round((94-32)*5/9) +' centigrade';
    newStory=newStory.replace('94 fahrenheit',temperature);
	newStory=newStory.replace('300 pounds',weight);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}


//bouncing game

const para=document.querySelector(".ballGame");


// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;// = window.innerWidth;
const height = canvas.height;// = window.innerHeight;
let count=0;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}


function Shape(x, y, velX, velY,exists){
		  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists=exists;
	}
	

function EvilCircle(x, y,exists){
	Shape.call(this, x, y, 20, 20, exists);
	this.color='white';
	this.size=2;
}

EvilCircle.prototype=Object.create(Shape.prototype);
EvilCircle.prototype.constructor=EvilCircle;

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.lineWidth=1;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};


EvilCircle.prototype.checkBounds = function() {
  if ((this.x + this.size) >= width) {
    //this.velX = -(this.velX);
	this.x -=this.size;
  }

  if ((this.x - this.size) <= 0) {
    //this.velX = -(this.velX);
	this.x +=this.size;
  }

  if ((this.y + this.size) >= height) {
    //this.velY = -(this.velY);
	this.y -=this.size;
  }

  if ((this.y - this.size) <= 0) {
    //this.velY = -(this.velY);
	this.y +=this.size;
  }


};

EvilCircle.prototype.setControls=function(){
let _this = this;
window.onkeydown = function(e) {
    if (e.key === 'a') {
      _this.x -= _this.velX;
    } else if (e.key === 'd') {
      _this.x += _this.velX;
    } else if (e.key === 'w') {
      _this.y -= _this.velY;
    } else if (e.key === 's') {
      _this.y += _this.velY;
    }
  };	
	
};


EvilCircle.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if ( balls[j].exists) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists=false;
		count--;
		para.textContent='Ball count: ' +count;
      }
    }
  }
};




function Ball(x, y, velX, velY,exists,color, size){
	Shape.call(this, x, y, velX, velY,exists);
		
		  this.color = color;
  this.size = size;
	
}

Ball.prototype=Object.create(Shape.prototype);
Ball.prototype.constructor=Ball;

/*
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}
*/

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j]) ) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size && balls[j].exists) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
};

let balls = [];

while (balls.length < 25) {
  let size = random(3,8);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-3,3),
    random(-3,3),
	true,
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );

  balls.push(ball);
  count++;
  para.textContent='Ball count: ' +count;
}

  let evilC =new EvilCircle(    
  random(0 ,width),
    random(0 ,height),
	true);
	
evilC.setControls();	

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);


  for (let i = 0; i < balls.length; i++) {
	  if(balls[i].exists){
    balls[i].draw();
    balls[i].update();
	balls[i].collisionDetect();
	
	  }
  }

evilC.draw();
evilC.checkBounds();
evilC.collisionDetect();

  requestAnimationFrame(loop);
}

loop();