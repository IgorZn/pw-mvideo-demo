import { APIRequestContext } from '@playwright/test';
import { BaseAPI } from './base.api';

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    types: { type: { name: string; url: string } }[];
    abilities: { ability: { name: string; url: string } }[];
    stats: { stat: { name: string }; base_stat: number }[];
}

export interface PokemonList {
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
}

export class PokemonAPI extends BaseAPI {
    constructor(request: APIRequestContext, baseURL: string) {
        super(request, baseURL);
    }

    async getPokemonById(id: number): Promise<Pokemon> {
        return this.get<Pokemon>(`/pokemon/${id}`);
    }

    async getPokemonByName(name: string): Promise<Pokemon> {
        return this.get<Pokemon>(`/pokemon/${name.toLowerCase()}`);
    }

    async getPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonList> {
        return this.getAll<PokemonList>('/pokemon', limit, offset);
    }

    async getPokemonNotFound(name: string) {
        return this.getWithStatus(`/pokemon/${name}`, 404);
    }

    async getPokemonSpecies(id: number): Promise<any> {
        return this.get(`/pokemon-species/${id}`);
    }

    async getEvolutionChain(id: number): Promise<any> {
        return this.get(`/evolution-chain/${id}`);
    }
}