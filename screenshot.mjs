import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'noa-homepage.png', fullPage: false });
console.log('Homepage screenshot saved');

await page.goto('http://localhost:3000/collections/all', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'noa-collection.png' });
console.log('Collection screenshot saved');

await page.goto('http://localhost:3000/products/lumiere-necklace', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'noa-product.png' });
console.log('Product screenshot saved');

await browser.close();
