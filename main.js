const container = document.querySelector('.pokemon-container');

const popup = document.querySelector('.pokemon-popup');
const closeP = document.querySelector('.close-popup');
const nombre = document.querySelector('.nombre-popup');
const idP = document.querySelector('.id-popup');
const pesoP = document.querySelector('.peso-popup');
const alturaP = document.querySelector('.altura-popup');
const imgP = document.querySelector('.img-popup');
const contenidoP = document.querySelector('.popup-contenido');
const imgContainerP = document.querySelector('.img-container-popup');

let arrayPokemones = {}
var array = 0;

        function fetchPokemon(id) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(response => response.json())
            .then((data) => {
                createPokemon(data);
            })
            .catch(error => console.log(error));
        }

        function idArray(number){
            for (let i=1; i <= number; i++){
                fetchPokemon(i);
            }
        }

        function createPokemon(pokemon){

            const card = document.createElement('div');
            card.classList.add('pokemon-block');

            const number = document.createElement('p');
            number.textContent = `Id: ${pokemon.id}`;

            const name = document.createElement('p');
            name.classList.add('name');
            name.textContent = pokemon.name;

            const url = document.createElement('p');
            url.classList.add('url');
            url.textContent = pokemon.forms[0].url;

            card.appendChild(name);
            card.appendChild(number);
            card.appendChild(url);

            container.appendChild(card);

                card.addEventListener('click', () => {

                    nombre.textContent = pokemon.name;
                    imgP.src = pokemon.sprites.front_default;

                    imgContainerP.appendChild(imgP);

                    idP.textContent = `Id: ${pokemon.id}`;
                    pesoP.textContent = `Peso: ${pokemon.weight}`;
                    alturaP.textContent = `Altura: ${pokemon.height}`;

                    contenidoP.appendChild(nombre);
                    contenidoP.appendChild(imgContainerP);
                    contenidoP.appendChild(idP);
                    contenidoP.appendChild(pesoP);
                    contenidoP.appendChild(alturaP);

                    popup.appendChild(contenidoP);

                    popup.style.display= "block";

                    let arrayPokemon={
                        nameA: pokemon.name,
                        imgA: pokemon.sprites.front_default,
                        idA: pokemon.id,
                        pesoA: pokemon.weight,
                        alturaA: pokemon.height
                    }
                    
                    arrayPokemones[array] = arrayPokemon;
                    array++;
                    localStorage.setItem("pokemonS", JSON.stringify(arrayPokemones));
                })

                closeP.addEventListener('click', () => {
                    popup.style.display= "none";
                })
        }

        idArray(20);