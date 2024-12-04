const PageLoadView = {
    init: function() {
        const inputBox = document.querySelector('#datepicker');
        this.reformatNumber();
        this.changeValuesWhenSliderChange();
        this.getDate(inputBox);
        this.calculateLoanRateByLoanAmount();
    },
    // call reformat number from controller
    reformatNumber: function() {
        PageLoadController.reformatNumber('#property-value');
        PageLoadController.reformatNumber('#loan-amount');
    },
    // change value of slider
    changeValuesWhenSliderChange: function() {
        const slider = document.querySelector('#slider');
        const sliderValue = document.querySelector('#sliderValue');
        slider.addEventListener('input', ()=>{
            sliderValue.textContent = slider.value + '%';
            PageLoadController.calculateLoanAmountByLoanRate(slider.value);
        });
    },
    // get date today
    getDate: function() {
        const inputBox = document.querySelector('#datepicker');
        const today = PageLoadController.getDayToDay();
        inputBox.value = today;
    },
    // open and close modal
    openCloseModal: function() {
        const modal = document.querySelector('.modal-container');
        modal.classList.toggle('modal--visible');
    },
    //change Loan rate by Loan amount
    calculateLoanRateByLoanAmount: function() {
        const loanAmount = document.querySelector('#loan-amount');
        const sliderValue = document.querySelector('#sliderValue');
        const loanRate = document.querySelector('#slider');
        loanAmount.addEventListener('input', (e)=>{
            const propertyValue = Number(document.querySelector('#property-value').value.replace(/,/g, ''));
            let loanAmountValue = Number(e.target.value.replace(/,/g, ''));
            let loanRateValue = Math.floor(loanAmountValue / propertyValue * 100);
            if (!isNaN(loanRateValue) && loanRateValue >= 0) {
                if (loanRateValue > 100) {
                    loanRate.value = 100;
                    sliderValue.textContent = '100%';
                    e.target.value = propertyValue;
                } else {
                    loanRate.value = loanRateValue;
                    sliderValue.textContent = loanRateValue + '%';
                }
            } else {
                loanRate.value = 0;
                sliderValue.textContent = "0%";
            }
        });
    }
};

//# sourceMappingURL=index.3d4006dd.js.map
