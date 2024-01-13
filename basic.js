const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1280, height: 800, isMobile: false, isLandscape: true, hasTouch: false, deviceScaleFactor: 1 });
    await page.setGeolocation({latitude: 49.5, longitude: 34.21})

    await page.goto('https://www.chapters.indigo.ca');

    const url = await page.url();
    console.log(url);
    const content = await page.content();
    console.log(content);
    await page.screenshot({ path: './screens/example.png', fullPage: true });
    await page.screenshot({ path: './screens/example2.png', clip: { x: 0, y: 0, width: 500, height: 500 } });

    // await page.type('input.selector', 'text');
    // await page.waitForSelector('.someselector');

    //await browser.close();
})();