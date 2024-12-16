
import { LoanModel } from '../models/loan_model';
import { LoanPaymentModel } from '../models/loan_payment_model';
import { FormInputView } from '../views/form_input_view';
import { PageLoadController } from './page_load_controller';
const FormInputController = {
  innit: function () {
    FormInputView.init();
  },

  // calculate Loan payment
  calculateLoanPayment: function (object) {
    let result = [];
    let remainingOriginalAmount = object.loanAmount;
    let totalInterestPayable = 0;
    let minMonthlyPayment = remainingOriginalAmount;
    let maxMonthlyPayment = 0;
    let repaymentPeriod = object.disbursementDate;

    if (object.loanTerm < 2) {
      const interest = object.calculateInterest(remainingOriginalAmount, object.interestRate);
      totalInterestPayable = remainingOriginalAmount + interest;
      result.push(LoanPaymentModel.createResultRecord(remainingOriginalAmount, remainingOriginalAmount, interest, repaymentPeriod, totalInterestPayable));
    } else {
      const origin = remainingOriginalAmount / object.loanTerm;
      for (let i = 1; i <= object.loanTerm; i++) {
        const interest = object.calculateInterest(remainingOriginalAmount, object.interestRate);
        remainingOriginalAmount = Math.max(remainingOriginalAmount - origin, 0);
        repaymentPeriod = this.calculateRepaymentDate(repaymentPeriod);
        const totalPayable = origin + interest;
        totalInterestPayable += totalPayable;

        result.push(LoanPaymentModel.createResultRecord(origin, remainingOriginalAmount, interest, repaymentPeriod, totalPayable));

        minMonthlyPayment = Math.min(minMonthlyPayment, totalPayable);
        maxMonthlyPayment = Math.max(maxMonthlyPayment, totalPayable);
      }
    }

    return {
      result,
      totalInterestPayable,
      minMonthlyPayment,
      maxMonthlyPayment
    };
  },

  // handle Loan Value
  handleLoanValue: function (propertyValue, loanAmount, loanTerm, interestRate, disbursementDate) {
    const object = new LoanModel(propertyValue, loanAmount, loanTerm, interestRate, disbursementDate);
    const { result, totalInterestPayable, minMonthlyPayment, maxMonthlyPayment } = this.calculateLoanPayment(object);
    const totalInterest = LoanPaymentModel.checkIfNAN(totalInterestPayable - loanAmount);
    const totalOrigin = LoanPaymentModel.reformater(object.loanAmount);

    // Check numbers
    const finalTotalInterestPayable = LoanPaymentModel.checkIfNAN(totalInterestPayable);
    const finalMinMonthlyPayment = LoanPaymentModel.checkIfNAN(minMonthlyPayment);
    const finalMaxMonthlyPayment = LoanPaymentModel.checkIfNAN(maxMonthlyPayment);

    // Save data to localStorage
    localStorage.setItem('result', JSON.stringify(result));

    // Set value for table result
    FormInputView.setValueOfTableResultAndModal(finalTotalInterestPayable, finalMinMonthlyPayment, finalMaxMonthlyPayment, totalInterest, totalOrigin, result);
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


  // function check is date in past
  isDateInPast: function (valueOfDisbursementDate) {
    const currentDate = PageLoadController.getDayToDay().split('/').map(Number);
    const inputDate = valueOfDisbursementDate.split('/').map(Number);

    const [currentDay, currentMonth, currentYear] = currentDate;
    const [inputDay, inputMonth, inputYear] = inputDate;

    const current = new Date(currentYear, currentMonth - 1, currentDay);
    const input = new Date(inputYear, inputMonth - 1, inputDay);

    return input < current;
  },

  // function calculate loan repayment time
  calculateRepaymentDate: function (date) {
    const [day, month, year] = date.split('/').map(Number);
    const DAYS_OF_MONTH = LoanModel.getDaysInMonth(month, year);
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
    LoanPaymentModel.exportToXLSX();
  }
}

export default FormInputController;
