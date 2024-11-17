class Person {
  name
  age
  phoneNumber

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  saySomeThing = function () {
    console.log(`hello i am ${this.name}`);
  }
}
const example = new Person("Tan", 22);
example.saySomeThing(); //hello i am Tan
