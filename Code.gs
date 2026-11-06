const HEAD={Siswa:['id','nama','absen','kelas','xp','session_id','last_seen','bab','page','created'],
Progres:['id','bab','materi','latihan','nilai','ts'],Jawaban:['id','bab','jawaban','nilai','ts'],
Uraian:['key','id','bab','no','jawaban','nilai','komentar','ts'],Aktivitas:['ts','id','bab','page'],
Admin:['info'],XP_Log:['activity_id','id','xp','ts']};
// Kunci pilihan ganda: [indeks jawaban benar, pembahasan]. Harus cocok dengan urutan opsi di index.html.
const KEY={
// Format: [kunci, pembahasan, 'jd' bila menjodohkan]. Kunci angka = pilihan ganda atau sebab-akibat, array = kompleks atau jodoh.
1:[[1,'Derajat diberikan kepada yang beriman dan berilmu.'],[2,'Ilmu tanpa iman dan akhlak tidak mencerminkan ayat.'],[2,'Iqra’ menekankan membaca dan belajar.'],[0,'Verifikasi sumber lebih dulu (tabayyun).'],[1,'Pertanyaan retoris menegaskan keduanya tidak sama.'],[3,'Ilmu yang diajarkan menjadi amal jariyah.'],[1,'Bandingkan dalil dan sumber, lalu tanya guru.'],[0,'Ilmu perlu diamalkan agar bermanfaat.'],[3,'Yang mengambil pelajaran adalah ulul albab.'],[2,'Thalabul ilmi berlangsung terus-menerus.'],[0,'Karya bermanfaat terus mengalirkan pahala.'],[3,'Ilmu dan iman melahirkan keputusan yang benar.'],[1,'Literasi digital Islami: belajar, menyaring, berakhlak.'],[2,'Adab kepada guru: tenang dan sopan.'],
[[0,1,3],'Ayat menyebut iman dan ilmu bersama.'],[[0,2,3],'Cek sumber, pahami konteks, tanya ahli.'],[[0,1,3],'Ilmu yang dibagikan dengan benar menjadi amal jariyah.'],[[0,2,4],'Menghargai ilmu, terus belajar, mengambil pelajaran.'],[[0,1,3],'Usaha, ibadah, dan akhlak baik.'],[[0,1,2,4],'Ilmu mengangkat derajat dan menjaga dari kesesatan.'],[[0,1,3],'Tabayyun: sumber asli, bandingkan, tanya.'],[[0,2,3],'Iqra’ mengajak membaca dan meneliti.'],[[0,1,3],'Sombong, malas, dan meremehkan ilmu melemahkan belajar.'],[[0,1,3],'Ilmu tanpa iman mudah disalahgunakan dan menimbulkan sombong.'],
[[1,0,2,3],'Iman: keyakinan. Ilmu: pengetahuan. Amal: perbuatan. Tabayyun: memeriksa berita.','jd'],[[2,1,0],'Pasangan ayat dengan isinya.','jd'],[[0,1,2],'Sikap yang tepat untuk tiap situasi.','jd'],[[1,0,2],'Ilmu tanpa iman menyimpang, iman tanpa ilmu salah paham, keduanya dengan amal sukses.','jd'],[[1,0,2],'Pasangan kebiasaan dengan nilainya.','jd'],[[1,0,3,2],'Manfaat utama tiap kebiasaan.','jd'],
[0,'Pernyataan dan alasan benar, saling berhubungan.'],[3,'Pernyataan salah, alasan benar.'],[4,'Pernyataan dan alasan salah.'],[0,'Pernyataan dan alasan benar, saling berhubungan.'],[1,'Keduanya benar tetapi tidak berhubungan.'],[2,'Pernyataan benar, alasan salah.'],[0,'Kritis terhadap sumber sejalan dengan tabayyun.'],[0,'Rendah hati lahir dari kesadaran masih banyak yang belum diketahui.'],[3,'Pernyataan salah, alasan benar.'],[4,'Pernyataan dan alasan salah.']],
2:[[1,'Alam penantian setelah wafat adalah barzakh.'],[2,'Tiupan pertama menandai kiamat kubra.'],[1,'Yakin amal dihisab mendorong jujur.'],[0,'Bencana lokal termasuk kiamat sugra.'],[[0,1,3,4],'Hilangnya ilmu termasuk tanda kecil.'],[[0,1,3],'Iman akhirat melahirkan jujur, tanggung jawab, rajin beramal.'],[[2,0,3,1],'Mahsyar: berkumpul. Hisab: penghitungan. Mizan: timbangan. Sirat: titian.','jd'],[0,'Keduanya benar dan berhubungan.'],[4,'Keduanya salah.'],[3,'Pernyataan salah, alasan benar.'],
[3,'Sedekah jariyah, ilmu bermanfaat, dan doa anak saleh terus mengalir.'],[0,'Kebangkitan dari kubur disebut ba’ats.'],[3,'Anggota tubuh bersaksi, maka jaga dari dosa.'],[2,'Amal di dunia menentukan akhirat.'],[2,'Kejujuran dari iman lebih kokoh.'],[1,'Setelah mizan manusia melewati sirat.'],[2,'Menyalahgunakan kas adalah amanah yang disia-siakan.'],[3,'Iman akhirat menjadi dasar tanggung jawab.'],[0,'Turunnya Nabi Isa a.s. termasuk tanda besar.'],[3,'Tetap berbuat baik karena amal dibalas.'],
[[0,1,2,4],'Qiyas bukan tahapan akhirat.'],[[0,1,3],'Dajjal dan matahari dari barat adalah tanda besar.'],[[0,1,3],'Jujur, amanah, dan meminta maaf mencerminkan iman akhirat.'],[[0,1,3],'Waktu kiamat hanya diketahui Allah.'],[[0,1,3],'Salat, jujur, dan menolong memberatkan timbangan.'],[[0,2,3],'Barzakh adalah alam antara wafat dan kebangkitan.'],[[0,1,3],'Tetap tenang, periksa dalil, perbanyak amal.'],[[0,1,3],'Hidup terarah, beramal, takut zalim.'],
[[1,2,3,0],'Barzakh: alam antara. Ba’ats: kebangkitan. Mahsyar: berkumpul. Hisab: penghitungan.','jd'],[[1,0,1,1],'Ulama wafat tanda kecil, lainnya tanda besar.','jd'],[[0,1,2,3],'Jujur, amanah, bertobat, menghargai waktu.','jd'],[[0,0,1,1],'Wafat dan gempa lokal sugra, sangkakala dan hancur total kubra.','jd'],[[1,3,0,2],'Mizan timbangan, sirat titian, surga nikmat, neraka azab.','jd'],
[0,'Keduanya benar dan berhubungan.'],[1,'Keduanya benar tetapi alasan tidak menjelaskan pernyataan.'],[3,'Pernyataan salah, alasan benar.'],[0,'Keduanya benar dan berhubungan.'],[3,'Pernyataan salah, alasan benar.'],[4,'Keduanya salah.'],[2,'Pernyataan benar, alasan salah.']],
3:[[1,'Periksa dulu kebenaran kabar (tabayyun).'],[2,'Gibah: keburukan yang benar adanya.'],[1,'Fitnah: tuduhan tanpa bukti.'],[2,'Tanggapi santun atau diam.'],[[0,1,3],'Tabayyun: cek sumber, tanya pihak terkait, bandingkan.'],[[0,1,3],'Hormat, sayang, dan menepati janji.'],[[1,0,3,2],'Gibah: keburukan benar. Fitnah: tuduhan palsu. Tabayyun: periksa. Ukhuwah: persaudaraan.','jd'],[0,'Keduanya benar dan berhubungan.'],[4,'Keduanya salah.'],[2,'Pernyataan benar, alasan salah.']],
4:[[1,'Kurban sah setelah salat Iduladha.'],[0,'Akikah anak perempuan: satu kambing.'],[1,'Kurus dan pincang parah tidak memenuhi syarat.'],[1,'Daging akikah dibagikan matang.'],[[0,1,3],'Cukup umur, sehat, tidak sangat kurus.'],[[0,1,2],'Kurban menumbuhkan berbagi, empati, kebersamaan.'],[[1,0,2,3],'Dua kambing laki-laki, satu perempuan, waktu setelah salat id, dibagikan kepada yang berhak.','jd'],[0,'Keduanya benar dan berhubungan.'],[4,'Keduanya salah.'],[1,'Keduanya benar tapi tidak berhubungan.']],
5:[[1,'Konstantinopel ditaklukkan tahun 1453 M.'],[2,'Persiapan matang menjadi kunci.'],[1,'Dakwah damai dan menyesuaikan budaya.'],[2,'Teori Mekkah: langsung dari Arab.'],[[0,1,2,4],'Wali Songo berdakwah damai.'],[[0,1,3],'Usmani luas wilayahnya dan kuat administrasinya.'],[[0,1,2,3],'Pasangan tokoh dan perannya.','jd'],[0,'Keduanya benar dan berhubungan.'],[2,'Pernyataan benar, alasan salah.'],[4,'Keduanya salah.']],
6:[[1,'Khalifah bertugas memakmurkan dan menjaga bumi, bukan merusaknya.'],[0,'Kasih sayang mencakup manusia dan makhluk lain, termasuk hewan.']],
7:[[1,'Ikhtiar dan doa dahulu, lalu tawakal.'],[2,'Sabar, evaluasi diri, dan mencoba lagi mencerminkan iman kepada takdir.']],
8:[[1,'Kaligrafi termasuk seni rupa.'],[2,'Karya seni Islami boleh dan bernilai baik bila isi dan tujuannya sesuai syariat.']],
9:[[2,'Imam Malik menulis Al-Muwaththa’ di Madinah.'],[1,'Perbedaan mazhab disikapi dengan saling menghargai dan menjaga ukhuwah.']],
10:[[1,'Taj Mahal dibangun Syah Jahan pada masa Dinasti Mughal.'],[3,'Toleransi Akbar mendukung stabilitas dan kemajuan.']]};

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

function score(k,u){const a=k[0];
 if(typeof a==='number')return u===a?1:0;
 if(!Array.isArray(u))return 0;
 if(k[2]==='jd')return a.filter((v,i)=>Number(u[i])===v).length/a.length;
 return JSON.stringify(a.slice().sort())===JSON.stringify(u.map(Number).sort())?1:0}
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
finish(d){chk(d);const b=+d.bab;if(!(b>=1&&b<=10))throw Error('Bab salah');
 const g=award(d.id,'M'+b,10);setProg(d.id,b,{materi:1,ts:Date.now()});return Object.assign(state(d.id),{gain:g})},
quiz(d){chk(d);const b=+d.bab,K=KEY[b];if(!K)throw Error('Bab salah');
 if(all('Progres').r.some(x=>x.id==d.id&&x.bab==b&&+x.latihan))throw Error('Latihan sudah dikerjakan');
 const mc=d.mc||[];if(mc.length!==K.length)throw Error('Jumlah jawaban tidak sesuai');
 const sc=K.map((k,i)=>score(k,mc[i])),n=Math.round(sc.reduce((a,v)=>a+v,0)*10)/10,nilai=Math.round(n/K.length*100);
 put('Jawaban',{id:d.id,bab:b,jawaban:JSON.stringify(mc),nilai,ts:Date.now()});
 (d.ur||[]).slice(0,5).forEach((u,i)=>put('Uraian',{key:d.id+'|'+b+'|'+i,id:d.id,bab:b,no:i,jawaban:String(u).slice(0,2000),ts:Date.now()}));
 setProg(d.id,b,{latihan:1,nilai,ts:Date.now()});const g=award(d.id,'L'+b,20);
 return Object.assign(state(d.id),{gain:g,nilai,benar:n,total:K.length,review:K.map((k,i)=>({s:sc[i],kunci:k[0],bahas:k[1]}))})},
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
