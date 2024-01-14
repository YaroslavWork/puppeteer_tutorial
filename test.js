// --- Test interaction with a form and ui elements ---

// 1) Get a screenshot and a blurred screenshot (http://youtube.com)

const puppeteer = require('puppeteer');
const log = console.log;
const searchTermCLI = process.argv.length >= 3 ? process.argv[2] : '' // node test.js "Green Day"
const searchTermENV = process.env.SEARCHTXT ?? ''; // export SEARCHTXT="Green Day"

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.viewport({ width: 1280, height: 800 });
    log("New page created");
    await page.goto('https://youtube.com/');
    log("Found youtube.com");
    const [button] = await page.$x("//button[contains(., 'Accept all')]");
    if (button) {
        await Promise.all([
            button.click(),
            page.waitForNavigation()
        ]);
        log("If accept cookies button found, click it");
    }
    const selector = '#search-input #search';
    await page.waitForSelector(selector);
    await page.type(selector, searchTermCLI, {delay: 100});
    log(`Search for ${searchTermCLI}`);

    
    await page.screenshot({path: `./screens/youtube_${searchTermCLI}.png`, fullPage: true});
    await page.emulateVisionDeficiency('blurredVision');
    await page.screenshot({path: `./screens/youtube_blurred_${searchTermCLI}.png`, fullPage: true});
    await page.emulateVisionDeficiency('none');
    log("Take screenshot");

    await Promise.all([
        page.waitForNavigation(),
        page.click('#search-icon-legacy')
    ]);
    log("Click search button and wait for navigation");
    // wait till next page
    const title_selector = 'ytd-video-renderer h3 a#video-title';
    await page.waitForSelector(title_selector);
    log("Wait for video title to appear");
    await page.screenshot({path: `./screens/youtube_search_${searchTermCLI}.png`, fullPage: true});
    log("Take screenshot");

    const firstMatch = await page.$eval(title_selector+' yt-formatted-string', (el) => {
        // runs when the element is found returning
        return el.innerText;
    });
    log(`First match: "${firstMatch}"`);
    
    await Promise.all([
        page.waitForNavigation(), //waitForNetworkIdle()
        page.click(title_selector),
    ]);

    
    const commentSelector = 'ytd-comments-header-renderer h2'
    await page.waitForSelector(commentSelector);
    const comments = await page.$eval(commentSelector, (el) => {
        return el.innerText;
    });
    log(`${comments}`);


    


    //await browser.close();
})();