import { test as base, Page } from "@playwright/test";
import {IndexPage} from '@pages/index.page';
import * as process from "node:process";

type Pages = {
    page: Page;
    indexPage: IndexPage;
};

export const test = base.extend<Pages>({
    page: async ({ page }, use) => {
        await use(page);
    },
    indexPage: async ({ page }, use) => {
        const indexPage = new IndexPage(page)
        await indexPage.goto();
        process.env.UPD_COOKIE !== 'false' ? await indexPage.updateCookies() : null;

        await use(indexPage);
    },
});

export { expect } from '@playwright/test';