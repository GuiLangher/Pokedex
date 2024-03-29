const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_img');
const question = document.querySelector('.question');

const blue = document.querySelector('.blue');
const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');

const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
    return data;
    }
}

const renderPokemon = async (pokemon) => {

    green.style.display = 'none';
    red.style.display = 'none';
    yellow.style.display = 'none';

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    yellow.style.display = 'block';

    const data = await fetchPokemon(pokemon);

    if (data) {
    pokemonImage.style.display = 'block';
    green.style.display = 'block'
    question.style.display = 'none';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    inputSearch.value = '';
    searchPokemon = data.id;
    } else {
        question.style.display = 'block';
        red.style.display = 'block'
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :(';
        pokemonNumber.innerHTML = '';
        inputSearch.value = '';
    }
    yellow.style.display = 'none';
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon >1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon('1');