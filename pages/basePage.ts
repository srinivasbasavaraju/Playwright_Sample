export default class BasePage {
    constructor(public page: any) {}

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }
}

