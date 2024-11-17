const human = {
  name: 'TanDinh',
  age: 22,
  school: 'DTU',
  saySomeThing: function () {
    console.log(`hello world with ${this.name}`);
  },

  //do not use arrow fc as a object method
  doSomeThing: () => {
    console.log(`go to ${this.school}`);
  }
}

human.name = "Nhat Tan";
human.saySomeThing();
human.doSomeThing();
