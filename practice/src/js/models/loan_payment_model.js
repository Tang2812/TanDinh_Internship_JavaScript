class LoanPaymentModel {
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
}
