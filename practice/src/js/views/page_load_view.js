import { PageLoadController } from "../controllers/page_load_controller";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
export const PageLoadView = {
  init: function () {
    const inputBox = document.querySelector('#datepicker');
    this.reformatNumber();
    this.changeValuesWhenSliderChange();
    this.getDate(inputBox);
    this.changeLoanRateByLoanAmount();
    this.openCloseModal();
    this.activeButtonLeft();
    this.activeButtonRight();
    this.initializeDatePicker();
  },

  // call reformat number from controller
  reformatNumber: function () {
    PageLoadController.reformatNumber('#property-value');
    PageLoadController.reformatNumber('#loan-amount');
  },

  // change value of slider
  changeValuesWhenSliderChange: function () {
    const slider = document.querySelector('#slider');
    const sliderValue = document.querySelector('#sliderValue');

    slider.addEventListener('input', () => {
      sliderValue.textContent = slider.value + '%';
      PageLoadController.calculateLoanAmountByLoanRate(slider.value);
    });
  },

  // get date today
  getDate: function () {
    const inputBox = document.querySelector('#datepicker');
    const today = PageLoadController.getDayToDay();
    inputBox.value = today;
  },


  //caculate Loan rate by loan amount
  calculateLoanRateByLoanAmount: function (inputEvent) {
    const sliderValue = document.querySelector('#sliderValue');
    const loanRate = document.querySelector('#slider');
    const propertyValue = Number(document.querySelector('#property-value').value.replace(/,/g, ''));
    let loanAmountValue = Number(inputEvent.target.value.replace(/,/g, ''));
    let loanRateValue = Math.floor(loanAmountValue / propertyValue * 100);

    if (isNaN(loanRateValue) || loanRateValue < 0) {
      loanRate.value = 0;
      sliderValue.textContent = '0%';
    } else if (loanRateValue > 100) {
      loanRate.value = 100;
      sliderValue.textContent = '100%';
      inputEvent.target.value = propertyValue;
    } else {
      loanRate.value = loanRateValue;
      sliderValue.textContent = loanRateValue + '%';
    }

  },

  //change Loan rate by Loan amount
  changeLoanRateByLoanAmount: function () {
    const loanAmount = document.querySelector('#loan-amount');

    loanAmount.addEventListener('input', (inputEvent) => {
      this.calculateLoanRateByLoanAmount(inputEvent);
    })

  },

  // open and close modal
  openCloseModal: function () {
    const buttonExports = document.querySelectorAll('#button-export');
    buttonExports.forEach(buttonExport => {
      buttonExport.addEventListener('click', () => {
        const modal = document.querySelector('.modal-container');
        modal.classList.toggle('modal--visible');
      })
    });

  },

  // active button left (decreasing balance sheet)
  activeButtonLeft: function () {
    const button = document.querySelector("#btn-active-0");
    const INDEX_OF_BUTTON = 0;

    button.addEventListener('click', () => {
      this.activeButton(INDEX_OF_BUTTON);
    });
  },

  // active button left (decreasing balance sheet)
  activeButtonRight: function () {
    const button = document.querySelector("#btn-active-1");
    const INDEX_OF_BUTTON = 1;

    button.addEventListener('click', () => {
      this.activeButton(INDEX_OF_BUTTON);
    });
  },

  // change button style and under line
  activeButton: function (index) {
    const buttons = document.querySelectorAll('.btn');
    const underLine = document.querySelector('.line-under');
    const lineWidth = underLine.style.width;

    buttons.forEach((button, i) => {
      button.classList.toggle('active', i === index);
    });
    underLine.style.left = `${index * 50}%`;
    lineWidth === '50%' ? underLine.style.width = '44%' : underLine.style.width = '50%';

  },

  initializeDatePicker: function () {
    flatpickr("#datepicker", {
      dateFormat: "d/m/Y" // Định dạng Ngày/Tháng/Năm
    });
  }
}

