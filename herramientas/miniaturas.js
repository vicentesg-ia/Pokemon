const { chromium } = require('playwright');
const path = require('path');
const dir = process.argv[2];
const T = {
  r1: { img:'base/r1.png', style:'real', es:['POR UNA','FOTO','809.943 $'], en:['FOR A','PHOTO','$809,943'] },
  r2: { img:'base/r2.png', style:'real', es:['¿PLANTA','O ANIMAL?',''], en:['PLANT','OR ANIMAL?',''] },
  m3: { img:'base/m3.png', style:'crayon', es:['LA FOTO DE','','800.000 $'], en:['A $800K','','PHOTO'] },
};
const css = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Cabin+Sketch:wght@700&display=swap');
*{margin:0;box-sizing:border-box} body{width:1280px;height:720px;overflow:hidden;background:#000}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,.35) 42%,rgba(0,0,0,0) 60%)}
.real{position:absolute;left:58px;top:50%;transform:translateY(-50%);font-family:Anton,Impact,sans-serif;text-transform:uppercase;line-height:.92}
.real .a,.real .b{color:#fff;font-size:150px;letter-spacing:1px;text-shadow:0 6px 0 #000,0 0 30px rgba(0,0,0,.8);-webkit-text-stroke:3px #000;paint-order:stroke fill}
.real .c{display:inline-block;margin-top:18px;font-size:120px;color:#ffd21f;-webkit-text-stroke:4px #000;paint-order:stroke fill;text-shadow:0 7px 0 #000,0 0 40px rgba(255,190,0,.55)}
.crayon{position:absolute;left:40px;top:16px;font-family:'Cabin Sketch',cursive;font-weight:700;line-height:.95;transform:rotate(-3deg)}
.crayon .a{font-size:78px;color:#1f3a26;-webkit-text-stroke:2px #1f3a26}.crayon .b{display:none}
.crayon .c{font-size:112px;color:#d1362a;-webkit-text-stroke:3px #d1362a;white-space:nowrap}
`;
(async()=>{
  const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1280,height:720}});
  for (const [k,t] of Object.entries(T)) for (const lang of ['es','en']) {
    const [a,bb,c]=t[lang]; const url='data:image/jpeg;base64,'+require('fs').readFileSync(path.join('/tmp/claude-0/-home-user-Pokemon/d5606184-3832-5759-8a85-d4e1ad05f298/scratchpad',k+'.jpg')).toString('base64');
    const body = t.style==='real'
      ? `<div class="bg" style="background-image:url('${url}')"></div><div class="shade"></div><div class="real"><div class="a">${a}</div><div class="b">${bb}</div>${c?`<div class="c">${c}</div>`:''}</div>`
      : `<div class="bg" style="background-image:url('${url}')"></div><div class="crayon"><div class="a">${a}</div><div class="b">${bb}</div><div class="c">${c}</div></div>`;
    await p.setContent(`<style>${css}</style>${body}`); await p.waitForTimeout(1200);
    await p.screenshot({path:path.join(dir,`${k}_${lang}.jpg`),type:'jpeg',quality:90});
  }
  await b.close();
})();
