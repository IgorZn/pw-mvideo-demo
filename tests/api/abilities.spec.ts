import { test, expect } from '@fixtures/api.fixtures';

test.describe('Abilities API Tests', () => {
    test('A01: Should get ability by ID - Overgrow #65', async ({ abilitiesAPI }) => {
        const ability = await abilitiesAPI.getAbilityById(65);

        expect(ability.id).toBe(65);
        expect(ability.name).toBe('overgrow');
        expect(ability.pokemon.length).toBeGreaterThan(20);
    });

    test('A02: Should get ability by name and verify English effect', async ({ abilitiesAPI }) => {
        const ability = await abilitiesAPI.getAbilityByName('blaze');

        expect(ability.name).toBe('blaze');
        const englishEffect = ability.effect_entries.find(
            entry => entry.language.name === 'en'
        );
        expect(englishEffect).toBeDefined();
        expect(englishEffect?.effect).toContain('When this Pokémon has 1/3 or less of its HP remaining');
    });

    test('A03: Should return ability list with correct structure', async ({ abilitiesAPI }) => {
        const abilityList = await abilitiesAPI.getAbilityList(5, 0);

        expect(abilityList.results).toHaveLength(5);
        abilityList.results.forEach((ability: any) => {
            expect(ability).toHaveProperty('name');
            expect(ability).toHaveProperty('url');
        });
    });
});