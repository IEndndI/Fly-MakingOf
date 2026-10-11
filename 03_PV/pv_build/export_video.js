// 逐帧导出 PV 为 MP4（H.264 + AAC），不录屏、不掉帧。
// 用法（在 pv_build 文件夹里）：node export_video.js [pv4.html] [60]
// 原理：无界面启动 Edge，打开页面；对每一帧调用 pv.render(帧号/fps)，把画布交给浏览器自带的 WebCodecs 编码器，
//       音轨用同一份离线合成的声音编成 AAC，最后用 mp4-muxer 封装成 .mp4，存到 ../export/。
const fs=require('fs'),path=require('path'),os=require('os'),{spawn}=require('child_process');
const page=process.argv[2]||'pv4.html',FPS=+(process.argv[3]||60),VBR=+(process.argv[4]||45e6);
const root=path.resolve(__dirname,'..'),outDir=path.join(root,'export');fs.mkdirSync(outDir,{recursive:true});
const edge=['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Microsoft/Edge/Application/msedge.exe','C:/Program Files/Google/Chrome/Application/chrome.exe'].find(p=>fs.existsSync(p));
if(!edge){console.error('找不到 Edge / Chrome');process.exit(1)}
const prof=fs.mkdtempSync(path.join(os.tmpdir(),'flyexport-')),PORT=9333;
const br=spawn(edge,['--headless=new',`--remote-debugging-port=${PORT}`,`--user-data-dir=${prof}`,'--no-first-run','--no-default-browser-check','--disable-background-timer-throttling','--disable-renderer-backgrounding','--window-size=1920,1080','about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function client(url){const ws=new WebSocket(url);let id=0;const pend=new Map(),on=[];
  ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pend.has(m.id)){const [res,rej]=pend.get(m.id);pend.delete(m.id);m.error?rej(new Error(JSON.stringify(m.error))):res(m.result)}else on.forEach(f=>f(m))};
  return new Promise(r=>ws.onopen=()=>r({send:(method,params={})=>new Promise((res,rej)=>{const i=++id;pend.set(i,[res,rej]);ws.send(JSON.stringify({id:i,method,params}))}),on:f=>on.push(f),close:()=>ws.close()}))}
(async()=>{
  let ver;for(let k=0;k<60&&!ver;k++){try{ver=await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()}catch(e){await sleep(500)}}
  const B=await client(ver.webSocketDebuggerUrl);
  let downloads=0;B.on(m=>{if(m.method==='Browser.downloadProgress'&&m.params.state==='completed')downloads++});
  await B.send('Browser.setDownloadBehavior',{behavior:'allow',downloadPath:outDir,eventsEnabled:true});
  const list=await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(),P=await client(list.find(t=>t.type==='page').webSocketDebuggerUrl);
  P.on(m=>{if(m.method==='Runtime.consoleAPICalled')console.log('  [页面]',m.params.args.map(a=>a.value).join(' '))});
  await P.send('Runtime.enable');await P.send('Page.enable');
  const url='file:///'+path.join(root,page).replace(/\\/g,'/')+'?hud=0';console.log('打开',url);
  await P.send('Page.navigate',{url});
  const ev=async(expr)=>{const r=await P.send('Runtime.evaluate',{expression:expr,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value};
  for(let k=0;k<600;k++){if(await ev('!!(window.pv&&window.pv.seek)'))break;await sleep(500)}
  console.log('等待载入（字体、背景、预渲染、音轨）…');
  await ev(`(async()=>{await pv.ready;for(let i=0;i<600&&!pv.audioWav();i++)await new Promise(r=>setTimeout(r,500));await document.fonts.ready;return 1})()`);
  await ev(fs.readFileSync(path.join(__dirname,'mp4-muxer.js'),'utf8')+';window.Mp4Muxer=Mp4Muxer;1');
  const name=path.basename(page,'.html');
  const t0=Date.now();
  const res=await ev(`(async()=>{
    const FPS=${FPS},VBR=${VBR},W=1920,H=1080,N=Math.round(pv.duration*FPS),{Muxer,ArrayBufferTarget}=Mp4Muxer;
    const wav=pv.audioWav(),src=await new OfflineAudioContext(2,1,44100).decodeAudioData(await wav.arrayBuffer());
    /* the encoder takes 48 kHz: resample the 44.1 kHz track once, offline */
    const sr=48000,rs=new OfflineAudioContext(2,Math.ceil(src.duration*sr),sr),bs=rs.createBufferSource();bs.buffer=src;bs.connect(rs.destination);bs.start(0);const abuf=await rs.startRendering();
    let vcfg=null;for(const codec of ['avc1.64002A','avc1.640033','avc1.4D402A','avc1.42E02A'])for(const hw of ['prefer-software','no-preference']){const c={codec,width:W,height:H,bitrate:VBR,framerate:FPS,latencyMode:'quality',hardwareAcceleration:hw,avc:{format:'avc'}};if(!vcfg&&(await VideoEncoder.isConfigSupported(c)).supported)vcfg=c}
    if(!vcfg)throw new Error('这个浏览器不支持 H.264 编码');
    const acfg={codec:'mp4a.40.2',sampleRate:sr,numberOfChannels:2,bitrate:192000};const aok=(await AudioEncoder.isConfigSupported(acfg)).supported;
    console.log('视频编码',vcfg.codec,vcfg.hardwareAcceleration,'· 音频',aok?'AAC 192k':'（不支持 AAC，只出无声视频 + 单独的 WAV）');
    const muxer=new Muxer({target:new ArrayBufferTarget(),video:{codec:'avc',width:W,height:H,frameRate:FPS},audio:aok?{codec:'aac',numberOfChannels:2,sampleRate:sr}:undefined,fastStart:'in-memory',firstTimestampBehavior:'offset'});
    let err=null;
    if(aok){const ae=new AudioEncoder({output:(c,m)=>muxer.addAudioChunk(c,m),error:e=>err=e});ae.configure(acfg);
      const L=abuf.getChannelData(0),R=abuf.getChannelData(1);for(let o=0;o<L.length;o+=4096){const n=Math.min(4096,L.length-o),d=new Float32Array(n*2);d.set(L.subarray(o,o+n),0);d.set(R.subarray(o,o+n),n);
        ae.encode(new AudioData({format:'f32-planar',sampleRate:sr,numberOfFrames:n,numberOfChannels:2,timestamp:Math.round(o*1e6/sr),data:d}))}await ae.flush()}
    const ve=new VideoEncoder({output:(c,m)=>muxer.addVideoChunk(c,m),error:e=>err=e});ve.configure(vcfg);
    const cv=document.getElementById('pv'),cx=cv.getContext('2d');
    /* read the pixels straight out of the canvas each frame (a VideoFrame made from the element can pick up a stale, not-yet-presented buffer) */
    const grab=()=>{const d=cx.getImageData(0,0,W,H).data;return d};
    {pv.render(20);const d=grab();let n=0;for(let i=0;i<d.length;i+=4*997)if(Math.abs(d[i]-242)+Math.abs(d[i+2]-223)>40)n++;console.log('自检 t=20：非纸色采样点',n);if(n<20)throw new Error('画面是空的（只有纸色），没有开始导出')}
    for(let k=0;k<N;k++){if(err)throw err;pv.render(k/FPS);const vf=new VideoFrame(grab(),{format:'RGBX',codedWidth:W,codedHeight:H,timestamp:Math.round(k*1e6/FPS),duration:Math.round(1e6/FPS)});ve.encode(vf,{keyFrame:k%(FPS*2)===0});vf.close();
      while(ve.encodeQueueSize>3)await new Promise(r=>setTimeout(r,2));if(k%(FPS*2)===0)console.log('帧',k,'/',N)}
    await ve.flush();if(err)throw err;muxer.finalize();
    const save=(blob,fn)=>{const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=fn;document.body.appendChild(a);a.click();a.remove()};
    save(new Blob([muxer.target.buffer],{type:'video/mp4'}),'fly_${name}_${FPS}fps.mp4');save(wav,'fly_${name}_audio.wav');
    return {frames:N,bytes:muxer.target.buffer.byteLength,audio:aok}})()`);
  console.log('编码完成',res,'用时',((Date.now()-t0)/1000).toFixed(0),'秒，等待写盘…');
  for(let k=0;k<240&&downloads<2;k++)await sleep(500);
  console.log('已导出到',outDir,fs.readdirSync(outDir));
  B.close();br.kill();await sleep(800);try{fs.rmSync(prof,{recursive:true,force:true})}catch(e){}
  process.exit(0)})().catch(e=>{console.error('失败：',e.message);br.kill();process.exit(1)});
