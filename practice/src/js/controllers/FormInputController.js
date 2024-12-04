const FormInputController = {
  innit: function () {
    FormInputView.init();
  },

  // handle Loan Value
  handleLoanValue: function (propertyValue, loanAmount, loanTerm, interestRate, disbursementDate) {
    const object = new LoanModel(propertyValue, loanAmount, loanTerm, interestRate, disbursementDate);
    let remainingOriginalAmount = object.loanAmount;
    let origin;
    let totaInterestPayple = 0;
    let interest;
    let result = [];
    let minMonthlyPayment = remainingOriginalAmount;
    let maxMonthlyPayment = 0;
    let totalInterest;
    let repaymentPeriod = object.disbursementDate;
    let totalOrigin = this.reformater(object.loanAmount);
    const resultRecord = new LoanPaymentModel(origin, remainingOriginalAmount, interest, repaymentPeriod);

    // first record withouth caculation
    result.push(resultRecord);

    // Caculate Loan Payment
    if (object.loanTerm < 2) {
      interest = Math.round(remainingOriginalAmount * (object.interestRate / 100) / 12);
      totaInterestPayple = remainingOriginalAmount + interest;
      const resultRecord = new LoanPaymentModel(remainingOriginalAmount, remainingOriginalAmount, interest, object.disbursementDate, totaInterestPayple);
      result.push(resultRecord);
    } else {
      origin = Math.round(remainingOriginalAmount / object.loanTerm);
      for (let i = 1; i <= object.loanTerm; i++) {
        interest = Math.round(remainingOriginalAmount * (object.interestRate / 100) / 12);
        (remainingOriginalAmount - origin) >= 0 ? remainingOriginalAmount = remainingOriginalAmount - origin : remainingOriginalAmount = 0;
        repaymentPeriod = this.calculateRepaymentDate(repaymentPeriod);
        const resultRecord = new LoanPaymentModel(origin, remainingOriginalAmount, interest, repaymentPeriod);
        totaInterestPayple = totaInterestPayple + resultRecord.toralPrincipalAndInterest;
        if (minMonthlyPayment > resultRecord.toralPrincipalAndInterest) {
          minMonthlyPayment = resultRecord.toralPrincipalAndInterest;
        };
        if (maxMonthlyPayment < resultRecord.toralPrincipalAndInterest) {
          maxMonthlyPayment = resultRecord.toralPrincipalAndInterest;
        }
        result.push(resultRecord);
      }
    }

    totalInterest = totaInterestPayple - loanAmount;

    // reformat totalInterest
    !isNaN(totalInterest) ? totalInterest = this.reformater(totalInterest) : totalInterest = 0;

    // reformat totaInterestPayple
    !isNaN(totaInterestPayple) ? totaInterestPayple = this.reformater(totaInterestPayple) : totaInterestPayple = 0;

    // reformat minMonthlyPayment
    !isNaN(minMonthlyPayment) ? minMonthlyPayment = this.reformater(minMonthlyPayment) : minMonthlyPayment = 0;

    // reformat maxMonthlyPayment
    !isNaN(maxMonthlyPayment) ? maxMonthlyPayment = this.reformater(maxMonthlyPayment) : maxMonthlyPayment = 0;

    // save data to localStorage
    localStorage.setItem('result', JSON.stringify(result));

    // set value for table result
    FormInputView.setValueOfTableResult(totaInterestPayple, minMonthlyPayment, maxMonthlyPayment, totalInterest, totalOrigin, result);
  },

  // validate value
  validateValue: function (valueOfPropertyValue, valueOfLoanAmount, valueOfLoanTerm, valueOfInterestRate, valueOfDisbursementDate) {
    const inputErrors = {
      inputStatus: true,
      errorMessages: []
    };

    // validate value of property
    if (valueOfPropertyValue < 0 || isNaN(valueOfPropertyValue)) {
      inputErrors.inputStatus = false;
      if (valueOfPropertyValue <= 0) inputErrors.errorMessages.push('Property value must greater than 0');
      if (isNaN(valueOfPropertyValue)) inputErrors.errorMessages.push('Property value must be a number');
    } else {
      inputErrors.errorMessages.push('');
    };

    // validate value loan amount
    if (valueOfLoanAmount < 0 || isNaN(valueOfLoanAmount)) {
      inputErrors.inputStatus = false;
      if (valueOfLoanAmount < 0) inputErrors.errorMessages.push('Loan value must greater than 0');
      if (isNaN(valueOfLoanAmount)) inputErrors.errorMessages.push('Loan value must be a number');
    } else {
      inputErrors.errorMessages.push('');
    };

    // validate loan term
    if (valueOfLoanTerm < 0 || isNaN(valueOfLoanTerm)) {
      inputErrors.inputStatus = false;
      if (valueOfLoanTerm < 0) inputErrors.errorMessages.push('Loan term must greater than 0');
      if (isNaN(valueOfLoanTerm)) inputErrors.errorMessages.push('Loan term must be a number');
    } else {
      inputErrors.errorMessages.push('');
    };

    // validate interst rate
    if (valueOfInterestRate < 0 || isNaN(valueOfInterestRate)) {
      inputErrors.inputStatus = false;
      if (valueOfInterestRate < 0) inputErrors.errorMessages.push('Interest rate must greater than 0');
      if (isNaN(valueOfInterestRate)) inputErrors.errorMessages.push('Interest rate must be a number');
    } else {
      inputErrors.errorMessages.push('');
    };

    // validate Disbursement date
    const date = PageLoadController.getDayToDay();
    const [day, month, year] = date.split('/').map(Number);
    const [inputDay, inputMonth, inputYear] = valueOfDisbursementDate.split('/').map(Number);

    if (inputYear < year) {
      inputErrors.inputStatus = false;
      inputErrors.errorMessages.push('Date cannot be in the past');
    } else {
      if (inputMonth < month) {
        inputErrors.inputStatus = false;
        inputErrors.errorMessages.push('Date cannot be in the past');
      } else {
        if (inputDay < day) {
          inputErrors.inputStatus = false;
          inputErrors.errorMessages.push('Date cannot be in the past');
        } else {
          inputErrors.errorMessages.push('');
        }
      }
    }
    return inputErrors;
  },

  // function format number to english
  reformater: function (value) {
    if (!isNaN(value) && value !== '') {
      return Number(value).toLocaleString('en');
    };
  },

  // function check leap year
  isLeapYear: function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  },

  // function calculate number of date in a month
  getDaysInMonth: function (month, year) {
    return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
  },

  // function calculate loan repayment
  calculateRepaymentDate: function (date) {
    const [day, month, year] = date.split('/').map(Number);
    const daysOfMonth = this.getDaysInMonth(month, year);
    let newMonth = month;
    let newDay = day;
    let newYear = year;
    let newDate;

    newMonth = newMonth + 1;
    if (newMonth > 12) {
      newMonth = 1;
      newYear = newYear + 1;
    };

    // check Day
    if (newDay > daysOfMonth) {
      newDay = daysOfMonth;
    }

    newDate = `${newDay}/${newMonth}/${newYear}`;
    return newDate;
  },

  // export file
  exportToXLSX: function () {
    const result = JSON.parse(localStorage.getItem('result'));
    const worksheet = XLSX.utils.json_to_sheet(result);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Loans');
    XLSX.writeFile(workbook, 'loan_data.xlsx');
  }
}
