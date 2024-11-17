const list = [2, 3, 4, 5, 6];
// // for each
for (const value of list) {
  console.log(value);
}

// //for i
for (let i = 0; i < list.length; i++) {
  // if(i>2) break
  if (i === 2) continue
  console.log(list[i]);
}

//reduce
const sum = list.reduce((total, number) => total = total + number, 0);
console.log(sum);

// while
let i = 0;
while (i < list.length) {
  console.log(list[i]);
  i++;
}

//do while
let j = 0;
do {
  console.log(list[j]);
  j++;
}
while (j < list.length);
