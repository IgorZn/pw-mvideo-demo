import { APIRequestContext } from '@playwright/test';
import { BaseAPI } from './base.api';

export interface PokemonType {
    id: number;
    name: string;
    damage_relations: {
        double_damage_from: { name: string }[];
        double_damage_to: { name: string }[];
        half_damage_from: { name: string }[];
        half_damage_to: { name: string }[];
        no_damage_from: { name: string }[];
        no_damage_to: { name: string }[];
    };
    pokemon: { pokemon: { name: string; url: string } }[];
}

export class TypesAPI extends BaseAPI {
    constructor(request: APIRequestContext, baseURL: string) {
        super(request, baseURL);
    }

    async getTypeById(id: number): Promise<PokemonType> {
        return this.get(`/type/${id}`);
    }

    async getTypeByName(name: string): Promise<PokemonType> {
        return this.get(`/type/${name.toLowerCase()}`);
    }

    async getTypeList(limit: number = 20, offset: number = 0): Promise<any> {
        return this.getAll('/type', limit, offset);
    }
}