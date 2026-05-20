import { APIRequestContext, expect } from '@playwright/test';

/**
 * Базовый класс для всех API-клиентов
 * @abstract
 */
export class BaseAPI {
    protected request: APIRequestContext;
    protected baseURL: string;

    /**
     * @param request - контекст запроса Playwright
     * @param baseURL - базовый URL API (передается из фикстуры)
     */
    constructor(request: APIRequestContext, baseURL: string) {
        this.request = request;
        this.baseURL = baseURL;
    }

    /**
     * Выполняет GET-запрос и автоматически проверяет статус 200
     * @param endpoint - относительный путь эндпоинта (начинается с "/")
     * @returns T - типизированный ответ API
     * @throws {Error} если статус ответа не 200
     */
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
        return this.get(`${endpoint}?limit=${limit}&offset=${offset}`);
    }
}