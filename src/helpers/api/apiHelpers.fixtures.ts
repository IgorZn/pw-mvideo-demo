import { PokemonAPI } from '@api/pokemon.api';
import { AbilitiesAPI } from '@api/abilities.api';
import { TypesAPI } from '@api/types.api';
import {APIRequestContext, TestInfo} from "@playwright/test";


// Хелпер для создания API клиентов
export const createApiClients = (request: APIRequestContext, testInfo: TestInfo) => ({
    pokemonAPI: new PokemonAPI(request, testInfo.project.use.baseURL as string),
    abilitiesAPI: new AbilitiesAPI(request, testInfo.project.use.baseURL as string),
    typesAPI: new TypesAPI(request, testInfo.project.use.baseURL as string),
});