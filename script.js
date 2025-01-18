document.getElementById('search-button').addEventListener('click', async () => {
    const input = document.getElementById('pokemon-input');
    const resultContainer = document.getElementById('result');
    const query = input.value.trim().toLowerCase();

    if (!query) {
        alert('Please enter a Pokémon name!');
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

        if (!response.ok) {
            throw new Error('Pokémon not found');
        }

        const pokemon = await response.json();

        resultContainer.innerHTML = `
            <div class="card">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
                <h2>${pokemon.name.toUpperCase()}</h2>
                <p><strong>Abilities:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
                <p><strong>Stats:</strong></p>
                <ul>
                    ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                </ul>
            </div>
        `;
    } catch (error) {
        resultContainer.innerHTML = '<p style="color: red;">Pokémon not found. Please try another name.</p>';
    }
});
 // Zufallspokemon
document.getElementById('random-button').addEventListener('click', async () => {
    const resultContainer = document.getElementById('result');
    try {
        const randomId = Math.floor(Math.random() * 898) + 1; // Pokémon IDs von 1 bis 898
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);

        if (!response.ok) {
            throw new Error('Pokémon not found');
        }

        const pokemon = await response.json();

        resultContainer.innerHTML = `
            <div class="card">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
                <h2>${pokemon.name.toUpperCase()}</h2>
                <p><strong>Abilities:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
                <p><strong>Stats:</strong></p>
                <ul>
                    ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                </ul>
            </div>
        `;
    } catch (error) {
        resultContainer.innerHTML = '<p style="color: red;">Failed to fetch a random Pokémon. Please try again.</p>';
    }
});

