// Lista todos os animais, quando não há informações no localstorage é usada essa request para preencher os campos
function getAllBreeds(){
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => populateOptions(data.message))
};

//Preenche o select com as raças
function populateOptions(data){
  const output = Object.keys(data).map(key => `<option data-breed='${key}' value='${key}'>${key}</option>`).join('');
  document.getElementById('select-breeds').innerHTML = output;

  getDatalStorage()
  getBreed()
};

//Faz uma consulta filtrando pela raça selecionada
function getBreed(){
  //Pega a opção selecionada no select
  const selectedBreed = dogList.options[dogList.selectedIndex].value;

  const url = `https://dog.ceo/api/breed/${selectedBreed}/images/random`;

  fetch(url)
    .then(response => response.json())
    .then(data => createGrid(data.message, selectedBreed.toUpperCase()))
};

// Função que gera o card com imagem e nome da raça
function createGrid(data, breed){
  const container = document.querySelector('#card-wrapper .card');

  const output = `
    <div class='card__header'>
      <span>${breed}</span>
    </div>
    <div class='card__box'>
      <div class='card__image'>
        <img src='${data}' alt='${breed}' class='image'/>
        <span class='image__overlay'>${breed}</span>
        <div class='card__overlay'></div>
      </div>
    </div>
  `;
  container.innerHTML = output;
  setOptionsStorage()
};
