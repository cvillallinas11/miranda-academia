
const {test}=require('node:test'),assert=require('node:assert/strict'),{spawn}=require('node:child_process'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),crypto=require('node:crypto');
test('Servidor real: login, permisos, tareas y persistencia tras reiniciar', {timeout:20000}, async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'miranda-test-'));const password=crypto.randomBytes(18).toString('hex');let child;
 const start=()=>new Promise((resolve,reject)=>{child=spawn(process.execPath,['serve.js'],{cwd:path.resolve(__dirname,'..'),env:{...process.env,DATA_DIR:dir,ADMIN_EMAIL:'admin@test.invalid',ADMIN_PASSWORD:password,HOST:'127.0.0.1',PORT:'0',SMTP_USER:'',SMTP_PASS:''},stdio:['ignore','pipe','pipe']});let out='';child.stdout.on('data',b=>{out+=b;const match=out.match(/http:\/\/127.0.0.1:(\d+)/);if(match)resolve('http://127.0.0.1:'+match[1]);});child.once('error',reject);child.once('exit',code=>reject(Error('Servidor terminó: '+code)));});
 const stop=()=>new Promise(resolve=>{if(!child || child.exitCode!==null)return resolve();child.once('exit',resolve);child.kill();});
 try {
  let base=await start();const request=async(url,method='GET',body,token)=>{const response=await fetch(base+url,{method,headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},...(body!==undefined?{body:JSON.stringify(body)}:{})});const text=await response.text();let parsed;try{parsed=JSON.parse(text);}catch{parsed=text;}return {status:response.status,body:parsed};};
  assert.equal((await request('/')).status,200);assert.equal((await request('/api/tasks/manage/%ZZ')).status,400);
  const login=await request('/api/auth/login','POST',{email:'admin@test.invalid',password});assert.equal(login.status,200);const admin=login.body.token;
  const account=await request('/api/admin/users','POST',{name:'Test',email:'child@test.invalid',role:'child',password:'Child-test-123'},admin);assert.equal(account.status,200);
  const childLogin=await request('/api/auth/login','POST',{email:'child@test.invalid',password:'Child-test-123'});const token=childLogin.body.token;assert.ok(token);
  assert.equal((await request('/api/admin/users','GET',undefined,token)).status,403);
  const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Bogota',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const task=await request('/api/tasks/manage/child%40test.invalid','POST',{title:'Leer un mapa',scheduledDate:today},admin);assert.equal(task.status,200);
  assert.equal((await request('/api/tasks/'+task.body.tasks[0].id+'/toggle','POST',{},token)).status,200);
  const state={horseName:'Luna',completedDays:{}};assert.equal((await request('/api/progress','POST',{state},token)).status,200);
  await stop();base=await start();assert.equal((await request('/api/progress','GET',undefined,token)).body.state.horseName,'Luna');assert.equal((await request('/api/tasks','GET',undefined,token)).body.completedToday.length,1);
  for(const file of ['users.json','progress.json','tasks.json','sessions.json'])assert.doesNotThrow(()=>JSON.parse(fs.readFileSync(path.join(dir,file),'utf8')));
 }finally{await stop();const resolved=path.resolve(dir);assert.ok(path.dirname(resolved)===path.resolve(os.tmpdir()) && path.basename(resolved).startsWith("miranda-test-"));fs.rmSync(resolved,{recursive:true,force:true});}
});
