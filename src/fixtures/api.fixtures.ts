import { test as base} from '@playwright/test';
import { PokemonAPI } from '@api/pokemon.api';
import { AbilitiesAPI } from '@api/abilities.api';
import { TypesAPI } from '@api/types.api';
import {createApiClients} from "../helpers/api/apiHelpers.fixtures";

type ApiFixtures = {
    pokemonAPI: PokemonAPI;
    abilitiesAPI: AbilitiesAPI;
    typesAPI: TypesAPI;
};

export const test = base.extend<ApiFixtures>({
    pokemonAPI: async ({ request }, use, testInfo) => {
        const { pokemonAPI } = createApiClients(request, testInfo);
        await use(pokemonAPI);
    },
    abilitiesAPI: async ({ request }, use, testInfo) => {
        const { abilitiesAPI } = createApiClients(request, testInfo);
        await use(abilitiesAPI);
    },
    typesAPI: async ({ request }, use, testInfo) => {
        const { typesAPI } = createApiClients(request, testInfo);
        await use(typesAPI);
    },
});

export { expect } from '@playwright/test';