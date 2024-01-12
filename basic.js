const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage(
        { headless: true }
    );
    await page.goto('https://www.zditm.szczecin.pl/pl/zditm/dla-programistow/api-linie');
    await page.screenshot({ path: 'example.png', fullPage: true });
    await browser.close();
})();
