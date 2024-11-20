// active button
function activeButton(index) {
  const buttons = document.querySelectorAll('.btn');
  const underLine = document.querySelector('.line-under');
  const lineWidth = underLine.style.width;

  buttons.forEach((button, i) => {
    button.classList.toggle('active', i === index);
  });
  underLine.style.left = `${index * 50}%`;
  lineWidth === '50%' ? underLine.style.width = '44%' : underLine.style.width = '50%';

};

// change value of Loan amount
function calculateLoanAmountByLoanRate(loanRate) {
  const propertyValue = Number(document.querySelector('#property-value').value.replace(/,/g, ''));
  const loanAmount = document.querySelector('#loan-amount');
  let value = propertyValue * loanRate / 100;

  loanAmount.value = Number(value).toLocaleString('en')
}

// reformat number input
function reformatNumber() {
  document.addEventListener('DOMContentLoaded', () => {
    const numberInput = document.querySelector('#property-value');
    numberInput.addEventListener('input', (e) => {
      let value = e.target.value;
      value = value.replace(/,/g, '');
      if (!isNaN(value) && value !== '') {
        value = Number(value).toLocaleString('en');
      };
      e.target.value = value;
    })

  })
}

reformatNumber();

//change Loan rate by Loan amount
function calculateLoanRateByLoanAmount() {
  const propertyValue = Number(document.querySelector('#property-value').value);
  const loanAmount = document.querySelector('#property-value');
  const sliderValue = document.querySelector('#sliderValue');
  const loanRate = document.querySelector('#slider');

  loanAmount.addEventListener('input', (e) => {
    let loanAmountValue = Number(e.target.value.replace(/,/g, ''));
    let loanRateValue = loanAmountValue / propertyValue * 100;

    if (!NaN(loanRateValue)) {
      loanRate.value = loanRateValue;
      sliderValue.textContent = loanRateValue + '%';
    } else {
      loanRate.value = 0;
      sliderValue.textContent = 0 + '%';
    }
  })

}



// change value of slider
function changeValuesWhenSliderChange() {
  const slider = document.querySelector('#slider');
  const sliderValue = document.querySelector('#sliderValue');

  console.log(slider.value);
  slider.addEventListener('input', () => {
    sliderValue.textContent = slider.value + '%';
    calculateLoanAmountByLoanRate(slider.value);
  });
}

changeValuesWhenSliderChange();

// open and close modal
function openCloseModal() {
  const modal = document.querySelector('.modal-container');
  modal.classList.toggle('modal--visible')
}

// get date today
function getDayToDay() {
  const inputBox = document.querySelector('#datepicker')
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const result = `${day}/${month}/${year}`;
  inputBox.value = result;
  console.log(result);
}

getDayToDay();

// date picker
$(document).ready(function () { $("#datepicker").datepicker({ dateFormat: "dd/mm/yy" }); });
