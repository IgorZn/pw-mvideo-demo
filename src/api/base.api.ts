import { APIRequestContext, expect } from '@playwright/test';

export class BaseAPI {
    protected request: APIRequestContext;
    protected baseURL: string;

    constructor(request: APIRequestContext, baseURL: string) {
        this.request = request;
        this.baseURL = baseURL;
    }

    protected async get<T>(endpoint: string): Promise<T> {
        const response = await this.request.get(`${this.baseURL}${endpoint}`);
        expect(response.status()).toBe(200);
        return await response.json();
    }

    protected async getWithStatus(endpoint: string, expectedStatus: number = 200) {
        const response = await this.request.get(`${this.baseURL}${endpoint}`);
        expect(response.status()).toBe(expectedStatus);
        return response;
    }

    protected async getAll<T>(endpoint: string, limit: number = 20, offset: number = 0): Promise<T> {
        return this.get<T>(`${endpoint}?limit=${limit}&offset=${offset}`);
    }
}