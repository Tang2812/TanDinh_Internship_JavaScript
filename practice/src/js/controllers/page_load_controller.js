import { PageLoadView } from "../views/page_load_view";
export const PageLoadController = {
  init: function () {
    PageLoadView.init();
  },

  // reformat number input
  reformatNumber: function (idElement) {
    document.addEventListener('DOMContentLoaded', () => {
      const number_input = document.querySelector(idElement);

      number_input.addEventListener('input', (e) => {
        let value = e.target.value;
        value = value.replace(/,/g, '');
        if (!isNaN(value) && value !== '') {
          value = Number(value).toLocaleString('en');
        };
        e.target.value = value;
      })

    })
  },

  // change value of Loan amount
  calculateLoanAmountByLoanRate: function (loanRate) {
    const propertyValue = Number(document.querySelector('#property-value').value.replace(/,/g, ''));
    const loanAmount = document.querySelector('#loan-amount');

    let value = propertyValue * loanRate / 100;
    loanAmount.value = Number(value).toLocaleString('en')
  },

  // get date today
  getDayToDay: function () {
    const date = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric'}
    const result = date.toLocaleDateString('en-GB', options);


    return result;
  }
}

