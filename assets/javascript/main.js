
const pokemonList = document.getElementById("pokemonsList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 5;
let offset = 0;
const maxRecord = 15;



function loadPokemonItens(offset,limit){

    pokeApi.getPokemons(offset,limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon)=>`
        <li class="pokemon ${pokemon.type}" >
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}" >${type}</li>`).join("")}
                </ol>
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>

        `).join("");
        pokemonList.innerHTML += newHtml;
    })

   


   
}
loadPokemonItens(offset,limit)


loadMoreButton.addEventListener("click",()=>{
    
    offset += limit
    const qtdRecordNextPage = offset + limit;
    if(qtdRecordNextPage >= maxRecord){
        const newLimit =  maxRecord  - offset;
        loadPokemonItens(offset,newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }else{
        loadPokemonItens(offset,limit)
    }


  
})