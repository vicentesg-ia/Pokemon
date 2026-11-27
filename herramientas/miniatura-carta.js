// Miniatura: Pokémon realista a la derecha + foto REAL de la carta a la izquierda + precio con flecha.
// Uso: node herramientas/miniatura-carta.js <fondo.jpg> <carta.png> <carpeta_salida> <prefijo> "<precio_es>" "<precio_en>"
const { chromium } = require('playwright'); const fs=require('fs'); const path=require('path');
const [bgF,cardF,out,prefix,pES,pEN]=process.argv.slice(2);
const b64=(f,t)=>`data:image/${t};base64,`+fs.readFileSync(f).toString('base64');
const bg=b64(bgF,'jpeg'), card=b64(cardF,'png');
const css=`@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
*{margin:0;box-sizing:border-box}body{width:1280px;height:720px;overflow:hidden;background:#05090a;position:relative}
.bg{position:absolute;inset:0;background:#05090a url('${bg}') 200px 50%/auto 104% no-repeat;filter:saturate(1.12) contrast(1.05)}
.shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.85) 0%,rgba(0,0,0,.5) 38%,rgba(0,0,0,0) 58%)}
.glow{position:absolute;left:-40px;top:40px;width:620px;height:660px;background:radial-gradient(closest-side,rgba(255,150,20,.75),rgba(255,110,0,.25) 60%,transparent);filter:blur(10px)}
.card{position:absolute;left:78px;top:58px;height:612px;transform:rotate(-5deg);border-radius:14px;
 outline:7px solid #ffb21f;outline-offset:-2px;box-shadow:0 0 0 3px #000,0 30px 60px rgba(0,0,0,.9),0 0 70px rgba(255,170,30,.9)}
.price{position:absolute;left:470px;top:40px;font-family:Anton,Impact,sans-serif;font-size:132px;line-height:1;color:#ffd21f;white-space:nowrap;
 -webkit-text-stroke:6px #000;paint-order:stroke fill;text-shadow:0 8px 0 #000,0 0 50px rgba(255,190,0,.65);transform:rotate(-4deg)}
svg{position:absolute;left:0;top:0}`;
const arrow=`<svg width="1280" height="720" viewBox="0 0 1280 720"><defs><marker id="h" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4.2" markerHeight="4.2" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#ffd21f" stroke="#000" stroke-width="1.2"/></marker></defs>
<path d="M640 205 C 640 330, 560 390, 455 395" fill="none" stroke="#000" stroke-width="26" stroke-linecap="round"/>
<path d="M640 205 C 640 330, 560 390, 455 395" fill="none" stroke="#ffd21f" stroke-width="15" stroke-linecap="round" marker-end="url(#h)"/></svg>`;
(async()=>{const br=await chromium.launch();const p=await br.newPage({viewport:{width:1280,height:720}});
for(const [lang,price] of [['es',pES],['en',pEN]]){
await p.setContent(`<style>${css}</style><div class="bg"></div><div class="shade"></div><div class="glow"></div><img class="card" src="${card}">${arrow}<div class="price">${price}</div>`);
await p.waitForTimeout(1200);await p.screenshot({path:path.join(out,`${prefix}_${lang}.jpg`),type:'jpeg',quality:92});}
await br.close();})();
