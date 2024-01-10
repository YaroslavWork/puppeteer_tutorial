const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
         headless: true,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('https://www.google.com');
    await page.screenshot({ path: 'google.png' });

    await browser.close();
})();