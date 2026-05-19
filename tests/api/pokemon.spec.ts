import { test, expect } from '@fixtures/api.fixtures';

test.describe('Pokémon API Tests', () => {
    test('P01: Should get Pokémon by ID - Pikachu #25', async ({ pokemonAPI }) => {
        const pokemon = await pokemonAPI.getPokemonById(25);

        expect(pokemon.id).toBe(25);
        expect(pokemon.name).toBe('pikachu');
        expect(pokemon.types).toContainEqual(
            expect.objectContaining({ type: { name: 'electric', url: "https://pokeapi.co/api/v2/type/13/" } })
        );
    });

    test('P02: Should get Pokémon by name - Charizard', async ({ pokemonAPI }) => {
        const pokemon = await pokemonAPI.getPokemonByName('charizard');

        expect(pokemon.name).toBe('charizard');
        expect(pokemon.height).toBeGreaterThan(10);
        expect(pokemon.weight).toBeGreaterThan(500);
        expect(pokemon.abilities.length).toBeGreaterThan(0);
    });

    test('P03: Should return Pokémon list with pagination', async ({ pokemonAPI }) => {
        const pokemonList = await pokemonAPI.getPokemonList(10, 0);

        expect(pokemonList.count).toBeGreaterThan(1000);
        expect(pokemonList.results).toHaveLength(10);
        expect(pokemonList.results[0]).toHaveProperty('name');
        expect(pokemonList.results[0]).toHaveProperty('url');
    });

    test('P04: Should handle non-existent Pokémon - 404 error', async ({ pokemonAPI }) => {
        const response = await pokemonAPI.getPokemonNotFound('nonexistentpokemon123');
        expect(response.status()).toBe(404);
    });

    test('P05: Should verify Pokémon base stats are valid', async ({ pokemonAPI }) => {
        const pokemon = await pokemonAPI.getPokemonByName('mewtwo');

        expect(pokemon.base_experience).toBeGreaterThan(200);
        expect(pokemon.height).toBe(20);
        expect(pokemon.weight).toBe(1220);
        expect(pokemon.stats).toContainEqual(
            expect.objectContaining({ stat: { name: 'hp', url: "https://pokeapi.co/api/v2/stat/1/" }, base_stat: 106 })
        );
    });
});