#!/usr/bin/env node
/*
  collect-evidence.js
  - launches headless Chromium via Puppeteer
  - navigates to http://localhost:3000
  - captures a screenshot, page HTML
  - records network responses into network.json
  - saves console messages into console.log
  - exports IndexedDB contents into indexeddb.json via page.evaluate
  - writes artifacts to ./evidence/
*/
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const OUT = path.resolve(process.cwd(), 'evidence');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

function safeFilename(name){ return name.replace(/[:.]/g,'-').replace(/[^a-z0-9\-_.]/gi,'_') }

async function collect(){
  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  const network = [];
  page.on('response', async (res) => {
    try{
      const req = res.request();
      const url = req.url();
      const status = res.status();
      const headers = res.headers();
      let text = null;
      try { text = await res.text(); } catch(e){ text = `<non-text response: ${String(e)}>` }
      network.push({ url, status, headers, body: text });
    }catch(e){ /* ignore */ }
  });

  const consoleMsgs = [];
  page.on('console', msg => {
    try {
      consoleMsgs.push({ type: msg.type(), text: msg.text() });
    } catch(e){}
  });

  const url = 'http://localhost:3000/';
  console.log('Navigating to', url);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  // screenshot
  const screenshotPath = path.join(OUT, `screenshot_${safeFilename(new Date().toISOString())}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('Saved screenshot:', screenshotPath);

  // page HTML
  const html = await page.content();
  const htmlPath = path.join(OUT, `page_${safeFilename(new Date().toISOString())}.html`);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Saved page HTML:', htmlPath);

  // export IndexedDB via page.evaluate
  const indexeddb = await page.evaluate(async () => {
    function getAllFromStore(db, storeName){
      return new Promise((res, rej)=>{
        try{
          const tx = db.transaction(storeName, 'readonly');
          const store = tx.objectStore(storeName);
          const allReq = store.getAll();
          allReq.onsuccess = ()=> res(allReq.result || []);
          allReq.onerror = ()=> rej(allReq.error || new Error('getAll failed'));
        }catch(e){ rej(e) }
      });
    }
    const out = {};
    const dbs = (indexedDB.databases ? await indexedDB.databases().catch(()=>[]) : []);
    const names = dbs.length ? dbs.map(d=>d.name).filter(Boolean) : ['codeflash'];
    for (const name of names){
      out[name] = {};
      try{
        const req = indexedDB.open(name);
        await new Promise((resolve, reject)=>{ req.onsuccess = ()=> resolve(); req.onerror = ()=> reject(req.error); });
        const db = req.result;
        for (let i=0;i<db.objectStoreNames.length;i++){
          const storeName = db.objectStoreNames[i];
          out[name][storeName] = await getAllFromStore(db, storeName);
        }
        db.close();
      }catch(err){ out[name] = { error: String(err) } }
    }
    return out;
  });
  const idbPath = path.join(OUT, `indexeddb_${safeFilename(new Date().toISOString())}.json`);
  fs.writeFileSync(idbPath, JSON.stringify(indexeddb, null, 2), 'utf8');
  console.log('Saved IndexedDB dump:', idbPath);

  // save console messages and network
  const consolePath = path.join(OUT, `console_${safeFilename(new Date().toISOString())}.json`);
  fs.writeFileSync(consolePath, JSON.stringify(consoleMsgs, null, 2), 'utf8');
  console.log('Saved console messages:', consolePath);

  const networkPath = path.join(OUT, `network_${safeFilename(new Date().toISOString())}.json`);
  fs.writeFileSync(networkPath, JSON.stringify(network, null, 2), 'utf8');
  console.log('Saved network log:', networkPath);

  await browser.close();
  console.log('Done collecting evidence.');
}

collect().catch(err => {
  console.error('Collector failed:', err);
  process.exit(2);
});
