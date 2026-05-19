import { test, expect } from '@fixtures/api.fixtures';

test.describe('Types API Tests', () => {
    test('T01: Should get type by ID - Fire #10', async ({ typesAPI }) => {
        const type = await typesAPI.getTypeById(10);

        expect(type.id).toBe(10);
        expect(type.name).toBe('fire');
        expect(type.damage_relations.double_damage_to).toContainEqual(
            expect.objectContaining({ name: 'grass' })
        );
    });

    test('T02: Should verify water type damage relations', async ({ typesAPI }) => {
        const type = await typesAPI.getTypeByName('water');

        // Water is strong against fire, ground, rock
        const strongAgainst = type.damage_relations.double_damage_to;
        expect(strongAgainst.some(t => t.name === 'fire')).toBeTruthy();
        expect(strongAgainst.some(t => t.name === 'ground')).toBeTruthy();

        // Water is weak to electric and grass
        const weakTo = type.damage_relations.double_damage_from;
        expect(weakTo.some(t => t.name === 'electric')).toBeTruthy();
        expect(weakTo.some(t => t.name === 'grass')).toBeTruthy();
    });

    test('T03: Should get type list with Pokémon counts', async ({ typesAPI }) => {
        const typeList = await typesAPI.getTypeList(18, 0);

        expect(typeList.count).toBe(21);
        expect(typeList.results).toHaveLength(18);

        // Verify we have all Gen 1 types
        const typeNames = typeList.results.map((t: any) => t.name);
        expect(typeNames).toContain('normal');
        expect(typeNames).toContain('fire');
        expect(typeNames).toContain('water');
        expect(typeNames).toContain('electric');
        expect(typeNames).toContain('dragon');
    });
});