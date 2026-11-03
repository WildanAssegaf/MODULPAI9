const HEAD={Siswa:['id','nama','absen','kelas','xp','session_id','last_seen','bab','page','created'],
Progres:['id','bab','materi','latihan','nilai','ts'],Jawaban:['id','bab','jawaban','nilai','ts'],
Uraian:['key','id','bab','no','jawaban','nilai','komentar','ts'],Aktivitas:['ts','id','bab','page'],
Admin:['info'],XP_Log:['activity_id','id','xp','ts']};
// Kunci pilihan ganda: [indeks jawaban benar, pembahasan]. Harus cocok dengan urutan opsi di index.html.
const KEY={
1:[[1,'Q.S. Al-Mujadilah: 11: Allah meninggikan derajat orang beriman dan berilmu.'],[2,'Periksa sumber dan kebenaran sebelum membagikan (literasi Islam).']],
2:[[1,'Bencana lokal dan kematian termasuk kiamat sugra.'],[0,'Keyakinan pada hisab dan pencatatan amal adalah iman kepada hari akhir.']],
3:[[2,'Q.S. Al-Hujurat: 6: periksa dulu kebenaran kabar (tabayyun).'],[1,'Gibah: membicarakan keburukan yang benar adanya. Fitnah: tuduhan tidak benar.']],
4:[[0,'Waktu kurban: setelah salat Iduladha sampai akhir hari tasyrik.'],[1,'Akikah anak laki-laki: dua kambing yang sepadan.']],
5:[[2,'Konstantinopel ditaklukkan Muhammad Al-Fatih tahun 1453 M.'],[1,'Wali Songo berdakwah damai dan menyesuaikan budaya setempat.']]};

const SS=()=>SpreadsheetApp.getActive();
function setup(){Object.keys(HEAD).forEach(n=>{const s=SS().getSheetByName(n)||SS().insertSheet(n);if(!s.getLastRow())s.appendRow(HEAD[n])});
 SS().getSheetByName('Admin').appendRow(['Password guru ada di Script Properties: ADMIN_PASS']);
 PropertiesService.getScriptProperties().setProperty('ADMIN_PASS','GANTI_PASSWORD_INI')}
function all(n){const v=SS().getSheetByName(n).getDataRange().getValues(),h=v.shift();
 return {r:v.map((x,i)=>{const o={_row:i+2};h.forEach((k,j)=>o[k]=x[j]);return o})}}
function put(n,o){SS().getSheetByName(n).appendRow(HEAD[n].map(k=>o[k]===undefined?'':o[k]))}
function upd(n,o){SS().getSheetByName(n).getRange(o._row,1,1,HEAD[n].length).setValues([HEAD[n].map(k=>o[k]===undefined?'':o[k])])}
const out=o=>ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);

function doPost(e){
 let L=null;
 try{const d=JSON.parse(e.postData.contents),f=A[d.a];if(!f)throw Error('Aksi tidak dikenal');
  if(!['hb','state'].includes(d.a)){L=LockService.getScriptLock();L.waitLock(25000)}
  return out(f(d))}
 catch(x){return out(x.message==='kicked'?{ok:0,kicked:1}:{ok:0,err:String(x.message||x)})}
 finally{if(L)L.releaseLock()}}

function chk(d){const C=CacheService.getScriptCache(),c=C.get('s_'+d.id);
 if(c){if(c!==d.sid)throw Error('kicked')}
 else{if(!all('Siswa').r.some(x=>x.id==d.id))throw Error('Siswa tidak ditemukan');C.put('s_'+d.id,d.sid,21600)}}
function tk(d){if(CacheService.getScriptCache().get('t_'+d.token)!=='1')throw Error('Sesi guru berakhir, login ulang')}

function state(id){const S=all('Siswa').r,s=S.find(x=>x.id==id),prog={};
 all('Progres').r.filter(x=>x.id==id).forEach(x=>prog[x.bab]={m:+x.materi,l:+x.latihan,n:x.nilai});
 return {ok:1,xp:+s.xp||0,prog,lb:S.sort((a,b)=>(+b.xp||0)-(+a.xp||0)).slice(0,10).map(x=>({nama:x.nama,kelas:x.kelas,xp:+x.xp||0}))}}
function setProg(id,bab,f){const o=all('Progres').r.find(x=>x.id==id&&x.bab==bab);
 if(o){Object.assign(o,f);upd('Progres',o)}else put('Progres',Object.assign({id,bab,materi:0,latihan:0,nilai:'',ts:Date.now()},f))}
function award(id,act,xp){const k=id+'|'+act;if(all('XP_Log').r.some(x=>x.activity_id==k))return 0;
 put('XP_Log',{activity_id:k,id,xp,ts:Date.now()});
 const s=all('Siswa').r.find(x=>x.id==id);s.xp=(+s.xp||0)+xp;upd('Siswa',s);return xp}

const A={
login(d){const k=String(d.kelas),a=String(+d.absen),n=String(d.nama||'').trim();
 if(!n||!(+a>0)||!/^9[A-F]$/.test(k))throw Error('Data belum lengkap');
 let s=all('Siswa').r.find(x=>x.kelas==k&&String(x.absen)==a);
 if(s&&String(s.nama).toLowerCase()!==n.toLowerCase())throw Error('Nama tidak cocok dengan nomor absen');
 if(!s){s={id:'S'+Utilities.getUuid().slice(0,8),nama:n,absen:a,kelas:k,xp:0,created:Date.now()};put('Siswa',s)}
 const sid=Utilities.getUuid(),C=CacheService.getScriptCache();
 if(C.get('s_'+s.id))C.put('dup_'+s.id,String(Date.now()),3600);
 C.put('s_'+s.id,sid,21600);
 return Object.assign(state(s.id),{sid,id:s.id,nama:s.nama,kelas:k,absen:a})},
state(d){chk(d);return state(d.id)},
hb(d){chk(d);CacheService.getScriptCache().put('h_'+d.id,JSON.stringify({t:Date.now(),b:d.bab,p:d.page}),180);
 if(d.ev)put('Aktivitas',{ts:Date.now(),id:d.id,bab:d.bab,page:d.page});return {ok:1}},
finish(d){chk(d);const b=+d.bab;if(!(b>=1&&b<=5))throw Error('Bab salah');
 const g=award(d.id,'M'+b,10);setProg(d.id,b,{materi:1,ts:Date.now()});return Object.assign(state(d.id),{gain:g})},
quiz(d){chk(d);const b=+d.bab,K=KEY[b];if(!K)throw Error('Bab salah');
 if(all('Progres').r.some(x=>x.id==d.id&&x.bab==b&&+x.latihan))throw Error('Latihan sudah dikerjakan');
 const mc=(d.mc||[]).map(Number),ok=K.map((k,i)=>mc[i]===k[0]),n=ok.filter(Boolean).length,nilai=Math.round(n/K.length*100);
 put('Jawaban',{id:d.id,bab:b,jawaban:mc.join(','),nilai,ts:Date.now()});
 (d.ur||[]).slice(0,5).forEach((u,i)=>put('Uraian',{key:d.id+'|'+b+'|'+i,id:d.id,bab:b,no:i,jawaban:String(u).slice(0,2000),ts:Date.now()}));
 setProg(d.id,b,{latihan:1,nilai,ts:Date.now()});const g=award(d.id,'L'+b,20);
 return Object.assign(state(d.id),{gain:g,nilai,benar:n,total:K.length,review:K.map((k,i)=>({ok:ok[i],kunci:k[0],bahas:k[1]}))})},
tlogin(d){Utilities.sleep(800);
 if(!d.pw||d.pw!==PropertiesService.getScriptProperties().getProperty('ADMIN_PASS'))throw Error('Password salah');
 const t=Utilities.getUuid();CacheService.getScriptCache().put('t_'+t,'1',21600);return {ok:1,token:t}},
tlist(d){tk(d);const C=CacheService.getScriptCache(),S=all('Siswa').r.filter(x=>!d.kelas||x.kelas==d.kelas),P=all('Progres').r,now=Date.now(),H={};
 for(let i=0;i<S.length;i+=100)Object.assign(H,C.getAll(S.slice(i,i+100).map(x=>'h_'+x.id)));
 return {ok:1,s:S.map(x=>{const h=H['h_'+x.id]?JSON.parse(H['h_'+x.id]):null,p=P.filter(y=>y.id==x.id),n=p.filter(y=>y.nilai!=='');
  return {id:x.id,nama:x.nama,absen:x.absen,kelas:x.kelas,xp:+x.xp||0,m:p.reduce((a,y)=>a+(+y.materi||0),0),l:n.length,
   avg:n.length?Math.round(n.reduce((a,y)=>a+Number(y.nilai),0)/n.length):null,on:!!h&&now-h.t<60000,seen:h?h.t:null,bab:h?h.b:null,pg:h?h.p:null,dup:!!C.get('dup_'+x.id)}})}},
tsave(d){tk(d);const a=d.s,k=a.kelas,ab=String(+a.absen);
 if(!String(a.nama||'').trim()||!/^9[A-F]$/.test(k)||!(+ab>0))throw Error('Data belum lengkap');
 const t=all('Siswa').r;if(t.some(x=>x.kelas==k&&String(x.absen)==ab&&x.id!=a.id))throw Error('Nomor absen sudah dipakai');
 const o=a.id&&t.find(x=>x.id==a.id);
 if(o){Object.assign(o,{nama:a.nama.trim(),absen:ab,kelas:k});upd('Siswa',o)}
 else put('Siswa',{id:'S'+Utilities.getUuid().slice(0,8),nama:a.nama.trim(),absen:ab,kelas:k,xp:0,created:Date.now()});
 return {ok:1}},
tdel(d){tk(d);const o=all('Siswa').r.find(x=>x.id==d.id);if(o)SS().getSheetByName('Siswa').deleteRow(o._row);return {ok:1}},
turaian(d){tk(d);const m={};all('Siswa').r.forEach(x=>m[x.id]=x);
 return {ok:1,u:all('Uraian').r.filter(x=>m[x.id]&&(!d.kelas||m[x.id].kelas==d.kelas)).map(x=>({key:x.key,nama:m[x.id].nama,kelas:m[x.id].kelas,bab:x.bab,no:x.no,jawaban:x.jawaban,nilai:x.nilai,komentar:x.komentar}))}},
tnilai(d){tk(d);const o=all('Uraian').r.find(x=>x.key==d.key);if(!o)throw Error('Jawaban tidak ditemukan');
 const n=Number(d.nilai);if(!(n>=0&&n<=100))throw Error('Nilai harus 0-100');
 o.nilai=n;o.komentar=String(d.komentar||'').slice(0,500);upd('Uraian',o);return {ok:1}}
};
