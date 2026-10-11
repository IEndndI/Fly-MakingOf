// Assembles pv.html: the template + the drawing library lifted verbatim from index_v8.html (same functions, same seeds, same look).
const fs=require('fs'),path=require('path');
const dir='E:/unity/.claude/Fly/飞 Fly 动态分镜';
const src=fs.readFileSync(path.join(dir,'index_v8.html'),'utf8').split(/\r?\n/);
const [tplName='pv_template.html',outName='pv.html']=process.argv.slice(2);
const tpl=fs.readFileSync(path.join(__dirname,tplName),'utf8');
const ranges=[[606,610],[612,627],[629,1508],[2469,2469],[2475,2475],[2496,2526],[2594,2598],[2736,2745],[2795,2855],[2902,2914],[3437,3438],[3457,3458],[3508,3510],[4041,4041]];
const lib=ranges.map(([a,b])=>`/* — index_v8.html L${a}${b>a?'–'+b:''} — */\n`+src.slice(a-1,b).join('\n')).join('\n');
fs.writeFileSync(path.join(dir,outName),tpl.replace('/*@@LIB@@*/',()=>lib));
console.log('ok',lib.length);
