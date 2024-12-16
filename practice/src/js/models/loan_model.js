export class LoanModel {
  propertyValue
  loanAmount
  loanTerm
  interestRate
  disbursementDate

  constructor(propertyValue, loanAmount, loanTerm, interestRate, disbursementDate) {
    this.propertyValue = propertyValue;
    this.loanAmount = loanAmount;
    this.loanTerm = loanTerm;
    this.interestRate = interestRate;
    this.disbursementDate = disbursementDate;
  }

  // calculate interest per month
  calculateInterest(amount, interestRate) {
    return amount * (interestRate / 100) / 12;
  }

  // cacualate loan amount
  static calculateLoanAmount(loanRate, propertyValue, loanAmount) {
    return propertyValue * loanRate / 100;;
  }

  // function check leap year
  static isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  // function calculate number of date in a month
  static getDaysInMonth(month, year) {
    const DATES_OF_MONTH = [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return DATES_OF_MONTH[month - 1];  /*DATES_OF_MONTH start from index 0*/
  }
}
