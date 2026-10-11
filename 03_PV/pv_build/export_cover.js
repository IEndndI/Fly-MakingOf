// 导出 B 站封面：node export_cover.js  → ../export/fly_cover_16x9.png / .jpg、fly_cover_4x3.png / .jpg
const fs=require('fs'),path=require('path'),os=require('os'),{spawn}=require('child_process');
const root=path.resolve(__dirname,'..'),outDir=path.join(root,'export');fs.mkdirSync(outDir,{recursive:true});
const edge=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Google/Chrome/Application/chrome.exe'].find(p=>fs.existsSync(p));
const prof=fs.mkdtempSync(path.join(os.tmpdir(),'flycover-')),PORT=9334,sleep=ms=>new Promise(r=>setTimeout(r,ms));
const url='file:///'+path.join(root,'cover.html').split(path.sep).join('/');
const br=spawn(edge,['--headless=new',`--remote-debugging-port=${PORT}`,`--user-data-dir=${prof}`,'--no-first-run',url],{stdio:'ignore'});
(async()=>{
  let list;for(let k=0;k<60&&!(list&&list.find(t=>t.type==='page'));k++){try{list=await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()}catch(e){}await sleep(500)}
  const ws=new WebSocket(list.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let id=0;const pend=new Map();
  ws.onmessage=e=>{const m=JSON.parse(e.data);if(pend.has(m.id)){pend.get(m.id)(m.result);pend.delete(m.id)}};
  const ev=expr=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method:'Runtime.evaluate',params:{expression:expr,awaitPromise:true,returnByValue:true}}))}).then(r=>{if(r.exceptionDetails)throw new Error(r.exceptionDetails.text);return r.result.value});
  for(let k=0;k<120;k++){if(await ev('!!window.coverReady'))break;await sleep(500)}
  await ev('window.coverReady');
  for(const [cid,name] of [['c169','fly_cover_16x9'],['c43','fly_cover_4x3']])for(const [type,ext,q] of [['image/png','png'],['image/jpeg','jpg',.95]]){
    const data=await ev(`document.getElementById('${cid}').toDataURL('${type}'${q?','+q:''})`);
    const f=path.join(outDir,`${name}.${ext}`);fs.writeFileSync(f,Buffer.from(data.split(',')[1],'base64'));console.log(f,(fs.statSync(f).size/1048576).toFixed(2)+' MB')}
  ws.close();br.kill();await sleep(800);try{fs.rmSync(prof,{recursive:true,force:true})}catch(e){}process.exit(0)})().catch(e=>{console.error(e);br.kill();process.exit(1)});
