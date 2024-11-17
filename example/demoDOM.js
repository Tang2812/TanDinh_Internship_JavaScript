// access element use DOM
document.body.style.backgroundColor = "blue";

//access a single element
const idGetElement = document.getElementById("demo-1");

//another way
const idQuerrySelector = document.querySelector("#demo-1");
idQuerrySelector.textContent = 'Demo ID text updated.';

//access list element
const Elements = document.querySelectorAll("#demo-2");
Elements.forEach(element => {
  element.textContent = 'Demo-2 text updated.';
});

//access class
const div = document.querySelectorAll('div');
div[4].className = 'warning';
div[1].classList.add('hidden');
div[1].classList.remove('hidden');
div[3].setAttribute('style', 'border: 2px solid green;');

//event
const handleClick = () => {
  const stringFromElement = document.querySelector("#result");
  stringFromElement.textContent = "result has changed";
}

const button = document.querySelector("#button1");
button.onclick = handleClick;

const alertText = () => {
  alert('this is alert?');
}
button.onclick = alertText;
