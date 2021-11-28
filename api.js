const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';


const searchInput = document.querySelector('.search-input'),
      searchButton = document.querySelector('.search-button'),
      container = document.querySelector('.pokemon'),
      errorMessage = document.querySelector('.error')




let pokemon,  // armazena dados da API
  pokeName, // armazena dados(value) do input
  card       // cria o card do pokemon


function fetchPokemon(url, name) {
  fetch(url + name)
    .then(r => r.json())
    .then(data => {
      pokemon = data
    })
    .catch(err => console.log(err))
}


function createCard() {
  card = `
    <div class="pokemon-picture">
      <img src="${pokemon.sprites.front_default}">
    </div>
    <div class="pokemon-info">
        <h1 class="name">Name: ${pokemon.name}</h1>
        <h2 class="number">Nº ${pokemon.id}</h2>
        <h3 class="type">Type: ${pokemon.types.map(item => item.type.name)}</h3>
        <h3 class="skill">Skills: ${pokemon.moves.map(item => item.move.name)}</h3>
        <h3 class="weight">Weight: ${pokemon.weight / 10}kg</h3>
        <h3 class="height">Height: ${pokemon.height / 10}m</h3>
    </div>`;
  return card;
}

//Função que faz a chamada das principais funções e inicia o app

startPokedex = function (pokeName) {
  fetchPokemon(baseUrl, pokeName)

  setTimeout(function () {
    //exibe uma menssagem caso o pokemon pesquisado nao exista
    if (pokemon.detail) {
        errorMessage.style.display='block';
        container.style.display ='none';
        
    } else {
      errorMessage.style.display='none';
      container.style.display ='flex';
      container.innerHTML = createCard();
    }
  }, 2000)
}


console.log(pokemon)

//funcao de eventos

searchButton.addEventListener('click', event => {
  event.preventDefault()
  pokeName = searchInput.value.toLowerCase()
  startPokedex(pokeName)
})