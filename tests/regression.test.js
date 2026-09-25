
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),{EventEmitter}=require('node:events');
const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
function backend(){
 const files=new Map();let route;
 const fakeFs={existsSync:()=>true,mkdirSync:()=>{},readFileSync:p=>{if(!files.has(p)){const e=Error('missing');e.code='ENOENT';throw e;}return files.get(p);},writeFileSync:(p,v)=>files.set(p,v),renameSync:(a,b)=>{files.set(b,files.get(a));files.delete(a);},appendFileSync:()=>{},readFile:(p,cb)=>cb(Error('not found'))};
 const c=vm.createContext({require:n=>n==='fs'?fakeFs:n==='http'?{createServer:f=>{route=f;return {listen:()=>{}}}}:n==='dotenv'?{config:()=>{}}:n==='nodemailer'?{}:require(n),__dirname:root,process:{env:{}},console:{log:()=>{},error:()=>{}},Buffer,setInterval:()=>{}});
 vm.runInContext(read('serve.js'),c);
 const run=code=>vm.runInContext(code,c);
 async function request(url,method='GET',body,token){const req=new EventEmitter();Object.assign(req,{url,method,headers:token?{authorization:'Bearer '+token}:{},socket:{remoteAddress:'127.0.0.1'}});req.destroy=()=>{};const result={};const res={writeHead:s=>{result.status=s;},end:b=>{try{result.body=JSON.parse(b);}catch{result.body=b;}}};const pending=route(req,res);if(body!==undefined){req.emit('data',JSON.stringify(body));req.emit('end');}await pending;return result;}
 run("users=[{email:'admin@test.invalid',role:'admin',name:'Admin'},{email:'parent@test.invalid',role:'parent'},{email:'child@test.invalid',role:'child',parentEmail:'parent@test.invalid'}];for(const user of users)sessions[user.role]={email:user.email,role:user.role,expiresAt:Date.now()+100000};");
 return {run,request,files};
}
function frontend(){const storage=new Map(),elements={};
 const element=id=>elements[id]||(elements[id]={innerHTML:'',textContent:'',style:{},setAttribute(){},appendChild(){},querySelector(){return element('status');},querySelectorAll(){return [];},addEventListener(){}});
 const c=vm.createContext({document:{getElementById:element,querySelector:()=>element('shell'),querySelectorAll:()=>[],createElement:()=>element('created')},window:{addEventListener(){},location:{hash:''}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},fetch:async()=>({ok:true}),setTimeout,console});
 vm.runInContext(read('data.js')+'\n'+read('app.js')+'\n'+read('portal.js'),c);return {run:code=>vm.runInContext(code,c),c,storage,elements};
}
test('Todos los scripts compilan',()=>{for(const f of ['serve.js','data.js','app.js','portal.js','auth.js'])new vm.Script(read(f));});
test('30 jornadas y preguntas planas con respuesta única',()=>{const f=frontend();const days=f.run('DAYS');assert.equal(days.length,30);for(const d of days){assert.equal(d.plannedMinutes,150);assert.ok(d.expedition.project.length>30);for(const q of [...d.subjectQuestions,...d.expedition.questions]){assert.ok(q.options.every(o=>typeof o==='string'));assert.equal(q.options.filter(o=>o===q.answer).length,1);assert.equal(new Set(q.options).size,q.options.length);}for(const list of [d.englishVocab,d.frenchVocab])assert.ok(list.length>=8);}const coverage=f.run('WEEKS.flatMap(w=>Array.from({length:w.range[1]-w.range[0]+1},(_,i)=>i+w.range[0]))');assert.equal(new Set(coverage).size,30);assert.equal(coverage.length,30);});
test('Puntaje máximo coincide con actividades y primer día sin repaso',()=>{const f=frontend();assert.equal(f.run('DAYS.every((d,i)=>dayMaxScore(d)===(i?20:0)+d.subjectQuestions.length*10+buildListeningQuestions(d.englishVocab,"en").length*5+buildListeningQuestions(d.frenchVocab,"fr").length*5+20+10+d.expedition.questions.length*10+10)'),true);});
test('Distractores auditivos no se repiten',()=>{const f=frontend();assert.equal(f.run('DAYS.every(d=>buildListeningQuestions(d.englishVocab,"en").every(q=>new Set(q.options).size===q.options.length))'),true);});
test('URL malformada responde 400 sin excepción',async()=>{assert.equal((await backend().request('/api/tasks/manage/%ZZ')).status,400);});
test('Endpoints privados rechazan acceso anónimo y ajeno',async()=>{const b=backend();assert.equal((await b.request('/api/tasks')).status,401);assert.equal((await b.request('/api/admin/users','GET',undefined,'child')).status,403);assert.equal((await b.request('/api/tasks/manage/admin%40test.invalid','GET',undefined,'parent')).status,403);});
test('Cambio de rol invalida permisos antiguos',async()=>{const b=backend();b.run('users[0].role="child"');assert.equal((await b.request('/api/admin/users','GET',undefined,'admin')).status,403);});
test('Reinicio de contraseña revoca sesiones',async()=>{const b=backend();const r=await b.request('/api/admin/users/child%40test.invalid/reset-password','POST',{password:'Temporary-test-123'},'admin');assert.equal(r.status,200);assert.equal((await b.request('/api/tasks','GET',undefined,'child')).status,401);});
test('Fechas inválidas se rechazan; tareas futuras no se completan hoy',async()=>{const b=backend();const url='/api/tasks/manage/child%40test.invalid';assert.equal((await b.request(url,'POST',{title:'Lectura',scheduledDate:'2026-02-30'},'parent')).status,400);assert.equal((await b.request(url,'POST',{title:'Lectura',scheduledDate:'2099-01-01'},'parent')).status,200);const id=b.run('tasksStore["child@test.invalid"].tasks[0].id');assert.equal((await b.request('/api/tasks/'+id+'/toggle','POST',{},'child')).status,404);});
test('Completar y archivar conserva historial',async()=>{const b=backend();const url='/api/tasks/manage/child%40test.invalid';await b.request(url,'POST',{title:'Lectura',scheduledDate:b.run('todayISO()')},'parent');const id=b.run('tasksStore["child@test.invalid"].tasks[0].id');await b.request('/api/tasks/'+id+'/toggle','POST',{},'child');await b.request(url+'/'+id,'DELETE',undefined,'parent');const r=await b.request('/api/tasks','GET',undefined,'child');assert.equal(r.body.tasks.length,0);assert.equal(r.body.completedToday.length,1);assert.equal(r.body.week.at(-1).done,1);assert.equal(r.body.week.at(-1).total,1);});
test('JSON corrupto falla sin reemplazarlo por datos vacíos',()=>{const b=backend();b.files.set('broken','{');assert.throws(()=>b.run('readJson("broken",[])'));});
test('Estado inválido no se almacena',async()=>{const b=backend();assert.equal((await b.request('/api/progress','POST',{state:{horseName:'Luna',completedDays:{0:{score:-20,maxScore:100,catCorrect:{}}}}},'child')).status,400);});
test('Datos privados no son archivos públicos',async()=>{const b=backend();for(const url of ['/.env','/data/users.json','/serve.js','/tests/regression.test.js'])assert.equal((await b.request(url)).status,404);});
test('Texto del niño se escapa al mostrarlo al padre',()=>{const f=frontend();const html=f.run('renderProgressBlock({horseName:"<img src=x>",completedDays:{}},"Niña")');assert.ok(html.includes('&lt;img src=x&gt;'));assert.ok(!html.includes('<img src=x>'));});
test('Guardado fallido conserva pendientes y no carga progreso antiguo',async()=>{const f=frontend();f.c.fetch=async()=>({ok:false});f.run('window.mirandaAuthToken="test"');await f.run('saveState({horseName:"Luna",completedDays:{}})');assert.ok(f.storage.get('miranda_stable_academy_v1::pending'));const restored=await f.run('fetchServerProgressOrLocal()');assert.equal(restored.horseName,'Luna');f.c.fetch=async()=>({ok:true});await f.run('syncProgressToServer({horseName:"Luna",completedDays:{}})');assert.equal(f.storage.get('miranda_stable_academy_v1::pending'),undefined);});

test('Repaso: doble clic no acierta; emparejar columnas completa la etapa',()=>{
 const f=frontend(),view=f.elements.view;let cards=[];const parents=[{},{}];const done={addEventListener:(event,fn)=>{done.click=fn;},disabled:true};
 view.querySelector=()=>done;
 view.querySelectorAll=()=>{cards=[...view.innerHTML.matchAll(/class="match-item ([^"]*)" data-pair="(\d+)"/g)].map((m,i)=>{const classes=new Set(m[1].split(' '));return {dataset:{pair:m[2]},parentElement:parents[i<4?0:1],style:{},classList:{contains:c=>classes.has(c),add:c=>classes.add(c),remove:c=>classes.delete(c)},addEventListener(event,fn){this.click=()=>fn.call(this);}};});return cards;};
 f.run('STATE={horseName:"Luna",completedDays:{}};SESSION={idx:1,step:0,score:0,day:DAYS[1]};renderWarmupStep(DAYS[1]);');
 assert.equal(cards.length,8);cards[0].click();cards[0].click();assert.ok(view.innerHTML.includes('0/4 correctas'));
 cards[4+cards.slice(4).findIndex(c=>c.dataset.pair==='0')].click();assert.ok(view.innerHTML.includes('1/4 correctas'));
 for(let i=1;i<4;i++){cards[i].click();cards.slice(4).find(c=>Number(c.dataset.pair)===i).click();}
 assert.ok(view.innerHTML.includes('4/4 correctas'));done.click();assert.equal(f.run('SESSION.score'),20);assert.equal(f.run('SESSION.step'),1);
});
