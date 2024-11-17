class Person {
  name
  age
  phoneNumber

  constructor(name, age) {
    this.name = name
    this.age = age
  };
  saySomeThing = function () {
    console.log(`hello i am ${this.name}`);
  };
}

//Class Developer has the element and method of Person
class Devoloper extends Person {
  email
  language
  constructor(name, age, email, language) {
    super(name, age);
    this.email = email;
    this.language = language;
  };

  codeSomeThing = function () {
    console.log(`i can write ${this.language}`);
  };
}

const developer1 = new Devoloper(
  'Tan',
  22,
  "nhattan@gmail.com",
  ['Java', 'C#'])
developer1.saySomeThing();
developer1.codeSomeThing();
