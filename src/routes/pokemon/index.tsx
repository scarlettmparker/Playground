import { useEffect, useState } from 'react';
import styles from './pokemon.module.css';

async function getPokemonList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150");
  const data = await response.json();
  return data.results;
}

async function getPokemonImage(pokemon: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  const data = await response.json();
  return data.sprites.front_default;
}

async function getPokemonDescription(pokemon: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
  const data = await response.json();

  return data;
}

const Pokemon: React.FC = () => {
  const [pokemon, setPokemon] = useState(0);
  const [pokemonList, setPokemonList] = useState<any>([]);
  const [pokemonImage, setPokemonImage] = useState<string>();
  const [pokemonDescription, setPokemonDescription] = useState<any>();

  const updatePokemonList = async () => {
    setPokemonList(await getPokemonList());
  };

  const updatePokemonImage = async () => {
    setPokemonImage(await getPokemonImage(pokemon + 1));
  }

  const updatePokemonDescription = async () => {
    setPokemonDescription(await getPokemonDescription(pokemon + 1));
  }

  const updatePokemon = (direction: boolean) => {
    const pokemonLength = pokemonList.length;
    const newPokemon = (pokemon + (direction ? 1 : - 1) + pokemonLength) % pokemonLength;
    setPokemon(newPokemon);
  }

  useEffect(() => {
    updatePokemonList();
  }, []);

  useEffect(() => {
    updatePokemonImage();
    updatePokemonDescription();
  }, [pokemon])

  return (
    <div className={styles.pokemonWrapper}>
      <select className={styles.pokemonSelect} onChange={(e) => setPokemon(parseInt(e.target.value))}>
        {pokemonList.length > 0 && pokemonList.map((pokemon: any, idx: number) => {
          return (
            <option key={idx} value={idx}>
              {pokemon.name}
            </option>
          )
        })}
      </select>
      <div className={styles.pokemonData}>
        {(pokemonList.length > 0 && pokemonDescription) &&
          <>
            <img src={pokemonImage} className={styles.pokemonImage}></img>
            <span className={styles.pokemonHeader}>{pokemonList[pokemon].name}</span>
            <span className={styles.pokemonDescription}>{pokemonDescription.flavor_text_entries[0].flavor_text}</span>
          </>
        }
      </div>
      <div className={styles.buttons}>
        <button onClick={() => updatePokemon(false)}>Previous</button>
        <button onClick={() => updatePokemon(true)}>Next</button>
      </div>
    </div>
  );
}

export default Pokemon;