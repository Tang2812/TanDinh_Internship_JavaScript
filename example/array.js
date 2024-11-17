const arrayExample = [1, 2, 3];
const list = ['a', 'b', 'c'];

//matrix
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(arrayExample);

//Demo remove item at the end//
arrayExample.length = 2;
console.log(arrayExample);

//Demo add new items
arrayExample.push(4);
arrayExample.unshift(0);
console.log(arrayExample);

//Demo remove items
arrayExample.pop();
arrayExample.shift();
console.log(arrayExample);


for (const value of list) {
  console.log(value);
}

//Demo join 2 array
const arrayJoined = [...arrayExample, ...list];
const arrayConcatFromList = arrayExample.concat(list);
console.log(arrayJoined);
console.log(arrayConcatFromList);



for (const value of matrix) {
  console.log(value);
}

//Demo function find of array
const array1 = [16, 3, 8, 19, 4];

const found = array1.find((element) => element > 10); //return first element true

console.log(found);

// Demo function findIndex of array
const arrayExample2 = [8, 3, 18, 19, 4];

const fondIndex = arrayExample2.findIndex((element) => element > 10); //return index of first element true

console.log(fondIndex);
