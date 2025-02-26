export async function fetchAllPokemon({ pageParam } = {}) {
    const response = await fetch(
        pageParam || 'https://pokeapi.co/api/v2/pokemon/'
    );
    if (!response.ok) {
        throw new Error('Error fetching Pokémon list');
    }
    const data = await response.json();
    return data.results.map((pokemon, index) => ({
        ...pokemon,
        id: (index + 1).toString(), // Asigna un ID único
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`, // URL de la imagen
    }));
}