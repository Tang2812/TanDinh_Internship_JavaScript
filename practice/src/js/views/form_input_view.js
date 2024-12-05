const FormInputView = {

  init: function () {
    this.getValueWhenUserInput();
  },

  // get element when user iput
  getValueWhenUserInput: function () {
    const propertyValue = document.querySelector('#property-value');
    const loanAmount = document.querySelector('#loan-amount');
    const loanTerm = document.querySelector('#loan-term');
    const interestRate = document.querySelector('#interest-rate');
    const disbursementDate = document.querySelector('#datepicker');
    const inputBoxs = document.querySelectorAll('.input-box');
    const slider = document.querySelector('#slider');

    function getValue() {
      const valueOfPropertyValue = Number(propertyValue.value.replace(/,/g, ''));
      const valueOfLoanAmount = Number(loanAmount.value.replace(/,/g, ''));
      const valueOfLoanTerm = Number(loanTerm.value);
      const valueOfInterestRate = Number(interestRate.value);
      const valueOfDisbursementDate = disbursementDate.value;
      const propertyValueError = document.querySelector('#property-error');
      const loanAmountError = document.querySelector('#loan-amount-error');
      const loanTermError = document.querySelector('#loan-term-error');
      const interestRateError = document.querySelector('#interest-rate-error');
      const disbursementDateError = document.querySelector('#date-time-error');

      //  validate input
      const errorsAndMessages = FormInputController.validateValue(valueOfPropertyValue, valueOfLoanAmount, valueOfLoanTerm, valueOfInterestRate, valueOfDisbursementDate);

      if (errorsAndMessages.inputStatus === true) {

        // set message to error label
        propertyValueError.textContent = errorsAndMessages.errorMessages[0];
        loanAmountError.textContent = errorsAndMessages.errorMessages[1];
        loanTermError.textContent = errorsAndMessages.errorMessages[2];
        interestRateError.textContent = errorsAndMessages.errorMessages[3];
        disbursementDateError.textContent = errorsAndMessages.errorMessages[4];


        FormInputController.handleLoanValue(valueOfPropertyValue, valueOfLoanAmount, valueOfLoanTerm, valueOfInterestRate, valueOfDisbursementDate);
      } else {

        // set message to error label
        propertyValueError.textContent = errorsAndMessages.errorMessages[0];
        loanAmountError.textContent = errorsAndMessages.errorMessages[1];
        loanTermError.textContent = errorsAndMessages.errorMessages[2];
        interestRateError.textContent = errorsAndMessages.errorMessages[3];
        disbursementDateError.textContent = errorsAndMessages.errorMessages[4];

      }
    };

    // get value when user input to input box
    inputBoxs.forEach(input => {
      input.addEventListener('input', () => {
        getValue();
      })
    });

    // get value when user change slider
    slider.addEventListener('input', () => {
      getValue();
    })

    // get value when user choose date
    $("#datepicker").on("change", () => {

      getValue();
    })
  },

  // set value of table result
  setValueOfTableResult: function (totaInterestPayple, minMonthlyPayment, maxMonthlyPayment, totalInterest, totalOrigin, result) {
    const totaInterestPaypleText = document.querySelector("#total-interest-payable");
    const minMonthlyPaymentText = document.querySelector("#monthly-payment-min-amount");
    const maxMonthlyPaymentText = document.querySelector("#monthly-payment-max-amount");
    const totalOriginText = document.querySelector('#total-origin');
    const totalInterestText = document.querySelector('#total-interest');
    const totalPaymentText = document.querySelector('#total-payment');

    // set value to table result
    totalInterestText.textContent = `${totalInterest}`;
    totalPaymentText.textContent = `${totaInterestPayple}`;
    totalOriginText.textContent = `${totalOrigin}`;
    totaInterestPaypleText.textContent = `${totaInterestPayple} VND`;
    minMonthlyPaymentText.textContent = `${minMonthlyPayment} VND`;
    maxMonthlyPaymentText.textContent = `${maxMonthlyPayment} VND`;

    // set value to modal
    this.setValueOfModal(result);
  },

  // set value of modal
  isEventAttached: false,
  setValueOfModal: function (result) {
    const modalTable = document.querySelector('#modal-table-result').getElementsByTagName('tbody')[0];
    const button = document.querySelector("#export");
    let number = 0;

    // clear conttent of modal
    modalTable.innerHTML = '';

    result.forEach(item => {
      const row = modalTable.insertRow();
      const ordinalNumber = row.insertCell(0);
      const repaymentPeriod = row.insertCell(1);
      const remainingOriginalAmount = row.insertCell(2);
      const origin = row.insertCell(3);
      const interest = row.insertCell(4);
      const total = row.insertCell(5);

      number = number + 1;
      ordinalNumber.textContent = number;
      repaymentPeriod.textContent = item.repaymentPeriod;
      !isNaN(item.remainningOriginalAmount) ? remainingOriginalAmount.textContent = FormInputController.reformater(item.remainningOriginalAmount) : remainingOriginalAmount.textContent = '0';
      !isNaN(item.origin) ? origin.textContent = FormInputController.reformater(item.origin) : origin.textContent = '0';
      !isNaN(item.interest) ? interest.textContent = FormInputController.reformater(item.interest) : interest.textContent = '0';
      !isNaN(item.toralPrincipalAndInterest) ? total.textContent = FormInputController.reformater(item.toralPrincipalAndInterest) : total.textContent = '0';



      // add css to record
      ordinalNumber.classList.add('content__result');
      repaymentPeriod.classList.add('content__result');
      remainingOriginalAmount.classList.add('content__result');
      origin.classList.add('content__result');
      interest.classList.add('content__result');
      total.classList.add('content__result');

    })

    if (!this.isEventAttached) {
      // listen event of button
      button.addEventListener('click', function () {
        FormInputController.exportToXLSX();
      });
      this.isEventAttached = true;
    }
  },

}
