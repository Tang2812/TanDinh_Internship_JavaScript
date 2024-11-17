let number1 = 6, number2 = 4, number3 = 2

if (number1 < number2) {
  console.log(number1 + number2);
} else {
  if (number1 > number3) {
    console.log(number1 - number2);
  } else {
    console.log(number3 + number2);
  }
}

if (number1 === 2 && number2 === 4) {
  console.log("success");
} else {
  console.log("fail");
}

if (number1 === 2 || number2 === 4) {
  console.log("ex2 success");
} else {
  console.log("ex2 fail");
}
