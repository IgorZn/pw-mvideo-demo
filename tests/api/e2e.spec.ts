import { test, expect } from '@fixtures/api.fixtures';

test.describe('End-to-End Pokémon Scenarios', () => {
    test('E01: Should verify Pikachu evolution chain', async ({ pokemonAPI }) => {
        const species = await pokemonAPI.getPokemonSpecies(25); // Pikachu
        expect(species.evolves_from_species).toBeDefined();
        expect(species.evolves_from_species?.name).toBe('pichu');

        // Get evolution chain if available
        if (species.evolution_chain) {
            const evolutionUrl = species.evolution_chain.url;
            const chainId = evolutionUrl.split('/').filter(Boolean).pop();
            const evolutionChain = await pokemonAPI.getEvolutionChain(parseInt(chainId));
            expect(evolutionChain.chain.species.name).toBe('pichu');
        }
    });

    test('E02: Should verify ability is correctly linked to Pokémon', async ({ abilitiesAPI, pokemonAPI }) => {
        const ability = await abilitiesAPI.getAbilityByName('static');
        const pokemonList = ability.pokemon.slice(0, 2);

        for (const pokemonRef of pokemonList) {
            const pokemonName = pokemonRef.pokemon.name;
            await pokemonAPI.getPokemonByName(pokemonName)
                .then(pokemon => {
                    const hasStatic = pokemon.abilities.some(
                        a => a.ability.name === 'static'
                    );
                    expect(hasStatic).toBeTruthy();
                })
        }
    });
});