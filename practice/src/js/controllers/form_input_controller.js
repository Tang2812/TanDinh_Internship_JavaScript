import * as XLSX from 'xlsx';
import { LoanModel } from '../models/loan_model';
import { LoanPaymentModel } from '../models/loan_payment_model';
import { FormInputView } from '../views/form_input_view';
import { PageLoadController } from './page_load_controller';
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
      interest = remainingOriginalAmount * (object.interestRate / 100) / 12;
      totaInterestPayple = remainingOriginalAmount + interest;
      const resultRecord = new LoanPaymentModel(remainingOriginalAmount, remainingOriginalAmount, interest, object.disbursementDate, totaInterestPayple);
      result.push(resultRecord);
    } else {
      origin = remainingOriginalAmount / object.loanTerm;
      for (let i = 1; i <= object.loanTerm; i++) {
        interest = remainingOriginalAmount * (object.interestRate / 100) / 12;
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

    // check number
    totalInterest = this.checkIfNAN(totalInterest)
    totaInterestPayple = this.checkIfNAN(totaInterestPayple);
    minMonthlyPayment = this.checkIfNAN(minMonthlyPayment);
    maxMonthlyPayment = this.checkIfNAN(maxMonthlyPayment);

    // save data to localStorage
    localStorage.setItem('result', JSON.stringify(result));

    // set value for table result
    FormInputView.setValueOfTableResultAndModal(totaInterestPayple, minMonthlyPayment, maxMonthlyPayment, totalInterest, totalOrigin, result);
  },

  // function check NAN value
  checkIfNAN: function (value) {
    if (!isNaN(value)) {
      value = this.reformater(Math.round(value))
    } else {
      value = 0;
    }
    return value
  },

  // function check value greater than 0 or is a number
  checkValueGreaterThan0: function (value, inputErrors, string) {
    if (value < 0 || isNaN(value)) {
      inputErrors.inputStatus = false;
      if (value <= 0) inputErrors.errorMessages.push(`${string} value must greater than 0`);
      if (isNaN(value)) inputErrors.errorMessages.push(`${string} value must be a number`);
    } else {
      inputErrors.errorMessages.push('');
    };
  },

  // function check date in pass
  checkDateInPass: function (date, inputErrors) {
    if (this.isDateInPast(date)) {
      inputErrors.inputStatus = false;
      inputErrors.errorMessages.push('Date cannot be in the past');
    } else {
      inputErrors.errorMessages.push('');
    }
  },

  // validate value
  validateValue: function (valueOfPropertyValue, valueOfLoanAmount, valueOfLoanTerm, valueOfInterestRate, valueOfDisbursementDate) {
    const inputErrors = {
      inputStatus: true,
      errorMessages: []
    };

    // validate value of property
    this.checkValueGreaterThan0(valueOfPropertyValue, inputErrors, 'Property');

    // validate value loan amount
    this.checkValueGreaterThan0(valueOfLoanAmount, inputErrors, 'Loan value');

    // validate loan term
    this.checkValueGreaterThan0(valueOfLoanTerm, inputErrors, 'Loan term');

    // validate interst rate
    this.checkValueGreaterThan0(valueOfInterestRate, inputErrors, 'Interest rate');

    // validate Disbursement date
    this.checkDateInPass(valueOfDisbursementDate, inputErrors)

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
    const DATES_OF_MONTH = [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return DATES_OF_MONTH[month - 1];  /*DATES_OF_MONTH start from index 0*/
  },

  // function check is date in past
  isDateInPast: function (valueOfDisbursementDate) {
    const date = PageLoadController.getDayToDay();
    const [day, month, year] = date.split('/').map(Number);
    const [inputDay, inputMonth, inputYear] = valueOfDisbursementDate.split('/').map(Number);

    if (inputYear < year) return true;
    if (inputYear === year && inputMonth < month) return true;
    if (inputYear === year && inputMonth === month && inputDay < day) return true;
    return false;
  },
  // function calculate loan repayment time
  calculateRepaymentDate: function (date) {
    const [day, month, year] = date.split('/').map(Number);
    const DAYS_OF_MONTH = this.getDaysInMonth(month, year);
    const TOTAL_MONTHS_OF_YEAR = 12;
    let newMonth = month;
    let newDay = day;
    let newYear = year;
    let newDate;

    newMonth = newMonth + 1;
    if (newMonth > TOTAL_MONTHS_OF_YEAR) {
      newMonth = 1;
      newYear = newYear + 1;
    };

    // check Day
    if (newDay > DAYS_OF_MONTH) {
      newDay = DAYS_OF_MONTH;
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

export default FormInputController;
