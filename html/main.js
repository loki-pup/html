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
