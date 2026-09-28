/**
 * Behavioural checks for Microfilm Zero, driven through headless Chrome so the
 * WebGL viewer, the animations and the route transitions all run for real.
 *
 *   npm run dev
 *   SITE=http://localhost:5173 npm run verify
 */
import puppeteer from 'puppeteer-core';

const CHROME =
  process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SITE = process.env.SITE || 'http://localhost:5173';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ok = [];
const bad = [];
const check = (n, pass, d = '') => (pass ? ok : bad).push(`${n}${d ? ' — ' + d : ''}`);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--headless=new', '--use-gl=angle', '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader', '--no-sandbox', '--hide-scrollbars',
    '--force-color-profile=srgb']
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

const mountAllModules = () =>
  page.evaluate(async () => {
    for (const m of document.querySelectorAll('.module--file')) {
      m.scrollIntoView({ block: 'center' });
      await new Promise((r) => setTimeout(r, 650));
    }
  });

// ───────── hub ─────────
await page.goto(SITE, { waitUntil: 'networkidle2', timeout: 60000 });
await page.waitForSelector('.plate__frame canvas', { timeout: 30000 });
await sleep(2600);

check('hub: hero plate mounted', await page.$$eval('.plate__frame canvas', (n) => n.length === 1));
check('hub: redaction wipe lifted',
  await page.$eval('.hero__title.wipe', (n) => n.classList.contains('is-lifted')));

// ── target switching ──
const targetsCount = await page.$$eval('.switcher__btn', (n) => n.length);
check('HUD: three optical targets', targetsCount === 3, `${targetsCount}`);

const beforeTitle = await page.$eval('.hero__title', (n) => n.textContent.trim());
await page.click('.switcher__btn:nth-child(3)');
await sleep(90);
const glitchLive = await page.$eval('.crt', (n) => n.classList.contains('is-active'));
check('HUD: CRT interference fires on switch', glitchLive);

await sleep(3200);
const after = await page.evaluate(() => ({
  title: document.querySelector('.hero__title').textContent.trim(),
  active: document.querySelector('.switcher__btn.is-active .switcher__code')?.textContent,
  caseNo: document.querySelector('.hero__kicker .mono')?.textContent.trim(),
  canvas: !!document.querySelector('.plate__frame canvas'),
  noteRefs: [...document.querySelectorAll('.note__ref')].map((n) => n.textContent.trim()),
  glitch: document.querySelector('.crt').classList.contains('is-active')
}));
check('HUD: target switch re-points viewer', after.title !== beforeTitle && after.canvas,
  `${beforeTitle} -> ${after.title}`);
check('HUD: switch swaps metadata', after.active === 'TGT-C' && /03-A08/.test(after.caseNo),
  `${after.active} / ${after.caseNo}`);
check('HUD: switch swaps reticle marks', after.noteRefs.some((r) => /APERTURE/.test(r)),
  after.noteRefs.slice(0, 2).join(', '));
check('HUD: interference clears after switch', after.glitch === false);

// marker lands on the new target
await page.evaluate(() => document.querySelectorAll('.note')[0].click());
await sleep(500);
const mark = await page.evaluate(() => {
  const m = document.querySelector('.mark');
  return m ? { label: m.textContent.trim(), style: m.getAttribute('style') } : null;
});
check('HUD: marker renders for new target', Boolean(mark && /APERTURE/.test(mark.label)),
  mark?.label);

// ── exposure slider drives the live component ──
await page.evaluate(() => {
  const el = document.querySelectorAll('.slider input[type="range"]')[0];
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  setter.call(el, '5');
  el.dispatchEvent(new Event('input', { bubbles: true }));
});
await sleep(600);
const grainState = await page.evaluate(() => ({
  readout: document.querySelector('.slider__val').textContent.trim(),
  canvasStillThere: !!document.querySelector('.plate__frame canvas'),
  resetEnabled: !document.querySelector('.exposure-ctl__reset').disabled
}));
check('HUD: grain slider updates readout', /5 px\/cell/.test(grainState.readout), grainState.readout);
check('HUD: slider does not remount the canvas', grainState.canvasStillThere);
check('HUD: reset offered once off spec', grainState.resetEnabled);

await page.click('.exposure-ctl__reset');
await sleep(400);
check('HUD: reset returns to plate spec',
  await page.$eval('.slider__val', (n) => /2 px\/cell/.test(n.textContent)));

// ── telemetry drifts ──
const t1 = await page.$eval('.telemetry__val', (n) => n.textContent);
await sleep(2100);
const t2 = await page.$eval('.telemetry__val', (n) => n.textContent);
check('HUD: telemetry readings drift', t1 !== t2, `${t1} -> ${t2}`);

// ── bento grid ──
await mountAllModules();
await sleep(2200);
const bento = await page.evaluate(() => ({
  slots: document.querySelectorAll('.bento__slot').length,
  leads: document.querySelectorAll('.bento__slot--lead').length,
  fileCanvases: document.querySelectorAll('.module--file canvas').length,
  log: !!document.querySelector('.module--log'),
  timeline: document.querySelectorAll('.timeline__row').length,
  chunks: document.querySelectorAll('.module--redaction .redacted').length
}));
check('bento: 9 modules, 2 leads', bento.slots === 9 && bento.leads === 2,
  `${bento.slots} slots / ${bento.leads} leads`);
check('bento: all 6 file previews live', bento.fileCanvases === 6, `${bento.fileCanvases}/6`);
check('bento: telemetry modules present',
  bento.log && bento.timeline === 6 && bento.chunks === 4,
  `log ${bento.log} timeline ${bento.timeline} chunks ${bento.chunks}`);

// bring the first module back on screen; boundingBox is viewport-relative and
// the mount pass above scrolled it away.
await page.evaluate(() =>
  document.querySelector('.module--file').scrollIntoView({ block: 'center' }));
await sleep(700);
const box = await (await page.$('.module--file .loupe-host')).boundingBox();
await page.mouse.move(box.x + 50, box.y + 40);
await page.mouse.move(box.x + 165, box.y + 110);
await sleep(300);
const loupe = await page.evaluate(() => {
  const l = document.querySelector('.loupe');
  return { live: l.classList.contains('is-live'), text: l.querySelector('.loupe__readout').textContent };
});
check('bento: loupe live', loupe.live);
check('bento: REL-LOC readout', /REL-LOC: \[\d+, \d+\]/.test(loupe.text), loupe.text.trim());

// ── layout: hero columns balance on the landscape target ──
await page.evaluate(() => document.querySelector('.hero__body').scrollIntoView({ block: 'start' }));
await sleep(600);
const balance = await page.evaluate(() => {
  const main = document.querySelector('.hero__main').getBoundingClientRect().height;
  const aside = document.querySelector('.hero__aside').getBoundingClientRect().height;
  return { main: Math.round(main), aside: Math.round(aside), diff: Math.round(Math.abs(main - aside)) };
});
check('layout: hero columns balance', balance.diff < 160,
  `main ${balance.main} v aside ${balance.aside}, diff ${balance.diff}`);

// ── contact strip ──
const strip = await page.$$eval('.strip__cell', (n) => n.length);
check('HUD: contact sheet lists all targets', strip === 3, `${strip}`);
await page.click('.strip__cell:nth-child(1) , .strip__row li:first-child .strip__cell');
await sleep(3200);
check('HUD: contact sheet switches target',
  await page.$eval('.switcher__btn.is-active .switcher__code', (n) => n.textContent === 'TGT-A'));

// ── card hover affordance ──
await page.evaluate(() => document.querySelector('.module--file').scrollIntoView({ block: 'center' }));
await sleep(700);
const cbox = await (await page.$('.module--file')).boundingBox();
await page.mouse.move(cbox.x + cbox.width / 2, cbox.y + cbox.height / 2);
await sleep(600);
const hover = await page.evaluate(() => {
  const m = document.querySelector('.module--file');
  const link = m.querySelector('.module__title--file .card__link');
  const tab = getComputedStyle(m.querySelector('.module__frame'), '::after');
  return {
    underline: getComputedStyle(link).backgroundSize,
    colour: getComputedStyle(link).color,
    tab: tab.transform,
    open: getComputedStyle(m.querySelector('.card__open')).color,
    cursor: getComputedStyle(m).cursor
  };
});
check('cards: title underlines on hover', /100%/.test(hover.underline), hover.underline);
// #c92a2a === rgb(201, 42, 42)
check('cards: title takes the stamp colour', hover.colour === 'rgb(201, 42, 42)', hover.colour);
check('cards: OPEN tab slides in', !/100\)?$/.test(hover.tab) && hover.tab !== 'none', hover.tab);
check('cards: pointer cursor over the whole module', hover.cursor === 'pointer', hover.cursor);

// ───────── routes ─────────
await page.evaluate(() => document.querySelector('.module--file .card__link').scrollIntoView({ block: 'center' }));
await sleep(500);
await page.click('.module--file .card__link');
await sleep(1200);
check('route: bento card opens /files/<id>', /\/files\/mz-\d{4}$/.test(page.url()), page.url());

const ids = ['mz-0114', 'mz-0231', 'mz-0307', 'mz-0442', 'mz-0519', 'mz-0603'];
for (const id of ids) {
  await page.goto(`${SITE}/files/${id}`, { waitUntil: 'networkidle2' });
  await page.waitForSelector('.file__title', { timeout: 20000 });
  await sleep(2400);
  const a = await page.evaluate(() => ({
    canvas: !!document.querySelector('.plate__frame--file canvas'),
    paras: document.querySelectorAll('.prose__p').length,
    words: [...document.querySelectorAll('.prose__p, .sidebar__p')]
      .map((n) => n.textContent.trim().split(/\s+/).length)
      .reduce((x, y) => x + y, 0),
    redactions: document.querySelectorAll('.redacted').length,
    tscript: document.querySelectorAll('.tscript').length,
    evlog: document.querySelectorAll('.evlog').length,
    plate: document.querySelectorAll('.plate-fig').length,
    side: document.querySelectorAll('.sidebar').length,
    heads: document.querySelectorAll('.prose__h').length,
    back: !!document.querySelector('.backlink'),
    cross: document.querySelectorAll('.crossref__link').length
  }));
  check(`${id}: renders complete`,
    a.canvas && a.paras >= 13 && a.redactions >= 1 && a.tscript === 2 &&
    a.evlog === 2 && a.plate === 2 && a.side === 1 && a.heads >= 3 &&
    a.back && a.cross === 2,
    `p${a.paras} r${a.redactions} t${a.tscript} e${a.evlog} pl${a.plate} s${a.side} h${a.heads} x${a.cross}`);
  check(`${id}: full length`, a.words >= 760, `${a.words} words`);
  const r = await page.evaluate(() => ({
    rail: !!document.querySelector('.filerail'),
    toc: document.querySelectorAll('.railtoc__link').length,
    facts: document.querySelectorAll('.railfacts > div').length,
    rel: document.querySelectorAll('.railrel__link').length,
    anchored: [...document.querySelectorAll('.prose__h')].every((h) => h.id.startsWith('sec-')),
    rightGap: Math.round(window.innerWidth -
      document.querySelector('.filerail').getBoundingClientRect().right)
  }));
  check(`${id}: rail complete`,
    r.rail && r.toc === 3 && r.facts === 5 && r.rel === 2 && r.anchored,
    `toc${r.toc} facts${r.facts} rel${r.rel} anchored${r.anchored}`);
  check(`${id}: rail uses the width`, r.rightGap < 120, `${r.rightGap}px right gap`);
}

// ── rail scroll-spy ──
await page.goto(`${SITE}/files/mz-0114`, { waitUntil: 'networkidle2' });
await page.waitForSelector('.railtoc__link');
await sleep(1500);
await page.evaluate(() => {
  const h = document.querySelectorAll('.prose__h')[1];
  h.scrollIntoView({ block: 'start' });
});
await sleep(900);
const spy = await page.evaluate(() => {
  const on = document.querySelector('.railtoc__link.is-active');
  return on ? on.textContent.trim() : null;
});
check('rail: scroll-spy marks the section in view', Boolean(spy), spy ?? 'none active');

// legacy slug redirect
await page.goto(`${SITE}/file/relay-station`, { waitUntil: 'networkidle2' });
await sleep(900);
check('route: legacy /file/<slug> redirects', page.url().endsWith('/files/mz-0307'), page.url());

// ───────── archive ledger ─────────
await page.goto(`${SITE}/archive`, { waitUntil: 'networkidle2' });
await page.waitForSelector('.table__row', { timeout: 20000 });
await sleep(1200);
const totalRows = await page.$$eval('.table__row', (n) => n.length);
check('ledger: all records listed', totalRows === 35, `${totalRows}`);

await page.type('.filters__search input', 'bearing');
await sleep(500);
const searched = await page.$$eval('.table__row', (n) => n.length);
check('ledger: search filters', searched > 0 && searched < totalRows, `${searched} of ${totalRows}`);

await page.click('.filters__clear');
await sleep(400);
await page.evaluate(() => {
  const chip = [...document.querySelectorAll('.chip')].find((c) => c.textContent.trim() === 'PETITION');
  chip.click();
});
await sleep(450);
const typed = await page.evaluate(() => ({
  rows: document.querySelectorAll('.table__row').length,
  allPetition: [...document.querySelectorAll('.table__row .type')].every((t) => t.textContent.trim() === 'PETITION')
}));
check('ledger: type filter', typed.rows === 6 && typed.allPetition, `${typed.rows} rows`);

await page.click('.filters__clear');
await sleep(400);
const firstBefore = await page.$eval('.table__cell--ref', (n) => n.textContent.trim());
await page.evaluate(() => {
  const th = [...document.querySelectorAll('.table__th')].find((t) => t.textContent.includes('Ref'));
  th.click();
});
await sleep(450);
const firstAfter = await page.$eval('.table__cell--ref', (n) => n.textContent.trim());
check('ledger: column sort reorders', firstBefore !== firstAfter, `${firstBefore} -> ${firstAfter}`);

const sortState = await page.evaluate(() => {
  const th = [...document.querySelectorAll('.table__th')].find((t) => t.textContent.includes('Ref'));
  return th.getAttribute('aria-sort');
});
check('ledger: sort exposes aria-sort', sortState === 'ascending' || sortState === 'descending', sortState);

check('ledger: rows link to files',
  await page.$$eval('.table__link', (n) => n.length > 0));

// nav between routes
await page.evaluate(() => {
  const link = [...document.querySelectorAll('.masthead__nav a')].find((a) => /Reel View/.test(a.textContent));
  link.click();
});
await sleep(1200);
check('route: masthead nav returns to hub', new URL(page.url()).pathname === '/', page.url());

// ───────── reduced motion ─────────
const rm = await browser.newPage();
await rm.setViewport({ width: 1280, height: 800 });
await rm.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await rm.goto(SITE, { waitUntil: 'networkidle2' });
await rm.waitForSelector('.switcher__btn', { timeout: 20000 });
await sleep(2200);

const rmBase = await rm.$eval('.telemetry__val', (n) => n.textContent);
await sleep(2100);
const rmLater = await rm.$eval('.telemetry__val', (n) => n.textContent);
check('reduced motion: telemetry holds still', rmBase === rmLater, `${rmBase} / ${rmLater}`);

await rm.click('.switcher__btn:nth-child(2)');
await sleep(60);
const rmGlitch = await rm.$eval('.crt', (n) => getComputedStyle(n).opacity);
check('reduced motion: no CRT interference', Number(rmGlitch) === 0, `opacity ${rmGlitch}`);
await sleep(900);
check('reduced motion: target still switches',
  await rm.$eval('.switcher__btn.is-active .switcher__code', (n) => n.textContent === 'TGT-B'));

const rmState = await rm.evaluate(() => {
  const title = document.querySelector('.hero__title.wipe');
  return {
    headline: getComputedStyle(title.querySelector('.wipe__text')).opacity === '1',
    tape: getComputedStyle(title.querySelector('.wipe__tape')).display === 'none'
  };
});
check('reduced motion: headline readable', rmState.headline);
check('reduced motion: tape removed', rmState.tape);

check('no page errors', errors.length === 0, errors.slice(0, 3).join(' | '));

await browser.close();

console.log('\nPASS');
ok.forEach((l) => console.log('  +', l));
if (bad.length) {
  console.log('\nFAIL');
  bad.forEach((l) => console.log('  -', l));
}
console.log(`\n${ok.length} passed, ${bad.length} failed`);
process.exit(bad.length ? 1 : 0);
