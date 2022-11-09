let allPokemon = [];
let currentPokemon;
let currentPokemonName;
let currentPokemonImage;
let currentPokemonId;
let currentPokemonType;
let currentPokemonColor;
let start = 1;
let limit = 21;


async function loadPokemon() {
    for (let i = start; i < limit; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    allPokemon.push(currentPokemon);
    }
    renderPokedex();
    start += 20;
    limit += 20;
} 


function renderPokedex() {
    let container = document.getElementById('pokedex-container');
    container.innerHTML = '';
    for (let i = 0; i < allPokemon.length; i++) {
        const pokemon = allPokemon[i];

        currentPokemonName = pokemon['name'];
        currentPokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
        currentPokemonId = pokemon['id'];
        currentPokemonType = pokemon['types']['0']['type']['name'];
        findOutColor(currentPokemonType);
        container.innerHTML += html(i,currentPokemonColor, currentPokemonName, currentPokemonImage, currentPokemonId);
    }
}


function html(i,currentPokemonColor, currentPokemonName, currentPokemonImage, currentPokemonId) {
    return `
    <div class="card" id="card${i}" onclick="renderPokemonInfo(${i})" style="background-color: ${currentPokemonColor};">
        <div>
        
            <h2>#${currentPokemonId}&nbsp;${currentPokemonName}<h2>

        </div>
        <div>
            <img id="pokemon-img" src="${currentPokemonImage}">
        </div>
        <div>
            <h3 class="typestyle"><b>${currentPokemonType}</b><h3>

        </div>
    </div>
    `
}


function resetSearchBar() {
    document.getElementById('search').value = '';
}

function searchPokemon() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let container = document.getElementById('pokedex-container');
    container.innerHTML = '';
        for (let i = 0; i < allPokemon.length; i++) {
            const currentPokemonName = allPokemon[i]['name'];
            currentPokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
            currentPokemonId = allPokemon[i]['id'];
            currentPokemonType = allPokemon[i]['types']['0']['type']['name'];
            findOutColor(currentPokemonType);
            if (currentPokemonName.toLowerCase().includes(search)) {
            container.innerHTML += html(i,currentPokemonColor, currentPokemonName, currentPokemonImage, currentPokemonId);
            }
        }  
        if (search == '') {
            renderPokedex();
        }
}


function findOutColor(currentPokemonType) {
    if (currentPokemonType == 'grass') {
        return currentPokemonColor = 'rgb(122, 199, 76)';
    }

    if (currentPokemonType == 'fire') {
        return currentPokemonColor = 'rgb(238, 129, 48)';
    }

    if (currentPokemonType == 'water') {
        return currentPokemonColor = 'rgb(99, 144, 240)';
    }

    if (currentPokemonType == 'bug') {
        return currentPokemonColor = 'rgb(166, 185, 26)';
    }

    if (currentPokemonType == 'normal') {
        return currentPokemonColor = 'rgb(168, 167, 122)';
    }

    if (currentPokemonType == 'poison') {
        return currentPokemonColor = 'rgb(163, 62, 161)';
    }

    if (currentPokemonType == 'electric') {
        return currentPokemonColor = 'rgb(247, 208, 44)';
    }

    if (currentPokemonType == 'fairy') {
        return currentPokemonColor = 'rgb(214, 133, 173)';
    }

    if (currentPokemonType == 'ground') {
        return currentPokemonColor = 'rgb(226, 191, 101)';
    }

    if (currentPokemonType == 'fighting') {
        return currentPokemonColor = 'rgb(194, 46, 40)';
    }

    if (currentPokemonType == 'psychic') {
        return currentPokemonColor = 'rgb(249, 85, 135)';
    }

    if (currentPokemonType == 'rock') {
        return currentPokemonColor = 'rgb(182, 161, 54)';
    }

    if (currentPokemonType == 'ghost') {
        return currentPokemonColor = 'rgb(115, 87, 151)';
    }

    if (currentPokemonType == 'ice') {
        return currentPokemonColor = 'rgb(150, 217, 214)';
    }

    if (currentPokemonType == 'dragon') {
        return currentPokemonColor = 'rgb(111, 53, 254)';
    }

    return currentPokemonColor;
}

function renderPokemonInfo(i) {
    let id = allPokemon[i]['id'];
    let name = allPokemon[i]['name'];
    let img = document.getElementById('dialog-img');
    currentPokemonType = allPokemon[i]['types']['0']['type']['name'];
    document.getElementById('position-container').classList.remove('d-none');
    document.getElementById('id').innerHTML = '# &nbsp;' + id;
    document.getElementById('body').classList.add('hidden');
    document.getElementById('dark').classList.remove('d-none');
    document.getElementById('button').classList.add('d-none');
    renderStats(i);
    findOutColor(currentPokemonType);
    dialog.style=`background-color: ${currentPokemonColor}`;
    document.getElementById('dialog-name').innerHTML = name;
    document.getElementById('dialog-type').innerHTML = currentPokemonType;
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`;
}


function renderStats(i) {
    document.getElementById('hp').innerHTML = allPokemon[i]['stats'][0]['base_stat'];
    document.getElementById('attack').innerHTML = allPokemon[i]['stats'][1]['base_stat'];
    document.getElementById('defense').innerHTML = allPokemon[i]['stats'][2]['base_stat'];
    document.getElementById('special-attack').innerHTML = allPokemon[i]['stats'][3]['base_stat'];
    document.getElementById('special-defense').innerHTML = allPokemon[i]['stats'][4]['base_stat'];
    document.getElementById('speed').innerHTML = allPokemon[i]['stats'][5]['base_stat'];
}


function closeDialog() {
    document.getElementById('position-container').classList.add('d-none');
    document.getElementById('body').classList.remove('hidden');
    document.getElementById('button').classList.remove('d-none');
    document.getElementById('dark').classList.add('d-none');
}