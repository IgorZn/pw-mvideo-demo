import { APIRequestContext } from '@playwright/test';
import { BaseAPI } from './base.api';

export interface Ability {
    id: number;
    name: string;
    effect_entries: { effect: string; language: { name: string } }[];
    pokemon: { pokemon: { name: string; url: string } }[];
}

export class AbilitiesAPI extends BaseAPI {
    constructor(request: APIRequestContext, baseURL: string) {
        super(request, baseURL);
    }

    async getAbilityById(id: number): Promise<Ability> {
        return this.get(`/ability/${id}`);
    }

    async getAbilityByName(name: string): Promise<Ability> {
        return this.get(`/ability/${name.toLowerCase()}`);
    }

    async getAbilityList(limit: number = 20, offset: number = 0): Promise<any> {
        return this.getAll('/ability', limit, offset);
    }
}