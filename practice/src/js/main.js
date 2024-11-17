// active button
function activeButton(index) {
  const buttons = document.querySelectorAll('.btn');
  const underLine = document.querySelector('.line-under');
  const lineWidth = underLine.style.width;

  buttons.forEach((button, i) => {
    button.classList.toggle('active', i === index);
  });
  underLine.style.left = `${index * 50}%`;
  lineWidth === '50%' ? underLine.style.width = '44%' : underLine.style.width = '50%';

};

// change value of slider
const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('#sliderValue');

console.log(slider.value)
slider.addEventListener('input', () => { sliderValue.textContent = slider.value; })

