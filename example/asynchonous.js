//callback
setTimeout(() => {
  // runs after 2 seconds
  console.log('inside the function');
}, 2000);

console.log("before the function");
setTimeout(() => { });
console.log("after the function");


// Promise
const promise = new Promise((resolve, reject) => {
  const randomNumber = Math.random();

  if (randomNumber < .7) {
    resolve('All things went well!');
  } else {
    reject(new Error('Something went wrong'));
  }
});
promise.then((data) => {
  console.log(data);  // prints 'All things went well!'

  return data;
},
  (error) => {
    console.log(error); // prints Error object

    return error;
  }
);


// Async await
const getData = () => {
  return new Promise((resolve, reject) => {
    const randomNumber = Math.random();

    if (randomNumber < .7) {
      resolve('All things went well!');
    } else {
      reject(new Error('Something went wrong'));
    }
  });
}
const test = async () => {
  const data = await getData();
  console.log(data);
}

test();
