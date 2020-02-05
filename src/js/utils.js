// Variaveis Globais
const dogList = document.getElementById('select-breeds');
const colorSelect = document.querySelector('#select-color');
const fontSelect = document.querySelector('#select-font');
const btnSalvar = document.querySelector('.preferencias__btn');

// Eventos 
window.addEventListener('load', getAllBreeds);
fontSelect.addEventListener('load', changeOptionsWebsite);
dogList.addEventListener('change', getBreed);
colorSelect.addEventListener('change', changeOptionsWebsite);
fontSelect.addEventListener('change', changeOptionsWebsite);
btnSalvar.addEventListener('click', setLocalStorage);
btnSalvar.addEventListener('click', saveMsg);



// Altera a fonte e cor do texto da raça
function changeOptionsWebsite() {
  let input = document.querySelector('#card-wrapper .card__image .image__overlay');
  let valueSelected = '';
  valueSelected = this.options[this.selectedIndex].value;
  
  // Valida se o campo é o de cor e seta o style de cor se não seta fontfamily
  if(this.id === 'select-color') {
    input.style.color = valueSelected;
  } else {
    input.style.fontFamily = valueSelected;
  }
};

function setLocalStorage() {
  let colorSelected = colorSelect.options[colorSelect.selectedIndex].value;
  let fontSelected = fontSelect.options[fontSelect.selectedIndex].value;
  let breedSelected = dogList.options[dogList.selectedIndex].value;

  localStorage.setItem('Color', colorSelected);
  localStorage.setItem('Fonte', fontSelected);
  localStorage.setItem('Raça', breedSelected);
  localStorage.setItem('Data atual', getTimeCurrent());

}

// Pega as informações do localstorage e define como padrão ao carregar a página se existir
function getDatalStorage() {
  let breedLocalStorage = localStorage.getItem('Raça');
  let colorLocalStorage = localStorage.getItem('Color');
  let fontLocalStorage = localStorage.getItem('Fonte');

  // Seleciona os itens que estão salvos no localstorage
  if(localStorage.getItem('Raça')) {
    document.querySelector(`[data-breed='${breedLocalStorage}']`).selected = 'true';
  }
  if(localStorage.getItem('Color')) {
    document.querySelector(`[data-color='${colorLocalStorage}']`).selected = 'true';
  }
  if(localStorage.getItem('Fonte')) {
    document.querySelector(`[data-font='${fontLocalStorage}']`).selected = 'true';
  }
};

function setOptionsStorage() {
  let input = document.querySelector('#card-wrapper .card__image .image__overlay');
  input.style.color = localStorage.getItem('Color');
  input.style.fontFamily = localStorage.getItem('Fonte');
}

// Pega o tempo (data e hora) atual para setar no localstorage
function getTimeCurrent(){
  let date = new Date();
  let time = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
  return time;
}

function saveMsg() {
  let toast = document.querySelector('.preferencias .toast');

    setTimeout(function(){ 
      btnSalvar.classList.add('animate-circle')
    }, 300);

    setTimeout(function(){ 
      btnSalvar.classList.remove('animate-circle')
      toast.classList.add('show')
    }, 2000);


    setTimeout(function(){ 
      toast.classList.remove('show')
    }, 5000);

}