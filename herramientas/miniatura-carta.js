const { chromium } = require('playwright'); const fs=require('fs'); const path=require('path');
const S=process.argv[2], out=process.argv[3];
const bg='data:image/jpeg;base64,'+fs.readFileSync(path.join(S,'r1.jpg')).toString('base64');
const card='data:image/png;base64,'+fs.readFileSync(path.join(S,'snap_crop_x2.png')).toString('base64');
const L={es:{top:['POR ESTA','CARTA'],price:'809.943 $'},en:{top:['FOR THIS','CARD'],price:'$809,943'}};
const css=`@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
*{margin:0;box-sizing:border-box}body{width:1280px;height:720px;overflow:hidden;background:#000;position:relative}
.bg{position:absolute;inset:0;background:#05090a url('${bg}') 170px 50%/auto 100% no-repeat;filter:saturate(1.1)}
.shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.8) 0%,rgba(0,0,0,.45) 45%,rgba(0,0,0,0) 62%)}
.card{position:absolute;left:52px;top:96px;height:540px;transform:rotate(-6deg);border-radius:10px;
 box-shadow:0 30px 60px rgba(0,0,0,.85),0 0 60px rgba(255,200,40,.55)}
.txt{position:absolute;left:400px;top:120px;font-family:Anton,Impact,sans-serif;text-transform:uppercase;line-height:.95}
.top{color:#fff;font-size:84px;-webkit-text-stroke:3px #000;paint-order:stroke fill;text-shadow:0 6px 0 #000}
.price{position:absolute;left:392px;top:318px;font-family:Anton,Impact,sans-serif;font-size:112px;color:#ffd21f;
 -webkit-text-stroke:5px #000;paint-order:stroke fill;text-shadow:0 8px 0 #000,0 0 50px rgba(255,190,0,.6);transform:rotate(-3deg)}`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
for(const lang of ['es','en']){const t=L[lang];
await p.setContent(`<style>${css}</style><div class="bg"></div><div class="shade"></div><img class="card" src="${card}"><div class="txt">${t.top.map(x=>`<div class="top">${x}</div>`).join('')}</div><div class="price">${t.price}</div>`);
await p.waitForTimeout(1200);await p.screenshot({path:path.join(out,`m3card_${lang}.jpg`),type:'jpeg',quality:92});}
await b.close();})();
