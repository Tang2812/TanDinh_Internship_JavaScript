const PageLoadController = {
  init: function () {
    PageLoadView.init();
  },

  // reformat number input
  reformatNumber: function (idElement) {
    document.addEventListener('DOMContentLoaded', () => {
      const numberInput = document.querySelector(idElement);
      numberInput.addEventListener('input', (e) => {
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
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const result = `${day}/${month}/${year}`;
    return result;
  }
}
