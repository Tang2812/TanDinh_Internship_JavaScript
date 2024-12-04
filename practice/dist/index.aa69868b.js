// Call Page Load
PageLoadController.init();
// Call Form input
FormInputController.innit();
// active button
function activeButton(index) {
    const buttons = document.querySelectorAll('.btn');
    const underLine = document.querySelector('.line-under');
    const lineWidth = underLine.style.width;
    buttons.forEach((button, i)=>{
        button.classList.toggle('active', i === index);
    });
    underLine.style.left = `${index * 50}%`;
    lineWidth === '50%' ? underLine.style.width = '44%' : underLine.style.width = '50%';
}
// open and close modal
function openCloseModal() {
    const modal = document.querySelector('.modal-container');
    modal.classList.toggle('modal--visible');
}
// date picker
$(document).ready(function() {
    $("#datepicker").datepicker({
        dateFormat: "dd/mm/yy"
    });
});

//# sourceMappingURL=index.aa69868b.js.map
