import * as XLSX from 'xlsx';
export class LoanPaymentModel {
  origin
  remainningOriginalAmount
  interest
  toralPrincipalAndInterest
  repaymentPeriod

  constructor(origin, remainningOriginalAmount, interest, repaymentPeriod) {
    this.origin = origin;
    this.remainningOriginalAmount = remainningOriginalAmount;
    this.interest = interest;
    this.repaymentPeriod = repaymentPeriod;
    this.toralPrincipalAndInterest = origin + interest;
  }

  static createResultRecord(origin, remainingOriginalAmount, interest, repaymentPeriod, totalPayable) {
    return new LoanPaymentModel(origin, remainingOriginalAmount, interest, repaymentPeriod, totalPayable);
  }

  // function format number to english
  static reformater(value) {
    if (!isNaN(value) && value !== '') {
      return Number(value).toLocaleString('vi-VN');
    };
  }

  // function check NAN value
  static checkIfNAN(value) {
    if (!isNaN(value)) {
      value = this.reformater(Math.round(value))
    } else {
      value = 0;
    }
    return value
  }

  // export file
  static exportToXLSX() {
    const result = JSON.parse(localStorage.getItem('result'));
    const worksheet = XLSX.utils.json_to_sheet(result);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Loans');
    XLSX.writeFile(workbook, 'loan_data.xlsx');
  }
}

