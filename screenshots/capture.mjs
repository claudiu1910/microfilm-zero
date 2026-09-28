/**
 * Screenshot pass for Microfilm Zero.
 * Drives headless Chrome against a running dev server so the dither, the
 * animations and the reveal are genuine component output rather than mockups.
 *
 *   npm run dev
 *   SITE=http://localhost:5173 node screenshots/capture.mjs
 */
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const CHROME =
  process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SITE = process.env.SITE || 'http://localhost:5173';
// fileURLToPath, not URL.pathname: the latter percent-encodes spaces in the
// project path and silently writes to a directory literally named "...%20...".
const OUT = fileURLToPath(new URL('.', import.meta.url));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: [
    '--headless=new',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--no-sandbox',
    '--hide-scrollbars',
    '--force-color-profile=srgb'
  ]
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
const shot = async (n, o = {}) => {
  await page.screenshot({ path: `${OUT}${n}.png`, ...o });
  console.log('  ', n);
};
const mountAllModules = () =>
  page.evaluate(async () => {
    for (const m of document.querySelectorAll('.module--file')) {
      m.scrollIntoView({ block: 'center' });
      await new Promise((r) => setTimeout(r, 700));
    }
  });

// ---------- home ----------
await page.goto(SITE, { waitUntil: 'networkidle2' });
await page.waitForSelector('.plate__frame canvas');
await sleep(3000);
await shot('01-home-masthead');

await page.evaluate(() => document.querySelector('.hero__hud').scrollIntoView({ block: 'start' }));
await sleep(1400);
await shot('02-hud-target-switcher');

// the landscape target, where the column gap used to open up
await page.click('.switcher__btn:nth-child(3)');
await sleep(3400);
await page.evaluate(() => document.querySelector('.hero__body').scrollIntoView({ block: 'start' }));
await sleep(1400);
await shot('02b-hero-contact-sheet');
await page.click('.switcher__btn:nth-child(1)');
await sleep(3400);

await page.evaluate(() => document.querySelector('.plate').scrollIntoView({ block: 'center' }));
await sleep(1800);
await shot('03-home-hero-dithered');

// sweep the cursor to burn a reveal trail, then mark a field note
const hero = await (await page.$('.plate__frame')).boundingBox();
for (let i = 0; i <= 26; i++) {
  const t = i / 26;
  await page.mouse.move(
    hero.x + hero.width / 2 - 20 + Math.sin(t * 5) * 90,
    hero.y + 90 + t * (hero.height - 220)
  );
  await sleep(30);
}
await sleep(200);
await shot('04-home-hero-unredacted');

await page.evaluate(() => document.querySelectorAll('.note')[1].click());
await sleep(600);
await shot('05-field-note-marker');

await mountAllModules();
await sleep(2200);
await page.evaluate(() => document.querySelector('.bento').scrollIntoView({ block: 'start' }));
await sleep(1400);
await shot('06-bento-grid');

const hoverBox = await (await page.$('.module--file')).boundingBox();
await page.mouse.move(hoverBox.x + hoverBox.width / 2, hoverBox.y + hoverBox.height / 2);
await sleep(700);
await shot('06b-bento-card-hover');

await page.evaluate(() => document.querySelector('.module--file').scrollIntoView({ block: 'center' }));
await sleep(700);
const card = await (await page.$('.module--file .loupe-host')).boundingBox();
await page.mouse.move(card.x + 60, card.y + 40);
await page.mouse.move(card.x + 190, card.y + 120);
await sleep(500);
await shot('07-bento-targeting-loupe');

// hold the exposure at peak so a still can show the inversion
await page.evaluate(() => {
  const el = document.querySelector('.exposure');
  el.classList.add('is-firing');
  el.style.animationDelay = '-40ms';
  el.style.animationPlayState = 'paused';
});
await sleep(400);
await shot('08-exposure-flash');
await page.evaluate(() => {
  const el = document.querySelector('.exposure');
  el.classList.remove('is-firing');
  el.style.animationDelay = '';
  el.style.animationPlayState = '';
});

// ---------- file page ----------
await page.goto(`${SITE}/files/mz-0114`, { waitUntil: 'networkidle2' });
await page.waitForSelector('.plate__frame--file canvas');
await sleep(3000);
await shot('09-file-header');

await page.evaluate(() => document.querySelector('.plate--file').scrollIntoView({ block: 'center' }));
await sleep(1400);
const plate = await (await page.$('.plate__frame--file')).boundingBox();
for (let i = 0; i <= 22; i++) {
  const t = i / 22;
  await page.mouse.move(
    plate.x + plate.width * (0.25 + 0.5 * t),
    plate.y + plate.height * (0.3 + Math.sin(t * 3) * 0.28)
  );
  await sleep(28);
}
await sleep(200);
await shot('10-file-plate-unredacted');

await page.evaluate(() => document.querySelector('.prose').scrollIntoView({ block: 'start' }));
await sleep(1300);
await page.evaluate(() => document.querySelectorAll('.redacted')[0]?.click());
await sleep(600);
await shot('11-file-prose-redaction-open');

await page.evaluate(() => document.querySelector('.evlog').scrollIntoView({ block: 'center' }));
await sleep(1600);
await shot('12-file-evidence-log');

await page.evaluate(() => document.querySelector('.tscript').scrollIntoView({ block: 'center' }));
await sleep(2600);
await shot('13-file-transcript');

await page.evaluate(() => document.querySelector('.plate-fig').scrollIntoView({ block: 'center' }));
await sleep(1600);
await shot('14-file-halftone-plate');

await page.evaluate(() => document.querySelector('.sidebar').scrollIntoView({ block: 'center' }));
await sleep(1400);
await shot('15-file-sidebar');

await page.evaluate(() => document.querySelector('.prose').scrollIntoView({ block: 'start' }));
await sleep(1300);
await shot('15c-file-rail');

await page.evaluate(() => document.querySelector('.crossref').scrollIntoView({ block: 'center' }));
await sleep(1200);
await shot('15b-file-crossref');

// ---------- master ledger ----------
await page.goto(`${SITE}/archive`, { waitUntil: 'networkidle2' });
await page.waitForSelector('.table__row');
await sleep(1800);
await shot('16-archive-ledger');

// ---------- full pages ----------
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(SITE, { waitUntil: 'networkidle2' });
await page.waitForSelector('.plate__frame canvas');
await mountAllModules();
await page.evaluate(() => window.scrollTo(0, 0));
await sleep(2500);
await shot('17-home-full-page', { fullPage: true });

await page.goto(`${SITE}/files/mz-0307`, { waitUntil: 'networkidle2' });
await page.waitForSelector('.file__title');
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 500) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 260));
  }
  window.scrollTo(0, 0);
});
await sleep(2500);
await shot('18-file-full-page', { fullPage: true });

// ---------- mobile ----------
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await m.goto(SITE, { waitUntil: 'networkidle2' });
await m.waitForSelector('.plate__frame canvas');
await sleep(3000);
await m.screenshot({ path: `${OUT}19-mobile-home.png` });
console.log('   19-mobile-home');

await m.goto(`${SITE}/files/mz-0603`, { waitUntil: 'networkidle2' });
await m.waitForSelector('.file__title');
await sleep(3000);
await m.screenshot({ path: `${OUT}20-mobile-file.png` });
console.log('   20-mobile-file');

const overflow = await m.evaluate(() => ({
  scrollW: document.documentElement.scrollWidth,
  innerW: window.innerWidth
}));
console.log('   mobile overflow:', overflow.scrollW > overflow.innerW ? `YES ${JSON.stringify(overflow)}` : 'none');

await browser.close();
console.log('done');
