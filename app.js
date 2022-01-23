const getPokeUrl = id =>  `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokePromises = () => Array(150).fill().map((_, index) => 
fetch(getPokeUrl(index + 1)).then(response => response.json())
)

const generateHTML = pokemons => pokemons.reduce((accumulator, {name, id, types}) => {

    const pokeTypes = types.map(typeInfo => typeInfo.type.name)
    accumulator += `
    <li class="card ${pokeTypes[0]}">
    <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"</img>
    <h2 class="card-title">${id}. ${name}</h2>
    <p class="card-subtitle">${pokeTypes.join(' | ')}</p>
    </li>
    `
    return accumulator
}, '')


const insertPokeIntoPage = pokepoke => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokepoke

}




    const pokePromises = generatePokePromises()      
    Promise.all(pokePromises)
        .then(generateHTML) 
        .then(insertPokeIntoPage)

