import type { Locator, Page } from '@playwright/test';

type SelectorMap = Readonly<Record<string, string>>;

export class BasePage {
  constructor(
    protected readonly page: Page,
    private readonly selectors: SelectorMap,
  ) {}

  protected element(key: string, scope: Page | Locator = this.page): Locator {
    const selector = this.selectors[key];
    if (!selector || selector === '__REQUIRED__') {
      throw new Error(`Locator "${key}" is missing or pending`);
    }
    return scope.locator(selector);
  }
}
