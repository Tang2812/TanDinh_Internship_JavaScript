// Function
function doLog() {
  console.log("hello world");
}

doLog();
doLogWithParameter("TanDinh", 22);

function doLogWithParameter(name, age) {
  console.log("this is the function which behind the line call it");
  console.log(`my name is ${name}, i am ${age}`);
}

function yearOfBirt(age) {
  return 2024 - age;
}

console.log(`your year of birth is ${yearOfBirt(22)}`)

//function call function and return function
function doLogWithYOB() {
  doLogWithParameter("TanDinh", 22);
  console.log(`your year of birth is ${yearOfBirt(22)}`);
  return doLog();
}

doLogWithYOB();

// arrow function
const exampleArrowFunction1 = () => {
  console.log("arrow function");
}
exampleArrowFunction1();

const exampleArrowFunction2 = () => {
  return "arrow function";
}

console.log(exampleArrowFunction2());

/**difference btw function and arrow function
 function*/
function human() {
  this.name = 'Tan'
  this.age = 22
  this.doWork = function () {

    console.log(this.age);

    function normalFC() {
      console.log(this.age); // can not call to global variable
    }

    normalFC();

  }
}

let human1 = new human();
human1.doWork();

function cat() {
  this.name = "mango"
  this.color = "orange"
  this.doWork = () => {
    console.log(`meow meow ${this.name}`);
    work = () => {
      console.log(`the cat name: ${this.name}`); //call to global variable
    }
    work();
  };
}

let cat1 = new cat();
cat1.doWork();
