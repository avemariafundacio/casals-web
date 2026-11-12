// Casals Ave Maria · v2 (producció). Generat amb build_v2.py a partir del prototip.

(function(){
"use strict";
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const uid = p => p + Math.random().toString(36).slice(2,8);
const DIES = ["Dilluns","Dimarts","Dimecres","Dijous","Divendres"];
const DIES_C = ["Dl","Dt","Dc","Dj","Dv"];
const EIXOS = {salut:"Salut i activitat física", digital:"Competència digital", cultura:"Cultura i oci", comunitat:"Comunitat i voluntariat"};
const EIX_C = {salut:"Salut", digital:"Digital", cultura:"Cultura", comunitat:"Comunitat"};

const ICON = {
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5"/><path d="M16 4.8a3.5 3.5 0 0 1 0 6.4M18.5 14.8c1.6.8 2.6 2.6 3 5.2"/></svg>',
  act:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="3"/><path d="M3 9h18M8 2v4M16 2v4M8 14h3M8 17h6"/></svg>',
  room:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M2 21h20M16 8h2a2 2 0 0 1 2 2v11"/><circle cx="12.5" cy="12" r=".6" fill="currentColor"/></svg>',
  cog:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  cup:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/><path d="M3 22h15"/></svg>',
  plate:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="7"/><circle cx="12" cy="13" r="3.5"/><path d="M2 4v5a2 2 0 0 0 2 2V20M4 4v4M22 4c-1.5 0-2.5 2-2.5 4.5S20.5 12 22 12v8"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21.5l8.8-8.8a5 5 0 0 0 0-7.1z"/><path d="M3.5 12h4l2-3 3 6 2-3h6"/></svg>',
  tool:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 1.3-1.3a4 4 0 0 1-5-5L3 8.4 8.4 3l3.3 3.3a4 4 0 0 1 3 0z"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15v3M11 10v8M15 12v6M19 6v12"/></svg>',
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  door:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8M10 12h11M18 9l3 3-3 3"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  ext:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3.5h3l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L21 8H6.6"/></svg>',
  x:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>'
};

/* ---------- Dates ---------- */
const isoAvui = () => { const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); };
const iso = d => d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
const addDays = (s,n) => { const d=new Date(s+"T12:00:00"); d.setDate(d.getDate()+n); return iso(d); };
const wd = s => (new Date(s+"T12:00:00").getDay()+6)%7;
const diesEntre = (a,b) => Math.round((new Date(b+"T12:00:00")-new Date(a+"T12:00:00"))/864e5);
const INICI_CONTRACTE="2026-09-01";

/* ---------- Dades: Supabase ----------
   Totes les dades són a la taula "registres" (col, id, casal, data).
   Els permisos els comprova la base de dades (RLS): el navegador només amaga botons. */
const CFG = window.CASALS_CONFIG || {};
const sb = window.supabase.createClient(CFG.url, CFG.key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
let D = null, ME = null;
let ROWS = new Map();   // estat del servidor: col|id -> {col,id,casal,data,json}
let LAST = new Map();   // darrer estat sincronitzat de l'aplicació
const CASALS_DEF = [{id:"c1",nom:"Casal de Ribes",curt:"Ribes"},{id:"c2",nom:"Casal de Roquetes",curt:"Roquetes"}];

function buit(){
  return {casals:[],sales:[],socis:[],activitats:[],reserves:[],
    apats:{places:30,preuSoci:6.5,preuNoSoci:8.5,preuSubv:3,subvencionats:[],cobraments:{},hora:"13:00",menus:Array.from({length:7},()=>({primer:"",segon:"",postres:""})),reserves:[],historic:[]},
    assist:{},arribades:{},rebuts:[],seguiments:[],derivacions:[],
    manteniment:{incidencies:[],inventari:[],preventiu:[],tasques:[],neteja:{}},
    config:{avisos:{actiu:true,destinataris:[]}},registre:[],mesosTancats:{},informes:{},
    compres:{proveidors:[],productes:[],comandes:[],petitoris:{},correu:{mode:"prova",prova:""},codisClient:{},adreces:{}}};
}
const casalDe = (arr,id) => { const x=arr.find(y=>y.id===id); return x ? x.casal : undefined; };
const ARRAYS = {
  "casals":                  {get:d=>d.casals, casal:()=>null},
  "sales":                   {get:d=>d.sales, casal:r=>r.casal},
  "socis":                   {get:d=>d.socis, casal:r=>r.casal},
  "activitats":              {get:d=>d.activitats, casal:r=>r.casal},
  "reserves":                {get:d=>d.reserves, casal:(r,d)=>casalDe(d.sales,r.sala)},
  "rebuts":                  {get:d=>d.rebuts, casal:(r,d)=>casalDe(d.activitats,r.act)},
  "seguiments":              {get:d=>d.seguiments, casal:(r,d)=>casalDe(d.socis,r.soci)},
  "derivacions":             {get:d=>d.derivacions, casal:(r,d)=>casalDe(d.socis,r.soci)},
  "apats.reserves":          {get:d=>d.apats.reserves, casal:()=>"c2"},
  "apats.historic":          {get:d=>d.apats.historic, casal:()=>"c2", id:r=>r.data},
  "manteniment.incidencies": {get:d=>d.manteniment.incidencies, casal:r=>r.casal},
  "manteniment.inventari":   {get:d=>d.manteniment.inventari, casal:r=>r.casal},
  "manteniment.preventiu":   {get:d=>d.manteniment.preventiu, casal:r=>r.casal},
  "manteniment.tasques":     {get:d=>d.manteniment.tasques, casal:r=>r.casal||null},
  "compres.proveidors":      {get:d=>d.compres.proveidors, casal:()=>null},
  "compres.productes":       {get:d=>d.compres.productes, casal:()=>null},
  "compres.comandes":        {get:d=>d.compres.comandes, casal:r=>r.casal}
};
const MAPES = {
  "assist":             {get:d=>d.assist, casal:(k,d)=>casalDe(d.activitats,k.split("|")[0])},
  "arribades":          {get:d=>d.arribades, casal:k=>k.split("|")[0]},
  "manteniment.neteja": {get:d=>d.manteniment.neteja, casal:k=>k.split("|")[0]},
  "apats.cobraments":   {get:d=>d.apats.cobraments||(d.apats.cobraments={}), casal:()=>"c2"},
  "mesosTancats":       {get:d=>d.mesosTancats, casal:()=>null},
  "informes_mes":       {get:d=>d.informes, casal:()=>null}
};
const APATS_CFG = ["places","preuSoci","preuNoSoci","preuSubv","subvencionats","hora","menus","preuServei","preuMenu","preuMig","bonif"];
const COMPRES_CFG = ["petitoris","correu","codisClient","adreces"];

function fromRows(rows){
  const d=buit(), fitxes={}, privat={};
  for(const r of rows){ const v=r.data;
    if(r.col==="config") Object.assign(d.config, v);
    else if(r.col==="apats.config") APATS_CFG.forEach(k=>{ if(v[k]!==undefined) d.apats[k]=v[k]; });
    else if(r.col==="compres.config") COMPRES_CFG.forEach(k=>{ if(v[k]!==undefined) d.compres[k]=v[k]; });
    else if(r.col==="fitxes_socials") fitxes[r.id]=v;
    else if(r.col==="socis_privat") privat[r.id]=v;
    else if(MAPES[r.col]) MAPES[r.col].get(d)[v.k]=v.v;
    else if(ARRAYS[r.col]) ARRAYS[r.col].get(d).push(v);
  }
  d.socis.forEach(s=>{ if(privat[s.id]) s.priv=privat[s.id]; });
  d.socis.forEach(s=>{ const f=fitxes[s.id];
    if(f){ s.viuSol=!!f.viuSol; s.acollida=f.acollida||{completada:true}; }
    else s.acollida = diesEntre(s.alta||isoAvui(), isoAvui())<=60 ? {completada:false,entrevista:null,benvinguda:false,referent:null,revisio:null,interessos:[]} : {completada:true};
  });
  d.socis.sort((a,b)=>a.num-b.num); d.casals.sort((a,b)=>a.id.localeCompare(b.id));
  d.apats.historic.sort((a,b)=>a.data.localeCompare(b.data));
  // v31: preus del plec (servei 5,20 €; no inscrits, preu del bar 7,00 € / 4,50 €) i bonificació per persona.
  // Es completa aquí, abans de calcular l'estat sincronitzat, perquè no es generin escriptures en obrir la pantalla.
  { const A=d.apats; if(A.preuServei==null) A.preuServei=5.20; if(A.preuMenu==null) A.preuMenu=7.00; if(A.preuMig==null) A.preuMig=4.50;
    if(!A.bonif){ A.bonif={}; (A.subvencionats||[]).forEach(x=>{ A.bonif[x]=A.preuSubv!=null&&A.preuSubv<A.preuServei?A.preuSubv:2; }); }
    if(!A.cobraments) A.cobraments={}; A.subvencionats=Object.keys(A.bonif); }
  d.compres.comandes.sort((a,b)=>(a.creat||"").localeCompare(b.creat||""));
  if(!d.config.avisos) d.config.avisos={actiu:true,destinataris:[]};
  return d;
}
function toRecords(d){
  const m=new Map();
  const prev=(col,id)=>{ const o=LAST.get(col+"|"+id)||ROWS.get(col+"|"+id); return o?o.casal:null; };
  const put=(col,id,casal,data)=>{ if(casal===undefined) casal=prev(col,id); m.set(col+"|"+id,{col,id:String(id),casal:casal??null,json:JSON.stringify(data)}); };
  for(const [col,a] of Object.entries(ARRAYS)) for(const r of a.get(d)){
    let data=r; if(col==="socis"){ const {viuSol,acollida,priv,...rest}=r; data=rest; }
    put(col, a.id?a.id(r):r.id, a.casal(r,d), data);
  }
  // Dades administratives confidencials (DNI/NIE, compte, representant): col·lecció a part, només Coordinació i Supervisió
  if(esCoord()) d.socis.forEach(s=>{ if(s.priv&&(s.priv.dni||s.priv.iban||s.priv.repr)) put("socis_privat",s.id,s.casal,s.priv); });
  if(can("seguiment","C")) d.socis.forEach(s=>put("fitxes_socials",s.id,s.casal,{viuSol:!!s.viuSol,acollida:s.acollida}));
  for(const [col,a] of Object.entries(MAPES)) for(const [k,v] of Object.entries(a.get(d))) put(col,k,a.casal(k,d),{k,v});
  if(ROWS.has("config|main")||esCoord()) put("config","main",null,d.config);
  if(ROWS.has("apats.config|main")||can("menu","M")) put("apats.config","main","c2",Object.fromEntries(APATS_CFG.map(k=>[k,d.apats[k]])));
  if(ROWS.has("compres.config|main")||esCoord()) put("compres.config","main",null,Object.fromEntries(COMPRES_CFG.map(k=>[k,d.compres[k]])));
  return m;
}

async function llegirTot(){
  const out=[], PAGE=1000;
  for(let from=0;;from+=PAGE){
    const {data,error}=await sb.from("registres").select("col,id,casal,data").order("col").order("id").range(from,from+PAGE-1);
    if(error) throw error; out.push(...data); if(data.length<PAGE) break;
  }
  return out;
}
let dataVer=0;
async function carregar(){
  const rows=await llegirTot();
  ROWS=new Map(rows.map(r=>[r.col+"|"+r.id,{col:r.col,id:r.id,casal:r.casal,data:r.data,json:JSON.stringify(r.data)}]));
  D=fromRows([...ROWS.values()]);
  if(!D.casals.length) D.casals=CASALS_DEF.map(c=>({...c}));
  await carregarPermisos();
  LAST=toRecords(D);
  dataVer++;
  await carregarNoms();
}
// Permisos editats per la Supervisió (taula permisos_ui). El servidor aplica els mateixos canvis a la taula permisos.
async function carregarPermisos(){
  try{ const {data,error}=await sb.from("permisos_ui").select("m,rol,v"); if(error) throw error;
    const o={}; (data||[]).forEach(x=>{ (o[x.m]=o[x.m]||{})[x.rol]=x.v; }); S._permUI=o; }
  catch(e){ S._permUI=S._permUI||{}; }
  aplicaPermisos();
}
// Talleristes i voluntariat no llegeixen la taula de persones: el servidor només els dona el nom dels seus inscrits.
async function carregarNoms(){
  if(!ME || !["tallerista","voluntari"].includes(ME.rol)){ S._noms=null; return; }
  try{ const {data,error}=await sb.rpc("noms_inscrits"); if(error) throw error; S._noms=Object.fromEntries((data||[]).map(x=>[x.id,{id:x.id,nom:x.nom||"",cognoms:x.cognoms||"",num:x.num,tel:""}])); }
  catch(e){ S._noms={}; }
}

// ---- Desar: envia només el que ha canviat ----
let syncT=null, syncing=false, pendent=false, remotPendent=false, esperantFlush=[];
const save = () => { dataVer++; clearTimeout(syncT); estatSync("desant"); syncT=setTimeout(sincronitzar,300); };
const saveUI = () => { try{ localStorage.setItem("casals-ui", JSON.stringify({casal:S.casal,view:S.view,user:S.user})); }catch(e){} };
/** Espera que totes les dades pendents s'hagin desat al servidor. */
function flush(){ return new Promise(ok=>{ if(syncT){ clearTimeout(syncT); syncT=null; sincronitzar(); } if(!syncing && !syncT) return ok(); esperantFlush.push(ok); }); }
async function sincronitzar(){
  syncT=null;
  if(syncing){ pendent=true; return; }
  syncing=true;
  const ara=toRecords(D), ups=[], dels=[];
  ara.forEach((r,k)=>{ const o=LAST.get(k); if(!o||o.json!==r.json||o.casal!==r.casal) ups.push(r); });
  LAST.forEach((r,k)=>{ if(!ara.has(k)) dels.push(r); });
  try{
    for(let i=0;i<ups.length;i+=200){
      const lot=ups.slice(i,i+200).map(r=>({col:r.col,id:r.id,casal:r.casal,data:JSON.parse(r.json)}));
      const {error}=await sb.from("registres").upsert(lot,{onConflict:"col,id"}); if(error) throw error;
      lot.forEach(r=>ROWS.set(r.col+"|"+r.id,{...r,json:JSON.stringify(r.data)}));
    }
    for(const r of dels){
      const {data,error}=await sb.from("registres").delete().eq("col",r.col).eq("id",r.id).select("id"); if(error) throw error;
      if(!data.length && ROWS.has(r.col+"|"+r.id)) throw {message:"no tens permís per esborrar-ho"};
      ROWS.delete(r.col+"|"+r.id);
    }
    LAST=ara; estatSync("desat");
  }catch(e){
    estatSync("error");
    toast("No s'ha pogut desar: "+textError(e)+". Es recarreguen les dades.");
    try{ await carregar(); if(!document.querySelector(".scrim")) render(); }catch(_){}
  }
  syncing=false;
  if(pendent){ pendent=false; sincronitzar(); return; }
  const w=esperantFlush; esperantFlush=[]; w.forEach(f=>f());
  if(remotPendent) aplicarRemot();
}
function textError(e){
  const m=(e&&(e.message||e.error_description))||"error desconegut";
  if(/row-level security|permission|42501|només|no pot/i.test(m)) return /només|no pot/i.test(m) ? m : "el teu perfil no té permís per fer aquest canvi";
  if(/fetch|network|Failed/i.test(m)) return "no hi ha connexió";
  return m;
}
function estatSync(s){
  const el=document.getElementById("sync"); if(!el) return;
  el.className="chip sync "+(s==="error"?"crit":s==="desant"?"":"good");
  el.textContent = s==="desant"?"Desant…":s==="error"?"Error en desar":"Desat";
}

// ---- Canvis d'altres persones en temps real ----
let canal=null;
function escoltar(){
  if(canal) return;
  canal=sb.channel("registres").on("postgres_changes",{event:"*",schema:"public",table:"registres"},p=>{
    const row = p.eventType==="DELETE" ? p.old : p.new; if(!row||!row.col) return;
    const k=row.col+"|"+row.id;
    if(p.eventType==="DELETE"){ if(!ROWS.has(k)) return; ROWS.delete(k); }
    else { const js=JSON.stringify(row.data); const cur=ROWS.get(k); if(cur&&cur.json===js) return; ROWS.set(k,{col:row.col,id:row.id,casal:row.casal,data:row.data,json:js}); }
    remotPendent=true; aplicarRemot();
  }).subscribe();
}
function deixarEscoltar(){ if(canal){ try{ sb.removeChannel(canal); }catch(e){} canal=null; } }
function aplicarRemot(){
  if(!remotPendent||!D) return;
  if(syncing||syncT||document.querySelector(".scrim")||S.petF) return; // s'aplicarà en acabar
  remotPendent=false;
  const reg=D.registre;
  D=fromRows([...ROWS.values()]); if(!D.casals.length) D.casals=CASALS_DEF.map(c=>({...c})); D.registre=reg; LAST=toRecords(D); dataVer++;
  render();
}
async function logCanvi(accio, detall, motiu){
  if(D) D.registre.unshift({data:araIso(),rol:quiSoc(),accio,detall,motiu:motiu||""});
  try{ await sb.from("auditoria").insert({accio,detall:detall||"",motiu:motiu||""}); }catch(e){}
}
async function llegirAuditoria(){
  const {data,error}=await sb.from("auditoria").select("moment,email,rol,accio,detall,motiu").order("moment",{ascending:false}).limit(60);
  if(error||!D) return;
  D.registre=data.map(r=>{ const t=new Date(r.moment); return {data:iso(t)+"T"+String(t.getHours()).padStart(2,"0")+":"+String(t.getMinutes()).padStart(2,"0"),rol:(ROLS[r.rol]||r.rol||"")+(r.email?" · "+r.email:""),accio:r.accio,detall:r.detall,motiu:r.motiu}; });
  if(S.view==="config") render();
}
/** Crida una funció de servidor i retorna el resultat o llança un error llegible. */
async function fn(nom, body){
  const {data,error}=await sb.functions.invoke(nom,{body});
  if(error){ let m=error.message; try{ const j=await error.context.json(); m=j.error||m; }catch(_){} const e=new Error(m); throw e; }
  if(data&&data.error) throw new Error(data.error);
  return data;
}

const S = { rol:"pendent", casal:"tots", view:"inici", q:"", fq:"tots", eix:"tots", sala:null, portalSoci:null, apDia:null, user:null };
try{ const r=localStorage.getItem("casals-ui"); if(r){ const o=JSON.parse(r); S.casal=o.casal||"tots"; S.view=o.view||"inici"; S.uiUser=o.user||null; } }catch(e){}

/* ---------- Helpers de dades ---------- */
const soci = id => D.socis.find(s=>s.id===id) || (S._noms&&S._noms[id]);
const sala = id => D.sales.find(s=>s.id===id);
const casal = id => D.casals.find(c=>c.id===id);
const inCasal = x => S.casal==="tots" || (x.casal!==undefined ? x.casal : x.id)===S.casal;
const nomComplet = s => s ? s.nom+" "+s.cognoms : "—";
const inicials = s => esc(((s.nom||" ")[0]+(s.cognoms||" ")[0]).toUpperCase());
/* Dades administratives confidencials (DNI/NIE, compte, representant): només Coordinació i Supervisió. */
const dniOk = v => { const x=v.toUpperCase().replace(/[\s-]/g,""); const m=x.match(/^([XYZ]?)(\d{7,8})([A-Z])$/); if(!m) return false; const n=Number(({X:"0",Y:"1",Z:"2"}[m[1]]||"")+m[2]); return "TRWAGMYFPDXBNJZSQVHLCKE"[n%23]===m[3]; };
const ibanNet = v => (v||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
const ibanOk = v => { const x=ibanNet(v); if(!/^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$/.test(x)) return false; if(x.startsWith("ES")&&x.length!==24) return false; const r=(x.slice(4)+x.slice(0,4)).replace(/[A-Z]/g,c=>c.charCodeAt(0)-55); let m=0; for(const c of r) m=(m*10+Number(c))%97; return m===1; };
const ibanFmt = v => ibanNet(v).replace(/(.{4})/g,"$1 ").trim();
const ibanMask = v => { const x=ibanNet(v); return x ? x.slice(0,4)+" •••• •••• •••• •••• "+x.slice(-4) : "—"; };
const edat = s => { if(!s.naix) return "—"; const b=new Date(s.naix), n=new Date(); let a=n.getFullYear()-b.getFullYear(); if(n<new Date(n.getFullYear(),b.getMonth(),b.getDate())) a--; return a; };
const mins = t => { const [h,m]=t.split(":").map(Number); return h*60+m; };
const avuiIdx = () => { const d=new Date().getDay(); return d>=1&&d<=5 ? d-1 : 0; };
const esAvuiLaborable = () => { const d=new Date().getDay(); return d>=1&&d<=5; };
const activitatsDe = sid => D.activitats.filter(a=>a.inscrits.includes(sid));
const esperaDe = sid => D.activitats.filter(a=>a.espera.includes(sid));

function inscriure(a, sid){
  if(a.inscrits.includes(sid)||a.espera.includes(sid)) return "ja";
  if(a.inscrits.length < a.places){ a.inscrits.push(sid); save(); return "inscrit"; }
  a.espera.push(sid); save(); return "espera";
}
function baixa(a, sid){
  let promo=null;
  if(a.inscrits.includes(sid)){
    a.inscrits = a.inscrits.filter(x=>x!==sid);
    if(a.espera.length && a.inscrits.length < a.places){ promo=a.espera.shift(); a.inscrits.push(promo); }
  } else a.espera = a.espera.filter(x=>x!==sid);
  save(); return promo;
}
const salaLliure = id => { const x=D.sales.find(y=>y.id===id); return !!(x&&x.perAssignar); };
function conflicte(salaId, dia, inici, fi, ignoreId){
  if(salaLliure(salaId)) return null;
  const a0=mins(inici), a1=mins(fi);
  const ov = (b0,b1)=> a0<mins(b1) && mins(b0)<a1;
  let hs=null; const act = D.activitats.find(a=>a.id!==ignoreId && !a.data && a.sala===salaId && sesA(a).some(x=>x.dia===dia && ov(x.inici,x.fi) && (hs=x)));
  if(act) return "Coincideix amb l'activitat «"+act.nom+"» de "+DIES7[dia].toLowerCase()+" ("+hs.inici+"–"+hs.fi+").";
  const r = D.reserves.find(r=>r.id!==ignoreId && r.sala===salaId && r.dia===dia && ov(r.inici,r.fi));
  if(r) return "Coincideix amb la reserva de "+r.entitat+" ("+r.inici+"–"+r.fi+").";
  return null;
}

/* Activitats puntuals (un sol dia, camp "data") i sessions anul·lades de les periòdiques (camp "anul"). */
const esPunt = a => !!a.data;
const exA = (a,id) => (a.ext&&a.ext[id])||{};
const anulada = (a,d) => (a.anul||[]).some(x=>x.d===d);
const dinsCurs = (a,d) => (!a.dIni||d>=a.dIni) && (!a.dFi||d<=a.dFi);
/* Una activitat setmanal pot tenir diverses sessions a la setmana (camp "ses": [{dia,inici,fi}]).
   Els camps dia/inici/fi guarden la primera sessió, per compatibilitat. */
const sesA = a => esPunt(a) ? [{dia:wd(a.data),inici:a.inici,fi:a.fi}] : ((a.ses&&a.ses.length) ? a.ses : [{dia:a.dia,inici:a.inici,fi:a.fi}]);
const sesDe = (a,d) => esPunt(a) ? (a.data===d?sesA(a)[0]:null) : (dinsCurs(a,d) ? sesA(a).find(x=>x.dia===wd(d))||null : null);
const horaEn = (a,d) => sesDe(a,d) || sesA(a)[0];
const actEnData = (a,d) => esPunt(a) ? a.data===d : (!!sesDe(a,d) && !anulada(a,d));
const diesTxt = l => l.length<2 ? l.join("") : l.slice(0,-1).join(", ")+" i "+l[l.length-1].toLowerCase();
const horari = a => { if(esPunt(a)) return DIES7[wd(a.data)]+" "+fdata(a.data)+" · "+a.inici+"–"+a.fi;
  const l=sesA(a).slice().sort((x,y)=>x.dia-y.dia); const igual=l.every(x=>x.inici===l[0].inici&&x.fi===l[0].fi);
  return igual ? diesTxt(l.map((x,i)=>i?DIES7[x.dia].toLowerCase():DIES7[x.dia]))+" · "+l[0].inici+"–"+l[0].fi : l.map(x=>DIES7[x.dia]+" "+x.inici+"–"+x.fi).join(" · "); };
const quan = a => esPunt(a) ? DIES7[wd(a.data)]+" "+fdata(a.data) : diesTxt(sesA(a).slice().sort((x,y)=>x.dia-y.dia).map((x,i)=>i?DIES7[x.dia].toLowerCase():DIES7[x.dia]));
const ordAct = (a,b) => (esPunt(a)-esPunt(b)) || (esPunt(a) ? a.data.localeCompare(b.data) : sesA(a)[0].dia-sesA(b)[0].dia) || mins(sesA(a)[0].inici)-mins(sesA(b)[0].inici);
const lesMeves = a => !esResp() || S.simRol || (a.resp||[]).includes(S.user);
/* Coincidències en una data concreta: activitats periòdiques (si aquella sessió no està anul·lada), puntuals i reserves. */
function conflicteData(salaId, data, b0, b1, ignoreId){
  if(salaLliure(salaId)) return null;
  const a1=mins(b1), ov=(x0,x1)=> mins(x0)<a1 && mins(b0)<mins(x1);
  const p = D.activitats.find(a=>a.id!==ignoreId && a.sala===salaId && esPunt(a) && a.data===data && ov(a.inici,a.fi));
  if(p) return {tipus:"puntual", act:p, txt:"Coincideix amb l'activitat puntual «"+p.nom+"» ("+p.inici+"–"+p.fi+")."};
const a = D.activitats.find(a=>{ if(a.id===ignoreId||a.sala!==salaId||esPunt(a)||anulada(a,data)) return false; const x=sesDe(a,data); return x && ov(x.inici,x.fi); });
  if(a){ const x=sesDe(a,data); return {tipus:"periodica", act:a, txt:"Coincideix amb l'activitat «"+a.nom+"» de cada "+DIES7[x.dia].toLowerCase()+" ("+x.inici+"–"+x.fi+")."}; }
  const r = D.reserves.find(r=>r.sala===salaId && wd(data)===r.dia && ov(r.inici,r.fi));
  if(r) return {tipus:"reserva", txt:"Coincideix amb la reserva de "+r.entitat+" ("+r.inici+"–"+r.fi+")."};
  return null;
}
const DIES7 = ["Dilluns","Dimarts","Dimecres","Dijous","Divendres","Dissabte","Diumenge"];
const avuiIdx7 = () => (new Date().getDay()+6)%7;
let partCache=null, partVer=-1;
function participacio(){
  if(partCache && partVer===dataVer) return partCache;
  const m={}; const AV=isoAvui(), lim=addDays(AV,-30);
  const touch=(sid,d)=>{ const o=m[sid]||(m[sid]={last:null,n30:0}); if(!o.last||d>o.last) o.last=d; if(d>=lim) o.n30++; };
  Object.entries(D.assist).forEach(([k,arr])=>{ const d=k.split("|")[1]; arr.forEach(sid=>touch(sid,d)); });
  (D.apats.historic||[]).forEach(h=>h.servits.forEach(sid=>touch(sid,h.data)));
  Object.entries(D.arribades||{}).forEach(([k,arr])=>{ const d=k.split("|")[1]; arr.forEach(x=>touch(x.s,d)); });
  partCache=m; partVer=dataVer; return m;
}
function absApats(sid){ const lim=addDays(isoAvui(),-14); return (D.apats.historic||[]).filter(h=>h.data>=lim && h.absents.includes(sid)).length; }
function alertesDe(s){
  if(s.baixa) return [];
  const out=[], AV=isoAvui(), p=participacio()[s.id], ac=s.acollida||{completada:true};
  if(!ac.completada){
    if(!ac.entrevista) out.push({t:"Entrevista inicial pendent",c:"warn",k:"acollida"});
    else { const due=addDays(ac.entrevista,30), q=diesEntre(AV,due); if(q<=5) out.push({t: q<0?"Revisió dels 30 dies endarrerida":"Revisió dels 30 dies en "+q+" dies",c:q<0?"crit":"warn",k:"acollida"}); }
  }
  const nIns=activitatsDe(s.id).length;
  if(ac.completada && nIns && diesEntre(s.segDes&&s.segDes>s.alta?s.segDes:s.alta,AV)>30){ /* segDes: data des de la qual es compta l'assistència (persones importades) */ const last=p&&p.last; const dd=last?diesEntre(last,AV):null; if(dd===null||dd>21) out.push({t: dd===null?"No ha vingut a cap activitat":"Fa "+dd+" dies que no ve",c:"crit",k:"participacio"}); }
  const ab=absApats(s.id); if(ab>=2) out.push({t:ab+" absències als àpats en 14 dies",c:"crit",k:"apats"});
  return out;
}
const derivOberta = sid => D.derivacions.find(d=>d.soci===sid && d.estat!=="Tancada");
function estatPersona(s){
  if(s.baixa) return '<span class="chip">Baixa</span>';
  if(!can("seguiment","C")) return '<span class="chip good">Activa</span>';
  if(s.acollida && !s.acollida.completada) return '<span class="chip warn">En acollida</span>';
  const a=alertesDe(s); if(a.length) return '<span class="chip crit">'+esc(a[0].t)+'</span>';
  return '<span class="chip good">Activa</span>';
}
const fdata = s => new Date(s+"T12:00:00").toLocaleDateString("ca-ES",{day:"numeric",month:"short"});

/* ---------- Permisos ---------- */
const ROLS={supervisio:"Supervisió",direccio:"Coordinació",neteja:"Neteja",dinamitzador:"Dinamitzador/a",informador:"Informador/a",soci:"Persona usuària",ajuntament:"Ajuntament",tallerista:"Tallerista",voluntari:"Voluntari/ària"};
const ROLK=["supervisio","direccio","dinamitzador","informador","neteja","tallerista","voluntari","soci","ajuntament"];
// C consulta · E enregistra · M modifica · B esborra
const PERMS=[
  {g:"Persones",m:"persones",n:"Fitxa de la persona usuària",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"CE",soci:"C",ajuntament:""},nota:"Informador/a: alta bàsica i consulta de contacte. Persona usuària: només la seva fitxa. Dinamitzador/a fa baixes, no esborra."},
  {g:"Persones",m:"arribades",n:"Marcar l'arribada al casal",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"CEM",soci:"",ajuntament:""},nota:"Des de la pantalla d'inici. Si la persona té activitat avui, queda present a la llista."},
  {g:"Persones",m:"absencies",n:"Alertes de persones que fa dies que no vénen",p:{direccio:"C",dinamitzador:"C",informador:"C",soci:"",ajuntament:""},nota:"A la pantalla d'inici, amb el telèfon per trucar-les. Taronja: més de 7 dies. Vermell: més de 15 dies."},
  {g:"Persones",m:"seguiment",n:"Acollida, seguiments i derivacions",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"",soci:"",ajuntament:""},nota:"Dades sensibles: només l'equip tècnic."},
  {g:"Activitats",m:"activitats",n:"Programació d'activitats",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"C",soci:"C",ajuntament:""}},
  {g:"Activitats",m:"inscripcions",n:"Inscripcions i llista d'espera",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"CEM",soci:"CEM",ajuntament:""},nota:"Persona usuària: s'apunta i es desapunta ella mateixa."},
  {g:"Activitats",m:"llista",n:"Passar llista",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"CEM",soci:"",ajuntament:""}},
  {g:"Espais",m:"reserves",n:"Calendari i reserves de sales",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"CE",soci:"",ajuntament:""}},
  {g:"Espais",m:"espais",n:"Crear i editar espais",p:{direccio:"CEMB",dinamitzador:"C",informador:"C",soci:"",ajuntament:""}},
  {g:"Comandes",m:"comandes",n:"Demanar comandes de material",p:{direccio:"CEMB",dinamitzador:"CE",informador:"CE",neteja:"CE",soci:"",ajuntament:""},nota:"Neteja: només comandes de neteja. Informació i Animació: comandes de neteja i de bar-cafeteria. Coordinació i Supervisió: totes. Cadascú pot anul·lar la seva mentre està pendent."},
  {g:"Comandes",m:"aprovacio",n:"Aprovar o denegar comandes",p:{supervisio:"CM",direccio:"CM",dinamitzador:"",informador:"",soci:"",ajuntament:""},nota:"Les autoritza la Coordinació (també la Supervisió). En aprovar-la, s'envia per correu al proveïdor. Denegar demana el motiu."},
  {g:"Comandes",m:"proveidors",n:"Proveïdors i catàleg de productes",p:{direccio:"CEMB",dinamitzador:"C",informador:"C",soci:"",ajuntament:""},nota:"Coordinació dona d'alta proveïdors i productes, amb un preu orientatiu."},
  {g:"Serveis",m:"apats",n:"Àpats: comensals, arribada i pagament",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"CEM",soci:"CEM",ajuntament:""},nota:"Persona usuària: reserva i anul·la el seu dinar."},
  {g:"Serveis",m:"menu",n:"Àpats: menú",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"C",soci:"C",ajuntament:""}},
  {g:"Manteniment",m:"incidencies",n:"Incidències",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"CEM",soci:"",ajuntament:""}},
  {g:"Manteniment",m:"neteja",n:"Checklist de neteja",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"CEM",soci:"",ajuntament:""}},
  {g:"Manteniment",m:"inventari",n:"Inventari i revisions",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"C",soci:"",ajuntament:""}},
  {g:"Justificació",m:"informes",n:"Informes i indicadors",p:{direccio:"C",dinamitzador:"",informador:"",soci:"",ajuntament:"C"},nota:"Ajuntament: informes i llistats nominals. No veu seguiments ni dietes."},
  {g:"Justificació",m:"rebuts",n:"Rebuts d'activitats complementàries",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"CEM",soci:"",ajuntament:"C"}},
  {g:"Justificació",m:"mes",n:"Tancament mensual",p:{direccio:"CEM",dinamitzador:"",informador:"",soci:"",ajuntament:"C"},nota:"Mes tancat = bloquejat. Només Coordinació el reobre, amb motiu."},
  {g:"Equip",m:"equip",n:"Equip: usuaris i PIN d'accés al programa",p:{supervisio:"CEMB",direccio:"C",dinamitzador:"C",informador:"",soci:"",ajuntament:""},nota:"Només la Supervisió (Direcció General) dona d'alta i de baixa usuaris del programa i canvia els perfils i els PIN. Els fitxatges, les vacances i els permisos es gestionen a Kelio."},
  {g:"Sistema",m:"inici",n:"Tauler d'inici",p:{direccio:"C",dinamitzador:"C",informador:"C",soci:"",ajuntament:""}},
  {g:"Sistema",m:"config",n:"Rols, avisos i registre de canvis",p:{direccio:"CEMB",dinamitzador:"",informador:"",soci:"",ajuntament:""}}
];
PERMS.forEach(r=>{ if(r.p.supervisio===undefined) r.p.supervisio=r.p.direccio; ["neteja","tallerista","voluntari"].forEach(k=>{ if(r.p[k]===undefined) r.p[k]=""; }); });
// Talleristes i voluntariat: només les activitats que tenen assignades, la llista d'inscrits (només el nom) i passar llista.
["activitats","inscripcions"].forEach(m=>PERMS.find(r=>r.m===m).p.tallerista=PERMS.find(r=>r.m===m).p.voluntari="C");
PERMS.find(r=>r.m==="llista").p.tallerista=PERMS.find(r=>r.m==="llista").p.voluntari="CEM";
PERMS.find(r=>r.m==="activitats").nota="Talleristes i voluntariat: només les activitats que tenen assignades.";
PERMS.find(r=>r.m==="llista").nota="Talleristes i voluntariat: veuen el nom dels inscrits (sense telèfon ni altres dades) i passen llista de les seves activitats.";
/* Permisos editables per la Supervisió: els valors per defecte són els d'aquí dalt; els canvis es desen a D.config.permisos.
   No es poden tocar la columna de Supervisió ni la fila d'Equip (només la Supervisió gestiona usuaris). */
const PERMS_DEF=PERMS.map(r=>({m:r.m,p:{...r.p}}));
const permDef=(m,k)=>((PERMS_DEF.find(x=>x.m===m)||{p:{}}).p[k]||"");
const PERM_LOCK=(m,k)=> k==="supervisio" || k==="soci" || m==="equip" || m==="aprovacio";
/* On es desen els canvis (a la versió de proves, dins les dades; a producció, al servidor). */
const permOverrides = () => (typeof S!=="undefined"&&S._permUI)||{};
async function desarPermisos(canvis, motiu, fet){
  const {error}=await sb.rpc("desar_permisos",{p_canvis:canvis.map(([m,rol,v])=>({m,rol,v})),p_motiu:motiu});
  if(error){ toast("No s'han pogut desar els permisos: "+textError(error)); return fet(false); }
  await carregarPermisos(); fet(true); toast("Cada persona veurà els canvis la propera vegada que entri.");
}
async function restaurarPermisos(motiu, fet){
  const {error}=await sb.rpc("restaurar_permisos",{p_motiu:motiu});
  if(error){ toast("No s'han pogut restaurar els permisos: "+textError(error)); return fet(false); }
  await carregarPermisos(); fet(true);
}
function aplicaPermisos(){ const o=permOverrides(); PERMS.forEach(r=>{ const d=PERMS_DEF.find(x=>x.m===r.m); r.p={...d.p}; Object.entries(o[r.m]||{}).forEach(([k,v])=>{ if(!PERM_LOCK(r.m,k)) r.p[k]=v; }); }); }
aplicaPermisos();
const PM=Object.fromEntries(PERMS.map(r=>[r.m,r]));
const esCoord = () => S.rol==="direccio"||S.rol==="supervisio";
const CATS_ROL={neteja:["neteja"],informador:["neteja","alimentacio","farmaciola"],dinamitzador:["neteja","alimentacio","activitats","farmaciola"],tallerista:[],voluntari:[]};
const catsPermeses = () => CATS_ROL[S.rol] || Object.keys(CATS_C);
const PET_CAT={bar:"alimentacio",net:"neteja",far:"farmaciola",tal:"activitats"};
const can=(m,a)=>{ const r=PM[m]; return !!r && (r.p[S.rol]||"").includes(a); };
const ABAST={supervisio:"Els dos casals · tot el programa i els usuaris",neteja:"El seu casal · només comandes de neteja",direccio:"Els dos casals",dinamitzador:"El seu casal",informador:"El seu casal",soci:"Només les seves dades",ajuntament:"Els dos casals, només consulta",tallerista:"Només les seves activitats · passar llista",voluntari:"Només les seves activitats · passar llista"};
const NAVMOD={equip:"equip",inici:"inici",socis:"persones",seguiment:"seguiment",activitats:"activitats",sales:"reserves",comandes:"comandes",apats:"apats",manteniment:"incidencies",informes:"informes",config:"config"};
const RULES=[
  ["#nouSoci,[data-go='socis-nou']","persones","E","h"],["#edSoci","persones","M","h"],["#delSoci","persones","B","h"],["#baixaSoci","persones","M","h"],
  [".sens","seguiment","C","h"],["#fsSeg,#fsDer,[data-sg],[data-dv]","seguiment","E","h"],["#fsAco,[data-ac]","seguiment","M","h"],["[data-dvst]","seguiment","M","d"],
  ["#novaAct","activitats","E","h"],["#delAct","activitats","B","h"],
  ["#insSoci,[data-ins],.modal [data-s],.modal [data-a]","inscripcions","E","h"],["[data-baixa],.modal [data-b]","inscripcions","M","h"],["[data-pl]","llista","E","d"],
  ["#gestSales","espais","C","h"],["#novaSala","espais","E","h"],["[data-eds]","espais","M","h"],["#delSala","espais","B","h"],
  ["#novaRes","reserves","E","h"],["[data-delres]","reserves","M","h"],
  ["#novaComanda","comandes","E","h"],["#nouProv,#nouProdC","proveidors","E","h"],["[data-eprov],[data-eprod],#edAdr","proveidors","M","h"],
  ["#nouCom","apats","E","h"],["[data-vin],[data-pag],[data-anl]","apats","M","d"],["#edMenu","menu","M","h"],
  ["#novaInc,[data-reav]","incidencies","E","h"],["[data-ist]","incidencies","M","h"],["[data-delinc]","incidencies","B","h"],["#cfgAvis","config","M","h"],
  ["[data-nt]","neteja","E","d"],["#nouInv","inventari","E","h"],["[data-pvok]","inventari","M","h"],
  ["#rbPend","rebuts","C","h"],["[data-rbok]","rebuts","M","h"],["[data-tmes]","mes","E","h"],["[data-rmes]","mes","M","h"],
  ["#checkin","arribades","E","h"],["#nouTreb,#nouFix,#fesAdd","equip","E","h"],["[data-etreb],[data-fixed],[data-fixadd]","equip","M","h"],["#absencies","absencies","C","h"],
  ["#reset","config","B","h"]
];
function applyPerms(root){
  RULES.forEach(([sel,m,a,mode])=>{ if(can(m,a)) return; root.querySelectorAll(sel).forEach(el=>{ if(mode==="d"){ el.disabled=true; el.style.cursor="not-allowed"; el.title="El teu perfil només pot consultar"; } else el.hidden=true; }); });
}
const quiSoc = () => ME ? nomT(ME)+" · "+(ROLS[ME.rol]||ME.rol) : "";
function confirmMotiu(titol, text, boto, onOk){
  overlay(hdr(titol,"Cal indicar el motiu")+'<p style="margin:0">'+esc(text)+'</p><form class="form" id="fmo" novalidate><div class="field full"><label for="mo_t">Motiu</label><textarea id="mo_t" rows="2" placeholder="Ex.: registre duplicat"></textarea></div><p class="note full" style="margin:0">Quedarà anotat al registre de canvis amb la data i el perfil.</p><div class="full alert" id="moerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn danger" type="submit">'+esc(boto)+'</button></div></form>');
  $("#fmo").onsubmit=e=>{ e.preventDefault(); const m=$("#mo_t").value.trim(); if(m.length<4){ const er=$("#moerr"); er.textContent="Explica breument el motiu."; er.hidden=false; return; } closeOverlay(); onOk(m); };
}
/* ---------- UI comuna ---------- */
let toastT;
function toast(msg){ let t=$(".toast"); if(!t){ t=document.createElement("div"); t.className="toast"; t.setAttribute("role","status"); document.body.appendChild(t); } t.textContent=msg; t.hidden=false; clearTimeout(toastT); toastT=setTimeout(()=>t.hidden=true,2600); }
function closeOverlay(){ const o=$(".scrim"); if(o) o.remove(); }
function overlay(html, drawer){
  closeOverlay();
  const s=document.createElement("div"); s.className="scrim"+(drawer?" drawer-scrim":"");
  s.innerHTML = drawer ? '<aside class="drawer" role="dialog" aria-modal="true">'+html+'</aside>' : '<div class="modal" role="dialog" aria-modal="true">'+html+'</div>';
  s.addEventListener("click", e=>{ if(e.target===s || e.target.closest("[data-close]")) closeOverlay(); });
  document.body.appendChild(s); applyPerms(s);
  const f=s.querySelector("input:not([disabled]),select:not([disabled]),button:not(.x):not([hidden])"); if(f) f.focus();
  return s;
}
document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeOverlay(); });
const eixChip = e => '<span class="chip eix-'+e+'"><span class="dot"></span>'+EIX_C[e]+'</span>';
const quotaChip = q => q==="corrent" ? '<span class="chip good">Al corrent</span>' : '<span class="chip warn">Pendent</span>';
const hdr = (title, sub, extra) => '<div class="m-h"><div>'+(sub?'<div class="eyebrow">'+esc(sub)+'</div>':'')+'<h2>'+esc(title)+'</h2></div><div style="display:flex;gap:8px;align-items:center">'+(extra||'')+'<button class="x" data-close aria-label="Tancar">'+ICON.x+'</button></div></div>';

/* ---------- Shell ---------- */
const LOGO_AJT="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADDCAYAAADHn15dAAB8jUlEQVR42u1dd3gVxdc+Z3b3tlQIoYciVULHBgJJKIKg1CQqUsRC9Kc0KdJvrtKLgCKSgChiIwHpvaTQkU4SIIEA6b0nt+zunO+PJBCQYkE/gXueZ5+UO3fL7LzznjZnAOwCYWFhIgDA1d/OmHYt+Mp8+eTJ3gAAJ4OCpH/yukEjRkgAADuWfN0/aOhHm3LS0lpWvJ9/SoiIlf0Ugt8es3r1x1OXSjotAAAjIrSPCLsAAAAiQpjRKAIAJMZe+WT1u2Poo2qNlVXvjy1OuHatJwBA0D8EknJwHAr9te+iXq+ZpzR+jla+OzqpsLCwOQAAhZDwD4EDAQCJiIVMnRka2LYLzXyhB21d8OUKQSOBH4BgB4ldbmOOxMtxk797dzSNrN1M+aRFe3Vs/ZYU9M4oOfHalZf/iRm9HBz7vgvpv7CHH/+4QVv6pMkLtgkN2lLwO6PTyWr1BICb4P0HwIG/TPvs189a+9C4Rs/axjdoZ5vVvgdtnr9sJdNIAHaQ3BT2pD54SEiI4OPjoyRevTpp34KvZp/esUdxqOTCSOVM0uv5pf0R4raZX26+Fn3pZR8fHyUkJOShzOghfn5CQHCwHPFzaN/Tv4SuT4mLA1Gn4ZwxCTWiGht+sGrwhxP3F1oLm/uYTA/tukSEiAhEhOsmf7r+8vb9/fOKimSmkSRBq5Vy0rOUqF+3vbtp9sJgUatREREJAO0AeQKFiJi/v79641LspANzl805vWO3oqtcSVBVXjYgkIkOBh63L1zcu+TrTTdu3HjJ399fLdfd//J1jUbmvz5UPbphU5/ja0I3pMdeAVFvICBigCoAMkGQNOqVsEPVfvpg2j4LUTN/f3/VaDSyvwuOUH9/RkTiz9NmhV7eEzagoKhYFrWSxDgHFTgIeq2Yk5kuX9iw471fZ30epDHoORiNiPhkYwSfQHAIiKgmXIh5N+KLVSuPbd8hO7lVlriq3tkOkDEuFxZTky5ezGdcQJsmLVqcIyKGiPyvgANNJr5hwVfPxu7adyTz2nUm6rUAdwUdqqrFKnh0eLbglQUTGzWs0TCTgAAB6a88s5+fnxAaGqp+/dGE1RmRJ4YXmYtllCQJ4PbHQIYgm602t2rVNPW6dlz05mfTxhu9jKIpwqTYGeQJwggAoFlWrhfLVrNWp5NUVf3dgGeIwLlKkkEvENBV0Yq5ZXr5XxqkoZ6eCADQpGNbrUfTRiK3yBzg99MzIgJXODkYHEGv013IKuQWIxgR/8Zc5ufnBwAAjVo1d3au6gY2qwUEZHeZPIAAQJA0WpAQLwIAeFaNIXiC5YnkT6PRyEwmE09LSuq2ddbibRd37tOKBj0HAAbEAZEB51xlnIQGXTtfeW/5Qh9ETCrT4//ygCEihoLAc7Mz3t5u+vyb30I3q9pKzgxUQgAGgBy4osoGSZIadfeOGLx41suIaH4I18Wyd+14bvf+Lbtnf+GVev2arHV1kkhWSudJhqRYzLxa/frCs2/4BnR5583gctZ7kgEiPokPbTKZeFhYmFi9du19SUlJryDA1uhd+3WiTsuRMcZVVRU4Cg26dLz65vKFXRExKSQkREBE9W/NRog8JCREqFSpyurcjFRkBKuOrt+oGlxdGHBALiuKTqeT6vu8GDF48axeiGgmo/EvqXR3XJeICBCxgIh6CYg7ds7+wiv52jVF5+wociLiZjOvXree0MKv7/s+bw/62W/XJgECAzmYTHZX1pMq5YHAtLS0bqs+GGceV781jWvyrHVik+fomw8mXCGiOuUer3/iuhlpae/+OGoSjardTBnX+BnrjOYd6buPPgknIn050z1s50TZT/2Z3fvDF3j1ozF1WlnHNmqjzu/an/YEffduWVPBPjqeYAYpl60pKerSkSO11atX35cQH98POGxOiDii9ejS/uqgr+Z3R8SEEKNRE+3vr/iB30MbNPP27eM7Ri7VVq1efVVmSorAmLDi0u4DwlPdOx8c+vmsVxHRGmY0iuEmE3+Y1w1EpDBjmIiIViLqw4C275uzrKOFy9Cif6/3Xwp4a9XSniO1NZzSlOhmzZjpCVev7HKHJZadnt4hcvl3vxCR679z3dILFyanvRm2/Ns1BmfHf/WxHSu7wpXdEWuOrt801T4I7Eb6bbJ05Ejt8ajLzaWsEpABQNSgkHH5RhHWrqZQTpauek0PrU3lD5hB5Zu/Sff99G4tZJBAAtQydvn86cIatRuqqFodXSpXEiyKSqXtZZAkCeSyE0kSgCz//uetq0l3+UyucO3y32XQiTrMT89QMwsLilw9akmuwBxREFWUFRINeuz8Rq+coRMmXCsbI0+sJ+uJU7HKPVhHEhPrVi+QT2pVBThDACtA9foeAEBA1WoAKKUj7/4jg913prn9u+rvvougAlk4VG3aCpATcDQAyAQErKw9A7RxoLIzoQ2BgH7389a9qHf5jFW4doXzyjao4lYJGrpVBk5UerekAmcEDhzAATTrAOB1o5eXYIqIUOwAecJElmVCWSbG1dIQXNkgLvWH3hp4+Afolu4Jn/sTdOnwJSBeFpwpuwre0epu93C3n3SPz27/LpadlSrcw63vCpwUgXNRYMxmV7CecCMdADiUhwgIgLDiYMdbo7hs9NHdRh3d8b8KaKEHhi7w1vCn20cy3gmPCvdxN6WH4C5IuePP0vuvACMqv8/b0MU5EecEZIfHEwwQRVGYJAiChgnAAYExBGQMOOeltvPdpuOKAKIy3rkDMBVB9uDodwV2wDsHO96E0N1ogfA+BiQC8DIk4e/wW4FH8HYkERAoRIJWEACQDHZ4PIkAKYt7NaxRo6QwJ+F4EarAUABVlWVbiaVA7+Cgr+hhAizNywIAIIWrICBjyMrGfsXBy4CI3zaI8YG5jRyoLB+qFGz4e3OFVRzc/Bb08BazEPB7eMjK21T4nDNAxsquXQoXTioRZygIzEDEFQW5KHM1GgDAs2pVe6qJXQCIqOr5iIO+QW8FbJdcnBEsFWYRrQYVq43av/5q9bSrSUXXfjtTBDqAim1uE13ZT4vlD1xZd5f/WR7w+d+RCufW6UC22ahF2+cc6nZoL/b68K3z9pFgB8gtjxYAqzkiSEgJDlDfiY/vtHf6vPCoI8dIo9djOWtABaNdEiXgnIPK1cdoYgDuIGlYsQDhhrMHu6a2GyHUOBWsBpYmgD3xdsgTbaSbAHhIt0oYEAx8hFarWovNoEURtYIExH8/NkjlwBBBYtJj0wcciEnIwGq1SAsAuN+pXAwG4Ca0Kxd2LxYA+Pn5lSvol6yqOsiqclJlBe9nWD9WwgQgRYW6HTvQtZhdrvWxUj4QIdjZwy52sYvdBvnjRjoGensLEAEAXk/e88dEVKVQCFXtI8EudrGLXR4p9jIaWYifn30Nhl3scqdUXBT1sBdI2cUuj7SE+JWuVNwbEtJi+6o1zwCUViCx94xdnngpL2macO1az2Vvvm+b1/s1Orl3/yCAW5UX7WKXJxoc1+Liega9Pco2/qm2/ON6rZTP+wyi43v3DgJ4+GVH7WKXR0LK6/zGx8X1WPHOSOu4+m1oXONn+fjGz9HHT7VWF/UZTKf2Rb5uZ5L/htiNwn8THMYw0cfHR7kRH//S3nnLNl8JOySpANypqjt39ahpJpUwNSpaDf8y6Off9oe9ERAcLIcYjRq0p338v4ndIPwX1Srf8b5K8o34l3bOXLLlcvghjUpElWrWYN1Gv2et+2zr/IK0LKfslBSwZOdQzrUE35nLv4h96e3h5/wAhBiwL2CyM8hjDI6AgAA5OT7+pa2fLdlyOeKQhjiRS9WqrMeED+HY96H6nbO+qP7c4AFQp01LZrXJkBxzicIXr/zpXOSh9zZqNWqY0SjamcTOII+lzeHr66vEx8a+tGPOki3xYUe0CnFyqebO+syYAIe+/QlunDoHnFRKOHUeO78/BAozcrAwJQ0KsrLIkpHdZ/aypQnPDx1yOigoSNq2bZu9VpUdII8POHx8fJT42JiXds9dtvVqxBGtDCqv5F6dvTL9Y9i3bBW/cfIcOrpXAoGJaCkshMQz0eDz4duQl5aJ+anpkJ+UoqTFXu03Z8VXl1/1G3g+aMQIadupU3aQ2AHyeIDjRmxs9z3zlm+NiziiVTnxSlWrsl7Tx8LexSu5XFzMKjWopxakpDMmAAhaDVgLC+D6qQvg/f4QyM/MxrzUdFaSlwfZ8Um+c77+8tKro0aeDxoRJG07ZWcSuw3yCNscPj4+SlrSjW475i/bEhd2WKNylbtUq8JeMY6HfV98I0NJCXv5s0/mZadn7HbQaoADqKSqoDHooSQ7B/YuCIL2g3yhVktPVK02TI6OprAlQb+c2HvgtYDgADloRJDdBWwHyKNrkN+4caPbpsBFW+PDjmhlUsi1alX26vQJsHdJkKIWFEpeEz4Ieq5H10lKYZGAjN30UXGVg85BD0W5WbDn86/hhcF+ULNVC1StMqZHX+IHv/rml7M3QWKPk9gB8giCI+nG1W67Pl20NS7ssE7mKlWqWo29MmMs7FmyQlYKisSuk0Z93cmv//ugcGR6jUB3OHBVroLWQQ/F2VmwZ9FyaD/EF2q08kSLLGPqhYt8/5erfzm5P9w/IDjYziR2gDxi4Lh6tdvWTxdviw0/pOOcl6pVM8bB3qWrZCoqkrpM/mjFiwP7/M9XbaoBACKV7hrf4CoHrYMBzNnZsHv+V9BhsC/UadEcFZsNU2JieOQXK385E37Qz84kdoA8EgZ5QECAfPXq5W5b5y7dGh92VKsS587uVdir0ybC3qUrZaWgSPKeOHJFx4H9P+jcsaPYzMvvgUY2V1XQOjhAcW4O7FkUBM8P9oOaLZujbJMxJSqG9i9ese7M/oN+pUxiB4kdIP9FcBiNoo+Pj5KamNhl76wvt1w5cFhnI5W7uldjr8z4GHYvXSHzwiKp65RRX3fy6/+Br9JfCA8PV2Mi/tjefypXytStTNi9aBm8MNQXarb0RKssY1rURTrwxYp1J/fv97OrW3aA/CeZw8dkUlKvX++yOXD+trjII3rOOa9UrSrrE1jqraKCIsl70kcrXhzQ938DFUUIoRD+Z+tN3VK3cmHvgq/hxSH+ULdlC5RtNkiJvkgHF69ad37/fru6ZQfIf8vm8PHxUa5fudJ106xF266GHdWrnLhzVTf26rRxsHtJkKwWFEnen3wU9OKAvh/4KooQQvQAcCAAgUqcFM5JoQqHKiuKpNcrhdlZyu6Fy9Xnh70GNVo2ZzZZgeRLl2nfklUhJ/eE29UtO0D+Owb59StXuu6as3Rb/IEjehvJ3MXdnb06fTzs+mKFzPMLpS6TPgru5N/vfT9VvTc4ysv7IgNV4aBhgmDQakUHrU40aLWi4eZPraiTBLFSpUqikpMjbPl0Ae807DXwaO7JbDYbpsbE8vDlwet+27fPNyA4WLavJ3k4Yu/Ev6JW+fjI169c6bJj9pJtVyOP6Dgn7lq1GutjHAd7lq6SoaBY8p46Mqhj/37v+yoD7q9WIQAggmKxgVud2tDQq/3mkry87NLq07d7uBhjSETkXM29ctLxc/1+nTFH7TdzinDsG8LE6GhIi7pEh79Yve5sRIR/ay+vDUEjRkgBwcGy/a3Z5V8DBwBAamKiz4p3R5aMf6odjanfRp3xXFf6bdsumtPT3/bZCy/R0a1bV6Akgh+AULZH+e+kfHPOsS077pnRvCONrttSXjZgGBHRUw+e1gRIiI2dtfKNd+njxs/Ikes30dzer9PIOi35+IZt1cV9BqsXDhwaWM529jdnZ5B/y+aQU1NTvbdMn7MtPuyoXgaVu1atyl6ZOgb2LP1axkKL1HXSqOAX+/d7/4/ZHBWZBIGrCqQmpFY2enkleHp7s+jw8N+5gms2aYKnTp2COo0bT828ch1h2szJm6bMUvrPnCIc/u4XTI2KoeToi7B3yfKQCwci/Ft0sTOJXf4FcAAAJCYm+gS9PbJ4fMN2NLp+azXwhR50cttOmv2Srzy7fQ86sm1bEIr3Z457Mki9VvIX/QZTbm5uG4Bbe5rfTYgIy22MlPj42SsHBdDYJs/Kh9Zvovm9XqeRdVqo4xq0VRe/Ooif3XuglEnshrudQf5JmyPxWpzPdtP87VcijugVzrmLexX2yrSxsG/ZalnNL5C6Thm18sV+fQN8FfXPMcdfEEQkIlLDAMSaTz01JeXKFYCpcyZvnDJL7jd7qgSrf2GJUdGUdPES7F+2OvTE3r1+z3XvviFoRJAUEBxgZxI7QB4qOJTEuDifrbO+2HHtwFGdTCp3qerO+k6fALu/XCHzvCKp65RRKzsO7Dfi3wDHXUHSsOGUjNgroE6fM3nz1Dlyv1mTpUPf/Ixp0TGUEh1Dh75YHXJhf7hfi67ev9rVLTtAHi44EhO9d5oWbosPO6KzgcoruVdlfY3jYfeSYJkKSiSfqaNWdvTtP2Lgn7U5HiJIjABi1cYNpyRdiYcdU2dP3jBlpjJg9jTxyOqfMTkqhlJjYmH/kqDQ8+EHfVt6d9poZxI7QP4eOMrSR1JSEry2Tl+wPS7isEHlnFdyd2d9jeNg99JVspJfKHWdMnJlp4H9RwyU5b8Ojtu2p/3rIPEGEGs3fGpK2tV4FKbNnbRxykyl76yp4rFvf2FJUTE88eJl2Pd50Poz+8J923TztoPEDpC/4a0KCJBTEhK8Ns1YsON62BGDQpw7V3VjfY0TYc+XwbKSlyd1mzJ61Yu+fxMc5bj4m5xTUd2q3uCpyRlXr6E6eeYnW6bNUfrNnCIeWf0zS4uK4ckx0RC+dMX6C3v2+7V4qatd3bID5K8Z5CkpCV6bpy/YcS38iMEGCnep4s76zfgE9nwRLCu5BVKXqaO+6TCw33u+8sNRqx6GTlYRJFUb1J+Ucu0GwJSZn/w6babiO2u6eGj1TywpKoZSYq7A3mWr1p/ZFz7QziR2gPxx5hhRGudISYj32jp94Y74yKMGmTh3da/Gek0ZCXu+CJblvDyp2+RR33Qc2P/dhwWOv65cPcBwr193Utq1a8Amz/pk/dSZ8sCZU6VDq3/C5JiLlBJzGcK+WLX+fFjkwJY+nTeFGY2ij8mk2EeBHSD3ZY74+HivTZ8u2XEt/IhB5ip3dndjfWaMgz3LVsk8L0/qMnXUNx0HDnh3wEMER0X6IABQFIWF+PkJp4KDWYif35/Gjr+/PzRr1gyWjhyprV6//qTU2CsCGeeN/3XaHN535iR2dPXPWKpuxeCBz1esvxRxaGBTr46b7eqWXe5pkAMApKQkdP763ZFFExs8Q6Prt1anP9uVzmzfR7N7+tpmvtCDjm7ZuoppJPADvwcGAf+I3C1Q+GX/IURETR72M2alpU1bPmCoOqH5i2rkL7/S3J5+NKpuKz6+QTv18z5vKtERx/qW21/2EfHPsPujzBxKRkZyp41T5u28EnbYwcZV7upelfWeNgr2f/VdaVbu5DGrX/Tr885Am/zQmMMP/IRQCFXHtuy4x5FD96LiIqX2003F5oP6Dr90/EwsCgKSqhLALc1HVgAk8e6kLyvKHZ8pACACEgnEhJIXe3ebt3/eV11zsnN4rykfsaNrQiEl+iLXSBqs6fk07zbmHd+WPj6b7ExiB8ht4EhJSOi85dOFO66EH3FQVc4dq1RifY0TYN9XqxUlO0fsOm3M6hcH9n/nb3ur7gcQlbqbuawyZILe0RkY0v0N9/JEXyxzgdFtdshNha08FxiJoMhq4RqthpWk54BjNXfo9nEAHPs2BFIuXuSiRkKPp5tSl9HvDWzZzQ6SJ94GKQdHQnx8582fLdgRH3bUQeUKd6zixnpPGQv7vvpGlnMKpO5Tx3zbYWC/dwbK/3wQkBECIEFxXg6nijV46Y7pjO4xvd3vzpBAAMasFhtonRyhKCsT9nweBD3Gvg9Hvv+FJUdf5kkXL+G+L79Zfy7i2MBWXi9sthvuZe/lSQXHjRs3Om2fuXhnfNhRBxuXuXPVqqzP9HGw/+vVsppTIHWdNPLbF/36v/1vgAOQoNyqYZLIBJHdOqQKx93+Fu7y/zsPQWAgMmACAuc20DrooSQrE/YuWQEvDPWDWp5Nmc1mo5SoGHZg8bL1Fw8d6uNjMin2BMcnDCDl4EhPTu6487OFO+MjjxgUzrlLFXfWe9oY2Pf1GhnzCyWvKR992+n1AW8PsMn/QvoI3j77U5nK9EcP+KNt6Ob1uMpBazBAcXoW7F8cDB2GvQa1nn6a2WSZkqNihL0Lvt4QFX6oj70QxBMEkPLNa9KTkztuNs7feTX8qIOqcm5wdWavTBsLB5Z/Kys5uVLXKaO+9fIb8PYAq+1fyq2i/xdTkHMVNI4GKMrKgj2fB0H74a9DTc+mzGpTKSH6orBn8YoN58IP9XnSy5w+EQAJCgqSfEw+SnryjY6bZszbGRtxxFFVFe5c1Z31D/wE9i3/RlFzCqSun4z8roPfgLen2WT2byce/n8I53JpSaGsDNjz+dfQfpg/1GrWmMk2mVKiYoT9i1f8GrU/vM+TXC3lsQdIeVG39OQbHTcZF+2MizjsqCoKd3BzY70mj4L9K76TeW6B6D31w+86vj5guGqThUAietzBcae6VZKRDfs+D4YOb70ONZ9uymyyTClRMWzf0pW/ng0Pf/VJVbfY4w4OHx8fJfnGjY4bjQt3XYk44qiqnDu5V2J9jBNg39drZGtWjtR18qg1nX19hw+0yQI9mDkwJCRECAkJeSgBw/8Gk3DQOBmgKCsD9iwOLlW3mj3NrLJKSTEXWdjib369cPDIq08ik7DHHRzpyckvbvt00c4r4UcdVEXhjlUqs96Tx8K+5d/IlJsrdf3kwzWdXvd9a4Dt/jYHEaGxNOpO/v7+qr+/v1rWFo1eRvEvg+U/wVMEXFVA62CAosx02PP5Cugw/Ja6lRwdLexf9NWvMZGHX3nS6m49lgApX8+RnZ7eYZNx3s64yCOOKi9Vq16dNhbCg76X1cxcqdPkD9d4DfJ/q/8fMMgRkUwmk0JEmBR3vcPu1T91uZab68q0GjJFmJS/le7+X2ESlYPOYICSjEzYuzgYOgx/A2o83ZRZZZmSLlxiexZ9tfEmSJ6QtJTHLpJ+kznS0ztsnDZ715Xww06qonJn98qs5yejIHLVT7I1J0fqOmnkms6v+b41zWZj97M5Sj9CClu7oXZhasqYlLirr5SkpjexFBZCiSynu9Wrc77pc89EO9astLiTv39CefsH3eedkXQLV1TE/8aOX0wQwFJcAg7u7vDS2BFw5Lt1kHIxjmslEWt7eqpdxwX0b9H5xW1PQsRdeDzBkdRh49S5u65EHHXiisodq7iy3pPHQPjKtTLPzpF8Jo38vvPrfg8EBwAAhIeLETdu8Kckw+CCk+dnJpy/UCU/I4vMRcUcLTanoqTkBiXJaS/kWGzXt584fBwAxIiIiAdWbvcETxYDMdS+Wp0hGoIGCnFCBgwA1LKgRelBFSIa+ICIB93xN/6piMrNg3NOGq2GzHl5lHIhlnw+fJvlJqZgYXo6FeVks8y4a68tXPHV6V6jPrr0uO+Z+NioWOVxjqTr1ztsnDpv15XwI06qYuNOVdzYyxNHwf6g72UlO1/ynjxqrdcbfsNUm+02bxVVML7vxqyqTZWLC0sUptXbJIMeJY0kqAIQF5m1uLBE4Yoi3419/rAxjwCkcBAABS2TBA2TBC2TBK1Q4WAPOMQKxx9pf49DJ0iCCCg4O7kK5vR0YdusJfzFtweBe9MmzCorlBody/YvDdp4/vCx3qVlTsMe25Ql8XFijuvXr3fY9tnnu+MijziSyrlTlSqs56SPIHLVT7KaWyD5TPpwbec3/IbeaXOEhIQI6O+vgr+/Wn5Oo5eXaIqIuJmLhExFFEAEUhQgVh7eQ04koAAiv2MTcy8vLxERlVJGAPADEPz8/MA/NFT9HTKQQDXLVK1BPXBt2GBM7IGD8aiRGNlk/uffZplSoKh/b+aURMFitao9Rr/XI/X42Q83GucoA2ZOEQ+t/JGlXrrME6MuCgcWLN8YffRoP8/27Xc8rrlb4uPCHGlJSe03By7YeTWiFBwOVVxZz4kjIWLlj7KanS11mzx2bac3fIfezSD39/dXiQgzExM75WfnCw1bN48sG9y3kS39AZdTzdSaCABw8OgRhYjqHA07WN/Tp1OUC8Ps0NDQuxk5gIigcg46ZycYsXz+dkS88l/p3+WTT2/NiIq1wdTPxm6aOlfuN3OSdGjlDyzt8mWeHBUl7p375abo8EP9PL077ngcbZJHGiAUFiaij4+SlZX2wvpJc3ZdjTjirKgKd3JzY70mjYbwVT/ItqxcqduU0Ws7DfIdqlit7E7m8Pf3VyN/Xj8kdPKnU1MuxTWRSywguDheXfXJjK3vzDUZAwMDiyAiomyuf7CmlFIjRSVKd1w1dqlpfr9BfdX8kgb7TPPTv/R7e2+jbt57e7w3ZG1gYCDGmGJuuUkIAJCAKzIkXL3qavTyEu9VevTfEs+IqhTtlYHhERHg1rDex6nXE5AmmsZsnD5b7v/ZFCly1Q8s/VIsT466LO5Z8vWm6ENH+3l2bP/YgeSRBUhQUJCEPj5yVlbaCxsmzdl9JeKws6oo3LlKFfbypJEQvuoHRcnOk7pO+uiHzm/4DVWsNkZ3GOTRX32FAACXj/42IGlvZJN8c7GNiUyQODYoTM8cs2z+/AUmk6ngJiDvxyC8dCybTCZuS8p1wAvRH6u5eaASV4EJ1YS8wsEXJHTtOWLo90YvLwGg6q2TEQAQAgMEvbOzaoqIUCg8nPkj/v8avxGldlRgYKBYo16dselxVxGnzB69cfocecBnk6XIm0xySdy7cPmm6EOH+nl2fLyY5JEESPka8qSkpPYbPpmz60rkYWeuqKqjWyWh58QPIXLVj7KalSX5fDLyR69B/kMU2+/BcRsTcchHjcQ1qGfAkIHCudVmKzHfNkD5H2KQ0qbEZVXOZ5LoxBAZEMpWriKzyfmPWl+XF4IAALFaowZj0q9dA5g0a/Sm6fPkPjMnSoeDf2Rply7z5Khocd+CrzefP3Sob8uOHXc8LtVSxEcUHEratWvtNwbO23018piToircuUplodcnY+DAqrWympMvdZ0y5ofOr/sNmfpHXLlEAhExIuJIAEDEAFE0/J2BBShCaQFqKvViCSII7JF0q98ESTiI1Z6qPyYp/jrwiabRW6bPlfvNnCJFBK9laZdieXLUJeHAwhUbLx080a9pp+d2Pg5Mwh5JcKQlvrB51pJdVyOOOnFF5s6Vq7CeE0dC+Mo1Ms/Jk7pM+uhHrzf8hky1WtlfSTykP2hvPDRbCv77EVtEpMDwQDXEN0SoXb/eGN+5xqVNPD2ljdPmyF7vDoYaTRszs2KjpKiL0q5FyzZdOnK85+OQ4PjIAKQ8fSQvL+u5LdMW7oqLOOysKmpZbtVIOLT6F5nn5ks+k/73o/cgv8Gy5a+B49/3NDw66QyISH4hftzoZRTdGtQb03vO1C8aez4t/TpjjtLpvSFQs0ljZpNtlHwhStozb9nmS0eO9AwIDnik01IeCRWrvBxoVlbW8z+PN+2+Gn7UReEKd3KrzHpPGgth3/wg27JypO5TRv3Y6Q3/wYrFel+b4y76EAEBISHdjEcj0e81MbrVpmzmB0Iq/YDf0b60Xen6QCQiICRG92KQiov/HgV1yzPUU6jZqMHoxKtXkT6ZOXLztNlyn88mSQdX/sDSL8fxxOgYadf8rzdHhx/t5+nd/pFVt/7zDFK+niM1NfX5DZM+23014pgLVxXV2c2NvTJlDIStXCMrGdlSl0mjfur0uu9gxWL5c+AAABRQEhkgIkoCCExEhhxAK4kiEhESESIwQWACIjJJRAEFZCgyVvodxpBxFMvb2rQycgStgAwFZAwRJIkBInHpbugELM8KeYSYxM+Ph3kZRY+GDUa9tsD0RZMWntLmGfNkr3cHQ/UmjZhFtlFyVIxmz5KvNkcdOdLzUU1w/E8zSLlalZqa+vym6XP2xEccceaqqjq4VRJe/uQjCF/5k6xk50rekz762edN3zfv5sr9Q1oOh5wSm5phUxSVGDBQOGpVtF6+dEkuP9fkngMLmVXJsNmsKrBSY7s0cUlVzTZZkGxyQXnb3i06yk1RTLbYbAZiSMiBm1UQNMBy7sYfCFhWwufRM9yNgSBWeqru6JQrV5AmzR75a+A8pd+nk8TDQWtZSmwsT426KO6f//Xmi8eP93n6+ed326ulPCzVvCx/KTUj1W/52yNzJjZ+hsbWb61MbdeVjoVupnkvv6Z8+lx3OrRh00+SXgfwB7Y9u5dkEjkRkXtBhYNKDwMR6csOZ7r1/7sdzhXaGoioSsEdbWJjY53Lr3mrsmKnPTOav0hj6rWSF/cdREmxsW1uUcujIX5l+S0JcXFLVwwYRuObvqAcDPmVZvcYSKPrtVYnPNWaLxkwxBJ/8uRLAABkND4ytu9/kkGMpR1IVy9cenbLtHnB8eGHXUlA7lKtmtBj7Adw6Md1vCQ9S3hp8qh1PoNfGySbLcxoNP5p5jAajaLJZFJOr1ozK+t0zMASW4nCEcUKriUBkZUBlhMA8ntZCkiAwBgj4sBVDgioAgMgDiAwUAwanVizQ9vNAPA/o9Eoxphi6NZ1SsPpgiBArUaNQDLowVZcghqDgf5aIaw/zAP3sIge1Ob29iElZg4AgmTQjy5KScVvR3w8ctvcL3iPCf9jR4N/YplJCTzxTJRm+5yvtsTsO/gqdO24L8TTU/CvkPtmB8ifYQ5EgsBA4UTIxu2Xdh1w1Ts6ylabTeo28t20C/vCdQlHTroMWGQ69OIg39e9ZFkMJ1L/krcqPBwAALITktwvHYisWWyzgICs4r1U1Cl+Nzzx9/dern6U/V3aRiUODhot6GpVd7913aq3bHlOIEhazEpOhWXDPtw8/5XXbUteewfmv/rGXc9bnp1y8/+31J4yxwHdrrIR3UtPulv/V3guvD8+CIATh8X+wwkAccGrg/DrDybYHNycoTgylR39NgRenT4Wfhg5mTGJq1eP/aYFR8POp7t2rOLv75//R9fO2AHye92WAYDaqnunOcU3kj4/HxaBGgcDRXz/S5X2gwZi0vloOrz659Zndu4LaNPNKyg8MFCEikVs/6RITJQFvZYkARXAB/YJIaEKVFbsjaEAD1DtGIEiihpRI0ryPWYFYJIAJXn5kHDkmAdjj1J4Cm8VfCQEZADmwmJwdHeHDm/0g6Nr14MqyyDbbFS7+dPQuNPzcwGgKMQvhCGinUH+Iki40WhkJpNp8Y0z54gYLo46EKFmX4oTT67fCt3Hvk+7Zi113LvgyxVnDhyENl06Bf0dNyIRR845clIR728tk2JVmEErMRQYECcoMVtB1EoEcG+QlDqBORJxvKeqQwSCyIBEgT9q5VRuLqhhDBSbAtrKruzVyaPhUuQRuLB3P2hFSanZuJH4zNuvz/R+w286vTsU/R8Nr/Z/14tlMpl40IgRUt02rZZcOxeDDNnn58LClZTzMcJhZR32NI6lnYEL+d65S1b8ti8Cnu3m9bdA8mBNGwgVwkp1PahO86Y7qjZpZEmNuqhNu3y1V0FKCuPsLwbE6U5NiB69RWwEwBgDm8UKokYHr0waDTFhB+HCrv2g1eiVag2fEtsO9Zvl/frA6cbOXiKrsM7GDpC/IQHBwfLJESOk+q2aLb52LgqAq5+fDz+kpMdcEg6u+gl7zBjPdn26UA2bv2zFqX0R0O7vgOQ+QxsJOCkq83jumbR+M8b282j29HFQS63vhN/OPRv62cL1aReiPFBzPyYh4H8Fmf9x9aqUOQBUmw1EQYKXJ30EcRHH4OyufaDTaJXqDeuLzwz1m+0zxH+asbOXGBgerpoeIZf2f362eqYsn6d+q+aLu338wcctfDqLRKBmXrxMR7/9GXtNH8dyU1LUffO/WHHmwOERpUtAjeKf6wR2X8JXFJncatRUOgx5bbhHkybHjU2aavz8/ATjgIGaOm1b/NZpqP/HVerUQdUq83uNeESER8u2+APwIAJkCKpNBRA18Or0jyH+4HE4s3Mn6DVapXqjhmK74a/N8RnsP7UcHI9aQb5H4o0FBAfIYWFhYt1WzRd3HRvwcXMfL5EQ1fSYS3Tou1/w5RnjWH5Kmrp33uKgM2GH3vuzlckfsOiCRBQERSdlte3hvZ+MRhYYEyOHhoaqgSEhMhmNrHG/XgcswDOZIAj3CokTEXD+GNU2KLM5VJsNUBCh74zxEHvoGJzdsQd0Wge5esOGYtvhr83uMshvitHLS/w0MlJ5FKtVPjJTmo+PjxJmNIr1WzVf3H1cwLgWnTuKHEHNiLlER75bhy8bx7PcpFR175wlwSfDIt/7U5mkxO+t6pS5TjkjBAAJTSZekRXQZOITT50qslktNob38agCPj4lZAgBBQayzQYC00DvKaMgZl8EnN62G3Q6rVy1QT3pmWGvz+k6yO8mcxA9mpVcHynOL2eGui2bf+495r3xLby8RADg6dEX6dDqn/HlGeNZbmqqun/OkuAzYZHv/eFSmffbq/zmLk13mtS35I127QRkDO8/4d5jPeIjOG6QAagWBUDUwCvGjyH+4Am4sHsfGDQauepTDaRnhr82x3uI7xRjp86PpFr1yAKk3HAPGjFCatC29SKfcQHjPb29BAJQ0y9epqNrfsaXp5eqW3vmLg0+s7+USUY8jFKZ9zEszX9nmD9CRjoSAWMMFJsMIInQd+pYuBR2GE7v3AWSVq9UbdRQajPcf26XQf6PBTgeSYDcAkmQ1KBl80VdR783vrlXRxEA1PToS3T4u1+wp3ECy0tMU/fO/zL45P7I94IfWE+WPYBd/v47xn91CdY/AQ4EYALIVhsITIJ+0z+Gi2EH4dzOvaDT6JTqDeqLzw7zm9vtzdcme3V+PMDxyAKk3HAPCgqS6rdtueiliSPHe3p1FjmAmhF9iQ5/+zO+bCz1bh2Y/0Xw6bBD796/6PI/bzzTHykahAjIGP3HjltqlU0BJmjgVePHEBt+BC7s3g96rUap1qCB2O6t1+d5v/naZGPnzmL4YwIOgEe87E/A++/LYUajWKf504viTp9FBFoQFR6pZERfEo6sWYcvTx/PdpkWqHvnLll5NuIItfbq8M1d4ySCAMAEYij8fmEGIiFjwFC47wtnTLg1qO5gHAZAyASCB7h5uaKCarUiA3YrmnJHPlgFt9hd1LR7fX6v0Mzd2lCF+0ZQFBV0zo6gyDKAIEKfGeMgNuIonNmxC/QaB9m9fh2p7XDfeV0H+00yPkbM8VgABIjAx2RSwoxGsVHb1gvjT58FJFpwPvKQmh4Vww59+xP2DBzPdhkXqbtmLVp1cl8YPtPNZ1VFkBAR/jJjlqiWlKBVliUB2e0IQUCUbSCbLZo0AFaWf4gEAIEAGAgAoYmJzGq2aLjZjKog4J2xQk4kCbICXFVEIsJAb++7gIODQyVXqNemZYGqKOofCe1X9KaVs9TvPsc/dg6ogA8s/ZtxTkVMEqtfjjwsEAgwwDgBLkUcgjPbdoNer1fcPGpLrd7oO6/r4DcmPS42x+MFkDu8W0+1bb3w+rkLSMjmR4VHKJkxl4Uj367DnoHj2A7TQnX/vGUrTx84SG27dPomaMQIqXGNGoSItH1pUEbDF57JKrCaFaQ7+gQZCQSIlZyTDAUFrawWS5XCwkICAPwIgKxOTtjDas3M8GyaINSviwqpRHdO2QiKk6QTHdzdMhCRjEYjQETMbbO3bLORe+3aMHzFwt4AcL5M/f3/CpxIAJAPAIO+Hz0pmNs49vvsE3Yx7CCc274XtHqd4u5RV2wz1Hde93eGPLbgeGwAUtG7Va9ViwXx5y4AAM2PCo9U0qIvCke/W4e9Aiey3aYF6t55S1edPnAQ2nbp9M3JoCDp+PHjbi09PXfqRo0IUwDw7knBItisJTwzMQUAlKzSblMAQITivCwQQcSA1Ys/FUG8a6ijtCWQUlxsCWtYt0oXH5+sGV5GESJuTd7IELhig/jLlwsaNG1a8P9pjwMAXb9+9ZUd0xcEX9x/UPPaIhPEHfwNzm7fBRqdg+LuUUdsPWTA/FJwdHpswfFYAaQiSJ5q1WLBlZNnAAHmXwiPVFKjY4Sjq3/GHjPGsZ2Bi9S9c5esOrH7gPBMjy7Bc9/6n2+sjVbk5eQAigIQ0F21EkQEjVZ7z2vbrDYg4mU6WfmSjNJfOJbu4FTFrSoUVHN7nwCCKutzBKiIxrJUR6fKlct3q/rXGSQ0MFTyN/nbkq9d67/NtGjD5fAj6L8gkC6FHcIz23eDg85BdqvjIbUa0n/BS+8M/cRInR9rcDx2AAEACFi5Ug4zGsWGz7RZEB8dDQA4/0JYhJJy8ZJwZPUv+PKMj9mOmYvUyM+/DjoeEVF8ec+JPVJJ4UK9mzNHxhiBivdwcxLcMxzMQYcCli/5ZYyVppWUDXFEJFI5l5xdWCVXl98AAKIzrfca/FS2JuZfLVkUFhYm+pv8bTeSb/TdNm3B+pi9keC70Mgv749k53buA73eQa7i4SG1GeI7v/u7Qz55HA3yJ0rKExavXLgw8Zu3PqIxdVrIY+q15HN6vUaR6zbySc07KAt6+FHUkZODNM4O//r93VqT3nHPjOYdaXS91vLSvm9SRkZGmzLnwb/mgi+vNpKUltRnxVsfKqNqt+BHN2xW13w4iT6s/TRNaNDONrdLP9q1+vv5IDAwenmJj8sGpk8cg9xpuDds0WJ+/KkzCIBzow5EKOnRMcLRNb9g7xkT2PZPF6o7A+f+eGbbviqendt/ETJ2rD63uFhpXKPGPzYrhgNwU4V8rv9vORkUJD0TECCnJSX12fzJ7A0xYYfY6wtNdHFvBDu1dQcYdAalSh0Pqc3gAQteeu+tiV5qJztzPDaCCOXBwfioqE9WDxtJY+q2lEfXbcnn9nqNDob8yic3a6/M6z6QToVFDgcA+Ld2cP0vMMgt5rjR5+vhHypjPFqpR0I3qd988DGNrNWMxjVsJ8/z6Ue7v/lxAQgMvJ4g5iiXx3qfdCC6Zbg3bz6v64QPJrXw7iQikZoWc5EOffcL9jSOZzkpqXzfnC9XnwgLG/5X1pP8vXv8/+maoKAgKSAgQL6RdKPPlsnzfr209yAbuGAaXNp/mJ3Zsgu0Br3i7uEhth4ycFGP9wZP8FI7PVYRcjtA7vBuhRnDxLrNm83rNuaDSS18vEXgpGZGX6Ij34dgr2kfY05Ksho+d9nqM2ERb/3Z9SQPhez+P8BxI77PrinzNl7cf4i9vvQzunrwODu1dSvodVq5au06Yqs3Byzq8e6w8cZOncVwejLVKvakPKiPyUcNMxrFum2az+sy9r3JLXy8RBVAzYi6REfXhuIr08eznMQUde/cL749F3Fw2L9WKhP/XRIpL+WalHrj1R2BCzfEhB3GNxaaIGZ/JDu1cTsY9E6ye916Utu3/Ba+HDB8/OMe53hijfS7KTPlaSn1W7ece+3seQDicy5EHFLSoy8Kh9asw16BE9iOwAXqrtlffHcy4hA+49Xxu39vI5jSWlYWi0UMMxrF6NBQFmY0PlRjPhOA+fj42FJTk17ZPGXOr7H7DgsD50+jmL2R7OzO3aA3GOQqHrWldkP9F3V9e/AEL1W1G+RPouFebmNcO3t+8jfDRtLHdVrKY+q15PN6v04RP6/nk5p3UOa/NJDO7At7658y3Csa6dObd6TRdVvJXw4YSkRU/598/IyMjFdWDvvINrJ2C/Xohs3qtx9OoI9qPU3jG7aVF/j0o92rvl8IAgM/Pz/hSTPI/79V3/+UlCcsXjt7fvKBxStnXwiPUAhAqOn5NHYY/jptC5xPbrVqsm6TxrzVtkunNQ+7fL8f+AmhEKqObdlxjyOH7kXmErVqXQ+hQQ/vH4oyczJZWbTwoT0w56B3ddakXYwNuH70lPj6QhO/GHaYndy0FfQ6B8W9jofYZvDAz18aMXScl9rpibU5nmQV666Ge/3WLefcOBsFwPns85EHldSYi8Lh79bhK8YJsD1wobp33hffnT54kNp26vT9P1aZnDiIGgmyU1LA/NOvg0XhIa9eJwQSEFSrFQoLSsBvoZFiDhxkpzbvAAe9Qa7sUVsqB4dR7SQG2sFhBwgAQJdPuyhhRqNYt3XzOYnnYwAYmx11IFxJjY4RDn+3Dnsbx7Ptny1U981cuuZC5GFq0fnFtQ99Ixi6Vf+WMQZmm1V52AUOiCGAVQViAgxcMF24HHEET23eDga9Qa5Su7bUdqjv593eHTbO2NEeBHxivVh3HTgV1pN4tGw2p/Pod6d6dvEWkZOaFnOJjq5Zhy9PG8dyE5PVnbMWf382/MjQgAcu3/2zSi7dubZDZIw9lENAJgqiKDKZiyQIYj/jBDEu7Cie2rQV9HpHxc2jjtR6mN/n3d8bNs5oN8jtALmXlMc9GrVtNdtn1NvTWnh1EolITY25SEfXhuLLgRNYTmKqunvOojWn9+9/+CD5J0xBQiChtMACMQEGfPoJxEYegVNbtoOD1kF296glth3iu/ild4eN8+0/QAj8qxXy7QB5kmwSo9igXZtZ3h8HTGvp1VkEDmpqdAwd/S4EXzZ+zHKSkvm+eV+tORsWNqQcJP9VTw+JAGRRAECAfp9NhLhDx+H89t2g0+uUKh4eUutB/Za89N6Qj706dhRDQkK4HRx2gPxhJmnQptWsLhM+mNbcp7PIOKmp0Rfp2Pch2HPaBMxOSuV75i77/mzY4SEBwcEy/qfqzJZFHRkCWRTgDMBv1mS4En4CTm7cAhqdQXH3qCu2GjJgaY/33x7rpfInMn3EDpC/ISOCgkqDiS08Z3UZ89605t6dRQBS06Iu0okfQ7GXcRzmJKapu+d+/v3Z/WFDiEj8W+rWwxyaRABMAG4pVasGfjYFYsIPwW+bt4JB5yC716ktth0ycEnPEcPHeHXs9Nc3HrJ7sZ5cKRswpSBp02pW/LkLCACfXQiPVFKjYoRj36/HlwM/ZjsDF6p75i/7XuviVDUgOHjRP1FV/k+LgMCtNkCUoN+nEyD24BE4tWkH6PV62b22h9RuiO+SbiOGje3csaOdOewM8vfVrTCjUXyqVYuZXSf8b3oLHy8RVa6mRsfAse9D8eUZE1h2YrK6adKsuWcijw7+U7WAH7IxjmVqFbcpQIjQf/YncCXyN/jt161g0DvIVWrXkdoM8V3abcSwsb7KAMEODjtAHop0+fRTJcxoFOu18JzpM/LdGc27eIvIQUm7EEPHfgzFntPHs9yUdGHvzPlrz4RFDv7DtYAfJj6AgJgA3KoCB4SBpklwKewwnNi8GQwGg1Kldk2p3bCBS18KGDams9JRDCG7QW4HyENT6elWSaFnWn/Wddz7M5p7dRI5gJp2PpqOr12PvaaNgaykVL537tK1ZyIi3vy7LmDEsj3T73JghaO8shAKCFy2ASKD/p9OgkuHjsKpzTtArzMoVWp7iO2G+n7R/d2hYzorqj19xA6Qf0beLysEUa9l88+6fvLhjNbenUUiUtNiYujYT79irxkTMSshme+dveyHkxGH/hpICAA4gGK2qrLZqihmy+8Om8Wi2CxWRbbaSLXJgEwAsilAhND304kQd+gEnNq0vczmqFMKjhFvjS7NrbIb5HYj/R9kEu/AQDUMQKzXvNln18+eB07waVR4pJIeFSMc/yEUX54xHnZ8uogfmLPkh6iDR6h5pw4//XHDvbTYkCgI4P5UDUFE6Z4buSECWKxWUGQZ8tIygAsCDPx0IsQeOganNm4FR52DXNmjttTqzX5fdB/x1mhfZYAQQiF2cNgB8u95t+q1bvnZlbPnEQhM5yMjldQLMcKJHwFfMY6D7aaF6vbPFvx4OvwgtPXu9NMfWk+CDFRLCdVs6Qn9500bb8vKu4YMGTG6bT0I2VRJkKR8Vsm5/4FFy0dkJibz1+dMZ5cjD8OpjdtAp3dQKnl4SK2GDPzi5RFvjfZVVMFuc9jl3wbKzfUk189HGb8d+iGNLispNPfVNyjylw18fLMX1Hkv+dG58IODAO6+nuTWepBOe2a06Eij67WSl/YbTGaihve7fmJx1vPL3hyRNqZWS/XwT6H8m48+oQ9rNaMJDdvZ5vr0o32rf/wCRQH8wL6ew84g/1+Ge7m61bK56frZ88ARA6MORChp56OEowD4yowJtOPTBXz3nMU/ntt/EFp17XRvdassc7e8CmNuaqprWFiY6O7uzjIzM0sZ5DqIPsN9LNdTr/fe8ZFp89WDxwX/xYF0KfIont64FRx0DnLl2rWkVoP7L+v+3tBRvqqdOewA+f+lEeqCWK5umeLPRwECBJ4Lj1RSzkeLJwhYb+ME2mpayHfPX/zjucjD1Krziz/fdT0JIhDnN4s2iqKo+vj4KETEEJGXFViwJCcn9NgyZd6vF/dEMr+FgfxSxFF2etM20Oud5MoetaSWb/Zf9vKI4SO9VC6G2A1yO0D+S4b7Uy2bm66fjwLgFHg+8qCSeiFKPL4W8FXjeNhuWsh3z1zy04XDh6nFiy/+8jsmIbrlur1DwsLCRB8fHzkhOaHHlmnzNl/aHanx+9zI4w6dYCc3bwcHnUF286gptRvqu6zHiLdG2lcC2gHy3zPcy5mkZXPTjTMXkCMao8MilJQL0cLxtYC9ZoyHbZ/O5ztNi36+EHkYWnR+8ZegEUHSvuB9/G4MUi47v9gp9Rrdy5qcldZ9+8SZm69GHNMOXDid4g6dYKVqlU6u4lFbajvUb1mPEW+NHCgrQogdHA9d7HGQv08lNyPuddu0CPQZF2Dy9PESiUhNvhBNJ35cj69Mn4AZSSl856xFP18IO/p6QHCA3MzLIN1kEIDbGISMRtZrdC9rWlZat22fzN56cf8h7UuTRh2OO3jCenbjNtLrHGW3OnWl1sP8lr10ExxktznsDPLfV7catGoReOPcBRSIzzgbeVBJPR8lnCDAPsYJtCVwId85Z9HPZ8PCoLWPzy9kNLKPNx4oNdSpdH8oZrFIaDLx5OSEHpsmzdoUH3ZU23PSqF2xh4/XvRJxWKvV6mS3OjU1zw7x+6rbe8NG+ip2cNgB8gipW0EjRkh1W7UwXjt3AVTAGTERkXJKVLR07AdkrwaOp62m+Xzv3GU/n9sbzrC7909jW3QUytNGGCK4eXikJmenv7h9wqzNsQcOST0/Gbkr9vip+glHTjQRGbNVqeuhaTXUb3m394Z+VBrnsIPjnxTB3gUPV7aePEneAGKb1187sHjtalaSmtUl/do1pSgzCwvTs9D7o3fh7NbdlBZzyXf17h0nD/8Q0tTAhGYWWQZDZVel6ctdM376cFLQjcMnHXpOHXMk7sjJWgmHjzbhClir1KurbT3Ud3mv99760A4OO4M8skxCROXqljHx3AVAoBnnwiOV1PNR4kkg7D19HGz/9HP46X+f/Or+VJ38grhrgIwhBxA3z5gzP/7AEfBf/BldPfHbs3HhkRpREG1V6tfWth3cf3nPEW99OFDpb49z2AHyiKtbZSDxaNXCeONCNBLh9AsREUrShWiR/4j4ivFj2jF7qcZWbHbX6DWg4YAZV69Bwvlo8l0wA+JPnsbT67drJJ3GVrVOHU3rYf7Le7439MNSg9wODjtAHn2UkHcZSOq28JwRd/Y8EvBpFyIildSoKOHEj4A9poymA/O+AnNBPgoaDZGsou/saXjj3EU4ue5X0Ood5ap162haDe7/dY/3hn7oa/dW2QHyuDEJlsVJGrVuOT3x7HlgiNNuqVuAXSf+D/YuWA7m3DzsGzgJEs6eh5PrNoJer5fdPGpJrd/sv6LniOH/s3ur7AB5LKWiC9ijdcvpNy5EE3GYfj4yUkk9Fy3+JiB4/W+4LIqSOfH8BecTv2wincGgVKldW2o1xC/o5YC3PrCDww6QJ8Zwr9vCc8a1qBhkCNPOhkfI6WejpHMcuJN7FdulfQdAq9fLbrU9NK2HDlzRK2D4B50UxZ5bZQfIkwWS+s2bTU84ex4JYerpsAgl89JlbXrMJa3EBNm9joem9ZCBK3oFvP3BAFkW7OCwA+SJBEmd1i2nxZ89jxxwyoX94TZBK1HVunW1bYb6BvUMGP7BwFJw2NUqO0CeXJA81brl1ISYGBCApmRdT4bWw/2Derw79H17bpVd7MY7EYb4la4qPL1z76jty1dNESQRAIDZVwLaxS63pGJGtR0YdrHLnRJmNIr/6t7sdrGLXezyRIrRaGRlagkDAGZ8gM5uNBqZsaydEYz2BWJ2+VPyaOq8rLwcJwCo/MFbCJQ/5f+fTwhDwK8UnH4AfqEhvKzk9BMlfn5+gl9o6e+hABAKoaodIA9JQkJCBH9/f37s5819ki9dHicXF3MVCB0ru6pNO7T/sIl3+4vllUDKvyNqNbDBtODHuOMnPWRFgdrNm1oHz57hh4h5RIR2N6pdHiSPjmEYGgqCJFHMwYiPEsKOdbKRArJKUMnJEYqLi98AgBmB3t4MAG4DSEFqWsfcqIt1bAqHys4uAACaf+uWCQgRkBYFBNQypxaskM0W1dnFWaji2SRomGnKthC/EME/1F993AcZlfI9LXrrgznmjKzmKieQKrlenvLzqvFlk/R/dqJ6JHTykJAQwT80VM3PzW1VlJbducBSLKuioKJGkguKCtW0uGt9iUgDERH8ToLkABrgAMgAQGA3WTM4IEA0enmJRi+jWB6PuM1u8TLe/JwqMK3Ryygay7xOISEhQkhIiFCxH41eXmLZ/yAQAjHMaBSz4pMqWRNSXlESUvuqCcmv5CYkNgsLCxNzK+Wyis9o9PK6c8LCMKNRLLO7Kt7fA++BiBgAlFeBxIrnu5vNRkTsLtcHo5fx5rlu3qufn1DueTOWno/d0YcsLCzs5nWCR4wQw8LCxPyEpB48IfUVSEp7Jf/KtZfDjGFiiJ9RArv8PRlRVrpz+7Jg02fPdqfxTZ+RJzz9HH3S7AU+ruEz/NPOr9DekJAWBHAz+EZEKEgi7P4ieNqWGfO2rRkxZsXOhV9+RUTahx6Ik0TQOjqA1tHhtsFd7hTo6FjdfWLLjsqExs+aP3umi7xwWMBbtw3CCoNb4+gAkkEPGkcHYFrNnc6J+96DxtEBNLffQymT6nWgcTCAZNBXBARWHPA3r+9gAJREQEm6vb3xwQ4OrZNjaR+Id1/JPcOnz56pzdrLU5q1lyc+1yXCrmI9JKkRHKwSkRT8/rj+hXl5wESGglYHis2GgsAUOTdfSL1weRQCvOdXPjoRCQUGjtXdkm1cjtQ71VP11avKAMAQkeYPHvGBYiupqgERmF575eM1QT+G+PkJ/qGh6vfTPm2Vk5DSLy8/nzs6ObFqTesED5k2LXXH0qXaazHXRqvI9c4GR+gydMix1OvXqsSFHxqs0xs8LBYzaFxc9vcb9X6otorrIc9fAtlxod2orCvxDcN/DGWAoDFbraxezRp+x0LW183LLFjd88O3k0wA/OKJEx1Ordvqryq8GwKBRqMBq9Wa7ly75qaeEz7arkeMLxvYwuqJ08eY84scdRoNeHb1/k2vkZzO7TkwRNKIdW1mG1T2qBneY8zbQU6u7lE7vv7mk4RT5/tqNVpns7nEWqNRg629xry/pNwOCwwMRH+TSbUStYwI/vbd5HMXfdKSUxAZQ7dqVVWXWtV2+E2b8AMiRhm9jKIpwqSs+nhaH1BsbWwWG1RvWD+j/4RRF9bPmDtYNptf1EoazM3Lje04yG9/k47Pb0LElFO7wnpobdbntwZ/1zBPUUVCAEdn56eO/PCLUWNwsrXr32s+Iqr/RbvwPw+QcsN7WGxsi9z4G81U4Fwttglt+r4sZ1+5LiWeOseIc8y7eqM3ETkjYqHRaGQmk4lrDQ5w48TZBfF7DropqgLFLz4PXm/6hwCAOTv26mRnmXvIKECOBEcA4MfojAwJANTrcVef1ydlBap5eWB1cYGLVstOAEhd9+sBfbWC3LkuKGKBgHCmWlVrzJ5Ibf71BFAAgAGCVqfxtGVmj4oOO9KjmTfu+Wroh59mnjnvgorCkTEmKzJc3n6gV2LY0V7FhPuRscRNi5aN2WFcvDg/KRnMxUWgyDYAxkCv13tq9IYueXHxC07v3Pta25e7b04D0KVEXZ4FKZlaYgiSQWdLPXtRk3ftOqigAuMIBkfn5nk5ef1+mvpZzKmVP7+UnZIKJDIAIsg6HdU2OyG5FxF1CQ0NNX/22WfqucjIsWveGROYeua8c1FhPpTuvUCQgzHg4ODUIvhq4sdn9ux/s81LXUMBAOJPn3mzklX1z8vNB0etBKs+mGC9FnFYazVbgEkSCAw8i68n90/o0/M1UavtnHvtRq+LoZtH5qSmArBSIrKkZNYO+zw40LFxgxPt+veaX8aiZGeQPynlhvepkC395ew8AZBZXFwr66rW9VhkzS/qqNPoO8rcJpekZNQ4vGFbRwDY6Q3ATAAcgICrcnpeYYGLyhUwlxSWlBvxXFayCszmGgKKQCjlAgDk6PUEAKBwbi4sKVbMVrOsmAVJ4G4yAEBJUTHJFktGgQpuqoAUufpHra24BNyqVwfZbAFZVblVVeSzO3ZpCywlnxKnyK+GfGBjTChHOxACEEMQJAkuxZ7LLSq0PLt6aMDihAsXbFqDnnSOTtpKNaqBtaQEctJSQTYXWWP2hmlLZOtcItoaFxenkFXOKCgpqIGiRFFb9mjAZgWdwQAkK0AaxguK8/nFbXtqg8BqW/ILwLWKG5QUFgOXBJ6RniarR3579qfpCwa8OXPi97nJyW1Dps/5/NKuMBAdDDYUJI2ruxsAAWRnZECBpcSWs++AxEH5JeXq1es1GzT4DVVeVJCfr1i5Il+MPKotzsnTOru6gmMlVyguLAISJTXu3BlVFMVO2bkZHc78tDUbRBEIkRgBciDgDIEQQXLQa0vttf+mof5fN9LRFBGhEpFLzo3ED/LycwAJJEO1KtT+jVdWVq5VY5eDkxMhY0pJVg7F7I8YCIgUHn7bI4pMFEUURBFQuDkhEEORoSAyhiIi3qY0M86ZwJjImCAyJoiCICAAQCUAQCaITBRFUlVW2ckVOgwfdKN2z47Dm/u+slcy6IEDSiCIkJeS1hYAKtV4rs1wtxefGUeiiESg6jVaqPpCq+8a9e066LUvF934ccLkvgXxN8DB1Unj5Oiibdq7657eM8a+0e2T/33s8UybAm7jkuhgoKSoS66hoaHYqFEjDgxExiQRAAVBo6GGPp0P1unSeXLt9s9eAZuMTKsVZKtVMej14Nm3xwGPbh3ea9zd66oIwAS9AyvKy+OFGamDQGDw6+zFHycePU2Ss6MNBUHTpJtXXJvhfh817OH9Zv1OLyRrBEGjdXKUk06cZZFr15sEjQZkRWYoCiITRMlSUAzNvDpB3d5dpnj07DSm7jOtzdxqYzqXSpidksK/HTHuaac6tUPqv9JlkGOt6hcZcBAAgLk6XXnqVe9BzTq9OBtKOYv+i273/zSDhISEMD9/f37+0KEOBdeSqnIERYsoat0rXTpz5uuEms+033v14PGZal62tkguBjm/0I84NyJiUhn4Od3S1X4XALqfpU5IpRtkIoEsy3c4LQFAUdH16QZXX/90Sk9EvGKoXOm7ZX5vXY/ZF1lX0IiQn5Njmz16NJ/6xRfbh9Vtdqqai9si4kSSRgJFkQ8NGD/2ZwCAdZ/OqRRns0TmFxbmtvJpIwyaPX0EIqYSUb0j6zaNYIyaICHaZJvi7+9fVsOXAJGBarVhvWfb5I5YtaQnIpakX78e+cMH4w8nXr6q6DQaQXKvHPXO0nl9EbHoQsThmORzFw4WZGQjATAXV6eqpKiV5r36xksWxQYMUazVtvW1t5fNex4lIRcAgGT15FdvBpy4dvykk4JAGXFXO4kOelBsNpkBgmqzqe4etcQOw/wnt+zuM5eINGHfrtVlxsbOtRSVqLJNka7FXGJjXvK+CAAXZ3Tt+67AWDMOAIrNlj4ocPrPAADw1mv/2TH4n2aQ0NBQQAC6dOCIX1FWDglMUBycHaH+8+3W+bw0S+n+5hsnnOvVOqNhAkNRlIsSk52Oh27qDQDo9YefDR/4qSTd7olUVRWcnZyZ2WrbgohX/F54QV+cnYNcq0kXmADAAQRk6FCtGoSEhAg1GzSsXMGmAkTmWOYi1bw2Y/KHXyRe8Ar45oufRY0mes2oyWHz+w2O/dT71djUs9FNURQ5EAesULwXCYCIg0Gnw5TrN/YAgGVEu3aS3tExD5hgQSDQCiK61Kwej4hFRi8v8dDJYzeIMQIAARGBiIoBwJmbze4EiKV75VKV78dMPbg6YPyVbz+YEPfD2BnrLSXFOhAE0On0kHop1mLNKwBJowVOBAJjGgvnGUVNGiz1Kz2v7dslwRutnAARBVbWd0ajkZW6m7l0awJCyWg0iv/2rsCPDYOUeTQ4ETkvee3tnsUlhYiioLECQHFK+ltrR37SGwWRzNk5tTgCCExk+VmZEHP0N19BIwVF2GSu+/05K/JAGTYI8E6QILLbGsry7yJfwBjUa/m0hp42ss93xwAi0qjmHfa46rTPma2W0sBBURH4+/urE3x6qFimYiMggMp52T4hmJOT02LHrCUbdk6b10gxW6AgJxc0WhE0Wi2gIJTj4TbhSABcBabRQFFBQQEi8hHt2gnOVarEjGvy/GWd3tBKIQ4GR0dNWT8qGyeNkTK2RZTVAEYQBYlFRkXxovwCYogoiBLEHTruJHLueasbELjAQJQkILMFiiwWByAqnXpK+w61zo5yew8P3gFAJSL87M0ArTk2FlQq1ZtUzsFkMnETAJ/e5VUqn5UZEZlMJsX4H5+kxf8wezAA4IfWb3yxJD2zBgfiksCYtahIPb1+a11BEOoCIihcAUEjEQAIthIrZV9LfEGx2mohYrK5oBB/+HhqxYEPFV9+6WwOQLJMIX5+QnSGAQGA5SenmJ1V9bb2d2MWQRAJp5n4ohdKncsCE/DBpibdZAMiwm9GTTYlhR1pVGgtsiIyTY22zUkUNWdc6ta6kJ2W1j7z1PnG9yoQWzra8LZ3yG4yDQJw9aZerxardFPNLJsYoJKuNHiKCDZFhjrPtZYr16pRwGWZEJAAEWWztQA4V5ExtCEvwPjTN3MViAg0Gs1NbRURydh/MN2pzt5NYUEAJCIMxP92ttN/1wYJDQVApKsHf/O15uSRIIlclRUUiQmipAUFCBhwEAUJrFYZBUkCEkVVTs903B+85hUACLpTf6r4B1dVXr43BydB8A8NVcua8BbPPP9S/IFwgLKMQvlhPhciqJyXn7JOYVp6n9ziPK4RNVL9Z9vlvDR97GsNmjQJR0R1rt/QTZIgNFHvqwL+ecMWAUGRZepcqyE7Wa0qJmblcr0gsuqN6l/44PsV7fJT0g1lfWEBgL6qzWZQBQFsRUXyR2tWAIdbkfUyVqY/1wUIRKSUgRftAPmTYjQamb/JpBJR7SX+7/iXFJUAaJjg4OaGLXp0OcYQLEAAqBIyjUiFmdlNzu06UEOQJCrOLYDY3874EtHKO18cVfjTvW5tbd7FK2Ajrjo5O3c++FPImI5v+AX9MueLLvFhEUOtskwgMIYPo5M0WkA0l6ocsgp6Z8faRIQWi0UERWECEwBVxCpP1c1s/sJz+y15BRB3Ptp/24w5r6ZbrapBZxAUIGjXrh0DqJBs9tfVVwBEHQBkaZycr4oA9RWGyuXwY823z1n6CQAsl/S6wkNrQ186EbJxgzkzG7hNgaqtPLnW2XGdKiscy90ceLfz351yWdlHsqKQRqOpREQOAGAuY1SyA+QPSnkcI/yndT1taZmOqJWsAoGmkkfty8OWzGlfXFBQxtgMgHO4ePpMn6QLlzZlJSWTDMQLk1NfSEtLq1K7bt2MNR+Nx9/xPAJUrVMnqvBSfFMSmFKUm6M7vOL7xbs+Dx4Liq1WUXYualwcCDkBsNtnaMaQkDECxuBOtyQygZCIkDFipQYxAAAUZheCg9WmCJLASkrMPOts7IS5fQf7P/v6gP+pnNKQU1VVw+Dqod+aLvF/Z29JYWHalmmzX084dZYbXFyBIxAygZ86dUoGAElgjLD0ALzj/ghIRcYI6ffsUvYdAgQQRUlCxOJf5y2dbUlK/Sb5xnUFSZUOrVk3N+74b2NXvze6eM+y4PoFySncarWaq1Su6uBUu9oqubAYNDqdBEoJIWNAdxvYZX2EjBEKt/pBVVVGgJwjcdVsfXpu79cuNWj/zDUi6oqI8n8xkv6fNJDCATgRsZgDh4dmJSaAbLZoNExElxrVQotz88BPbaoBlTOjrIigcta0Zctwh+ruuWpRiSTbLKwkIdkx/JsfxvHSeYn9bi4jgIYveX/j1rA+MJuqZcggKyUVqLCwjq2gUGjq8yKTmMBsBUVMKbGgtULekqXYrFGKzciLS1C1ybdNMNbiIlEpLkGl2MwsxcVaW6l+Du99aWT1PJuKSn4xEyWBlaSkSCVXrjdcaZyZ1ND7+X1Vq1YVuNUKafFXlSt7w7ulHzszOOtynNjkxedFm9ksluQXoJOg8Tiw9pcAAFAUq1Vfep0StJlLJACAGo6OREQ6JHSxFRajUmJG2Wa76SESBAFVi1VUikuYXGxBRVGYIEnQf+Kon1u+1ieiem0PDVc4pl65Kp/dsrva6U07n8q5lsA5R1a9Rk2HBt1f3O43ZdxYrqpgNVsEpdiMSnEJymbLbdnRFosV1RIL2opLNEpxCdqKioRy1bJu25Y2kYChQqJqtUL++Uu1CxNSW9hVrL/gvQoMDJRc3KtWat6jW7pNtSpu1aqJjbt5HYalc+B/B77ioT4+3ATAQ0JCBEEQCn6ZvejnSq6VfC3cZnMQJI3IhAbcYhV+HDsFbmm6CACgAAB0fqXnru+nzn0xOzd/sqQqXtbCYpvOxUmu27zpsU7vDj5xadve0bnp6arGwVEo0DrLsOknqNHhRaqtlKQIXDU7OjqAe5On8gAAKvdoRnAMoGV373wXjTa9qLiYmKPeUqVmTQUAoO0LXjesg/IWMYN+0I0LUcg5EataGWrqq4h9x3w0caNFduJhh/uKiooECKTRqDWaN/7Js/OLOY7uVV6XVdXmqNNpU2KvPoeiELTm46mpvMnTNo1WA/mKNQeiT4ApIkIZnZTh2eGN/g6ZiYnJTgZHsVLj+lnl/arlXHmqw3MpSrM8xpiI7g2eSgcEQESLRqfz3vvDLxPidkf8L/d6Qj0gAM45MIEJgotzdvMuHdd1/+DtMYioAAB4er2Y7cgxvaS4CAy1qqdXVI+eeq61rGncIJ1KLIrB0UEsVJViiDoBpHKWeu3apydcK1U5uz+8akFWNgkuTszg7pYMdvnLYNESkb7CId0PWGVtdESkFzUaAK0Ea8dNvTix0XM0rn5bWj70/SIici8LQgpl6gCcCztWe8vCoCpHEhL0kl5Xfr6K12UVrqG7837KHUdEJN3xPbzjHnVjx47V+9V+QR9y5IieiG76p/Ju3Hjmt1+39T23bW/f4pTMduW6/R3nK89UrngPmoq22x3tNXfpn/JDW/7/Cm00N86f7/bbr9v67lr1fb+4Q0f7EJFrxXOUt6twHt0dz3jnPYgVv6tzdAAi0r9Qu7Z+7Nix+mt0TWcf6f8PsmvlysrrJn32xoI+b+aNb/wcH1uvNS0f8r6FiKqVv7Dy9ep3qmAPOx0eESHEL0S4F7DvpuoaAZjR+O+soUdEMN6nqoqfn5/wMPrk33qeJ4lBsOLxh9qXLdQ5sXVnn6U9/Ghs3Za2ic2et0yo31r98q3/XSQi/Z2gKJt5b8s+udd1H3Q/9/u8wjV+l+lCRKx8EVLFBUp3nA/v9b8/0mcP6k8iQgoJEcJuLsgKE+/xnA8+z/0+q9AHZK8F9i+Dqkx1OrZle79lvV6nKU8/TzOad6YlvQfR7jVrPy4DhL0GlV0eXTfv3xI/PwIA0Dm5XiF31+W8sLLq6eMl1G/luft5/75bylMv7K/eLna5i2pg7wK72AdMma4b6B0oAIQDeHuDp6cn+fs//hVE7PIPAoSMRhbu7c3Cw8MBwsMBwBu8vb3BO9CbM2ScgB49kAQG3nMSCAwMpMexNla5tyiw9CH/kWf8Ix4pk8nEH/ReKr4DIkIIDMTA/9q7uZs35K92yj8F5HLvR+mi1YdosgAIN2MidoGH3bdlJYgeWU0Fb+a/CAIUpKU1jd4b+dLpgwcxMz0dHFxcqHP37vDcwAEHNa76M7LZAndWL/yPP1sNALjf4FcQMRUAwAhGZgITf9QHZVlgrkaFf+UiYlF5ev9DuoYOANwf0ExFAVMqpMbfzLNKyMurXMXFxcEMZihKyFTr1KmTWraxUCUAcCz7PgeAlP9vFin3q1c5EPz92rNbdr1ky89nss0GiqKAJAiAkgZcataAus+03vj86KETq+ldr5RXDfm3bjIsLExntVoN2fHxJFWpgn5+fnn3ASkCAC3dsUOLIVtjRatcUyFOWGFxBwEAAwayKltcq1WNbPNavxWtO3XY+iiDpPydzAsY1UhbWBKDNlVxdXMV3Vu3GN3rg7eXhxmNYtkirb8sZeVf1QV+73Zx1Ai7FUVWAUG4U/lARLBZrFab2XK0XZ+Xj3T7YPg8RCwJCgqSAgIC5GX/G7OaMvIGl5SYoWqTBklvfT7LExHNK8Z88pWUWzjCbLWALIoZFxvUaBRsMpXA/2P1RZGI3DZ8On/P+Q3b2hQVFhMBWJFIq9fpId9SooqCoGSnpEnpURf7ZyQnt8/Pz+/s7OJyBe4AyZ3V9/4My1T8bsXvlb/U3N/OD78acXhuflaOynV6IXrNpjYAEG+8Wb3k7pJw5rwE+YWigggIBKqiqgAEnBBEFFEUBcdMraZX/vXEXmErvx/p897QZX5+fkJo6K2iygSEQICBgYHlOv3vnq1sdoQ7X2K56nq39gD3P+cf7jujkUFgIIQHhjMTmHhcdDQ6pueJVGLFSlUqCaxKZeFeKnVgYGC5LfaHrh8aWlp5OvHUOdSCKsqqwpAhU1WVE/GbehQCgiBpHDQaXbeT34d2y0pM6khEvQOeeUYFAMhJTBZtsYlSUVExaBz0N9NhkmPiBPV6gmixWoE7GCRoUAOICENDQ5lfqfv+gXbJnx2HRMSg7D2U9cdt12BH1v06JXZvRJviohIbSiJUqVZV696sYU4JUw96tGymOrm4aEWthDZUrDciDlffu2jFTBQYxcTEYPmsAqUL2XjFA+CeKQq3oqilNg3e8T12h02ARQW5OltGjrM5O6eSnJbhnHz8tPhHbCbJoOcaBweSDHqudXSEmnXrCLXq1hM86tcXKrlXYSAJoDJBuXb2PD+7c9+X12Li2oeGhqpl+UQY4ucnICAhIjeZTBxNpvJ7xIr3WNahdPO5iNBYVqCu4gu6eU588Dn/yGwOAKz8+z4mHwUAwEGnFSSDgTQODlwyGEir19H9rm/6C9cXtVrQODiQ1sFAkkFPVWvWYLXr1Rdq1q0n1KpXT6hW20MQRBE4qmpmeqrtRtjhLhvmLxoaXJquDxqdFphOC4JeC1ihCqOk15LGwUAaRwfSGPRcSSwREJH8/f3VsvFBRgB2tyqPdO9xiCF+Ib8bh7e1r9APiEh+AEL5NcTw1T81Lc7O4ygI6FKlMnR8d0hw5+GDPkOBJVH0sXp7vlk79be1697JSUpBpdCsJJyP7keK2gARrxqNRtHf318BUQCSlSYANm1RUTFoNA6qo6tLdGhoqFqm+97K8xduZRegyURl330aACQAsKAoxPr7+wMAYLjJxEEUqLJHHWuioCHGBIVEJnYYOtC86st5ZJKV+9Mu50hAqJjNWL9jhxKv94YuyE9KsWkcDZCTkvb06V+3+WZeva7VODsqhTcS8fSvm3sBwNFTwcHCMwEBMpSusxbSL8d7bt2yAerXrg9dB/YB0cX5vL+/v1rOcClU4F4DnPJRYDZAhFsraqlGma5+GQBsZX2gEpGUFB//9LENW6FS/VrQ1deXBK3mgr+/v1pe3fFB6pS/v78KDIFUXg8AnIuLi7GSe5Vz0Wcu5LerUQcVriARoaqWnsqpZk2scH2NLTe36ebQUNIyLXZ5pQevVL9eVJkb/IHqjAIARByBAwcEoVanF75v0bHDZau5mGk0GpJV0kfvC3vnSvjh6qKDnrIzs7nrlYRRWgdDsLW4BGo0qD02t1LlaQazBRyfqqEEBwQoZe8LiBMS50Aqx9WrFxQSkQZstqdBAwSgyUDENJPJBBXVfCMAQ39/tXwc5qYnaXPziqFqLXfu6l4zyj/UXwW8zQ5CvNV/DQ/u3GlIu3iV2vfujrWbNElExFw0mUqLbo9t+OwGB71uQFFRIW/q0zF7/LafqxZlZAOUl80hwp8nf3r56oHDjWxcBtcaNeDpga+06jV80HkggBM7dr8etX3/R/mJyc8LGlEEArBYLaBzdDz7tE/Hk91GvDUdEdMAAEKWBHXMPhe9JC8zQ9W5umC394eFRu8I65cYFdPeQa/HwqIixbWa+7EXhgxY3srH5+eka9daR2/bv+r6+QtVrh89WVdRZGLIsGGnDuc8nm4ot3z1pfdrNmx46g7HwU0bJM20MB6KSmrazBZo0qVzxv9++aaaUlR880VvWbBs2tl1Gz8rLMwzO+gN+iIHw4yFh3d/BmWb8kSsWWc8v32Pr6Wo4GlziRlEQQCnSpXA2aNWRLMenWY+9/LL+4gIr1+K8to9P+jzxNgrNoOTi9Di1ZfGl6SmvZN84uwr2soulUocHdpMXLX0LBHpI9asm3Fu++7+clFJk5KSEpBEEXSVXMGtZvV9DXt2mtmhV6+I+4Gk/FmTL8S+dHDduvE3zkZ1cNI6OJitFnCrW/tslbae6w8s/GoqU7nWtXJl1uDlLiPfME5aNqJdOyno5Em6sDds9NmNu0ZkJiY0LikqAkAErU4Hzh41zzzv2291m55dlgGnu4KkXP0c9XTHro4C7VNkxabRajXx5lyvn+IuRFZsG3fxQofQD6aFZScnCxoUBZem9a58svnnpoiorp0xe6qakdOzuKQIqjRqmOE/bdybiGj59NXXvlYTUt632KzE9fqkAYGTgqM27RpalJXdSBQEKLFasho/0zqyzdu+s+rVa3S63KtqMpl4xpUrb+xd9cOHadGXn2cMRSICzgk0Tk5nWvTostp72OvfIKK5vP/S4uP7hAevHZt0Iaa9zWbTWs0WcHRyBJCk5DotPPf3GvfBIic3t/MiCcCQiARRUjMuxVXePGtxaFvfHrNcXateRcRCRKStX6/u7dKymQfXMsHZ0UkFQb0OBHAoZPMHR4PWLk+NuQwW2cYViw0QAEStRJJW2zrn0tXWaZevtC9bMZZuzs50K4i90i4nOQWcqleDw2vXPRu//wjYrBbgxFVJqxWzL8V2pKKSjmd3hRXWqud2bMWqH562ZGcb0ElPxBABGERv2dXKdqM5tO7To1KZcvxAdUtVFUEuLHIL/fjjEsd69aReo0cXOVarck3v5Aj5eTlABMBltTytXffT5MAfkg6d7J+Vng6y1aoAoEgAkAnXFf35i17ZV290Pr1hhz8irr9y8kwlNT2rjTUpDcClBK6fPrsh+1SUW2F+DjCtVjE7OKtEpFs7ccamlMOnX8rJSAerzaoyAgGAiDOmZmj13bKvJ3iH/7K+r/frvjvIaGR4hyMkJCREQET1WnR0r22Llm2/fug4yKoNUq2yzBFY6qXLravcSGyt0WrJVlSiIgDD0lXDEHTypLBnxbdbz4Zu6ZZ5PQEUVVGIk4gMARmqWXHX21gSM77cs+r7p3q9/87HstX6h7yVRASVnFycAYB5AbCqABQKoDZs2vyswsDGEB05EGj1eqFcLc64GNeq5NKVjkWFhUCccu9Ul1VVVTVaTe2wZSs/y7p8FWRVVQWBkShJVfLjbwzITs/omp2d2rGyW41oxhgd27Jj/KbAhQviT5wGq83KuawAEQETmKLV6duYE9K+lHTS22XjMC8nJcVr59yvNl/YvhssihUEQtDqdZAQf510Dg61CmLjh5rz8/oQ5y3EFi91gWv7IpFpGBZkZgsRX33je/rXbQMq1/FIXj1h+q6qNWvt8hrsd/nVMQEHwCpX7Bi3r98Z/dm10xdsGkeN6mhw1Vd5rj7XabRyyuWrWnNhES8qKFCuHfnNc820ma0AYA8wpsqkqiRJvKgwn+XtimAGt0qoc6hSzGyyQ1F+AZCAtsTzF0Vl3frhrXp4X6z3QltbUvRFLMnJ1yOpAAjg2vipAn29WqgqivUPGbIAIEgS11d2zbbk5gMAmIlIs33x8mFZ6RkgSBJDQNI7GgQAgJ3Lg5ckhB3rn5GZbkVRkqp61BG11d0sSolFZ07NEIutJUri2fPC8c0uIamF2S0sVxLyFERVZkwVuCImHzvlZi0uUfVanaDVG8QsizXv18XLP0o+ePKlzIx0qyCKGvc6dQSDu5vFbDHrbCnpYonFqiScPS9oXJw2ktX6HGg056nMxqgQXCMi0n7zwYRFV8IOAdNrZA6C5FbbXUJJAmt+ESSfj+YODgZWXgMXOBcAAMJDN7x+fsP2bqlX4mWNo06sbKgsOtWrpViKS7g5NUtjtlr49fNRiqDXjD2zZ38YIm4t91rdt2cRoGb9hho6dVAHpbl9vABAu235qm/UvCJHhkzmsiK41/G4tbBKw4oVhqrCBGCCWHBn1BoFAZTcAkxLTFXdalQXBK1OsBUVQLHFzFUC+cbBYy7bFq6c+xbiK8nXrz+7NXD+ggv7I1SdizM5uriIjnVqqXqDXi1KTtNkZ2bwlKQE+VjwT20ErfYjIpr1w0TTzPM79hEXwVapag2t3t3tSlZiSnSD5s36JkdFczNXlLj9h1xDAudNZN3ee/Mrt6cbg5JnFhFALTGXWFNir+LF/WEe13aEvXchdOuG5a+9GxU0+IPzET+tn0VEjgAAq+fOdcmLverm7OyscWR6fd3Oz58cve5bj4C1K1zaDe4/xdnFmaHAuGKx8mpV3XsCAKilL0sABFQtNqjVopncdeIHoxq+9+5T3UYFBFd2dwfVqgCTBHb16Ck9ACT0Xmhq0uyVrrMcHR2AVFVRgaDy0826d57wYcNzu3adAADAB6SQEABZC4qc9n/5zXe7lgat2rUkaOXaiYHhcbvCu8tWC6mEgiRqoNXLPjYiYtF7Dg7Izs7mAmNi1Xr1WPv/DRv58fo1br1nftLI47m2v4iCRpQMWltW1GUMW7rq7VqNG5sZgMCABOQcVasNajZvIjTr1+NQy/699o9YM8/9atjhj3OyMjkKKFWuU5M/996bI8b+uqZKj2ljnq72XJuNkiiKzKCz5kTHajYs+fotRKTwCmn5oaGhzGQy8Q1fr/ROPR/TlESmKLIqutepyzsEDJ3tO+uTl1u/1m9tzbp1maIo/OZg45wjIpzduPvDrIRErnHQIxO1cof3h30/JvS7Ou/tCHFv1u/l9VqtFiVnAyadj+FRu8OnE5EQHR1N9wryIQAAQ8Eq2wCKi1d/7jv82oJ+g68sGjjs6tLuA+JOrvqpb0lJIZgtJUKj559lzfv0nI2IKpTq7QwABQASOKms4kQGAIAMQbZZuGeXzkK3CR/N7j9zUu8X3hp0wMHgwDhyTbHFShnnYnpzzqvu+2JVv7STF7je2UnRa3ViuzcHRPhuCa418pdv3J9/e/CUStVqkEYriVkJifxI6JY3AcAxLzGlLQcFySKLDdo/VzRh808D55+J6Pfej18NqNWsKVNlGR2dnODqyXNtxXqtW+87uW33OzG1a85LPH2uiq2wULAUW0BGArOlxFYilxBkCNrsy1daFMRdb1Gcld2eiLoGPNM9Wy3IHamX9NanPJsaerw3NOvM/v2uMcdOP8uKLa+WlJQQR2QSE5lBo3O4nZa56mBw0Nbt0G6Dz+v+XwIAoCgETGnfs5MkCE2Bq8CQIyLKAJDxo3F2vlBaIAAACY5tDkkfFTQ/4494sogTSDotJJy7oMu+fHUYw9Ii4uaSErDINlmj0YKlsFhybtMKvIf5hXw/Z07DgvR0NxCAi6AVGvl0iPAe5Bd2PTq6cZ1GjSz1vpr13Vd933o1PTZOK8sWitq6r9obUyfqVM6BGCPZZoNazZqVDA9a8ErlenXDSJZhg8OSF4oyMmuQAKpIgtCqf+/Y7kPfOHz9bHSjxo0bW56aZ1yzavD7L6fFXhVLigop6VzUc0QkBVbYEiD6q68QAEDMzPOTCwuICahoNAaxvvcLy7sOHzwVAEBy0O/6ZepnTU59v/45G1dkZEy0KrZizrn7olcHtVRUhRiKYlPvFy90fWfwitioqKrOVaqorxknLM27ntDzcsRhB0kjYcqlWA8AYCaTSQ40mfBerIwEwJBBQVy8Sx6V7acFUFoUSBRUUjjWbt6MdRr91meeHTtuNfr5aUyhobayQXDX14cIoMqy4lajhu651/vPbtOr+9QyBt2fduNG7KXNu+owjSRbs7Kl8/sO+ualpj0rKzYmWyxi/efbUN8Jo5daCwvd0jPjxS7D39hUkJU1+MjKtc1UAXnelRvVzTK05qqtBInrBQcHFnUgwhA8/KPtv0w0hZ/cuDPab/bU78/vjJzPLDZHQ4OadUXiHNr16r6aiDac3Lmze/SuiPYlxcU9cxJTG2htXFuYlQlFxcVEBgOlXL+h8pCtPk5VK/sGn9oXSkRrwtf8PDpu32HvH8cHtpdEZshPywBzfgGAwIAhMgACG3BeplyW9S4iCQwSL15ZZwRgMc2aiaHR0bKh3+uWooxMJAbAKkRgfw6cIxIRICEQIdSq3lBDqdcwEBFN9/W44M1eJ0WBvOycUg8TlvrqtVqtpNNqocbTTdUXh/hOqlq1duzB79eNTxUOUTHnnEvAonfvb59w9LcoLF3ADQpXITc9TRYlAczFJWqdVs3a22zmnTabDZATNxgMouDmur1SjRphY2u/oE9KOmar4latm44xKiYiLjI48+u2hrF7wqNLq+8gyKoCuemZsiBKYLFYVYPeoREASCYAOfCOURR3LsoZAVGxqlitjjs83fHZdX7gJ7y74FVdjwlDS6o0fmqtYxW35zJTUgmIQKvV0w+LF4uWggINCgIRIKRcuNh8cZ83jyDizQqTuemZiiAKsiAgS7xyxfxMQMDvk/XuBAmWllISDHoQkN2sASkSQomlRGCSyHNvJMHBb37pocry54He3kW3nZQIGLI7bBoABNTYEHPUqpXmGwGY59ixWkQ0rxwz+WvHSi5zCgoLFMZQSou/6hh35De5spMjiDotpMVeg8X9Bv/KWGmBIUSEkrx8G4pMka1W7urq5MSKCpydq1e9KqJURbHZbKAKQtzB47UNBsPguLCDEOnkUFSrccOn2g4ZMLN1504hIhFVL/NYWZ/r8+p6UtT1emfHcWn5WY3jdx9tFnf8xMCMS7GDE09HoehgUM2FRbQn6AdPItqzwTQ/JWbTToPFbAaLxQIaSQNaJweo3qgBZCalgmI1A95ZVgSxtBdEBlkZGTmzALhXTAwHSSJNvzfYnQmRiEg/Bs657Z+KTaYyn/gDGQQRQZFlcK/jwT08PTMtVgshEWklDWblZV9r3KLlqdav9/muZt26pwAAS8wlttId2xCJVChKStWYIQOotCIiMETQSpIEOgdgJIOqyG6qzQZlbkTQSCLUql83zwjAavZqiYuDj6kBqlwhksihICGZFQMDXhqIBIYMNBqNpNPpgAOCzWZxvperNSsrU9EiACcCUauBunXq6NfjevUT5242IoKZrw/babGagWFpxUWJCRBx9ChVtlpLy54KDLKu3UCJCXBzWwYEkDSS6KjXgwQMZOTV2wHAqQd1LicuaTSCVaedBIBHVVERSQGl02v9+1/ZEzE640YCkiyrWdGxz+1e9X0PU0TEujJav7lLMaff7ZoHiMgkrcbm3K6dJZCIggMCFDIa2fLsgkwmSUCcAIiguKCQEKDUlSAIYM7KQWtWTqlpVEZQTJQ0Wq0GRIWDQauFc5EHC1q/0W+UVtLtvn74mGtJUTGYZRWKS0pkMJsJ8/IcC64ndLSkZu767deta8Wlb/3vqkOpz17c+tnnJ/pMH9e5WUGR5IK6WACIBYBNUQeP7Fs3LvAbc24uoUaDKb+dTT8YsqVX3M4DhryCfLOk02vdmzUp8uz4wm6zTd7VoI1n7T1LVpmyb9xQ+R2lMW9GKAFB41ZZrEjanPM/YG4DqGQpDWqF+pfuJ/ygZBpZwSoNn8p5c8lMTwAoLncFa50cLLYfVgJ8MhJ2LN2h7TW6l9XBwUknIgOVc9VR4yi0ff2VkzpXpxtEHAVCUmSbDbWafEnQgMgAHdwr5edn5siCIACVJRBJkkY0AfAQBwcCABBE0aYSJ1SBGxz00Mqv52Gts1OSiEwiRFIV2SpptQWiKAJyDvrqbhYAuKtd5aQ3oC2vCARAUGUZkq8n5RMRpgBI8xD5+2t+fv5o0PdgBlIAQJS5Ct5eveBSyHowIxEqCrbu1yulVvMmp6wFxSoKqHKFkyBK2agRuZaJaLWYc1Yd2vdHIvuEjAGX2InFR/bcdPMu/S0sctXICS6FSanDbajYuGzVgtnyHACsKzMy7pZMfstg5FwFVTVI0dGVsHnzdKPXMAGDTfKaycYGmVYbIBNQBaLK1avbQCMgMASyyKyBV4fs3Ky8DwsTkmQQBJCLS9TCnOx81+rVoUQmerrvy31rNm5sq/9MyxNysbnaxcijI46HbuyUn5nT25KV7aDmFUJeQQGgo4FfPHUSwMkwRMy7esNw9XoikCpDUW7+Czm5hd1cnfT7Kt5z8uXLVrTJBAwAifOa7ZprfzXNY66SSIyh4FTVnb06ZWzv5p3aHwIAWDdv8dtKsRlAZARE98wF4art9lnyng05lJazKi3776StZPtjazvoJmspVisBQAkiWm7L8zIaRW8I5KE1QhUAANSJx0pI4cgERooMhXkFcf2NEwaVtzdUcoEDq3+Yac7J1bu5ugpXk1IOeTRXCyVJAizLBiz/Cc5JKgDAjaT43WaVz0dBEGSLFSycUv0DP3ldLSwuVyOFU+u3zCzMy9U4u7qxzOzcCES0lbt1K95v42efoaiN20nQS5CdnAKxJ8++wTSa430CAkpAYDDgSvwQa14BMIEBIkJxcSEMnz4Rvth3gOcmpZBO0oKlqDi5yztDfRHRVha8hdNb9swsSkl2AAGgSvXaSsioEMAH1s0tTeEhrjj6+fkJzQCEnMJCTNvlpFw7f2mvRqsfbinKByBixcWF1t/pUvB7Fat09mSyWlTinHQ6aoHGoB9iilhjISL3tWOnfFCYlw+g1WpVjlipSc1dT7/wfJ/EE6eJc5UrJVb95E3fn0LEK2WzMJxYt6PNyrETxNr1GrB5745dMfLHpTXmdx2wPqCmZ7q7u7s8/Lsv1zRo0+LNg1u2PG9Ly+57Zvv+D9KjLzvoHR0g9fp1LtZp2+pqcXpGfaZ34Rlx16WVwwI271++anXi1esHM+OvZzVq3eaN8xt3v2u1FANXyaZzdGG9A8dlLX55CFRu0gAJGZCqQlZqylNEdOLSkeNvHV7zy5d5Welc0GoFAoS/lO6MiOUZqByAIyIQJ9VJpxebD+j24b7Rb61vULdRbH2fNnnl2wzf73Ss9GULFVL7CRGpNIHPdDM/qcPAvlFntu22FiSnaq2CyK8fO/lG6MwFeZ1f6/eDauPi/u9/WRQxd/kzReZCcNU5gsazUfXqowKW3L3eZjMAABg2ZUrO8rhk9Ur4YeSSRsk5ec53x8Ivt3l2bj9bAFHz/SfGL9PCjzUvspjBRdSA4blWtYnoeKC3d2b5mQI//JBMERFQ+en6W/QRld4oTksVVKtNzTgTNXrvitWUryo/U07BW1HbdvYw2ywEjImcc5BErQMAZDrUrhEvno+pzxHkGyfPPBtqnL09ISpqka5y5ZLwNb+M3TV7cT+luATIZoWa3h1y2/bp9RkBYLkuf/93xXhoaKga4ucH0WYzfgm71HlV3tKbi0rKcyZAtsn8tig9lr6G36lYAMBEQczLzlIvbtkzOHTWwvy8wqIdG2cvnh21N8JV1OlVxWZhrvU9Mls++2LChZr7w7Q6XRdFVZSUC9GG9ab5By+fOfOuR5OncmMOnhh8etUvH1RxcAQ1Jxs6dO+cUsuj3viorJyB7pVcQKMqELHqu7e1H77zeqc+fa4BwM6US1feS7lwEUgBcnR1YWLHoQO/LElKWRJ3/CQTnQxK2tkLhiMJyR/ZFOUjUDmcu54M+fl5KghAEgmaqs+2vNbW23tD53cGBaQeOQHIGJVkZ8HBr9esiVjxw1QN8MYZV6+BqNdy5JwDgao36KylEwMSEqkApALnKuPq7aUxgTgRqEAIstlqLp+IHZ2d9FxVAQQGJUVF6vGfN0xo0qbtBM8ZbboAQBiEhDC4G6MQqMBBLWUmVMtBUVrV/Y6ynIhUlqeUs//nn+eXxCcbU+KvK/lcpqhNOz5I/e3cB8QJ0q9cA4titZDVJrm1q6/0CBj+aVJ0dHXioBKSCgQqlpFmdDhwv9JzJu357ofPC67emJBxI1G9Hhsrpy1P7X1pZ1hvrqqQduU6KIrNKpeYxRpdOglvTB37NQBkeH74IUBERHkYmxMAwqDXdqZFxabl/rKpOuk0SuxvJyn5cuwYfSXXMcWZOVCcXwCig46riqwCEer0OkRE9fzufSZrauba2BMnBUmVlfObdndLORPVjQkC5CamQEFBnk0126iWZzNtq+5dPkBEJSQkRPC/g8EAAJiqEjEoe4+gIv/95GSTBFUFUhFQVRRZtZothnJwMCAOxFUiDgyECudHDhxUUEGVdAbNheO/8fiYix8KkvShKstARFwx29RKVdyEZt07r0VEs6Uga8Pa7FzTxV1hWpVU5cRPG6onnTizTeNkgLzkNMhISZFR5opz/Tr6joMHrnv+lR4/LxgwdHla+GEXm05jid1/2Ck/IWW7wcERbGYLJF25CqIoyMS5VLd5s0Sx8bPPLj2zfbdOW6nSjISTpw02sEJmeqYiiiIrH2GOBoNgcHQBD6/nLw+ZF9izLGR/YO3YKWrU9r1as81KJfHXUAtCY7NWB027e+dlxl1zLcnI1JIqw8m9Yf1QEEaDooJW0gmiIOklrR6IsdvtExScdBqdwImDe8P6bSn+jDMiFrR48YULicfOUMmFfK2olcBSUACWvBxAxHsu4LoCceDABBe9pBFAUYEQXR7kFvYPDVVDQkKEbm+8EbhzSbBBHxY5IeVSLORn5VJuSgbx0kQ7ZnAw6Kq2al7i9dHb3zR+oW3MleMnm2gljSAJkkGrkYCLaKgQv1BD/EKEnu8Omrhl0XL9tfBDH6XGXgFzQSFcPnGSMwLQGnTMoHfQ1ny2XfGzw/ynVqpT5wBxjv7+/lQRwGQ0MkTMT0lJ6GPJyd9+7eAx92JupcKcfDUvIxsNDgb2VJcOamFSmlAYn6DVa/RAamnhtja9e/5w+NctT1lBnZIfe11bUJDP805lAxCAKAlkcHTUuDfzhOZdOv/vuf6915HRyO4ZX5JEUS8KgpVkvUYjQREJNwv6eQcGgsnHBzr27i5d+DZESC8xO1rMFrCkZv0v70b6V651q10FEh01Gq2gF20ACM63FvCgQa/RCjarVXBtXB9EnR6zoi+CJT+PZCISRYm516imaTGob3T3d4dNo3eHMUS8eO3MeV+dg+OKq5FHqxYX5EHc6fOciIOkkcDRwUGq3qyh1Lxv9y0dhw6aahk2CF/+4LTvHrP8a1pUjHOh2QLXTkdxIkIOnBwdHZheb5Dqdn4+96VR7w0W/Xx9hTa9XppHRDvCVq4dFRN+sI1Wp2mbn5NHklbDgKCQI9v3TJ+XD3QcNHBD6fZgIQIinjdnZnaXHPWfFlxLfbHEaiZRkgprPN10+8DpH3+6d8V3ExRzcWWJMcjPKSgiVYXGHV5Iaty46ab8nBzF0dlZtGp0abDue/gwJIQiXnsN2vXusQ1t1nrFRUVQuY4HAwAdABQ0bP/czgt7978Vc+DggGNb96iKRgusmjuTNJp0AACIjv7dDGbdFM27+w1YrxdZZdlmA6da1QvL8uzuvwrOz49H+/uzl8eOmJgYHRUTufKnvtmJSd4qJ1eNKIGiULpHO89jXm8MWOjesMEho9HIwNkhofnA3ps8XnxGqeTsKLLa1Y4CAHhW9SQAAL8QPx6N/qzvhI9GJp8+e37vtz/2ykpM6yIiOjNRAqvNltKojeeJTqPfnuPq4HqijMl+NzjRZOJGo5HVrFnnt2uZyZ1PfPm9sfBGkn9hUSFDSYQq9Tx2d3rnjdWXdx/sL9ts2sqVK6Po5nIJAGD5229LL/Tp9WlaWtresFXfj8qLjX/FZrU5EBBoNDrVoZr7rheG+i5v0rLlDj8AAU2m312/WUgzAgR4btCrae6OrptIkRWNXi9mFuYlLzmxG6KbNSMIDycAAE/PFhHob15vNpcIXFZI7+goXbp01hUAoG3PbkeYl0W0FheDvkbVrHKHRNuXux53QHS1ms3AXJxS6z3T9ljEim8HFOUXdKns5OJg5srVdj26bG7n22cRIlqMRiMajUZWv03LjUR0MvKn9R/FHTjUD5A3VImYYlNsBheXfZ2H+h166tl2ixDRVpqL1W5/enxi54jV34/LSkh4hVRyNRcXk5OzCxYWFV9o0bn9Ge933lykdXI6/3+oJ5/LVEl2KgAAAABJRU5ErkJggg==";
const LOGO_AM="data:image/png;base64,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";
const ESCUT_AJT="data:image/png;base64,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";
let NAVL = [];
const NAV = [
  {id:"inici",t:"Inici",i:"home"},{id:"socis",t:"Persones",i:"users"},{id:"seguiment",t:"Seguiment",i:"heart"},{id:"activitats",t:"Activitats",i:"act"},{id:"sales",t:"Sales",i:"room"},{id:"comandes",t:"Comandes",i:"cart"},{id:"apats",t:"Àpats",i:"plate"},{id:"manteniment",t:"Manteniment",i:"tool"},{id:"informes",t:"Informes",i:"chart"},{id:"equip",t:"Equip",i:"users"},{id:"config",t:"Rols i permisos",i:"cog"}
];
function render(){
  saveUI();
  const root=$("#root");
  if(!ME||!D){ return; }
  const u=ME;
  document.onkeydown=null; clearInterval(KS.clock); progIdle();
  S.rol = u.rol;
  if(u.casal&&u.casal!=="tots") S.casal=u.casal; else if(!S.casal) S.casal="tots";
  if((S.rol==="dinamitzador"||S.rol==="informador"||S.rol==="neteja"||esResp()) && S.casal==="tots") S.casal="c1";
  if(S.rol==="ajuntament"){ S.casal="tots"; S.view="informes"; }
  const nav = NAV.filter(n=> can(NAVMOD[n.id],"C") && (n.id!=="apats" || S.casal==="tots" || S.casal==="c2"));
  if(!nav.length){ root.innerHTML=topbar()+'<main id="main"><div class="empty" style="margin:40px auto;max-width:520px">El teu perfil no té cap apartat assignat al programa. Parla amb la Direcció General.</div></main>'; bindTop(); return; }
  if(!nav.find(n=>n.id===S.view)) S.view=nav[0].id;
  NAVL = nav;
  const home = nav.find(n=>n.id==="inici");
  const modbar = S.view==="inici" ? '' : '<div class="modbar">'+(home?'<button class="back" data-nav="inici" aria-label="Tornar a l\'inici" title="Inici">'+ICON.back+'</button>':'')+
    '<nav class="dock" aria-label="Mòduls">'+nav.filter(n=>n.id!=="inici").map(n=>'<button class="m-'+n.id+'" data-nav="'+n.id+'"'+(S.view===n.id?' aria-current="page"':'')+'><i>'+ICON[n.i]+'</i>'+n.t+'</button>').join("")+'</nav></div>';
  root.innerHTML = '<div class="shell">'+topbar(false)+modbar+'<main class="content" id="view">'+VIEWS[S.view]()+'</main><footer class="foot"><div class="fl"><small>Gestionat</small><img src="'+LOGO_AM+'" alt="Ave Maria Fundació" style="height:52px;padding:6px 10px"></div><div class="fl"><small>Titularitat</small><img src="'+LOGO_AJT+'" alt="Ajuntament de Sant Pere de Ribes"></div><span>Gestió: Fundació Ave Maria · Titularitat: Ajuntament de Sant Pere de Ribes</span></footer></div>';
  const h1=root.querySelector("#view .head h1"); const cur=NAV.find(n=>n.id===S.view);
  if(h1 && S.view!=="inici" && cur) h1.insertAdjacentHTML("afterbegin",'<span class="h-ic m-'+cur.id+'" aria-hidden="true">'+ICON[cur.i]+'</span>');
  root.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>{ S.view=b.dataset.nav; render(); window.scrollTo(0,0); });
  bindTop(); BIND[S.view] && BIND[S.view](); applyPerms(root);
}
function topbar(isPortal){
  const u=treb(S.user);
  let right='';
  if(isPortal){
    right='<select class="select" id="selSoci" aria-label="Persona d\'exemple">'+D.socis.filter((x,i)=>i<8||x.casal==="c2").map(s=>'<option value="'+s.id+'"'+(S.portalSoci===s.id?' selected':'')+'>'+esc(nomComplet(s))+'</option>').join("")+'</select>';
  } else if(["supervisio","direccio","ajuntament"].includes(S.rol) || S.simRol){
    const totes=["supervisio","direccio","ajuntament"].includes(S.rol);
    right='<select class="select" id="selCasal" aria-label="Casal">'+(totes?'<option value="tots"'+(S.casal==="tots"?' selected':'')+'>Tots els casals</option>':'')+D.casals.map(c=>'<option value="'+c.id+'"'+(S.casal===c.id?' selected':'')+'>'+esc(c.nom)+'</option>').join("")+'</select>';
  } else right='<span class="chip">'+esc(casal(S.casal).nom)+'</span>';
  const sim = S.simRol ? '<div class="simbar">'+ICON.users+'<span>Estàs veient el programa com el veuria: <b>'+ROLS[S.rol]+'</b>'+(S.rol==="soci"?'':' · '+(S.casal==="tots"?'tots els casals':esc(casal(S.casal).nom)))+'</span><button class="btn sm" id="simOff">Tornar al meu perfil</button></div>' : '';
  return sim+'<header class="top"><div class="brand2"><div class="bm">AM</div><div><b>Casals</b><small>Sant Pere de Ribes</small></div></div><div class="gst" title="Gestió: Fundació Ave Maria"><small>Gestionat</small><img src="'+LOGO_AM+'" alt="Ave Maria Fundació"></div><div class="ajt" title="Titularitat: Ajuntament de Sant Pere de Ribes"><img src="'+ESCUT_AJT+'" alt=""><span><small>Titularitat</small>Ajuntament de<br>Sant Pere de Ribes</span></div><div class="grow"></div>'+
    '<div class="me"><span class="avatar">'+esc(((u.nom||u.email||"?").split(/\s+/).map(x=>x[0]).join("").slice(0,2)).toUpperCase())+'</span><div><b>'+esc(nomT(u))+'</b><small>'+esc(ROLS[u.rol]||"")+'</small></div></div><span class="chip sync good" id="sync">Desat</span>'+right+(S.rol!=="ajuntament"?'<a class="btn sm kelio-b" href="'+KELIO+'" target="_blank" rel="noopener noreferrer" data-kelio>'+ICON.clock+'Fitxar · Kelio</a>':'')+'<button class="btn sm" id="logout">'+ICON.door+'Tancar sessió</button></header>';
}
function bindTop(){
  const sc=$("#selCasal"); if(sc) sc.onchange=()=>{ S.casal=sc.value; S.sala=null; render(); };
  const ss=$("#selSoci"); if(ss) ss.onchange=()=>{ S.portalSoci=ss.value; render(); };
  const lo=$("#logout"); if(lo) lo.onclick=()=>logout();
  const so=$("#simOff"); if(so) so.onclick=()=>{ S.simRol=null; S.view="config"; const u=treb(S.user); S.casal=u.casal; render(); window.scrollTo(0,0); };
}
let progT=null;
function progIdle(){ clearTimeout(progT); progT=setTimeout(()=>{ if(S.user){ logout(); } }, 15*60000); }
document.addEventListener("pointerdown",()=>{ if(S.user) progIdle(); }); document.addEventListener("keydown",()=>{ if(S.user) progIdle(); });

/* ---------- Vistes ---------- */
const VIEWS = {}, BIND = {};

/* ---------- Accés: correu i contrasenya, doble factor i tauleta amb PIN ---------- */
const KELIO="https://funave.kelio.io/open/login";
const ROLS_PIN=["dinamitzador","informador","neteja","tallerista","voluntari"];
const esCoordRol = r => r==="supervisio"||r==="direccio";

function marc(html, ample){
  closeOverlay(); clearInterval(KS.clock); document.onkeydown=null;
  $("#root").innerHTML='<div class="kq"><header class="kq-top"><div class="brand2"><div class="bm">AM</div><div><b>Casals Ave Maria</b><small>Sant Pere de Ribes</small></div></div></header>'+
    '<div class="auth-wrap"><div class="auth-card'+(ample?' ample':'')+'">'+html+'</div></div>'+
    '<footer class="auth-foot"><img src="'+LOGO_AM+'" alt="Ave Maria Fundació"><span>Gestiona: Fundació Ave Maria · Titularitat: Ajuntament de Sant Pere de Ribes</span></footer></div>';
}
function pantalla(html){ marc(html); }

function pantallaAcces(mode, msg){
  mode=mode||"entrar";
  const T={entrar:["Entra al programa","Entrar"],oblit:["Recupera la contrasenya","Envia'm l'enllaç"]}[mode];
  const tauleta=!!llegirTauleta();
  marc('<h1>'+T[0]+'</h1>'+(msg?'<div class="note">'+esc(msg)+'</div>':'')+
    '<form class="form" id="fau" novalidate style="grid-template-columns:1fr">'+
    '<div class="field"><label for="au_em">Correu electrònic</label><input id="au_em" type="email" autocomplete="username" inputmode="email"></div>'+
    (mode==="entrar"?'<div class="field"><label for="au_pw">Contrasenya</label><input id="au_pw" type="password" autocomplete="current-password"></div>':'')+
    '<div class="alert" id="auerr" hidden></div><button class="btn primary" type="submit" style="justify-content:center;padding:12px">'+T[1]+'</button></form>'+
    '<div class="auth-links">'+(mode!=="entrar"?'<button class="btn ghost sm" data-mode="entrar">Tornar a entrar</button>':'<button class="btn ghost sm" data-mode="oblit">He oblidat la contrasenya</button>')+
    (tauleta?'<button class="btn ghost sm" id="auTau">Tornar a la tauleta</button>':'')+'</div>'+
    '<p class="note" style="margin:0">Els comptes els crea la Direcció General. Si no en tens, demana-ho a la coordinació.</p>');
  document.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>pantallaAcces(b.dataset.mode));
  const at=$("#auTau"); if(at) at.onclick=async()=>{ if(await tornarTauleta()) entrar(); else pantallaAcces("entrar","La sessió de la tauleta ha caducat. Cal tornar-la a configurar."); };
  $("#au_em").focus();
  $("#fau").onsubmit=async e=>{ e.preventDefault(); const er=$("#auerr"); er.hidden=true;
    const em=$("#au_em").value.trim(), pw=$("#au_pw")?$("#au_pw").value:"", btn=e.target.querySelector("[type=submit]");
    const falla=t=>{ er.textContent=t; er.hidden=false; btn.disabled=false; };
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return falla("Escriu un correu electrònic vàlid.");
    btn.disabled=true;
    const redirect=location.origin+location.pathname;
    if(mode==="entrar"){
      const {error}=await sb.auth.signInWithPassword({email:em,password:pw});
      if(error) return falla(/confirm/i.test(error.message)?"Primer has d'acceptar la invitació que t'ha arribat per correu.":/banned/i.test(error.message)?"Aquest compte està desactivat.":"Correu o contrasenya incorrectes.");
      entrar();
    } else {
      await sb.auth.resetPasswordForEmail(em,{redirectTo:redirect});
      pantallaAcces("entrar","Si el correu té compte, rebràs un enllaç per posar una contrasenya nova.");
    }
  };
}
function pantallaNovaContrasenya(){
  marc('<h1>Tria la teva contrasenya</h1><p class="note" style="margin:0">Mínim 10 caràcters. Fes servir una frase fàcil de recordar i difícil d\'endevinar.</p><form class="form" id="fnp" novalidate style="grid-template-columns:1fr"><div class="field"><label for="np1">Contrasenya nova</label><input id="np1" type="password" autocomplete="new-password"></div><div class="field"><label for="np2">Repeteix-la</label><input id="np2" type="password" autocomplete="new-password"></div><div class="alert" id="nperr" hidden></div><button class="btn primary" type="submit" style="justify-content:center;padding:12px">Desar la contrasenya</button></form>');
  $("#fnp").onsubmit=async e=>{ e.preventDefault(); const a=$("#np1").value, b=$("#np2").value, er=$("#nperr");
    if(a.length<10){ er.textContent="Mínim 10 caràcters."; er.hidden=false; return; }
    if(a!==b){ er.textContent="Les dues contrasenyes no coincideixen."; er.hidden=false; return; }
    const {error}=await sb.auth.updateUser({password:a}); if(error){ er.textContent=/weak|pwned|short/i.test(error.message)?"Aquesta contrasenya és massa feble. Tria'n una altra.":error.message; er.hidden=false; return; }
    history.replaceState(null,"",location.pathname); toast("Contrasenya desada."); entrar(); };
}
function pantallaPendent(){
  marc('<h1>Hola'+(ME.nom?', '+esc(ME.nom.split(" ")[0]):'')+'</h1><p>'+(ME.actiu?'El teu compte està creat, però encara no té perfil assignat. Parla amb la Direcció General.':'El teu compte està desactivat. Parla amb la Direcció General.')+'</p><div style="display:flex;gap:8px"><button class="btn primary" id="retry">Tornar a provar</button><button class="btn ghost" id="sortir">Sortir</button></div>');
  $("#retry").onclick=()=>entrar(); $("#sortir").onclick=sortir;
}

/* ---- Doble factor: obligatori NOMÉS per a Supervisió. La resta entra amb correu i contrasenya;
   si algú l'ha activat voluntàriament, se li demana el codi igualment. ---- */
async function comprovarMFA(){
  if(ME.rol==="tauleta") return true;
  const {data:aal}=await sb.auth.mfa.getAuthenticatorAssuranceLevel();
  if(aal && aal.currentLevel==="aal2") return true;
  const {data:f}=await sb.auth.mfa.listFactors();
  const totp=((f&&f.totp)||[]).filter(x=>x.status==="verified");
  if(totp.length){ pantallaCodiMFA(totp[0].id); return false; }
  if(ME.rol!=="supervisio") return true;
  pantallaAltaMFA();
  return false;
}
async function pantallaAltaMFA(){
  marc('<h1>Activa el doble factor</h1><p>El teu perfil té accés a dades sensibles. Cal una segona comprovació amb una aplicació del mòbil (Microsoft Authenticator, Google Authenticator…).</p><p class="note">Carregant el codi QR…</p>',true);
  try{
    const {data:f}=await sb.auth.mfa.listFactors();
    for(const x of ((f&&f.all)||[]).filter(x=>x.status!=="verified")) await sb.auth.mfa.unenroll({factorId:x.id});
    const {data,error}=await sb.auth.mfa.enroll({factorType:"totp",friendlyName:"Casals "+isoAvui()});
    if(error) throw error;
    marc('<h1>Activa el doble factor</h1><ol class="auth-steps"><li>Obre l\'aplicació d\'autenticació del mòbil i afegeix un compte nou.</li><li>Escaneja aquest codi QR.</li><li>Escriu el codi de 6 xifres que et mostra.</li></ol>'+
      '<div class="auth-qr"><img src="'+esc(data.totp.qr_code)+'" alt="Codi QR per al doble factor" width="200" height="200"></div>'+
      '<details><summary>No pots escanejar el QR?</summary><p class="note" style="margin:6px 0 0">Escriu aquesta clau a l\'aplicació: <code style="user-select:all">'+esc(data.totp.secret)+'</code></p></details>'+
      '<form class="form" id="fmf" novalidate style="grid-template-columns:1fr"><div class="field"><label for="mf_c">Codi de 6 xifres</label><input id="mf_c" inputmode="numeric" autocomplete="one-time-code" maxlength="6"></div><div class="alert" id="mferr" hidden></div><button class="btn primary" type="submit" style="justify-content:center;padding:12px">Activar</button></form>'+
      '<div class="auth-links"><button class="btn ghost sm" id="sortir">Sortir</button></div>',true);
    $("#sortir").onclick=sortir; $("#mf_c").focus();
    $("#fmf").onsubmit=async e=>{ e.preventDefault(); const er=$("#mferr");
      const {error:e2}=await sb.auth.mfa.challengeAndVerify({factorId:data.id,code:$("#mf_c").value.trim()});
      if(e2){ er.textContent="El codi no és correcte. Torna-ho a provar."; er.hidden=false; return; }
      toast("Doble factor activat."); entrar(); };
  }catch(e){ marc('<h1>No s\'ha pogut activar el doble factor</h1><p>'+esc(textError(e))+'</p><button class="btn primary" id="retry">Tornar a provar</button>'); $("#retry").onclick=()=>entrar(); }
}
function pantallaCodiMFA(factorId){
  marc('<h1>Codi de verificació</h1><p>Escriu el codi de 6 xifres de l\'aplicació d\'autenticació del teu mòbil.</p><form class="form" id="fmf" novalidate style="grid-template-columns:1fr"><div class="field"><label for="mf_c">Codi</label><input id="mf_c" inputmode="numeric" autocomplete="one-time-code" maxlength="6"></div><div class="alert" id="mferr" hidden></div><button class="btn primary" type="submit" style="justify-content:center;padding:12px">Verificar</button></form><div class="auth-links"><button class="btn ghost sm" id="sortir">Sortir</button></div><p class="note" style="margin:0">Si has perdut el mòbil, demana a la Direcció General que et restableixi el doble factor.</p>');
  $("#sortir").onclick=sortir; $("#mf_c").focus();
  $("#fmf").onsubmit=async e=>{ e.preventDefault(); const er=$("#mferr");
    const {error}=await sb.auth.mfa.challengeAndVerify({factorId,code:$("#mf_c").value.trim()});
    if(error){ er.textContent="El codi no és correcte."; er.hidden=false; return; }
    entrar(); };
}

/* ---- Tauleta del casal ----
   La tauleta té un compte propi (perfil "tauleta") que queda obert. Cada persona s'identifica amb el seu PIN:
   el servidor el comprova i obre la sessió d'aquella persona. En sortir, la tauleta torna a la pantalla del PIN. */
const KS={pin:"",err:"",clock:null,idle:null,kelio:false,ocupat:false};
const llegirTauleta = () => { try{ return JSON.parse(localStorage.getItem("casals-tauleta")||"null"); }catch(e){ return null; } };
async function guardarTauleta(){
  const {data:{session}}=await sb.auth.getSession();
  if(session && ME && ME.rol==="tauleta") try{ localStorage.setItem("casals-tauleta",JSON.stringify({access_token:session.access_token,refresh_token:session.refresh_token,casal:ME.casal})); }catch(e){}
}
async function tornarTauleta(){
  const t=llegirTauleta(); if(!t) return false;
  const {error}=await sb.auth.setSession({access_token:t.access_token,refresh_token:t.refresh_token});
  if(error){ try{ localStorage.removeItem("casals-tauleta"); }catch(e){} return false; }
  return true;
}
function kelioObert(){ KS.kelio=true; }
function kelioTornada(){ if(!KS.kelio || document.visibilityState!=="visible") return; KS.kelio=false; if(ME&&ME.rol==="tauleta"){ KS.pin=""; KS.err=""; pantallaTauleta(); } toast("Benvingut/da de nou a Casals."); }
document.addEventListener("visibilitychange",kelioTornada); window.addEventListener("focus",kelioTornada);
document.addEventListener("click",e=>{ if(e.target.closest&&e.target.closest("[data-kelio]")){ kelioObert(); setTimeout(()=>{ if(document.hasFocus()){ KS.kelio=true; toast("Kelio s'obre en una pestanya nova. Quan acabis, tanca-la i tornaràs aquí."); } },900); } });

function pantallaTauleta(){
  closeOverlay();
  const ara=new Date(), cs=CASALS_DEF.find(c=>c.id===ME.casal)||{nom:""};
  $("#root").innerHTML='<div class="kq"><header class="kq-top"><div class="brand2"><div class="bm">AM</div><div><b>Casals Ave Maria</b><small>'+esc(cs.nom)+'</small></div></div></header><div class="kq-lock"><div class="kq-left"><div class="kq-clock"><b id="kqClock" class="num">'+horaAra()+'</b><span>'+ara.toLocaleDateString("ca-ES",{weekday:"long",day:"numeric",month:"long"})+'</span></div>'+
    '<a class="kq-kelio" href="'+KELIO+'" target="_blank" rel="noopener noreferrer" data-kelio>'+ICON.clock+'<span><b>Fitxar i RR.HH.</b><small>Entrada i sortida, vacances i permisos a Kelio</small></span>'+ICON.ext+'</a>'+
    '<p class="kq-khint">Kelio s\'obre en una pestanya nova. Quan acabis, tanca-la i tornaràs a aquesta pantalla.</p></div>'+
    '<div class="kq-pad"><p>Entrar al programa</p><span class="kq-hint">Escriu el teu PIN de 4 xifres</span><div class="kq-dots">'+[0,1,2,3].map(i=>'<i class="'+(i<KS.pin.length?"on":"")+'"></i>').join("")+'</div><div class="kq-err">'+esc(KS.err)+'</div>'+
    '<div class="kq-keys">'+["1","2","3","4","5","6","7","8","9","del","0","ok"].map(k=>'<button data-kk="'+k+'" aria-label="'+(k==="del"?"Esborrar":k==="ok"?"Acceptar":k)+'"'+(KS.ocupat?' disabled':'')+'>'+(k==="del"?"⌫":k==="ok"?ICON.check:k)+'</button>').join("")+'</div>'+
    '<button class="btn ghost sm" id="kqNou" style="margin-top:12px">Sóc nou/nova al casal: demanar accés</button><button class="btn ghost sm" id="kqMail" style="margin-top:6px">Entrar amb correu i contrasenya</button></div></div>'+
    '<p class="kq-legal">El PIN és personal. No el diguis a ningú. · Coordinació entra amb correu i contrasenya. · <button class="lnk" id="kqOff">Desconnectar la tauleta</button></p></div>';
  clearInterval(KS.clock); KS.clock=setInterval(()=>{ const c=$("#kqClock"); if(c) c.textContent=horaAra(); else clearInterval(KS.clock); },1000);
  const press=async k=>{ if(KS.ocupat) return; KS.err="";
    if(k==="del") KS.pin=KS.pin.slice(0,-1); else if(k!=="ok" && KS.pin.length<4) KS.pin+=k;
    if(KS.pin.length===4 || (k==="ok" && KS.pin.length===4)){ const pin=KS.pin; KS.pin=""; KS.ocupat=true; pantallaTauleta();
      try{
        const r=await fn("pin-login",{pin});
        await guardarTauleta();
        const {error}=await sb.auth.verifyOtp({token_hash:r.token_hash,type:"magiclink"});
        if(error) throw error;
        KS.ocupat=false; return entrar();
      }catch(e){ KS.ocupat=false; KS.err=/PIN incorrecte/.test(e.message)?"PIN incorrecte. Torna-ho a provar.":e.message||"No s'ha pogut entrar."; }
    }
    pantallaTauleta(); };
  document.querySelectorAll("[data-kk]").forEach(b=>b.onclick=()=>press(b.dataset.kk));
  document.onkeydown=e=>{ if(!ME||ME.rol!=="tauleta") return; if(/^[0-9]$/.test(e.key)) press(e.key); else if(e.key==="Backspace") press("del"); else if(e.key==="Enter") press("ok"); };
  $("#kqNou").onclick=()=>formSollicitud(x=>fn("usuaris",{accio:"sollicitar",...x}));
  $("#kqMail").onclick=async()=>{ await guardarTauleta(); deixarEscoltar(); await sb.auth.signOut({scope:"local"}); ME=null; pantallaAcces("entrar"); };
  $("#kqOff").onclick=()=>{ overlay(hdr("Desconnectar la tauleta")+'<p style="margin:0">La tauleta deixarà d\'estar configurada i caldrà la contrasenya del compte de la tauleta per tornar-la a connectar.</p><div class="m-f"><button class="btn ghost" data-close>Cancel·lar</button><button class="btn danger" id="okOff">Desconnectar</button></div>');
    $("#okOff").onclick=async()=>{ try{ localStorage.removeItem("casals-tauleta"); }catch(e){} await sb.auth.signOut({scope:"local"}); ME=null; pantallaAcces("entrar","Tauleta desconnectada."); }; };
}

/* ---------- Accés sense correu: sol·licitud des de la tauleta ----------
   Per al personal que no té correu corporatiu (neteja, monitors, talleristes, voluntariat…). La persona omple el formulari a la
   tauleta; la Supervisió la valida a Equip, li tria el perfil i li posa un PIN. Només podrà entrar amb el PIN a la tauleta. */
const POSICIONS=[["neteja","Neteja"],["tallerista","Monitor/a o tallerista"],["voluntari","Voluntari/ària"],["dinamitzador","Animació"],["informador","Informació"],["altres","Altres"]];
function formSollicitud(enviar){
  overlay(hdr("Demanar accés al programa","Per a qui no té correu de la Fundació")+'<form class="form" id="fsl" novalidate>'+
    '<div class="field"><label for="sl_n">Nom</label><input id="sl_n" autocomplete="off" maxlength="60"></div><div class="field"><label for="sl_c">Cognoms</label><input id="sl_c" autocomplete="off" maxlength="80"></div>'+
    '<div class="field full"><label for="sl_p">Quina feina fas al casal?</label><select id="sl_p">'+POSICIONS.map(p=>'<option value="'+p[0]+'">'+p[1]+'</option>').join("")+'</select></div>'+
    '<p class="note full" style="margin:0">La Direcció General revisarà la sol·licitud i et donarà <b>en persona</b> el teu PIN de 4 xifres. Només el faràs servir en aquesta tauleta.</p>'+
    '<div class="full alert" id="slerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Enviar la sol·licitud</button></div></form>');
  $("#fsl").onsubmit=async e=>{ e.preventDefault(); const er=$("#slerr"), b=e.target.querySelector("[type=submit]");
    const x={nom:$("#sl_n").value.trim(),cognoms:$("#sl_c").value.trim(),posicio:$("#sl_p").value};
    if(x.nom.length<2||x.cognoms.length<2){ er.textContent="Escriu el nom i els cognoms."; er.hidden=false; return; }
    b.disabled=true;
    try{ await enviar(x); overlay(hdr("Sol·licitud enviada")+'<p style="margin:0">Gràcies, '+esc(x.nom)+'. La Direcció General et donarà el PIN en persona. Fins aleshores no podràs entrar al programa.</p><div class="m-f"><button class="btn primary" data-close>D\'acord</button></div>'); }
    catch(err){ er.textContent=err.message||"No s'ha pogut enviar."; er.hidden=false; b.disabled=false; } };
}

async function sortir(){
  const eraTauleta=ME&&ME.rol==="tauleta";
  if(ME && !eraTauleta && D) await logCanvi("Sortida del programa", ME.nom||ME.email);
  deixarEscoltar(); clearTimeout(progT);
  await sb.auth.signOut({scope:"local"}); ME=null; D=null; S.user=null; ROWS=new Map(); LAST=new Map();
  if(!eraTauleta && await tornarTauleta()) return entrar();
  pantallaAcces();
}
function logout(){ sortir(); }
async function entrar(){
  marc('<p>Carregant…</p>');
  const {data:{user}}=await sb.auth.getUser();
  if(!user) return pantallaAcces();
  const {data:p,error}=await sb.from("perfils").select("*").eq("id",user.id).single();
  if(error||!p){ marc('<h1>No s\'ha pogut entrar</h1><p>El compte no té perfil. Parla amb la Direcció General.</p><button class="btn ghost" id="sortir">Sortir</button>'); $("#sortir").onclick=sortir; return; }
  ME=p; S.user=p.id;
  if(p.rol==="pendent"||!p.actiu) return pantallaPendent();
  if(!(await comprovarMFA())) return;
  if(p.rol==="tauleta"){ await guardarTauleta(); KS.pin=""; KS.err=""; return pantallaTauleta(); }
  S.rol=p.rol;
  if(p.casal&&p.casal!=="tots") S.casal=p.casal; else if(!S.casal) S.casal="tots";
  if(S.uiUser!==p.id){ S.view="inici"; S.casal=p.casal&&p.casal!=="tots"?p.casal:"tots"; S.petF=null; S.nc=null; S._usuaris=null; } S.uiUser=p.id;
  if(p.rol==="neteja") S.view="comandes";
  try{ await carregar(); }catch(e){ marc('<h1>No s\'han pogut carregar les dades</h1><p>'+esc(textError(e))+'</p><button class="btn primary" id="retry">Tornar a provar</button>'); $("#retry").onclick=()=>entrar(); return; }
  escoltar();
  if(esCoordRol(p.rol)) llegirAuditoria();
  if(can("equip","C")) carregarUsuaris();
  logCanvi("Entrada al programa", p.nom||p.email);
  render();
}
async function boot(){
  if(!CFG.url||!window.supabase){ marc('<h1>Falta la configuració</h1><p>Revisa el fitxer config.js.</p>'); return; }
  let recuperant=/type=(recovery|invite)/.test(location.hash);
  sb.auth.onAuthStateChange(ev=>{
    if(ev==="PASSWORD_RECOVERY"){ recuperant=true; pantallaNovaContrasenya(); }
    if(ev==="TOKEN_REFRESHED" && ME && ME.rol==="tauleta") guardarTauleta();
  });
  const {data:{session}}=await sb.auth.getSession();
  if(recuperant) return pantallaNovaContrasenya();
  if(!session){ if(await tornarTauleta()) return entrar(); return pantallaAcces(); }
  entrar();
}

/* ---------- Equip i accessos (usuaris del programa) ----------
   Les altes, baixes, perfils i PIN els fa NOMÉS la Supervisió, a través de la funció de servidor "usuaris".
   Coordinació i Animació poden consultar la llista. */
const treb = id => id && ME && id===ME.id ? ME : (S._usuaris||[]).find(u=>u.id===id);
const nomT = p => p ? (p.nom||p.email||"—") : "—";
const casalT = p => !p.casal ? "—" : p.casal==="tots" ? "Els dos casals" : ((D&&casal(p.casal))||{nom:p.casal}).nom;
const trebsVisibles = () => (S._usuaris||[]).filter(t=>t.rol!=="tauleta" && (S.casal==="tots"||t.casal==="tots"||t.casal===S.casal));
const esSup = () => ME && ME.rol==="supervisio";
const esResp = () => S.rol==="tallerista"||S.rol==="voluntari";
const ROLS_ALTA=[["supervisio","Supervisió (Direcció General)"],["direccio","Coordinació"],["dinamitzador","Animació sociocultural"],["informador","Informador/a"],["neteja","Neteja"],["tallerista","Tallerista (passa llista de les seves activitats)"],["voluntari","Voluntari/ària (passa llista de les seves activitats)"],["ajuntament","Ajuntament (només informes)"],["pendent","Sense accés"]];
async function carregarUsuaris(){
  try{
    if(esSup()){ const r=await fn("usuaris",{accio:"llistar"}); S._usuaris=r.usuaris;
      try{ const q=await fn("usuaris",{accio:"sollicituds"}); const ant=(S._sol||[]).length; S._sol=q.sollicituds||[]; if(S._sol.length && !ant && S.view!=="equip") toast("Tens "+S._sol.length+" sol·licitud"+(S._sol.length>1?"s":"")+" d'accés pendent"+(S._sol.length>1?"s":"")+" a Equip."); }catch(e){ S._sol=S._sol||[]; } }
    else { const {data,error}=await sb.from("perfils").select("id,email,nom,rol,casal,actiu,creat").order("creat"); if(error) throw error; S._usuaris=data||[]; }
  }catch(e){ S._usuaris=S._usuaris||[]; toast("No s'han pogut carregar els usuaris: "+textError(e)); }
  if(S.view==="equip"||S.view==="inici") render();
}
VIEWS.equip = () => {
  const us=S._usuaris;
  const fila=t=>'<div class="row" style="flex-wrap:wrap"><span class="avatar">'+esc(((t.nom||t.email||"?").split(/\s+/).map(x=>x[0]).join("").slice(0,2)).toUpperCase())+'</span><div class="t" style="min-width:240px"><b>'+esc(nomT(t))+(t.actiu?'':' · desactivat')+(ME&&t.id===ME.id?' <span class="chip">Tu</span>':'')+'</b><span>'+esc(t.sense_correu?"Sense correu · entra amb PIN a la tauleta":(t.email||""))+' · '+esc(casalT(t))+' · Perfil: '+esc(ROLS[t.rol]||(t.rol==="tauleta"?"Tauleta del casal":t.rol==="pendent"?"Sense accés":t.rol))+'</span></div>'+
    (esSup()&&ROLS_PIN.includes(t.rol)?'<span class="chip '+(t.pin?'good':'warn')+'">'+(t.pin?'Té PIN':'Sense PIN')+'</span>':'')+
    (esSup()?'<button class="btn sm" data-eus="'+t.id+'">Editar</button>'+(ROLS_PIN.includes(t.rol)&&t.actiu?'<button class="btn sm" data-pus="'+t.id+'">PIN</button>':'')+(t.rol!=="tauleta"&&!t.sense_correu?'<button class="btn sm ghost" data-rus="'+t.id+'">Enllaç de contrasenya</button>':''):'')+'</div>';
  const persones=(us||[]).filter(t=>t.rol!=="tauleta"), tauletes=(us||[]).filter(t=>t.rol==="tauleta");
  return '<div class="head"><div><h1>Equip i accessos</h1><p>'+(us?persones.filter(t=>t.actiu).length+' persones amb accés':'Carregant…')+'</p></div></div>'+
    '<section class="panel"><div class="panel-h"><div><h2>Fitxatges, vacances i permisos</h2><p style="margin:2px 0 0;color:var(--muted);font-size:14px">Es gestionen a Kelio, el programa de RR.HH. de la Fundació. S\'obre en una pestanya nova.</p></div><a class="btn kelio-b" href="'+KELIO+'" target="_blank" rel="noopener noreferrer" data-kelio>'+ICON.clock+'Obrir Kelio</a></div></section>'+
    (esSup()&&(S._sol||[]).length?'<section class="panel" style="border:2px solid var(--accent)"><div class="panel-h"><div><h2>Sol·licituds d\'accés des de les tauletes</h2><p style="margin:2px 0 0;color:var(--muted);font-size:14px">Persones sense correu de la Fundació. En validar-les, tries el perfil i el PIN. Només podran entrar amb PIN a la tauleta.</p></div></div><div class="list">'+
      S._sol.map(x=>'<div class="row" style="flex-wrap:wrap"><div class="t" style="min-width:220px"><b>'+esc(x.nom+" "+x.cognoms)+'</b><span>'+esc((POSICIONS.find(p=>p[0]===x.posicio)||["",x.posicio])[1])+' · '+esc(casalT({casal:x.casal}))+' · '+fdata(String(x.creat).slice(0,10))+'</span></div><button class="btn sm primary" data-slok="'+x.id+'">Validar i posar PIN</button><button class="btn sm ghost danger" data-slno="'+x.id+'">Rebutjar</button></div>').join("")+'</div></section>':'')+
    '<section class="panel"><div class="panel-h"><h2>Persones amb accés al programa</h2>'+(esSup()?'<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" id="nouSC">'+ICON.plus+'Persona sense correu</button><button class="btn sm primary" id="nouUs">'+ICON.plus+'Nova persona</button></div>':'')+'</div>'+
    (esSup()?'':'<p class="note" style="margin:0">Només la Direcció General (Supervisió) dona d\'alta i de baixa usuaris i canvia perfils i PIN.</p>')+
    '<div class="list">'+(persones.map(fila).join("")||'<div class="empty">'+(us?'Encara no hi ha ningú.':'Carregant…')+'</div>')+'</div></section>'+
    (esSup()?'<section class="panel"><div class="panel-h"><div><h2>Tauletes dels casals</h2><p style="margin:2px 0 0;color:var(--muted);font-size:14px">Compte del dispositiu de cada casal. Hi entren amb PIN Animació, Informació, Neteja, talleristes i voluntariat.</p></div><button class="btn sm" id="nouTau">'+ICON.plus+'Nova tauleta</button></div><div class="list">'+(tauletes.map(fila).join("")||'<div class="empty">Cap tauleta configurada.</div>')+'</div></section>':'');
};
function formUsuari(id){
  const t=id?treb(id):{nom:"",email:"",rol:"informador",casal:S.casal==="tots"?"c1":S.casal,actiu:true};
  overlay(hdr(id?"Editar usuari":"Nova persona","Equip")+'<form class="form" id="fus" novalidate>'+
    '<div class="field full"><label for="us_n">Nom i cognoms</label><input id="us_n" value="'+esc(t.nom||"")+'"></div>'+
    '<div class="field full"><label for="us_e">Correu electrònic</label><input id="us_e" type="email" value="'+esc(t.email||"")+'"'+(id?' disabled':'')+'></div>'+
    (t.rol==="tauleta"?'':'<div class="field"><label for="us_r">Perfil</label><select id="us_r">'+ROLS_ALTA.map(o=>'<option value="'+o[0]+'"'+(t.rol===o[0]?' selected':'')+'>'+o[1]+'</option>').join("")+'</select></div>')+
    '<div class="field"><label for="us_c">Casal</label><select id="us_c">'+[["c1","Casal de Ribes"],["c2","Casal de Roquetes"],["tots","Els dos casals"]].map(o=>'<option value="'+o[0]+'"'+(t.casal===o[0]?' selected':'')+'>'+o[1]+'</option>').join("")+'</select></div>'+
    (id?'<label class="check full"><input type="checkbox" id="us_a"'+(t.actiu?' checked':'')+'>Actiu (si el desactives, se li tanquen totes les sessions i perd el PIN)</label>':'<p class="note full" style="margin:0">Li arribarà una invitació per correu per triar la contrasenya. Supervisió haurà d\'activar el doble factor el primer cop.</p>')+
    '<div class="full alert" id="userr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">'+(id?'Desar':'Enviar la invitació')+'</button></div></form>');
  $("#fus").onsubmit=async e=>{ e.preventDefault(); const er=$("#userr"), btn=e.target.querySelector("[type=submit]"), v=k=>{ const x=$("#us_"+k); return x?x.value.trim():undefined; };
    const fail=m=>{ er.textContent=m; er.hidden=false; btn.disabled=false; };
    if(!v("n")) return fail("Cal el nom.");
    btn.disabled=true;
    try{
      if(id){
        const actiu=$("#us_a").checked;
        const cos={accio:"actualitzar",id,nom:v("n"),casal:v("c"),actiu}; if(v("r")!==undefined) cos.rol=v("r");
        if(!actiu && t.actiu){ closeOverlay(); return confirmMotiu("Donar de baixa "+nomT(t),"Se li tancaran totes les sessions i ja no podrà entrar al programa.","Donar de baixa",async m=>{ try{ await fn("usuaris",{...cos,motiu:m}); toast("Usuari desactivat."); carregarUsuaris(); }catch(err){ toast(err.message); } }); }
        await fn("usuaris",cos); toast("Desat.");
      } else {
        if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v("e"))) return fail("Correu no vàlid.");
        await fn("usuaris",{accio:"crear",nom:v("n"),email:v("e"),rol:v("r"),casal:v("c")}); toast("Invitació enviada a "+v("e")+".");
      }
      closeOverlay(); carregarUsuaris();
    }catch(err){ fail(err.message); }
  };
}
/* Alta d'una persona sense correu (des d'una sol·licitud de la tauleta o directament). Entra només amb PIN a la tauleta. */
function formSenseCorreu(sol){
  const pos=sol?sol.posicio:"neteja", rol0=pos==="altres"?"tallerista":pos;
  overlay(hdr(sol?"Validar la sol·licitud":"Persona sense correu","Equip")+'<form class="form" id="fsc" novalidate>'+
    '<div class="field full"><label for="sc_n">Nom i cognoms</label><input id="sc_n" value="'+esc(sol?sol.nom+" "+sol.cognoms:"")+'"></div>'+
    '<div class="field"><label for="sc_r">Perfil</label><select id="sc_r">'+ROLS_ALTA.filter(o=>ROLS_PIN.includes(o[0])).map(o=>'<option value="'+o[0]+'"'+(rol0===o[0]?' selected':'')+'>'+o[1]+'</option>').join("")+'</select></div>'+
    '<div class="field"><label for="sc_c">Casal</label><select id="sc_c">'+[["c1","Casal de Ribes"],["c2","Casal de Roquetes"],["tots","Els dos casals"]].map(o=>'<option value="'+o[0]+'"'+((sol?sol.casal:(S.casal==="tots"?"c1":S.casal))===o[0]?' selected':'')+'>'+o[1]+'</option>').join("")+'</select></div>'+
    '<div class="field full"><label for="sc_p">PIN (4 xifres)</label><input id="sc_p" inputmode="numeric" maxlength="4" autocomplete="off"></div>'+
    '<p class="note full" style="margin:0">No té correu: només podrà entrar amb aquest PIN a la tauleta del casal. Digues-li el PIN en persona. Es guarda xifrat i no es pot tornar a veure.</p>'+
    '<div class="full alert" id="scerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">'+(sol?'Validar i donar d\'alta':'Donar d\'alta')+'</button></div></form>');
  $("#fsc").onsubmit=async e=>{ e.preventDefault(); const er=$("#scerr"), btn=e.target.querySelector("[type=submit]"); btn.disabled=true;
    const cos={accio:sol?"validar":"crear_sense_correu",id:sol?sol.id:undefined,nom:$("#sc_n").value.trim(),rol:$("#sc_r").value,casal:$("#sc_c").value,pin:$("#sc_p").value.trim()};
    try{ await fn("usuaris",cos); closeOverlay(); toast(cos.nom+" ja pot entrar amb el PIN a la tauleta."); carregarUsuaris(); }
    catch(err){ er.textContent=err.message; er.hidden=false; btn.disabled=false; } };
}
function formPin(id){
  const t=treb(id);
  overlay(hdr("PIN de la tauleta",nomT(t))+'<form class="form" id="fpi" novalidate><div class="field full"><label for="pi_p">PIN nou (4 xifres)</label><input id="pi_p" inputmode="numeric" maxlength="4" autocomplete="off"></div>'+
    '<p class="note full" style="margin:0">Digues-lo a la persona en privat. Es guarda xifrat: ningú, ni tu, el podrà tornar a veure. No s\'accepten PIN fàcils (1111, 1234, un any…).</p>'+
    '<div class="full alert" id="pierr" hidden></div><div class="m-f full">'+(t.pin?'<button type="button" class="btn ghost danger" id="piDel">Treure el PIN</button>':'')+'<button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Desar el PIN</button></div></form>');
  $("#fpi").onsubmit=async e=>{ e.preventDefault(); const er=$("#pierr");
    try{ await fn("usuaris",{accio:"pin",id,pin:$("#pi_p").value.trim()}); closeOverlay(); toast("PIN desat."); carregarUsuaris(); }
    catch(err){ er.textContent=err.message; er.hidden=false; } };
  const pd=$("#piDel"); if(pd) pd.onclick=async()=>{ try{ await fn("usuaris",{accio:"treure_pin",id}); closeOverlay(); toast("PIN retirat."); carregarUsuaris(); }catch(err){ toast(err.message); } };
}
function formTauleta(){
  overlay(hdr("Nova tauleta","Equip")+'<form class="form" id="fta" novalidate>'+
    '<div class="field"><label for="ta_c">Casal</label><select id="ta_c"><option value="c1">Casal de Ribes</option><option value="c2">Casal de Roquetes</option></select></div>'+
    '<div class="field"><label for="ta_e">Correu del compte</label><input id="ta_e" type="email" placeholder="tauleta.ribes@avemariafundacio.org"></div>'+
    '<div class="field full"><label for="ta_p">Contrasenya (mínim 14 caràcters)</label><input id="ta_p" type="password" autocomplete="new-password"></div>'+
    '<p class="note full" style="margin:0">Després, a la tauleta, entra amb aquest correu i contrasenya. La tauleta quedarà oberta a la pantalla del PIN. No cal que el correu existeixi de veritat.</p>'+
    '<div class="full alert" id="taerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Crear</button></div></form>');
  $("#fta").onsubmit=async e=>{ e.preventDefault(); const er=$("#taerr");
    try{ await fn("usuaris",{accio:"tauleta",casal:$("#ta_c").value,email:$("#ta_e").value.trim(),password:$("#ta_p").value}); closeOverlay(); toast("Tauleta creada."); carregarUsuaris(); }
    catch(err){ er.textContent=err.message; er.hidden=false; } };
}
BIND.equip = () => {
  if(!S._usuaris) carregarUsuaris();
  const nu=$("#nouUs"); if(nu) nu.onclick=()=>formUsuari();
  const nt=$("#nouTau"); if(nt) nt.onclick=()=>formTauleta();
  const sc=$("#nouSC"); if(sc) sc.onclick=()=>formSenseCorreu(null);
  document.querySelectorAll("[data-slok]").forEach(b=>b.onclick=()=>formSenseCorreu((S._sol||[]).find(x=>x.id===b.dataset.slok)));
  document.querySelectorAll("[data-slno]").forEach(b=>b.onclick=()=>{ const x=(S._sol||[]).find(y=>y.id===b.dataset.slno); confirmMotiu("Rebutjar la sol·licitud de "+x.nom,"La persona no tindrà accés al programa.","Rebutjar",async m=>{ try{ await fn("usuaris",{accio:"rebutjar",id:x.id,motiu:m}); toast("Sol·licitud rebutjada."); carregarUsuaris(); }catch(e){ toast(e.message); } }); });
  document.querySelectorAll("[data-eus]").forEach(b=>b.onclick=()=>formUsuari(b.dataset.eus));
  document.querySelectorAll("[data-pus]").forEach(b=>b.onclick=()=>formPin(b.dataset.pus));
  document.querySelectorAll("[data-rus]").forEach(b=>b.onclick=async()=>{ try{ await fn("usuaris",{accio:"reenviar",id:b.dataset.rus}); toast("Enllaç enviat."); }catch(e){ toast(e.message); } });
};

/* ---------- Informes publicats per a l'Ajuntament ---------- */
function netejaHTML(h){
  const d=new DOMParser().parseFromString(String(h||""),"text/html");
  d.querySelectorAll("script,iframe,object,embed,link,meta,style,form,input,textarea,select,button").forEach(x=>x.remove());
  d.querySelectorAll("*").forEach(el=>[...el.attributes].forEach(a=>{ if(/^on/i.test(a.name)||/^\s*javascript:/i.test(a.value)||(a.name==="src"&&!/^data:image\//.test(a.value))) el.removeAttribute(a.name); }));
  return d.body.innerHTML;
}
function informesAjuntament(){
  const ms=Object.keys(D.informes||{}).sort();
  const cap='<div class="eyebrow">Contracte 01040604/2026/9 · Ajuntament de Sant Pere de Ribes</div><h1>Informes i justificació</h1>';
  if(!ms.length) return '<div class="head"><div>'+cap+'<p>Encara no hi ha cap mes tancat i publicat per la Fundació.</p></div></div>';
  if(!S.mesAj||!ms.includes(S.mesAj)) S.mesAj=ms[ms.length-1];
  const I=D.informes[S.mesAj];
  return '<div class="head no-print"><div>'+cap+'<p>Informe publicat per la Fundació el '+fdata((I.generat||"").slice(0,10))+'.</p></div><button class="btn primary" id="ajPrint">Imprimir</button></div>'+
    '<div class="filters no-print" role="group" aria-label="Mes">'+ms.map(m=>'<button data-mesaj="'+m+'" aria-pressed="'+(m===S.mesAj)+'">'+esc(nomMes(m))+'</button>').join("")+'</div>'+
    '<div id="report">'+netejaHTML(I.html)+'</div>';
}
/** Genera l'informe del mes amb tots els apartats i el desa perquè el vegi l'Ajuntament. */
function publicarMes(m){
  const des=S.rDes, fins=S.rFins, sec=S.rSec, vista=S.view;
  const ult=ultimDia(m), AV=isoAvui();
  S.rDes=m+"-01"<INICI_CONTRACTE?INICI_CONTRACTE:m+"-01"; S.rFins=ult>AV?AV:ult; S.rSec=SECCIONS.map(x=>x[0]); S.view="informes";
  const tmp=document.createElement("div"); tmp.innerHTML=VIEWS_INFORMES_INTERN();
  const r=tmp.querySelector("#report"); let html="";
  if(r){ r.querySelectorAll(".no-print,button").forEach(x=>x.remove()); html=r.innerHTML; }
  S.rDes=des; S.rFins=fins; S.rSec=sec; S.view=vista;
  D.informes[m]={mes:m,generat:araIso(),html};
}

/* ---------- Arribades ---------- */
const norm = t => String(t||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();
const horaAra = () => { const n=new Date(); return String(n.getHours()).padStart(2,"0")+":"+String(n.getMinutes()).padStart(2,"0"); };
const arribadesAvui = () => { const AV=isoAvui(); return D.casals.filter(inCasal).flatMap(c=>(D.arribades[c.id+"|"+AV]||[]).map(x=>Object.assign({c:c.id},x))).sort((a,b)=>b.h.localeCompare(a.h)); };
const arribadaDe = sid => { const s=soci(sid); return s ? (D.arribades[s.casal+"|"+isoAvui()]||[]).find(x=>x.s===sid) : null; };
const actsAvuiDe = sid => D.activitats.filter(a=>actEnData(a,isoAvui()) && a.inscrits.includes(sid)).sort((a,b)=>mins(horaEn(a,isoAvui()).inici)-mins(horaEn(b,isoAvui()).inici));
function marcarArribada(sid){
  const s=soci(sid), AV=isoAvui(), k=s.casal+"|"+AV; const arr=D.arribades[k]||(D.arribades[k]=[]);
  if(arr.find(x=>x.s===sid)) return; const h=horaAra(); arr.push({s:sid,h});
  const acts=actsAvuiDe(sid); acts.forEach(a=>{ const kk=a.id+"|"+AV, l=D.assist[kk]||(D.assist[kk]=[]); if(!l.includes(sid)) l.push(sid); });
  save(); toast("Benvingut/da, "+s.nom+"! Arribada a les "+h+(acts.length?" · present a "+acts.map(a=>a.nom).join(" i "):"")+".");
}
function desferArribada(sid){
  const s=soci(sid), AV=isoAvui(), k=s.casal+"|"+AV;
  D.arribades[k]=(D.arribades[k]||[]).filter(x=>x.s!==sid);
  actsAvuiDe(sid).forEach(a=>{ const kk=a.id+"|"+AV; if(D.assist[kk]) D.assist[kk]=D.assist[kk].filter(x=>x!==sid); });
  save(); toast("Arribada de "+s.nom+" desfeta.");
}
function ckCard(s){
  const ar=arribadaDe(s.id), acts=actsAvuiDe(s.id);
  const info='Núm. '+s.num+(S.casal==="tots"?' · '+esc(casal(s.casal).curt):'')+(acts.length?' · Avui: '+acts.map(a=>esc(a.nom)+' '+horaEn(a,isoAvui()).inici).join(', '):'');
  return '<div class="ck-p'+(ar?' in':'')+'"><span class="avatar">'+inicials(s)+'</span><div class="t"><b>'+esc(nomComplet(s))+'</b><span>'+info+'</span></div>'+
    (ar?'<span class="ck-ok">'+ICON.check+'Ha arribat a les '+ar.h+'</span><button class="btn sm ghost" data-ckundo="'+s.id+'">Desfer</button>'
       :'<button class="ck-go" data-ck="'+s.id+'">'+ICON.check+'Ha arribat</button>')+'</div>';
}
function ckResults(q){
  const base=D.socis.filter(inCasal).filter(s=>!s.baixa); let list, title="";
  if(!q.trim()){
    list=base.filter(s=>actsAvuiDe(s.id).length && !arribadaDe(s.id)).sort((a,b)=>mins(actsAvuiDe(a.id)[0].inici)-mins(actsAvuiDe(b.id)[0].inici)).slice(0,4);
    title = list.length ? 'Tenen activitat avui i encara no han arribat' : '';
  } else {
    const t=norm(q.trim()), w=t.split(/\s+/);
    list=base.filter(s=>{ const h=norm(nomComplet(s)+" "+s.num+" "+s.tel); return w.every(x=>h.includes(x)); })
      .sort((a,b)=>(norm(a.nom).startsWith(t)?0:1)-(norm(b.nom).startsWith(t)?0:1)||nomComplet(a).localeCompare(nomComplet(b))).slice(0,6);
    if(!list.length) return '<div class="ck-empty">No trobem ningú amb «'+esc(q)+'». Prova amb el número de soci.</div>';
  }
  return (title?'<div class="ck-tt">'+title+'</div>':'')+list.map(ckCard).join("");
}
const fTel = t => String(t||"").replace(/\D/g,"").replace(/^(\d{3})(\d{2})(\d{2})(\d{2})$/,"$1 $2 $3 $4");
function absencies(){
  const AV=isoAvui(), P=participacio();
  return D.socis.filter(inCasal).filter(s=>!s.baixa).map(s=>{ const last=P[s.id]&&P[s.id].last; const ref=last||(s.alta>INICI_CONTRACTE?s.alta:INICI_CONTRACTE); return {s,last,d:diesEntre(ref,AV)}; })
    .filter(o=>o.d>7).sort((a,b)=>b.d-a.d||nomComplet(a.s).localeCompare(nomComplet(b.s)));
}
function absenciesHTML(){
  const l=absencies(), r=l.filter(o=>o.d>15).length, t=l.length-r, segE=can("seguiment","E");
  if(!l.length) return '<section class="panel absp" id="absencies"><div class="panel-h"><h2>Fa dies que no vénen</h2><span class="chip good">Tothom ha vingut els darrers 7 dies</span></div></section>';
  const vis=S.absAll?l:l.slice(0,3);
  return '<section class="panel absp" id="absencies"><div class="panel-h"><div><h2>Fa dies que no vénen</h2><p class="abs-sub">Truca-les per saber com estan.</p></div><div style="display:flex;gap:8px;flex-wrap:wrap">'+(r?'<span class="chip crit">'+r+' fa més de 15 dies</span>':'')+(t?'<span class="chip warn">'+t+' fa més de 7 dies</span>':'')+'</div></div>'+
  '<div class="abs-list">'+vis.map(o=>{ const s=o.s, red=o.d>15;
    return '<div class="abs-r '+(red?'crit':'warn')+'"><span class="abs-d"><b class="num">'+o.d+'</b>dies</span><div class="t"><button class="abs-n" data-fp="'+s.id+'">'+esc(nomComplet(s))+'</button><span>'+(o.last?'Darrera vegada: '+fdata(o.last):'No ha vingut des de '+(s.alta>INICI_CONTRACTE?'l\'alta, el '+fdata(s.alta):'l\'inici del contracte'))+(S.casal==="tots"?' · '+esc(casal(s.casal).curt):'')+(s.contacte?' · Referència: '+esc(s.contacte):'')+'</span></div>'+
    '<a class="abs-tel" href="tel:+34'+esc(String(s.tel).replace(/\D/g,""))+'" aria-label="Trucar a '+esc(s.nom)+'">'+ICON.phone+'<span class="num">'+esc(fTel(s.tel))+'</span></a>'+
    (segE?'<button class="btn sm ghost" data-abss="'+s.id+'">Anotar trucada</button>':'')+'</div>'; }).join("")+'</div>'+
  (l.length>3?'<button class="btn sm" id="absMes" style="align-self:center">'+(S.absAll?'Mostrar-ne només 3':'Veure-les totes ('+l.length+')')+'</button>':'')+'</section>';
}
function bindAbsencies(){
  document.querySelectorAll("#absencies [data-fp]").forEach(b=>b.onclick=()=>fitxaSoci(b.dataset.fp));
  document.querySelectorAll("#absencies [data-abss]").forEach(b=>b.onclick=()=>formSeguiment(b.dataset.abss));
  const m=$("#absMes"); if(m) m.onclick=()=>{ S.absAll=!S.absAll; render(); };
}
function checkinHTML(){
  const ar=arribadesAvui();
  return '<section class="checkin" id="checkin" aria-label="Marcar arribades"><div class="ck-h"><div class="ck-ic">'+ICON.door+'</div><div class="ck-tx"><h2>Qui ha arribat?</h2><span>Escriu el nom o el número de soci i toca la persona.</span></div><div class="ck-n"><b class="num">'+ar.length+'</b><small>arribades avui</small></div></div>'+
  '<label class="ck-search">'+ICON.search+'<input id="ckq" type="search" autocomplete="off" placeholder="Ex.: Maria, Puig o 1003" aria-label="Cerca la persona que ha arribat"></label>'+
  '<div class="ck-res" id="ckres" aria-live="polite">'+ckResults("")+'</div>'+
  (ar.length?'<div class="ck-av"><span class="ck-avt">Ja són aquí</span>'+ar.slice(0,14).map(x=>{ const s=soci(x.s); return s?'<span class="ck-chip"><b>'+esc(s.nom)+' '+esc(s.cognoms.split(" ")[0])+'</b> '+x.h+'<button data-ckundo="'+s.id+'" aria-label="Desfer l\'arribada de '+esc(s.nom)+'" title="Desfer">'+ICON.x+'</button></span>':''; }).join("")+(ar.length>14?'<span class="ck-chip">+'+(ar.length-14)+'</span>':'')+'</div>':'')+
  '</section>';
}
function bindCheckin(){
  const q=$("#ckq"), res=$("#ckres"); if(!q) return;
  const bindRes=()=>{
    document.querySelectorAll("#checkin [data-ck]").forEach(b=>b.onclick=()=>{ marcarArribada(b.dataset.ck); render(); const n=$("#ckq"); if(n) n.focus(); });
    document.querySelectorAll("#checkin [data-ckundo]").forEach(b=>b.onclick=()=>{ desferArribada(b.dataset.ckundo); const v=$("#ckq").value; render(); const n=$("#ckq"); if(n){ n.value=v; $("#ckres").innerHTML=ckResults(v); bindRes(); n.focus(); } });
  };
  q.oninput=()=>{ res.innerHTML=ckResults(q.value); bindRes(); };
  q.onkeydown=e=>{ if(e.key==="Enter"){ e.preventDefault(); const f=res.querySelector("[data-ck]"); if(f) f.click(); } if(e.key==="Escape"){ q.value=""; res.innerHTML=ckResults(""); bindRes(); } };
  bindRes();
  if(window.innerWidth>760 && !document.querySelector(".scrim")) q.focus({preventScroll:true});
}

VIEWS.inici = () => {
  if(S.rol==="neteja"){ const pend=D.compres.comandes.filter(inCasal).filter(c=>c.estat==="pendent").length;
    return '<div class="head hello2"><div><div class="eyebrow">'+esc(new Date().toLocaleDateString("ca-ES",{weekday:"long",day:"numeric",month:"long"}))+' · '+esc(casal(S.casal).nom)+'</div><h1>Bon dia! Què vols fer?</h1></div></div>'+
    '<nav class="tiles" aria-label="Mòduls"><button class="tile m-comandes" data-nav="comandes">'+ICON.cart+'<span><b>Comandes de neteja</b><small>'+(pend?pend+' pendents d\'aprovar':'Omplir el petitori')+'</small></span></button><a class="tile kelio-t" href="'+KELIO+'" target="_blank" rel="noopener noreferrer" data-kelio>'+ICON.clock+'<span><b>Fitxar i RR.HH.</b><small>Kelio · s\'obre a part</small></span></a></nav>'; }
  const socis=D.socis.filter(inCasal), acts=D.activitats.filter(inCasal);
  const places=acts.reduce((t,a)=>t+a.places,0), ins=acts.reduce((t,a)=>t+a.inscrits.length,0);
  const espera=acts.reduce((t,a)=>t+a.espera.length,0), alrt=socis.filter(s=>alertesDe(s).length).length, acol=socis.filter(s=>s.acollida&&!s.acollida.completada).length;
  const dVista=esAvuiLaborable()?isoAvui():addDays(isoAvui(),7-avuiIdx7()); const avui=acts.filter(a=>actEnData(a,dVista)).sort((a,b)=>mins(horaEn(a,dVista).inici)-mins(horaEn(b,dVista).inici));
  const plenes=acts.filter(a=>a.inscrits.length>=a.places).sort((a,b)=>b.espera.length-a.espera.length);
  const nomCasal = S.casal==="tots" ? "Tots els casals" : casal(S.casal).nom;
  const perEix = Object.keys(EIXOS).map(e=>{ const x=acts.filter(a=>a.eix===e); return {e, n:x.length, ins:x.reduce((t,a)=>t+a.inscrits.length,0)}; });
  const maxE = Math.max(1,...perEix.map(p=>p.ins));
  const AVI=isoAvui(), csI=D.casals.filter(inCasal);
  const incOb=D.manteniment.incidencies.filter(inCasal).filter(i=>i.estat!=="resolta").length;
  const apAvui=csI.find(c=>c.id==="c2") ? D.apats.reserves.filter(r=>r.dia===avuiIdx7()).length : null;
  const comPend=D.compres.comandes.filter(inCasal).filter(c=>c.estat==="pendent").length;
  const sub={inici:"",socis:socis.filter(s=>!s.baixa).length+" persones",seguiment:alrt+" alertes",activitats:avui.length+" "+(esAvuiLaborable()?"avui":"el dilluns"),
    sales:D.reserves.filter(r=>D.sales.filter(inCasal).find(x=>x.id===r.sala)).length+" reserves",comandes:comPend?comPend+" per aprovar":"Cap pendent",
    apats:apAvui===null?"Roquetes":apAvui+" dinars avui",manteniment:incOb+" incidències",informes:MESOS[new Date().getMonth()][0].toUpperCase()+MESOS[new Date().getMonth()].slice(1),config:"Qui pot fer què",equip:trebsVisibles().filter(t=>t.actiu).length+" persones"};
  const dataLlarga=new Date().toLocaleDateString("ca-ES",{weekday:"long",day:"numeric",month:"long"});
  return '<div class="head hello2"><div><div class="eyebrow">'+esc(dataLlarga)+' · '+esc(nomCasal)+'</div><h1>Bon dia! Què vols fer?</h1></div><button class="btn primary" data-go="socis-nou">'+ICON.plus+'Nova persona</button></div>'+
  '<nav class="tiles" aria-label="Mòduls">'+NAVL.filter(n=>n.id!=="inici").map(n=>'<button class="tile m-'+n.id+'" data-nav="'+n.id+'">'+ICON[n.i]+'<span><b>'+n.t+'</b><small>'+esc(sub[n.id]||"")+'</small></span></button>').join("")+'<a class="tile kelio-t" href="'+KELIO+'" target="_blank" rel="noopener noreferrer" data-kelio>'+ICON.clock+'<span><b>Fitxar i RR.HH.</b><small>Kelio · s\'obre a part</small></span></a></nav>'+
  (can("arribades","E")?checkinHTML():'')+(can("absencies","C")?absenciesHTML():'')+
  '<div class="strip"><span><b style="color:var(--accent)">'+avui.length+'</b> activitats '+(esAvuiLaborable()?'avui':'el dilluns')+'</span><span><b style="color:var(--crit)">'+incOb+'</b> incidències obertes</span>'+(apAvui!==null?'<span><b style="color:var(--good)">'+apAvui+'</b> dinars reservats</span>':'')+'<span><b style="color:var(--warn)">'+espera+'</b> en llista d\'espera</span></div>'+
  '<h2 class="sec-t">Així va la setmana</h2>'+
  '<section class="kpis" aria-label="Indicadors">'+
    kpi("Persones usuàries", socis.length, D.casals.length>1&&S.casal==="tots" ? D.casals.map(c=>D.socis.filter(s=>s.casal===c.id).length+" "+c.curt).join(" · ") : "")+
    kpi("Ocupació de places", Math.round(ins/Math.max(1,places)*100)+"%", ins+" de "+places+" places")+
    kpi("A la llista d'espera", espera, plenes.length+" activitats plenes")+
    kpi("Alertes de seguiment", alrt, acol+" persones en acollida")+
  '</section>'+ serveisAvui() +
  '<div class="grid2"><section class="panel"><div class="panel-h"><h2>'+(esAvuiLaborable()?'Avui':'Dilluns')+' al casal</h2><span class="chip">'+avui.length+' activitats</span></div><div class="list">'+
    (avui.length? avui.map(a=>'<div class="row"><div class="time num">'+horaEn(a,dVista).inici+'</div><div class="t"><b>'+esc(a.nom)+'</b><span>'+esc(sala(a.sala).nom)+' · '+a.inscrits.length+'/'+a.places+' inscrits</span></div>'+eixChip(a.eix)+'</div>').join("") : '<div class="empty">No hi ha activitats programades.</div>')+
  '</div></section><section class="panel"><div class="panel-h"><h2>Participació per eix</h2></div><div class="list">'+
    perEix.map(p=>'<div class="row" style="flex-wrap:wrap;gap:8px"><div class="t" style="flex-basis:100%;display:flex;justify-content:space-between"><b style="display:inline">'+EIXOS[p.e]+'</b><span class="num">'+p.ins+' inscripcions</span></div><div class="bar" style="flex:1"><i style="width:'+(p.ins/maxE*100)+'%;background:var(--'+p.e+')"></i></div></div>').join("")+
  '</div></section></div>'+
  '<section class="panel"><div class="panel-h"><h2>Activitats plenes</h2><button class="btn sm ghost" data-go="activitats">Veure totes</button></div><div class="list">'+
    (plenes.length? plenes.map(a=>'<div class="row"><div class="t"><b>'+esc(a.nom)+'</b><span>'+horari(a)+' · '+esc(sala(a.sala).nom)+'</span></div><span class="chip warn">'+a.espera.length+' en espera</span></div>').join("") : '<div class="empty">Encara queden places a totes les activitats.</div>')+
  '</div></section>';
};
function serveisAvui(){
  const cs=D.casals.filter(inCasal);
  if(!cs.find(c=>c.id==="c2")) return '';
  const di7=avuiIdx7(), rs=D.apats.reserves.filter(r=>r.dia===di7);
  const ap='<div class="row"><span class="avatar" style="background:var(--surface2);color:var(--ink)">'+ICON.plate.replace('<svg','<svg width="18" height="18"')+'</span><div class="t"><b>Àpats amb companyia · Roquetes</b><span>'+esc(D.apats.menus[di7].segon)+' · '+rs.filter(r=>!r.pagat).length+' pendents de pagar</span></div><span class="num" style="font-weight:700">'+rs.length+' / '+D.apats.places+'</span><span class="chip">comensals</span></div>';
  return '<section class="panel"><div class="panel-h"><h2>Serveis '+(esAvuiLaborable()?"d'avui":"del dilluns")+'</h2><button class="btn sm ghost" data-go="apats">Àpats</button></div><div class="list">'+ap+'</div></section>';
}
const kpi=(l,v,s)=>'<div class="kpi"><div class="label">'+l+'</div><div class="val num">'+v+'</div>'+(s?'<div class="sub">'+esc(s)+'</div>':'')+'</div>';
BIND.inici = () => { bindCheckin(); bindAbsencies(); document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{ if(b.dataset.go==="socis-nou"){ formSoci(); return; } S.view=b.dataset.go; render(); }); };

VIEWS.socis = () => {
  const q=S.q.trim().toLowerCase();
  const fk=s=> s.baixa ? "baixa" : s.acollida&&!s.acollida.completada ? "acollida" : (alertesDe(s).length ? "alerta" : "activa");
  const list=D.socis.filter(inCasal).filter(s=> (S.fq==="baixa" ? s.baixa : !s.baixa && (S.fq==="tots"||fk(s)===S.fq)) && (!q || (nomComplet(s)+" "+s.num+" "+s.tel).toLowerCase().includes(q)));
  return '<div class="head"><div><h1>Persones usuàries</h1><p>'+D.socis.filter(inCasal).filter(x=>!x.baixa).length+' persones actives'+(S.casal!=="tots"?' a '+esc(casal(S.casal).nom):'')+'.</p></div><button class="btn primary" id="nouSoci">'+ICON.plus+'Nova persona</button></div>'+
  '<div class="toolbar"><label class="search">'+ICON.search+'<input id="q" type="search" placeholder="Cerca per nom, número o telèfon" value="'+esc(S.q)+'" aria-label="Cerca persones"></label>'+
  '<div class="filters" role="group" aria-label="Estat">'+[["tots","Totes"],["activa","Actives"]].concat(can("seguiment","C")?[["acollida","En acollida"],["alerta","Amb alerta"]]:[]).concat([["baixa","Baixes"]]).map(f=>'<button data-fq="'+f[0]+'" aria-pressed="'+(S.fq===f[0])+'">'+f[1]+'</button>').join("")+'</div></div>'+
  '<div class="tablewrap"><table><thead><tr><th>Persona</th><th>Núm.</th><th>Edat</th><th>Telèfon</th>'+(S.casal==="tots"?'<th>Casal</th>':'')+'<th>Activitats</th><th>Estat</th></tr></thead><tbody id="tb">'+
  (list.length? list.map(s=>'<tr class="click" data-soci="'+s.id+'" tabindex="0"><td><div class="who"><span class="avatar">'+inicials(s)+'</span><div>'+esc(nomComplet(s))+'<small>'+(s.email?esc(s.email):'Sense correu')+'</small></div></div></td><td class="num">'+s.num+'</td><td class="num">'+edat(s)+'</td><td class="num">'+esc(s.tel)+'</td>'+(S.casal==="tots"?'<td>'+esc(casal(s.casal).nom)+'</td>':'')+'<td class="num">'+activitatsDe(s.id).length+(esperaDe(s.id).length?' <span class="chip warn">+'+esperaDe(s.id).length+' espera</span>':'')+'</td><td>'+estatPersona(s)+'</td></tr>').join("") : '<tr><td colspan="7" class="empty" style="padding:20px 16px">Cap persona coincideix amb la cerca.</td></tr>')+
  '</tbody></table></div>';
};
BIND.socis = () => {
  const q=$("#q"); q.oninput=()=>{ S.q=q.value; const pos=q.selectionStart; render(); const n=$("#q"); n.focus(); n.setSelectionRange(pos,pos); };
  document.querySelectorAll("[data-fq]").forEach(b=>b.onclick=()=>{ S.fq=b.dataset.fq; render(); });
  $("#nouSoci").onclick=()=>formSoci();
  document.querySelectorAll("[data-soci]").forEach(r=>{ r.onclick=()=>fitxaSoci(r.dataset.soci); r.onkeydown=e=>{ if(e.key==="Enter") fitxaSoci(r.dataset.soci); }; });
};

function fitxaSoci(id){
  const s=soci(id); const acts=activitatsDe(id), esp=esperaDe(id);
  const aut=[["imatge","Drets d'imatge"],["dades","Tractament de dades"],["domiciliacio","Domiciliació bancària"]];
  const ac=s.acollida||{completada:true}, pp=participacio()[id], al=alertesDe(s), segs=D.seguiments.filter(x=>x.soci===id).sort((a,b)=>b.data.localeCompare(a.data)), dv=derivOberta(id);
  const html = hdr(nomComplet(s), "Persona usuària · núm. "+s.num, '<button class="btn sm" id="edSoci">Editar</button>')+
  '<div class="who"><span class="avatar" style="width:56px;height:56px;font-size:18px">'+inicials(s)+'</span><div><b>'+(s.naix?edat(s)+' anys':'Edat no informada')+'</b><small>'+esc(casal(s.casal).nom)+' · alta '+new Date(s.alta).toLocaleDateString("ca-ES",{month:"long",year:"numeric"})+'</small></div><div style="margin-left:auto">'+estatPersona(s)+'</div></div>'+
  (s.baixa?'<div class="note">Baixa des del '+fdata(s.baixa.data)+'. Motiu: '+esc(s.baixa.motiu)+'</div>':'')+
  (al.length?'<div class="sens" style="display:flex;flex-direction:column;gap:6px">'+al.map(a=>'<div class="alert" style="background:var(--'+(a.c==="crit"?"crit":"warn")+'-soft);color:var(--'+(a.c==="crit"?"crit":"warn")+')">'+esc(a.t)+'</div>').join("")+'</div>':'')+
  '<div class="sens" style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" id="fsSeg">Registrar seguiment</button>'+(dv?'<span class="chip warn">Derivada a '+esc(dv.a)+' · '+esc(dv.estat)+'</span>':'<button class="btn sm" id="fsDer">Derivar</button>')+(!ac.completada?'<button class="btn sm primary" id="fsAco">Acollida</button>':'')+'</div>'+
  '<div class="sens"><div class="section-t">Participació</div><dl class="dl" style="margin-top:8px"><dt>Darrera assistència</dt><dd>'+(pp&&pp.last?fdata(pp.last)+' ('+diesEntre(pp.last,isoAvui())+' dies)':'Cap registrada')+'</dd><dt>Assistències 30 dies</dt><dd class="num">'+(pp?pp.n30:0)+'</dd><dt>Membre de l\'entitat</dt><dd>'+(s.entitat?'Sí':'No')+'</dd><dt>Viu sol/a</dt><dd>'+(s.viuSol?'Sí':'No')+'</dd></dl></div>'+
  (!ac.completada?'<div class="sens"><div class="section-t">Acollida</div>'+passosAcollida(s)+'</div>':'')+
  '<div class="sens"><div class="section-t">Seguiments ('+segs.length+')</div><div class="list">'+(segs.slice(0,4).map(g=>'<div class="row"><div class="t"><b>'+esc(g.tipus)+' · '+fdata(g.data)+'</b><span style="white-space:normal">'+esc(g.nota)+'</span></div></div>').join("")||'<div class="empty">Sense seguiments registrats.</div>')+'</div></div>'+
  '<div><div class="section-t">Contacte</div><dl class="dl" style="margin-top:8px"><dt>Telèfon</dt><dd class="num">'+esc(s.tel)+'</dd><dt>Domicili</dt><dd>'+(s.domicili?esc(s.domicili):'—')+'</dd><dt>Correu</dt><dd>'+(s.email?esc(s.email):'—')+'</dd><dt>Persona de referència</dt><dd>'+(s.contacte?esc(s.contacte):'—')+'</dd><dt>Derivat de</dt><dd>'+(s.derivat?esc(s.derivat):'—')+'</dd></dl></div>'+
  (esCoord()?'<div><div class="section-t">Dades administratives <span class="chip" style="margin-left:6px">Confidencial</span></div><dl class="dl" style="margin-top:8px"><dt>DNI/NIE</dt><dd class="num">'+esc((s.priv&&s.priv.dni)||"—")+'</dd><dt>Compte bancari</dt><dd class="num"><span id="fsIban">'+esc(ibanMask(s.priv&&s.priv.iban))+'</span>'+(s.priv&&s.priv.iban?' <button class="btn sm ghost" id="fsIbanVeure">Mostrar</button>':'')+'</dd><dt>Representant legal</dt><dd>'+esc((s.priv&&s.priv.repr)||"—")+'</dd></dl></div>':'')+
  '<div><div class="section-t">Autoritzacions</div><div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">'+aut.map(a=>'<div style="display:flex;justify-content:space-between"><span>'+a[1]+'</span>'+(s.aut[a[0]]?'<span class="chip good">Signada</span>':'<span class="chip">No</span>')+'</div>').join("")+'</div></div>'+
  (s.obs?'<div><div class="section-t">Observacions per a l\'activitat</div><p class="note" style="margin:8px 0 0">'+esc(s.obs)+'</p></div>':'')+
  '<div><div class="section-t">Activitats ('+acts.length+')</div><div class="list" style="margin-top:4px">'+(acts.length? acts.map(a=>'<div class="row"><div class="t"><b>'+esc(a.nom)+'</b><span>'+horari(a)+'</span></div><button class="btn sm ghost danger" data-baixa="'+a.id+'">Donar de baixa</button></div>').join("") : '<div class="empty">Encara no fa cap activitat.</div>')+
  esp.map(a=>'<div class="row"><div class="t"><b>'+esc(a.nom)+'</b><span>Llista d\'espera · posició '+(a.espera.indexOf(id)+1)+'</span></div><span class="chip warn">Espera</span></div>').join("")+'</div></div>'+
  '<button class="btn" id="insSoci">'+ICON.plus+'Inscriure a una activitat</button>'+
  '<p class="note" style="margin:0">Les dades de salut no es guarden aquí. Només observacions pràctiques per a l\'activitat, amb consentiment.</p>';
  const o=overlay(html,true);
  o.querySelectorAll("[data-baixa]").forEach(b=>b.onclick=()=>{ const a=D.activitats.find(x=>x.id===b.dataset.baixa); const p=baixa(a,id); toast(p? "Baixa feta. "+soci(p).nom+" passa de la llista d'espera a inscrit/a." : "Baixa feta."); render(); fitxaSoci(id); });
  o.querySelector("#edSoci").onclick=()=>formSoci(id);
  const iv=o.querySelector("#fsIbanVeure"); if(iv) iv.onclick=()=>{ o.querySelector("#fsIban").textContent=ibanFmt(s.priv.iban); iv.remove(); logCanvi("Consulta del compte bancari",nomComplet(s)); save(); };
  o.querySelector("#fsSeg").onclick=()=>formSeguiment(id);
  const fd=o.querySelector("#fsDer"); if(fd) fd.onclick=()=>formDerivacio(id);
  const fa=o.querySelector("#fsAco"); if(fa) fa.onclick=()=>formAcollida(id);
  o.querySelector("#insSoci").onclick=()=>{
    const disp=D.activitats.filter(a=>a.casal===s.casal && !a.inscrits.includes(id) && !a.espera.includes(id));
    overlay(hdr("Inscriure "+s.nom,"Tria l'activitat")+'<div class="list">'+disp.map(a=>'<div class="row"><div class="t"><b>'+esc(a.nom)+'</b><span>'+horari(a)+' · '+a.inscrits.length+'/'+a.places+'</span></div><button class="btn sm '+(a.inscrits.length<a.places?'primary':'')+'" data-a="'+a.id+'">'+(a.inscrits.length<a.places?'Inscriure':'A l\'espera')+'</button></div>').join("")+'</div>');
    document.querySelectorAll(".modal [data-a]").forEach(b=>b.onclick=()=>{ const a=D.activitats.find(x=>x.id===b.dataset.a); const r=inscriure(a,id); toast(r==="inscrit"? s.nom+" inscrit/a a "+a.nom+"." : s.nom+" a la llista d'espera (posició "+a.espera.length+")."); render(); fitxaSoci(id); });
  };
}

function formSoci(id){
  const s = id ? soci(id) : {nom:"",cognoms:"",naix:"1950-01-01",tel:"",domicili:"",email:"",contacte:"",casal:S.casal==="tots"?"c1":S.casal,entitat:false,viuSol:false,aut:{imatge:false,dades:true,domiciliacio:false},obs:""};
  const f=(k,l,t,full)=>'<div class="field'+(full?' full':'')+'"><label for="f_'+k+'">'+l+'</label><input id="f_'+k+'" type="'+(t||"text")+'" value="'+esc(s[k])+'"></div>';
  overlay(hdr(id?"Editar persona":"Nova persona usuària", id?"Núm. "+s.num:"Alta")+
  '<form class="form" id="fs" novalidate>'+f("nom","Nom")+f("cognoms","Cognoms")+f("naix","Data de naixement","date")+f("tel","Telèfon","tel")+f("domicili","Domicili","text",true)+f("email","Correu (opcional)","email",true)+f("contacte","Persona de referència (opcional)","text",true)+f("derivat","Derivat de (opcional)","text",true)+
  (esCoord()?'<div class="full section-t" style="margin-top:4px">Dades administratives (confidencials)</div><div class="field"><label for="f_dni">DNI/NIE (opcional)</label><input id="f_dni" value="'+esc((s.priv&&s.priv.dni)||"")+'" autocomplete="off"></div><div class="field"><label for="f_iban">Compte bancari IBAN (opcional)</label><input id="f_iban" value="'+esc(ibanFmt(s.priv&&s.priv.iban))+'" autocomplete="off"></div><div class="field full"><label for="f_repr">Representant legal (opcional)</label><input id="f_repr" value="'+esc((s.priv&&s.priv.repr)||"")+'"></div>':'')+
  '<div class="field"><label for="f_casal">Casal</label><select id="f_casal">'+D.casals.map(c=>'<option value="'+c.id+'"'+(s.casal===c.id?' selected':'')+'>'+esc(c.nom)+'</option>').join("")+'</select></div>'+
  '<label class="check" style="align-self:end;padding-bottom:10px"><input type="checkbox" id="f_entitat"'+(s.entitat?' checked':'')+'>Membre de l\'entitat del casal</label>'+
  '<label class="check full"><input type="checkbox" id="f_viusol"'+(s.viuSol?' checked':'')+'>Viu sol/a <span style="color:var(--muted);font-size:13px">(serveix per detectar solitud; cal ampliar l\'Annex 4)</span></label>'+
  '<div class="full" style="display:flex;flex-direction:column;gap:8px"><span class="field"><label>Autoritzacions</label></span>'+
  [["imatge","Drets d'imatge"],["dades","Tractament de dades personals"],["domiciliacio","Domiciliació bancària de les tarifes"]].map(a=>'<label class="check"><input type="checkbox" id="f_a_'+a[0]+'"'+(s.aut[a[0]]?' checked':'')+'>'+a[1]+'</label>').join("")+'</div>'+
  '<div class="field full"><label for="f_obs">Observacions per a l\'activitat (opcional)</label><textarea id="f_obs" rows="2" placeholder="Ex.: necessita seure a prop de la porta">'+esc(s.obs)+'</textarea></div>'+
  '<div class="full alert" id="ferr" hidden></div><div class="m-f full">'+(id?'<button type="button" class="btn danger" id="delSoci" style="margin-right:auto">Esborrar</button>'+(s.baixa?'<button type="button" class="btn" id="altaSoci">Reactivar</button>':'<button type="button" class="btn" id="baixaSoci">Donar de baixa</button>'):'')+'<button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">'+(id?"Desar canvis":"Donar d'alta")+'</button></div></form>');
  const bs=$("#baixaSoci"); if(bs) bs.onclick=()=>confirmMotiu("Donar de baixa "+s.nom,"Deixarà d'aparèixer a les llistes i sortirà de totes les activitats. Les dades es conserven.","Donar de baixa",m=>{ s.baixa={data:isoAvui(),motiu:m}; D.activitats.forEach(a=>{ if(a.inscrits.includes(id)||a.espera.includes(id)) baixa(a,id); }); logCanvi("Baixa de persona",nomComplet(s),m); save(); toast(s.nom+" és baixa."); render(); });
  const as=$("#altaSoci"); if(as) as.onclick=()=>{ delete s.baixa; logCanvi("Reactivació de persona",nomComplet(s)); save(); closeOverlay(); toast(s.nom+" torna a estar activa."); render(); };
  const ds=$("#delSoci"); if(ds) ds.onclick=()=>confirmMotiu("Esborrar "+nomComplet(s),"S'esborren la fitxa, les inscripcions, els seguiments i les reserves. No es pot desfer. Fes-ho només si la persona exerceix el dret de supressió o és un registre duplicat.","Esborrar definitivament",m=>{
    D.activitats.forEach(a=>{ a.inscrits=a.inscrits.filter(x=>x!==id); a.espera=a.espera.filter(x=>x!==id); }); D.seguiments=D.seguiments.filter(x=>x.soci!==id); D.derivacions=D.derivacions.filter(x=>x.soci!==id); D.apats.reserves=D.apats.reserves.filter(x=>x.soci!==id);
    D.socis=D.socis.filter(x=>x.id!==id); logCanvi("Esborrat de persona","Núm. "+s.num,m); save(); toast("Persona esborrada."); render(); });
  $("#fs").onsubmit=e=>{ e.preventDefault();
    const v=k=>$("#f_"+k).value.trim();
    const ferr=t=>{ const er=$("#ferr"); er.textContent=t; er.hidden=false; };
    if(!v("nom")||!v("cognoms")||(!id&&!v("tel"))) return ferr(id?"Cal omplir nom i cognoms.":"Cal omplir nom, cognoms i telèfon.");
    if($("#f_dni")&&v("dni")&&!dniOk(v("dni"))) return ferr("El DNI/NIE no és correcte (revisa la lletra).");
    if($("#f_iban")&&v("iban")&&!ibanOk(v("iban"))) return ferr("El compte bancari (IBAN) no és correcte.");
    if(!id&&!$("#f_a_dades").checked) return ferr("Sense l'autorització de tractament de dades no es pot donar d'alta.");
    const obj = id ? s : {id:uid("p"), num:Math.max(...D.socis.map(x=>x.num))+1, alta:isoAvui(), acollida:{completada:false,entrevista:null,benvinguda:false,referent:null,revisio:null,interessos:[]}};
    Object.assign(obj,{nom:v("nom"),cognoms:v("cognoms"),naix:v("naix")||"1950-01-01",tel:v("tel"),domicili:v("domicili"),email:v("email"),contacte:v("contacte"),derivat:v("derivat"),casal:v("casal"),entitat:$("#f_entitat").checked,viuSol:$("#f_viusol").checked,obs:v("obs"),
      aut:{imatge:$("#f_a_imatge").checked,dades:$("#f_a_dades").checked,domiciliacio:$("#f_a_domiciliacio").checked}});
    if($("#f_dni")){ const pv={dni:v("dni").toUpperCase().replace(/[\s-]/g,""),iban:ibanNet(v("iban")),repr:v("repr")}; const ant=JSON.stringify(obj.priv||{});
      if(pv.dni||pv.iban||pv.repr) obj.priv=pv; else delete obj.priv; if(id&&ant!==JSON.stringify(obj.priv||{})) logCanvi("Canvi de dades administratives",nomComplet(obj)); }
    if(!id) D.socis.unshift(obj); save(); closeOverlay();
    toast(id? "Canvis desats." : obj.nom+" té el núm. "+obj.num+". Comença l'acollida."); if(!id){ S.view="socis"; } render(); if(id) fitxaSoci(id);
  };
}

VIEWS.activitats = () => {
  const lim=addDays(isoAvui(),-7);
  const acts=D.activitats.filter(inCasal).filter(lesMeves).filter(a=>S.eix==="tots"||(S.eix==="punt"?esPunt(a):a.eix===S.eix)).filter(a=>!esPunt(a)||a.data>=lim).sort(ordAct);
  const prop=a=>(a.anul||[]).filter(x=>x.d>=isoAvui()).sort((x,y)=>x.d.localeCompare(y.d));
  return '<div class="head"><div><h1>'+(esResp()?'Les teves activitats':'Activitats')+'</h1><p>'+(esResp()?'Consulta qui hi ha inscrit i passa llista.':'Programació setmanal i activitats puntuals per eixos d\'envelliment actiu.')+'</p></div><button class="btn primary" id="novaAct">'+ICON.plus+'Nova activitat</button></div>'+
  '<div class="filters" role="group" aria-label="Eix">'+[["tots","Tots els eixos"]].concat(Object.entries(EIX_C)).concat([["punt","Puntuals"]]).map(f=>'<button data-eix="'+f[0]+'" aria-pressed="'+(S.eix===f[0])+'">'+f[1]+'</button>').join("")+'</div>'+
  (esResp()&&!acts.length?'<div class="empty">Encara no tens cap activitat assignada. Parla amb la coordinació.</div>':'')+
  '<div class="cards">'+acts.map(a=>{ const full=a.inscrits.length>=a.places, pct=Math.min(100,a.inscrits.length/a.places*100);
    return '<article class="card"><div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start"><h3>'+esc(a.nom)+'</h3>'+eixChip(a.eix)+'</div>'+
    (esPunt(a)?'<div><span class="chip" style="background:var(--accent-soft,#EEE8FF);color:var(--accent,#6C4BD8)">Puntual'+(a.data<isoAvui()?' · feta':'')+'</span></div>':'')+(!esPunt(a)&&(a.dIni>isoAvui()||a.dFi)?'<div>'+(a.dIni>isoAvui()?'<span class="chip">Comença el '+fdata(a.dIni)+'</span> ':'')+(a.dFi?'<span class="chip'+(a.dFi<isoAvui()?' warn':'')+'">'+(a.dFi<isoAvui()?'Acabada el ':'Fins al ')+fdata(a.dFi)+'</span>':'')+'</div>':'')+(prop(a).length?'<div>'+prop(a).slice(0,2).map(x=>'<span class="chip warn">No es fa '+fdata(x.d)+'</span> ').join("")+'</div>':'')+
    '<div class="meta"><span>'+horari(a)+'</span><span>'+esc(sala(a.sala).nom)+(S.casal==="tots"?' · '+esc(casal(a.casal).nom):'')+'</span><span>'+esc(a.prof)+' · '+(a.preu?eur(a.preu)+(esPunt(a)?'':' / mes'):'Gratuïta')+(a.comp?' · Complementària':'')+'</span></div>'+
    '<div><div class="places"><span class="num"><b>'+a.inscrits.length+'</b> / '+a.places+' places</span>'+(full?'<span class="chip warn">Plena · '+a.espera.length+' en espera</span>':'<span style="color:var(--muted)">'+(a.places-a.inscrits.length)+' lliures</span>')+'</div><div class="bar'+(full?' full':'')+'" style="margin-top:8px"><i style="width:'+pct+'%"></i></div></div>'+
    '<div class="actions"><button class="btn sm primary" data-ins="'+a.id+'">Inscriure</button><button class="btn sm" data-llista="'+a.id+'">Llista</button></div></article>'; }).join("")+'</div>';
};
BIND.activitats = () => {
  document.querySelectorAll("[data-eix]").forEach(b=>b.onclick=()=>{ S.eix=b.dataset.eix; render(); });
  document.querySelectorAll("[data-ins]").forEach(b=>b.onclick=()=>inscriureModal(b.dataset.ins));
  document.querySelectorAll("[data-llista]").forEach(b=>b.onclick=()=>llistaAct(b.dataset.llista));
  $("#novaAct").onclick=()=>formAct();
  if(esResp()){ const n=$("#novaAct"); if(n) n.hidden=true; }
};
function inscriureModal(aid, q){
  const a=D.activitats.find(x=>x.id===aid); q=q||"";
  const cand=D.socis.filter(s=>s.casal===a.casal && !a.inscrits.includes(s.id) && !a.espera.includes(s.id) && (!q||nomComplet(s).toLowerCase().includes(q.toLowerCase())));
  const full=a.inscrits.length>=a.places;
  overlay(hdr("Inscriure a "+a.nom, horari(a))+(full?'<div class="note">Activitat plena. Les noves inscripcions van a la llista d\'espera i entren automàticament quan algú es dona de baixa.</div>':'<div class="note">Queden '+(a.places-a.inscrits.length)+' places.</div>')+
  '<label class="search">'+ICON.search+'<input id="qi" type="search" placeholder="Cerca soci" value="'+esc(q)+'" aria-label="Cerca soci"></label><div class="list">'+
  (cand.slice(0,40).map(s=>'<div class="row"><div class="who" style="flex:1"><span class="avatar">'+inicials(s)+'</span><div>'+esc(nomComplet(s))+'<small>Núm. '+s.num+'</small></div></div><button class="btn sm '+(full?'':'primary')+'" data-s="'+s.id+'">'+(full?'A l\'espera':'Inscriure')+'</button></div>').join("")||'<div class="empty">No hi ha socis per inscriure.</div>')+'</div>');
  const qi=$("#qi"); qi.oninput=()=>{ const p=qi.selectionStart; inscriureModal(aid, qi.value); const n=$("#qi"); n.focus(); n.setSelectionRange(p,p); };
  document.querySelectorAll(".modal [data-s]").forEach(b=>b.onclick=()=>{ const s=soci(b.dataset.s); const r=inscriure(a,s.id); toast(r==="inscrit"? s.nom+" inscrit/a." : s.nom+" a la llista d'espera (posició "+a.espera.length+")."); render(); inscriureModal(aid, $("#qi")?$("#qi").value:""); });
}
function darreraSessio(a){ if(esPunt(a)) return a.data; let d=isoAvui(); for(let i=0;i<35;i++){ if(actEnData(a,d)) return d; d=addDays(d,-1); } return a.dFi&&a.dFi<isoAvui()?a.dFi:d; }
function properesSessions(a,n){ const out=[]; let d=isoAvui(); for(let i=0;i<120&&out.length<n;i++){ if(actEnData(a,d)) out.push(d); d=addDays(d,1); } return out; }
function anularSessio(aid){
  const a=D.activitats.find(x=>x.id===aid), ds=properesSessions(a,10), fets=(a.anul||[]).filter(x=>x.d>=isoAvui()).sort((x,y)=>x.d.localeCompare(y.d));
  overlay(hdr("Anul·lar una sessió", a.nom+" · "+horari(a))+'<p class="note" style="margin:0">Només s\'anul·la la sessió del dia que triïs. L\'activitat continua igual les altres setmanes.</p>'+
  '<form class="form" id="fan" novalidate><div class="field"><label for="an_d">Sessió</label><select id="an_d">'+ds.map(d=>'<option value="'+d+'">'+DIES7[wd(d)]+" "+fdata(d)+'</option>').join("")+'</select></div>'+
  '<div class="field"><label for="an_m">Motiu</label><input id="an_m" placeholder="Ex.: festiu, activitat puntual a la sala"></div>'+
  '<div class="full alert" id="anerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" id="anBack">Tornar</button><button class="btn danger" type="submit">Anul·lar la sessió</button></div></form>'+
  (fets.length?'<div><div class="section-t">Sessions anul·lades</div><div class="list">'+fets.map(x=>'<div class="row"><div class="t"><b>'+DIES7[wd(x.d)]+" "+fdata(x.d)+'</b><span>'+esc(x.m||"")+'</span></div><button class="btn sm" data-rec="'+x.d+'">Recuperar</button></div>').join("")+'</div></div>':''));
  $("#anBack").onclick=()=>llistaAct(aid);
  $("#fan").onsubmit=e=>{ e.preventDefault(); const d=$("#an_d").value, m=$("#an_m").value.trim(); if(!d) return; if(m.length<3){ const er=$("#anerr"); er.textContent="Indica el motiu."; er.hidden=false; return; }
    a.anul=a.anul||[]; a.anul.push({d,m}); logCanvi("Sessió anul·lada",a.nom+" · "+fdata(d),m); save(); toast("Sessió del "+fdata(d)+" anul·lada. Les altres setmanes no canvien."); render(); llistaAct(aid); };
  document.querySelectorAll(".modal [data-rec]").forEach(b=>b.onclick=()=>{ a.anul=a.anul.filter(x=>x.d!==b.dataset.rec); logCanvi("Sessió recuperada",a.nom+" · "+fdata(b.dataset.rec)); save(); toast("Sessió recuperada."); render(); anularSessio(aid); });
}
function llistaAct(aid){
  const a=D.activitats.find(x=>x.id===aid); const ses=darreraSessio(a), key=a.id+"|"+ses, pres=D.assist[key]||[];
  overlay(hdr(a.nom, horari(a)+" · "+sala(a.sala).nom)+
  (can("activitats","M")||can("activitats","B")?'<div style="display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap">'+(can("activitats","M")?'<button class="btn sm" id="edAct">Editar</button>'+(esPunt(a)?'':'<button class="btn sm" id="anAct">Anul·lar una sessió</button>'):'')+(can("activitats","B")?'<button class="btn sm ghost danger" id="delAct">Esborrar activitat</button>':'')+'</div>':'')+
  '<div class="note">Passar llista de la sessió de '+DIES7[wd(ses)].toLowerCase()+' '+fdata(ses)+': '+pres.length+' de '+a.inscrits.length+' presents.</div>'+
  (a.extres?'<div class="note">Autocar: <b>'+a.inscrits.filter(x=>exA(a,x).au).length+'</b> · Transport adaptat: <b>'+a.inscrits.filter(x=>exA(a,x).ta).length+'</b></div>':'')+
  '<div><div class="section-t">Inscrits ('+a.inscrits.length+'/'+a.places+')</div><div class="list">'+(a.inscrits.map((id,i)=>{const s=soci(id); const hi=pres.includes(id); return '<div class="row"><span class="num" style="width:22px;color:var(--muted)">'+(i+1)+'</span><div class="t"><b>'+esc(nomComplet(s))+'</b>'+(can("persones","C")?'<span class="num">'+esc(s.tel)+'</span>':'')+(a.extres?'<span style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px"><button class="tog" data-ex="au|'+id+'" aria-pressed="'+!!exA(a,id).au+'">Autocar</button><button class="tog" data-ex="ta|'+id+'" aria-pressed="'+!!exA(a,id).ta+'">T. adaptat</button><input data-exc="'+id+'" value="'+esc(exA(a,id).ct||"")+'" placeholder="Persona de contacte i telèfon" aria-label="Persona de contacte de '+esc(nomComplet(s))+'" style="flex:1;min-width:160px"></span>':'')+'</div><button class="tog" data-pl="'+id+'" aria-pressed="'+hi+'">'+(hi?'Present':'Absent')+'</button><button class="btn sm ghost danger" data-b="'+id+'">Baixa</button></div>';}).join("")||'<div class="empty">Encara no hi ha inscrits.</div>')+'</div></div>'+
  '<div><div class="section-t">Llista d\'espera ('+a.espera.length+')</div><div class="list">'+(a.espera.map((id,i)=>{const s=soci(id); return '<div class="row"><span class="chip warn num">'+(i+1)+'</span><div class="t"><b>'+esc(nomComplet(s))+'</b><span>Entrarà quan quedi una plaça</span></div><button class="btn sm ghost" data-b="'+id+'">Treure</button></div>';}).join("")||'<div class="empty">Ningú en espera.</div>')+'</div></div>');
  document.querySelectorAll(".modal [data-b]").forEach(b=>b.onclick=()=>{ const p=baixa(a,b.dataset.b); toast(p? soci(p).nom+" entra des de la llista d'espera." : "Fet."); render(); llistaAct(aid); });
  const ea=$("#edAct"); if(ea) ea.onclick=()=>formAct(aid);
  const aa=$("#anAct"); if(aa) aa.onclick=()=>anularSessio(aid);
  const da=$("#delAct"); if(da) da.onclick=()=>confirmMotiu("Esborrar "+a.nom,"Se n'esborren les inscripcions i la llista d'espera. Si només s'atura, millor no esborrar-la.","Esborrar",m=>{ D.activitats=D.activitats.filter(x=>x.id!==a.id); D.rebuts=D.rebuts.filter(r=>r.act!==a.id||D.mesosTancats[r.mes]); logCanvi("Esborrat d'activitat",a.nom+" · "+casal(a.casal).curt,m); save(); toast("Activitat esborrada."); render(); });
  document.querySelectorAll(".modal [data-ex]").forEach(b=>b.onclick=()=>{ const [k,x]=b.dataset.ex.split("|"); const e=a.ext||(a.ext={}); const o=e[x]||(e[x]={}); o[k]=!o[k]; save(); llistaAct(aid); });
  document.querySelectorAll(".modal [data-exc]").forEach(i=>i.onchange=()=>{ const e=a.ext||(a.ext={}); const o=e[i.dataset.exc]||(e[i.dataset.exc]={}); o.ct=i.value.trim().slice(0,120); save(); });
  document.querySelectorAll(".modal [data-pl]").forEach(b=>b.onclick=()=>{ const arr=D.assist[key]||(D.assist[key]=[]); const x=b.dataset.pl; const k=arr.indexOf(x); if(k>=0) arr.splice(k,1); else arr.push(x); save(); llistaAct(aid); });
}
const filaSes = x => '<div class="sesr" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:6px"><select data-sd aria-label="Dia" style="min-width:130px">'+DIES7.map((d,i)=>'<option value="'+i+'"'+(x.dia===i?' selected':'')+'>'+d+'</option>').join("")+'</select><input data-si type="time" step="900" value="'+esc(x.inici)+'" aria-label="Inici"><span>a</span><input data-sf type="time" step="900" value="'+esc(x.fi)+'" aria-label="Fi"><button type="button" class="btn sm ghost danger" data-sx aria-label="Treure aquest dia">'+ICON.x+'</button></div>';
const llegirSes = () => [...document.querySelectorAll("#sesL .sesr")].map(r=>({dia:Number(r.querySelector("[data-sd]").value),inici:r.querySelector("[data-si]").value,fi:r.querySelector("[data-sf]").value})).sort((p,q)=>p.dia-q.dia);
function formAct(id){
  const a0 = id ? D.activitats.find(x=>x.id===id) : null;
  const cs = a0 ? a0.casal : (S.casal==="tots" ? "c1" : S.casal);
  const ss = D.sales.filter(s=>s.casal===cs);
  const x = a0 || {nom:"",eix:Object.keys(EIXOS)[0],dia:0,inici:"10:00",fi:"11:00",sala:ss[0]&&ss[0].id,places:15,prof:"",preu:0,resp:[]};
  const tipus0 = a0 ? (esPunt(a0)?"punt":"set") : (S.actTipus||"set");
  const resps = (S._usuaris||[]).filter(t=>t.actiu&&(t.rol==="tallerista"||t.rol==="voluntari")&&(t.casal===cs||t.casal==="tots"));
  overlay(hdr(id?"Editar activitat":"Nova activitat", casal(cs).nom)+'<form class="form" id="fa" novalidate>'+
  '<div class="field full"><label>Tipus</label><div class="filters" role="group" aria-label="Tipus d\'activitat" style="margin:0">'+(a0?'':'<button type="button" data-atip="set" aria-pressed="'+(tipus0==="set")+'">Setmanal</button><button type="button" data-atip="punt" aria-pressed="'+(tipus0==="punt")+'">Puntual (un sol dia)</button>')+(a0?'<span class="chip">'+(tipus0==="punt"?"Puntual":"Setmanal")+'</span>':'')+'</div></div>'+
  '<div class="field full"><label for="a_nom">Nom</label><input id="a_nom" value="'+esc(x.nom)+'" placeholder="'+(tipus0==="punt"?"Ex.: Xerrada sobre seguretat a casa":"Ex.: Pilates suau")+'"></div>'+
  '<div class="field"><label for="a_eix">Eix</label><select id="a_eix">'+Object.entries(EIXOS).map(e=>'<option value="'+e[0]+'"'+(x.eix===e[0]?' selected':'')+'>'+e[1]+'</option>').join("")+'</select></div>'+
  (tipus0==="punt"
    ? '<div class="field"><label for="a_data">Data</label><input id="a_data" type="date" min="'+isoAvui()+'" value="'+esc(x.data||addDays(isoAvui(),7))+'"></div>'
    : '')+
  (tipus0==="punt"
    ? '<div class="field"><label for="a_ini">Inici</label><input id="a_ini" type="time" value="'+esc(x.inici)+'" step="900"></div><div class="field"><label for="a_fi">Fi</label><input id="a_fi" type="time" value="'+esc(x.fi)+'" step="900"></div>'
    : '<div class="field full"><label>Dies i horari (una mateixa activitat pot fer-se diversos dies a la setmana)</label><div id="sesL">'+sesA(x).map(filaSes).join("")+'</div><button type="button" class="btn sm" id="sesAdd" style="align-self:flex-start">'+ICON.plus+'Afegir un altre dia</button></div>')+
  '<div class="field"><label for="a_sala">Sala</label><select id="a_sala">'+ss.map(s=>'<option value="'+s.id+'"'+(x.sala===s.id?' selected':'')+'>'+esc(s.nom)+' ('+s.aforament+')</option>').join("")+'</select></div>'+
  '<div class="field"><label for="a_pl">Places</label><input id="a_pl" type="number" min="1" value="'+x.places+'"></div>'+
  '<div class="field"><label for="a_prof">Qui la fa</label><input id="a_prof" value="'+esc(x.prof==="Per assignar"?"":x.prof)+'" placeholder="Monitor/a, entitat o voluntariat"></div>'+
  (tipus0==="punt"?'':'<div class="field"><label for="a_dini">Comença (opcional)</label><input id="a_dini" type="date" value="'+esc(x.dIni||"")+'"></div><div class="field"><label for="a_dfi">Acaba (opcional)</label><input id="a_dfi" type="date" value="'+esc(x.dFi||"")+'"></div>')+
  (esCoord()?'<div class="field"><label for="a_ptel">Telèfon de qui la fa (opcional)</label><input id="a_ptel" type="tel" value="'+esc(x.profTel||"")+'"></div>':'')+
  (tipus0==="punt"?'<label class="check full"><input type="checkbox" id="a_ext"'+(x.extres?' checked':'')+'>A la llista: autocar, transport adaptat i persona de contacte (sortides i festes)</label>':'')+
  '<div class="field"><label for="a_preu">Preu (€'+(tipus0==="punt"?'':' / mes')+')</label><input id="a_preu" type="number" min="0" step="0.5" value="'+(x.preu||0)+'"></div>'+
  '<div class="field full"><label>Talleristes i voluntariat que passen llista</label>'+(resps.length?'<div style="display:flex;flex-wrap:wrap;gap:10px">'+resps.map(t=>'<label class="check"><input type="checkbox" data-resp="'+t.id+'"'+((x.resp||[]).includes(t.id)?' checked':'')+'>'+esc(nomT(t))+' · '+esc(ROLS[t.rol])+'</label>').join("")+'</div>':'<p class="note" style="margin:0">No hi ha talleristes ni voluntariat donats d\'alta en aquest casal. La Supervisió els dona d\'alta a Equip.</p>')+'</div>'+
  '<div class="full alert" id="aerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">'+(id?'Desar canvis':'Crear activitat')+'</button></div></form>');
  document.querySelectorAll("[data-atip]").forEach(b=>b.onclick=()=>{ S.actTipus=b.dataset.atip; formAct(); });
  const lligaSes=()=>{ document.querySelectorAll("#sesL [data-sx]").forEach(b=>b.onclick=()=>{ if(document.querySelectorAll("#sesL .sesr").length>1){ b.closest(".sesr").remove(); } }); };
  const sa=$("#sesAdd"); if(sa){ lligaSes(); sa.onclick=()=>{ const L=llegirSes(), u=L[L.length-1]||{dia:0,inici:"10:00",fi:"11:00"}; const lliure=[0,1,2,3,4,5,6].find(d=>d>u.dia&&!L.some(y=>y.dia===d)); $("#sesL").insertAdjacentHTML("beforeend",filaSes({dia:lliure??0,inici:u.inici,fi:u.fi})); lligaSes(); }; }
  const desar=(anulAct, data)=>{ const v=k=>$("#a_"+k).value.trim(); const sl=sala(v("sala"));
    const resp=[...document.querySelectorAll("[data-resp]")].filter(c=>c.checked).map(c=>c.dataset.resp);
    const o={nom:v("nom"),eix:v("eix"),inici:tipus0==="punt"?v("ini"):"",fi:tipus0==="punt"?v("fi"):"",sala:sl.id,places:Number(v("pl")),preu:Number(v("preu"))||0,prof:v("prof")||"Per assignar",resp};
    if(tipus0==="punt"){ o.data=data; o.dia=wd(data); o.extres=$("#a_ext").checked; } else { const L=llegirSes(); o.ses=L; o.dia=L[0].dia; o.inici=L[0].inici; o.fi=L[0].fi; o.dIni=v("dini")||null; o.dFi=v("dfi")||null; }
    if($("#a_ptel")) o.profTel=v("ptel");
    if(anulAct){ anulAct.anul=anulAct.anul||[]; anulAct.anul.push({d:data,m:"Coincideix amb l'activitat puntual «"+o.nom+"»"}); logCanvi("Sessió anul·lada",anulAct.nom+" · "+fdata(data),"Coincideix amb l'activitat puntual «"+o.nom+"»"); }
    if(a0){ Object.assign(a0,o); logCanvi("Canvi d'activitat",o.nom+" · "+casal(cs).curt); }
    else { D.activitats.push(Object.assign({id:uid("a"),casal:cs,inscrits:[],espera:[],anul:[]},o)); logCanvi(tipus0==="punt"?"Nova activitat puntual":"Nova activitat",o.nom+" · "+(tipus0==="punt"?fdata(data):horari(o))+" · "+casal(cs).curt); }
    save(); closeOverlay(); toast(anulAct?"Activitat creada. La sessió de «"+anulAct.nom+"» del "+fdata(data)+" queda anul·lada; les altres setmanes no canvien.":(id?"Canvis desats.":"Activitat creada.")); render(); };
  $("#fa").onsubmit=e=>{ e.preventDefault(); const v=k=>$("#a_"+k).value.trim(); const er=$("#aerr"); er.hidden=true;
    const sl=sala(v("sala")), pl=Number(v("pl"));
    const err=t=>{ er.innerHTML=esc(t); er.hidden=false; };
    if(!v("nom")) return err("Posa un nom a l'activitat.");
    if(tipus0==="punt"&&mins(v("fi"))<=mins(v("ini"))) return err("L'hora de fi ha de ser posterior a la d'inici.");
    if(!(pl>=1)) return err("Indica el nombre de places.");
    if(pl>sl.aforament) return err("La "+sl.nom+" té aforament per a "+sl.aforament+" persones.");
    if(a0 && pl<a0.inscrits.length) return err("Ja hi ha "+a0.inscrits.length+" persones inscrites. No es poden posar menys places.");
    if(tipus0==="punt"){ const d=v("data"); if(!d) return err("Tria la data.");
      if(!a0 && d<isoAvui()) return err("La data ja ha passat.");
      const c=conflicteData(sl.id,d,v("ini"),v("fi"),id);
      if(c && c.tipus==="periodica"){ er.innerHTML='<b>'+esc(c.txt)+'</b><br>Pots anul·lar només la sessió del '+esc(DIES7[wd(d)].toLowerCase()+" "+fdata(d))+' de «'+esc(c.act.nom)+'». Les altres setmanes es farà igual. Recorda avisar les persones inscrites.<div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap"><button type="button" class="btn sm danger" id="aAnul">Anul·lar aquella sessió i crear</button></div>'; er.hidden=false;
        $("#aAnul").onclick=()=>desar(c.act,d); return; }
      if(c) return err("La sala està ocupada aquell dia. "+c.txt);
      return desar(null,d); }
    if(v("dini")&&v("dfi")&&v("dfi")<v("dini")) return err("La data final ha de ser posterior a la d'inici.");
    const L=llegirSes(); if(!L.length) return err("Afegeix almenys un dia.");
    if(new Set(L.map(y=>y.dia)).size<L.length) return err("Hi ha un dia repetit. Cada dia només hi pot sortir una vegada.");
    for(const y of L){ if(!y.inici||!y.fi||mins(y.fi)<=mins(y.inici)) return err("Revisa l'horari de "+DIES7[y.dia].toLowerCase()+": l'hora de fi ha de ser posterior a la d'inici.");
      const c=conflicte(sl.id,y.dia,y.inici,y.fi,id); if(c) return err("La sala està ocupada. "+c);
      const a1=mins(y.fi), b0=y.inici;
      const pf=!sl.perAssignar&&D.activitats.find(a=>a.id!==id&&esPunt(a)&&a.data>=isoAvui()&&a.sala===sl.id&&wd(a.data)===y.dia&&mins(a.inici)<a1&&mins(b0)<mins(a.fi));
      if(pf) return err("El "+fdata(pf.data)+" hi ha l'activitat puntual «"+pf.nom+"» a la mateixa sala i hora. Canvia l'horari o la sala, o anul·la aquella sessió després de crear l'activitat."); }
    desar(null,null); };
}

/* Calendari d'espais: totes les sales alhora o una sola; les activitats que coincideixen
   es posen una al costat de l'altra (carrils), perquè no se'n tapi cap. */
function carrils(items){
  items.sort((a,b)=>a.t0-b.t0||b.t1-a.t1);
  let grup=[], fiGrup=-1; const grups=[];
  items.forEach(it=>{ if(it.t0>=fiGrup&&grup.length){ grups.push(grup); grup=[]; } grup.push(it); fiGrup=Math.max(fiGrup,it.t1); });
  if(grup.length) grups.push(grup);
  grups.forEach(g=>{ const fins=[]; g.forEach(it=>{ let k=fins.findIndex(f=>f<=it.t0); if(k<0){ k=fins.length; fins.push(0); } fins[k]=it.t1; it.k=k; }); g.forEach(it=>it.n=fins.length); });
  return items;
}
VIEWS.sales = () => {
  const ss=D.sales.filter(inCasal); if(!S.sala||(S.sala!=="tots"&&!ss.find(s=>s.id===S.sala))) S.sala="tots";
  const totes=S.sala==="tots", sl=totes?null:sala(S.sala), ids=new Set(totes?ss.map(s=>s.id):[sl.id]);
  const dl=addDays(isoAvui(),-avuiIdx7());
  const dies=DIES7.map((d,di)=>({d,di,dt:addDays(dl,di)}));
  const evDia=x=>{ const acts=D.activitats.filter(a=>ids.has(a.sala)&&sesDe(a,x.dt));
    const res=D.reserves.filter(r=>ids.has(r.sala)&&r.dia===x.di);
    return acts.map(a=>{ const h=sesDe(a,x.dt); return {a,h,t0:mins(h.inici),t1:mins(h.fi)}; }).concat(res.map(r=>({r,t0:mins(r.inici),t1:mins(r.fi)}))); };
  const tots=dies.map(evDia), plans=tots.flat();
  const visibles=dies.filter((x,i)=>i<5||tots[i].length);   // dissabte i diumenge, només si hi ha alguna cosa
  const H0=Math.min(9,...plans.map(e=>Math.floor(e.t0/60))), H1=Math.max(21,...plans.map(e=>Math.ceil(e.t1/60))), PX=60;
  const top=m=>(m-H0*60)/60*PX;
  const W0=totes?170:130, amples=visibles.map(x=>Math.max(W0,Math.max(1,...carrils(evDia(x)).map(i=>i.n))*92));
  const cols=visibles.map(x=>{ const its=carrils(evDia(x));
    return '<div class="col" style="height:'+((H1-H0)*PX)+'px">'+its.map(it=>{
      const pos='top:'+top(it.t0)+'px;height:'+Math.max(22,top(it.t1)-top(it.t0)-2)+'px;left:calc('+(it.k*100/it.n)+'% + 3px);width:calc('+(100/it.n)+'% - 6px);right:auto';
      if(it.r){ const r=it.r; return '<div class="ev res" style="'+pos+'" title="'+esc(r.entitat+" · "+r.motiu+" · "+r.inici+"–"+r.fi+" · "+sala(r.sala).nom)+'"><b>'+esc(r.entitat)+'</b><span>'+r.inici+'–'+r.fi+(totes?' · '+esc(sala(r.sala).nom):'')+'</span></div>'; }
      const a=it.a, h=it.h, an=!esPunt(a)&&anulada(a,x.dt);
      return '<div class="ev" data-evact="'+a.id+'" role="button" tabindex="0" style="'+pos+';color:var(--'+a.eix+')'+(an?';opacity:.45;text-decoration:line-through':'')+'" title="'+esc(a.nom+" · "+h.inici+"–"+h.fi+" · "+sala(a.sala).nom+(S.casal==="tots"?" · "+casal(a.casal).curt:"")+" · "+a.inscrits.length+"/"+a.places)+'"><b>'+(esPunt(a)?'★ ':'')+esc(a.nom)+'</b><span class="num">'+h.inici+'–'+h.fi+(an?' · no es fa':'')+'</span>'+(totes?'<span class="evs">'+esc(sala(a.sala).nom)+(S.casal==="tots"?' · '+esc(casal(a.casal).curt):'')+'</span>':'')+'</div>'; }).join("")+'</div>';
  }).join("");
  const reservesLlista=D.reserves.filter(r=>ss.find(s=>s.id===r.sala)).sort((a,b)=>a.dia-b.dia);
  return '<div class="head"><div><h1>Sales i espais</h1><p>Ocupació setmanal i reserves d\'entitats.</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="gestSales">Gestionar espais</button><button class="btn primary" id="novaRes">'+ICON.plus+'Nova reserva</button></div></div>'+
  '<div class="filters" role="group" aria-label="Sala"><button data-sala="tots" aria-pressed="'+totes+'">Totes les sales</button>'+ss.map(s=>'<button data-sala="'+s.id+'" aria-pressed="'+(S.sala===s.id)+'">'+esc(s.nom)+(S.casal==="tots"?' · '+esc(casal(s.casal).curt):'')+'</button>').join("")+'</div>'+
  '<div class="legend">'+Object.keys(EIX_C).map(e=>'<span><i style="background:var(--'+e+')"></i>'+EIX_C[e]+'</span>').join("")+'<span><i style="background:repeating-linear-gradient(135deg,var(--muted) 0 2px,transparent 2px 4px)"></i>Reserva externa</span>'+(sl?'<span>Aforament: '+sl.aforament+' persones</span>':'')+'</div>'+
  '<p class="note" style="margin:0">Setmana del '+fdata(dl)+'. ★ activitat puntual · ratllat: sessió anul·lada. Les activitats que coincideixen surten una al costat de l\'altra; passa el ratolí per sobre per veure-ho tot, o fes-hi clic per obrir la llista.</p>'+
  '<div class="tablewrap"><div class="cal" style="grid-template-columns:56px '+amples.map(w=>'minmax('+w+'px,'+w+'fr)').join(" ")+';min-width:'+(56+amples.reduce((t,w)=>t+w,0))+'px"><div class="dh"></div>'+visibles.map(x=>'<div class="dh'+(x.di===avuiIdx7()?' today':'')+'">'+x.d+' '+fdata(x.dt)+'</div>').join("")+
  '<div class="hours">'+Array.from({length:H1-H0},(_,i)=>'<div class="num" style="height:'+PX+'px">'+(H0+i)+':00</div>').join("")+'</div>'+cols.replace(/class="col" style="/g,'class="col" style="background-size:100% '+PX+'px;')+'</div></div>'+
  '<section class="panel"><div class="panel-h"><h2>Reserves d\'entitats</h2></div><div class="list">'+(reservesLlista.map(r=>'<div class="row"><div class="t"><b>'+esc(r.entitat)+'</b><span>'+esc(r.motiu)+' · '+esc(sala(r.sala).nom)+' · '+DIES7[r.dia]+' '+r.inici+'–'+r.fi+'</span></div><button class="btn sm ghost danger" data-delres="'+r.id+'">Anul·lar</button></div>').join("")||'<div class="empty">Cap reserva.</div>')+'</div></section>';
};

function gestioSales(){
  const ss=D.sales.filter(inCasal);
  const us=id=>D.activitats.filter(a=>a.sala===id).length+D.reserves.filter(r=>r.sala===id).length;
  overlay(hdr("Sales i espais", S.casal==="tots"?"Tots els casals":casal(S.casal).nom, '<button class="btn sm primary" id="novaSala">'+ICON.plus+'Nou espai</button>')+
  '<div class="list">'+ss.map(x=>'<div class="row"><div class="t"><b>'+esc(x.nom)+'</b><span>'+esc(casal(x.casal).curt)+' · '+esc(x.tipus||"Sala polivalent")+' · aforament '+x.aforament+(x.accessible===false?' · no adaptat':'')+(x.equip?' · '+esc(x.equip):'')+'</span></div><span class="chip num">'+us(x.id)+' usos</span><button class="btn sm" data-eds="'+x.id+'">Editar</button></div>').join("")+'</div>');
  $("#novaSala").onclick=()=>formSala();
  document.querySelectorAll("[data-eds]").forEach(b=>b.onclick=()=>formSala(b.dataset.eds));
}
function formSala(id){
  const x = id ? sala(id) : {nom:"",casal:S.casal==="tots"?"c1":S.casal,aforament:20,tipus:"Sala polivalent",equip:"",accessible:true,actiu:true};
  const usos = id ? D.activitats.filter(a=>a.sala===id).length+D.reserves.filter(r=>r.sala===id).length : 0;
  const tipus=["Sala polivalent","Sala d'actes","Aula","Aula d'informàtica","Menjador","Bar","Despatx","Espai exterior"];
  overlay(hdr(id?"Editar espai":"Nou espai", id?x.nom:"Sales i espais")+'<form class="form" id="fsl" novalidate>'+
  '<div class="field full"><label for="sl_nom">Nom</label><input id="sl_nom" value="'+esc(x.nom)+'" placeholder="Ex.: Sala de ball"></div>'+
  '<div class="field"><label for="sl_casal">Casal</label><select id="sl_casal"'+(usos?' disabled':'')+'>'+D.casals.map(c=>'<option value="'+c.id+'"'+(x.casal===c.id?' selected':'')+'>'+esc(c.nom)+'</option>').join("")+'</select></div>'+
  '<div class="field"><label for="sl_tipus">Tipus</label><select id="sl_tipus">'+tipus.map(t=>'<option'+((x.tipus||"Sala polivalent")===t?' selected':'')+'>'+t+'</option>').join("")+'</select></div>'+
  '<div class="field"><label for="sl_af">Aforament (persones)</label><input id="sl_af" type="number" min="1" value="'+x.aforament+'"></div>'+
  '<div class="field"><label for="sl_eq">Equipament (opcional)</label><input id="sl_eq" value="'+esc(x.equip||"")+'" placeholder="Projector, piano, cadires…"></div>'+
  '<label class="check full"><input type="checkbox" id="sl_acc"'+(x.accessible!==false?' checked':'')+'>Accessible per a persones amb mobilitat reduïda</label>'+
  (usos?'<p class="note full" style="margin:0">Aquest espai té '+usos+' activitats o reserves. No es pot esborrar ni canviar de casal.</p>':'')+
  '<div class="full alert" id="slerr" hidden></div><div class="m-f full">'+(id&&!usos?'<button type="button" class="btn danger" id="delSala" style="margin-right:auto">Esborrar</button>':'')+'<button type="button" class="btn ghost" id="slBack">Tornar</button><button class="btn primary" type="submit">'+(id?"Desar canvis":"Crear espai")+'</button></div></form>');
  $("#slBack").onclick=()=>gestioSales();
  const del=$("#delSala"); if(del) del.onclick=()=>confirmMotiu("Esborrar "+x.nom,"L'espai deixarà d'existir.","Esborrar",m=>{ D.sales=D.sales.filter(y=>y.id!==id); if(S.sala===id) S.sala=null; logCanvi("Esborrat d'espai",x.nom,m); save(); toast("Espai esborrat."); render(); gestioSales(); });
  $("#fsl").onsubmit=e=>{ e.preventDefault(); const er=$("#slerr"), nom=$("#sl_nom").value.trim(), af=Number($("#sl_af").value);
    if(!nom){ er.textContent="Posa un nom a l'espai."; er.hidden=false; return; }
    if(!(af>0)){ er.textContent="L'aforament ha de ser com a mínim 1 persona."; er.hidden=false; return; }
    if(id){ const maxPl=Math.max(0,...D.activitats.filter(a=>a.sala===id).map(a=>a.places)); if(af<maxPl){ er.textContent="Hi ha una activitat amb "+maxPl+" places en aquest espai. L'aforament no pot ser inferior."; er.hidden=false; return; } }
    const obj = id ? x : {id:uid("s")};
    Object.assign(obj,{nom,casal:usos?x.casal:$("#sl_casal").value,tipus:$("#sl_tipus").value,aforament:af,equip:$("#sl_eq").value.trim(),accessible:$("#sl_acc").checked});
    if(!id) D.sales.push(obj); S.sala=obj.id; save(); toast(id?"Canvis desats.":"Espai creat."); render(); gestioSales(); };
}
BIND.sales = () => {
  $("#gestSales").onclick=()=>gestioSales();
  document.querySelectorAll("[data-evact]").forEach(b=>{ b.onclick=()=>llistaAct(b.dataset.evact); b.onkeydown=e=>{ if(e.key==="Enter") llistaAct(b.dataset.evact); }; });
  document.querySelectorAll("[data-sala]").forEach(b=>b.onclick=()=>{ S.sala=b.dataset.sala; render(); });
  document.querySelectorAll("[data-delres]").forEach(b=>b.onclick=()=>{ const r=D.reserves.find(x=>x.id===b.dataset.delres); D.reserves=D.reserves.filter(x=>x.id!==r.id); logCanvi("Anul·lació de reserva",r.entitat+" · "+DIES[r.dia]+" "+r.inici); save(); toast("Reserva anul·lada."); render(); });
  $("#novaRes").onclick=()=>{
    const ss=D.sales.filter(inCasal);
    overlay(hdr("Nova reserva","Espais per a entitats")+'<form class="form" id="fr" novalidate>'+
    '<div class="field full"><label for="r_ent">Entitat</label><input id="r_ent" placeholder="Ex.: Associació de veïns"></div>'+
    '<div class="field full"><label for="r_mot">Motiu</label><input id="r_mot" placeholder="Ex.: Reunió de junta"></div>'+
    '<div class="field"><label for="r_sala">Sala</label><select id="r_sala">'+ss.map(s=>'<option value="'+s.id+'"'+(s.id===S.sala?' selected':'')+'>'+esc(s.nom)+(S.casal==="tots"?' · '+esc(casal(s.casal).curt):'')+'</option>').join("")+'</select></div>'+
    '<div class="field"><label for="r_dia">Dia</label><select id="r_dia">'+DIES7.map((d,i)=>'<option value="'+i+'">'+d+'</option>').join("")+'</select></div>'+
    '<div class="field"><label for="r_ini">Inici</label><input id="r_ini" type="time" value="18:00" step="900"></div>'+
    '<div class="field"><label for="r_fi">Fi</label><input id="r_fi" type="time" value="19:30" step="900"></div>'+
    '<div class="full alert" id="rerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Reservar</button></div></form>');
    $("#fr").onsubmit=e=>{ e.preventDefault(); const v=k=>$("#r_"+k).value.trim(); const er=$("#rerr");
      if(!v("ent")){ er.textContent="Indica quina entitat fa la reserva."; er.hidden=false; return; }
      if(mins(v("fi"))<=mins(v("ini"))){ er.textContent="L'hora de fi ha de ser posterior a la d'inici."; er.hidden=false; return; }
      const c=conflicte(v("sala"),Number(v("dia")),v("ini"),v("fi")); if(c){ er.textContent="No es pot reservar. "+c; er.hidden=false; return; }
      D.reserves.push({id:uid("r"),sala:v("sala"),dia:Number(v("dia")),inici:v("ini"),fi:v("fi"),entitat:v("ent"),motiu:v("mot")||"Reserva"});
      S.sala=v("sala"); save(); closeOverlay(); toast("Reserva feta."); render(); };
  };
};

VIEWS.config = () => {
  const L={C:"Consulta",E:"Enregistra",M:"Modifica",B:"Esborra"};
  const cell=v=> v ? '<span class="perms">'+"CEMB".split("").map(a=>'<i class="'+(v.includes(a)?'on':'')+'" title="'+L[a]+'">'+a+'</i>').join("")+'</span>' : '<span class="no">—</span>';
  const grups=[...new Set(PERMS.map(r=>r.g))];
  const admin=!!(ME&&ME.rol==="supervisio");
  const ed=admin&&S.permEd;
  const val=(r,k)=> ed&&S.permEd[r.m]&&S.permEd[r.m][k]!==undefined ? S.permEd[r.m][k] : (r.p[k]||"");
  const cellE=(r,k)=>{ const v=val(r,k), lock=PERM_LOCK(r.m,k), canv=v!==permDef(r.m,k);
    if(!ed) return v||canv ? '<span class="perms'+(canv?' canviat':'')+'" title="'+(canv?'Canviat respecte dels valors per defecte':'')+'">'+"CEMB".split("").map(a=>'<i class="'+(v.includes(a)?'on':'')+'" title="'+L[a]+'">'+a+'</i>').join("")+'</span>' : '<span class="no">—</span>';
    if(lock) return '<span class="perms lock" title="No es pot canviar">'+"CEMB".split("").map(a=>'<i class="'+(v.includes(a)?'on':'')+'">'+a+'</i>').join("")+'</span>';
    return '<span class="perms'+(canv?' canviat':'')+'">'+"CEMB".split("").map(a=>'<button type="button" class="pb'+(v.includes(a)?' on':'')+'" data-pc="'+r.m+'|'+k+'|'+a+'" aria-pressed="'+v.includes(a)+'" aria-label="'+esc(ROLS[k]+' · '+r.n+' · '+L[a])+'">'+a+'</button>').join("")+'</span>'; };
  const nCanvis=ed?Object.entries(S.permEd).reduce((n,[m,o])=>n+Object.entries(o).filter(([k,v])=>v!==(PM[m].p[k]||"")).length,0):0;
  const nPers=Object.values(permOverrides()).reduce((n,o)=>n+Object.keys(o).length,0);
  return '<div class="head"><div><h1>Rols i permisos</h1><p>Què pot fer cada perfil i com ho veu cadascú.</p></div>'+(admin&&!ed?'<button class="btn primary" id="permEd">Editar permisos</button>':'')+'</div>'+
  (ed?'<section class="panel" style="border:2px solid var(--accent)"><div class="panel-h"><div><h2>Editant permisos</h2><p style="margin:2px 0 0;color:var(--muted);font-size:14px">Toca una lletra per activar-la o desactivar-la. Sense <b>C</b> (consulta) no hi ha cap altre permís. Les caselles amb contorn groc són diferents dels valors per defecte. Bloquejades: la columna de Supervisió, la fila d\'Equip i l\'aprovació de comandes (ho controla el servidor).</p></div></div>'+
    '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary" id="permSave"'+(nCanvis?'':' disabled')+'>Desar '+nCanvis+' canvi'+(nCanvis===1?'':'s')+'</button><button class="btn ghost" id="permCancel">Descartar</button>'+(nPers?'<button class="btn ghost danger" id="permReset" style="margin-left:auto">Tornar als valors per defecte</button>':'')+'</div></section>':'')+
  (admin&&!ed&&nPers?'<div class="note">Hi ha '+nPers+' permisos canviats respecte dels valors per defecte (amb contorn groc).</div>':'')+
    '<div class="legend"><span><span class="perms"><i class="on">C</i></span>Consulta</span><span><span class="perms"><i class="on">E</i></span>Enregistra</span><span><span class="perms"><i class="on">M</i></span>Modifica</span><span><span class="perms"><i class="on">B</i></span>Esborra (amb motiu)</span></div>'+
  '<div class="tablewrap"><table class="perm"><thead><tr><th>Àmbit</th>'+ROLK.map(k=>'<th>'+ROLS[k]+'</th>').join("")+'</tr><tr><td style="font-size:12px;color:var(--muted)">Abast</td>'+ROLK.map(k=>'<td style="font-size:12px;color:var(--muted);white-space:normal">'+ABAST[k]+'</td>').join("")+'</tr></thead><tbody>'+
  grups.map(g=>'<tr><td colspan="'+(ROLK.length+1)+'" class="grp">'+g+'</td></tr>'+PERMS.filter(r=>r.g===g).map(r=>'<tr><td style="white-space:normal;min-width:220px"><b style="font-weight:600">'+r.n+'</b>'+(r.nota?'<div style="font-size:12px;color:var(--muted)">'+r.nota+'</div>':'')+'</td>'+ROLK.map(k=>'<td>'+cellE(r,k)+'</td>').join("")+'</tr>').join("")).join("")+'</tbody></table></div>'+
  '<section class="panel"><div class="panel-h"><h2>Normes generals</h2></div><div class="list">'+[
    "Només la Supervisió (Direcció General) dona d'alta i de baixa usuaris del programa i canvia perfils i PIN.",
    "La Coordinació dona d'alta, modifica i dona de baixa la resta: persones, activitats, sales, proveïdors, productes… Només Coordinació i Supervisió poden esborrar, sempre amb confirmació i motiu.",
    "Comandes: Neteja demana comandes de neteja; Informació i Animació, de neteja i de bar-cafeteria. Totes les autoritza la Coordinació.",
    "La resta de perfils fan baixes o anul·lacions: el registre es conserva.",
    "Un mes tancat queda bloquejat. Només Coordinació el pot reobrir, amb motiu.",
    "Les comandes de material les pot demanar tot l'equip. Les aprova la Coordinació i s'envien per correu al proveïdor.",
    "Dinamitzador/a i Informador/a només veuen el seu casal.",
    "Les notes de seguiment, derivacions, dietes i la dada «viu sol/a» només les veu l'equip tècnic (Coordinació i Dinamitzador/a).",
    "L'Ajuntament consulta informes i llistats nominals. No pot canviar res.",
    "Cada persona entra amb el seu usuari. Els permisos els comprova el servidor (la base de dades), no només el programa."
  ].map(t=>'<div class="row"><div class="t"><span style="color:var(--ink);font-size:14px">'+t+'</span></div></div>').join("")+'</div></section>'+
  '<section class="panel"><div class="panel-h"><h2>Registre de canvis</h2><span class="chip">'+D.registre.length+'</span></div><div class="list">'+(D.registre.slice(0,20).map(r=>'<div class="row"><div class="time num" style="width:96px;font-size:13px">'+fdata(r.data.slice(0,10))+' '+r.data.slice(11)+'</div><div class="t"><b>'+esc(r.accio)+' · '+esc(r.detall)+'</b><span>'+esc(r.rol)+(r.motiu?' · Motiu: '+esc(r.motiu):'')+'</span></div></div>').join("")||'<div class="empty">Encara no hi ha cap canvi registrat. Hi surten esborrats, baixes, tancaments i reobertures.</div>')+'</div></section>';
};
BIND.config = () => {
  const pe=$("#permEd"); if(pe) pe.onclick=()=>{ S.permEd={}; render(); };
  const pcn=$("#permCancel"); if(pcn) pcn.onclick=()=>{ S.permEd=null; render(); toast("Canvis descartats."); };
  document.querySelectorAll("[data-pc]").forEach(b=>b.onclick=()=>{ const [m,k,a]=b.dataset.pc.split("|"); const r=PM[m];
    const cur=(S.permEd[m]&&S.permEd[m][k]!==undefined)?S.permEd[m][k]:(r.p[k]||""); let set=new Set(cur.split(""));
    if(set.has(a)){ set.delete(a); if(a==="C") set=new Set(); } else { set.add(a); set.add("C"); }
    (S.permEd[m]=S.permEd[m]||{})[k]="CEMB".split("").filter(x=>set.has(x)).join(""); const y=window.scrollY; render(); window.scrollTo(0,y); });
  const ps=$("#permSave"); if(ps) ps.onclick=()=>{ const canvis=[];
    Object.entries(S.permEd).forEach(([m,o])=>Object.entries(o).forEach(([k,v])=>{ if(v!==(PM[m].p[k]||"")) canvis.push([m,k,v]); }));
    if(!canvis.length) return;
    confirmMotiu("Desar els canvis de permisos", canvis.length+" canvis. S'apliquen a tothom que tingui aquest perfil.", "Desar", m=>desarPermisos(canvis, m, ok=>{ if(!ok) return; S.permEd=null; render(); toast("Permisos desats."); })); };
  const pr=$("#permReset"); if(pr) pr.onclick=()=>confirmMotiu("Tornar als valors per defecte","Es desfan tots els canvis de permisos.","Restaurar",m=>restaurarPermisos(m, ok=>{ if(!ok) return; S.permEd=null; render(); toast("Permisos restaurats."); }));
};

/* ---------- Comandes a proveïdors ---------- */
const eur = n => (Math.round(n*100)/100).toLocaleString("ca-ES",{style:"currency",currency:"EUR"});
const CATS_C={neteja:{t:"Neteja",c:"#4DB6AC"},activitats:{t:"Material d'activitats",c:"#6C4BD8"},alimentacio:{t:"Alimentació i begudes",c:"#F2A93B"},farmaciola:{t:"Farmaciola",c:"#D9442A"},oficina:{t:"Oficina",c:"#5C6BC0"}};
const EST_C={pendent:["Pendent d'aprovar","warn"],aprovada:["Aprovada","good"],rebuda:["Rebuda",""],denegada:["Denegada","crit"],anullada:["Anul·lada",""]};
const mails = p => (p.emails&&p.emails.length) ? p.emails : (p.email?[p.email]:[]);
const adrTxt = a => a ? [a.via,[a.cp,a.pob].filter(Boolean).join(" "),a.prov].filter(Boolean).join(", ") : "";
const provC = id => D.compres.proveidors.find(p=>p.id===id) || {nom:"Proveïdor esborrat",email:"",cats:[]};
const prodC = id => D.compres.productes.find(p=>p.id===id) || {nom:"Producte retirat",unitat:"",cat:""};
const totalC = c => c.linies.reduce((t,l)=>t+l.q*(l.preu||0),0);
const catChip = k => '<span class="chip" style="background:'+CATS_C[k].c+'22;color:'+CATS_C[k].c+'">'+esc(CATS_C[k].t)+'</span>';
const estChip = c => '<span class="chip '+EST_C[c.estat][1]+'">'+EST_C[c.estat][0]+'</span>';
const meu = c => ME && (c.creatPer===ME.id || (!c.creatPer && nomT(ME)===c.per));
async function nouNum(){ const {data,error}=await sb.rpc("seguent_num_comanda"); if(error) throw error; return data; }
const catsDe = linies => [...new Set(linies.map(l=>prodC(l.p).cat).filter(Boolean))];

VIEWS.comandes = () => {
  const C=D.compres, t=S.cTab||(S.rol==="neteja"?"pet":"com"), AV=isoAvui(), perm=catsPermeses();
  const vis=C.comandes.filter(inCasal).filter(c=>!CATS_ROL[S.rol]||meu(c)||c.linies.some(l=>perm.includes(prodC(l.p).cat)));
  const pend=vis.filter(c=>c.estat==="pendent"), perRebre=vis.filter(c=>c.estat==="aprovada");
  const tabs='<div class="seg" role="tablist" aria-label="Seccions">'+[["com","Comandes"+(pend.length?" ("+pend.length+")":"")],["pet","Petitoris"],["prov","Proveïdors"],["prod","Productes"]].map(x=>'<button role="tab" data-ct="'+x[0]+'" aria-pressed="'+(t===x[0])+'">'+x[1]+'</button>').join("")+'</div>';
  let body='';
  if(t==="com"){
    const mes=AV.slice(0,7), impMes=vis.filter(c=>(c.estat==="aprovada"||c.estat==="rebuda")&&c.resol&&c.resol.data.startsWith(mes)).reduce((s,c)=>s+totalC(c),0);
    const f=S.cF||"actives";
    const llista=vis.filter(c=>f==="totes"||(f==="actives"?["pendent","aprovada"].includes(c.estat):c.estat===f)).sort((a,b)=>(a.estat!=="pendent")-(b.estat!=="pendent")||b.creat.localeCompare(a.creat));
    body='<div class="minikpis"><div><small>Pendents d\'aprovar</small><b class="num" style="color:'+(pend.length?'var(--warn)':'inherit')+'">'+pend.length+'</b></div><div><small>Enviades, per rebre</small><b class="num">'+perRebre.length+'</b></div><div><small>Aprovat aquest mes</small><b class="num">'+eur(impMes)+'</b></div><div><small>Proveïdors actius</small><b class="num">'+C.proveidors.filter(p=>p.actiu).length+'</b></div></div>'+
    '<div class="note"><b>Qui pot demanar:</b> Neteja, comandes de neteja · Informació i Animació, de neteja i de bar-cafeteria · Coordinació, totes. <b>Les autoritza la Coordinació.</b> En aprovar-la, el programa l\'envia per correu al proveïdor. Quan arriba, es marca com a rebuda.</div>'+
    '<div class="filters" role="group" aria-label="Estat">'+[["actives","En curs"],["pendent","Pendents"],["aprovada","Per rebre"],["rebuda","Rebudes"],["denegada","Denegades"],["totes","Totes"]].map(x=>'<button data-cf="'+x[0]+'" aria-pressed="'+(f===x[0])+'">'+x[1]+'</button>').join("")+'</div>'+
    '<section class="panel"><div class="list">'+(llista.map(c=>{ const p=provC(c.prov), cats=[...new Set(c.linies.map(l=>prodC(l.p).cat).filter(Boolean))];
      return '<div class="row" style="flex-wrap:wrap;cursor:pointer" data-vc="'+c.id+'" tabindex="0"><div class="t" style="min-width:230px"><b>'+esc(c.num)+' · '+esc(p.nom)+'</b><span>'+esc(casal(c.casal).curt)+' · '+c.linies.length+' productes · demanada per '+esc(c.per)+' el '+fdata(c.creat.slice(0,10))+(c.necessari?' · la necessiten el '+fdata(c.necessari):'')+'</span></div>'+
      cats.map(catChip).join("")+'<b class="num" style="min-width:80px;text-align:right">'+eur(totalC(c))+'</b>'+estChip(c)+(c.estat==="aprovada"?correuChipC(c):'')+
      '<button class="btn sm ghost" data-cpdf="'+c.id+'" title="Descarregar en PDF">PDF</button>'+(c.estat==="pendent"&&can("aprovacio","M")?'<button class="btn sm primary" data-cok="'+c.id+'">Revisar</button>':'<button class="btn sm" data-vc2="'+c.id+'">Veure</button>')+'</div>'; }).join("")||'<div class="empty">No hi ha comandes en aquest estat.</div>')+'</div></section>';
  } else if(t==="pet"){
    body=S.petF?petitoriHTML():petitorisInici();
  } else if(t==="prov"){
    body='<section class="panel"><div class="panel-h"><h2>Proveïdors</h2>'+(can("proveidors","E")?'<button class="btn sm primary" id="nouProv">'+ICON.plus+'Nou proveïdor</button>':'')+'</div>'+
      '<div class="toolbar"><label class="search">'+ICON.search+'<input id="pvQ" type="search" placeholder="Cerca per nom, codi, NIF o distribuïdor" value="'+esc(S.pvQ||"")+'"></label><span class="chip">'+C.proveidors.length+' proveïdors</span>'+(C.proveidors.some(p=>p.revisar)?'<span class="chip warn">'+C.proveidors.filter(p=>p.revisar).length+' amb dades per revisar</span>':'')+'</div><div class="list">'+
      C.proveidors.filter(p=>!S.pvQ||norm(p.nom+" "+p.codi+" "+p.cif+" "+(p.mag?p.mag.nom:"")).includes(norm(S.pvQ))).map(p=>'<div class="row" style="flex-wrap:wrap;cursor:pointer" data-fprov="'+p.id+'" tabindex="0"><span class="avatar">'+esc(p.nom[0])+'</span><div class="t" style="min-width:260px"><b>'+esc(p.nom)+(p.actiu?'':' · inactiu')+'</b><span>'+[p.codi,p.cif?'NIF '+p.cif:'',p.mag&&p.mag.nom?'Serveix: '+p.mag.nom+(p.mag.pob?' ('+p.mag.pob+')':''):'',mails(p).join(", ")||'sense correu'].filter(Boolean).map(esc).join(' · ')+'</span></div>'+p.cats.map(catChip).join("")+(p.exemple?'<span class="chip">Exemple</span>':'')+(p.revisar?'<span class="chip warn" title="'+esc(p.obs||"")+'">Dades per revisar</span>':'')+'<span class="chip">'+C.productes.filter(x=>x.prov===p.id&&x.actiu).length+' productes</span><button class="btn sm" data-eprov="'+p.id+'">'+(can("proveidors","M")?'Editar':'Fitxa')+'</button></div>').join("")+'</div></section>'+      '<section class="panel"><div class="panel-h"><div><h2>Enviament de comandes per correu</h2><p style="margin:2px 0 0;color:var(--muted);font-size:14px">'+((C.correu||{}).mode==="real"?'<b style="color:var(--good)">Enviament real.</b> En aprovar una comanda, s\'envia als correus del proveïdor.':'<b style="color:var(--warn)">Mode prova.</b> No s\'envia res als proveïdors'+((C.correu||{}).prova?'; la comanda arriba a '+esc(C.correu.prova)+' amb «[PROVA]».':'.'))+'</p></div>'+(esCoord()?'<button class="btn sm" id="cfgCorreuCom">Configurar</button>':'')+'</div></section>'+
      '<section class="panel"><div class="panel-h"><h2>Adreces de lliurament</h2>'+(can("proveidors","M")?'<button class="btn sm" id="edAdr">Editar</button>':'')+'</div><div class="list">'+D.casals.map(c=>'<div class="row"><div class="t"><b>'+esc(c.nom)+'</b><span>'+esc(C.adreces[c.id]||"—")+'</span></div></div>').join("")+'</div><p class="note" style="margin:0">Aquesta adreça surt al correu de cada comanda.</p></section>';
  } else {
    const fc=S.cCat||"tots", fp=S.cProv||"tots", q=norm(S.cQ||"");
    const ps=C.productes.filter(p=>(fc==="tots"||p.cat===fc)&&(fp==="tots"||p.prov===fp)&&(!q||norm(p.nom).includes(q)));
    body='<section class="panel"><div class="panel-h"><h2>Catàleg de productes</h2>'+(can("proveidors","E")?'<button class="btn sm primary" id="nouProdC">'+ICON.plus+'Nou producte</button>':'')+'</div>'+
      '<div class="toolbar"><label class="search">'+ICON.search+'<input id="cQ" type="search" placeholder="Cerca un producte" value="'+esc(S.cQ||"")+'"></label><select class="select" id="cCat"><option value="tots">Totes les categories</option>'+Object.entries(CATS_C).map(([k,v])=>'<option value="'+k+'"'+(fc===k?' selected':'')+'>'+esc(v.t)+'</option>').join("")+'</select><select class="select" id="cProv"><option value="tots">Tots els proveïdors</option>'+C.proveidors.map(p=>'<option value="'+p.id+'"'+(fp===p.id?' selected':'')+'>'+esc(p.nom)+'</option>').join("")+'</select></div>'+
      '<div class="tablewrap"><table><thead><tr><th>Producte</th><th>Codi</th><th>Categoria</th><th>Proveïdor</th><th>Format</th><th>Preu</th>'+(can("proveidors","M")?'<th></th>':'')+'</tr></thead><tbody>'+
      (ps.map(p=>'<tr'+(p.actiu?'':' style="opacity:.5"')+'><td><b style="font-weight:700">'+esc(p.nom)+'</b>'+(p.actiu?'':' · retirat')+(p.nostock?' <span class="chip warn">Sense estoc</span>':'')+(p.pet?' <span class="chip">Petitori '+esc(PET_INFO[p.pet].t.toLowerCase())+'</span>':'')+'</td><td class="num">'+esc(p.codi||"")+'</td><td>'+catChip(p.cat)+'</td><td>'+esc(provC(p.prov).nom)+'</td><td>'+esc(p.unitat)+'</td><td class="num">'+(p.preu!=null?eur(p.preu):'—')+'</td>'+(can("proveidors","M")?'<td><button class="btn sm ghost" data-eprod="'+p.id+'">Editar</button></td>':'')+'</tr>').join("")||'<tr><td colspan="7" class="empty" style="padding:14px 16px">Cap producte amb aquests filtres.</td></tr>')+'</tbody></table></div><p class="note" style="margin:0">Els preus dels petitoris són els pactats amb cada proveïdor. Serveixen per calcular l\'import aproximat; el preu final és el de la factura.</p></section>';
  }
  return '<div class="head"><div><h1>Comandes</h1><p>Demanar material als proveïdors, amb l\'aprovació de la Coordinació.</p></div>'+(can("comandes","E")?'<button class="btn primary" id="novaComanda">'+ICON.plus+'Nova comanda</button>':'')+'</div>'+tabs+body;
};
function correuChipC(c){ const a=c.correu; if(!a) return '';
  if(a.estat==="enviant") return '<span class="chip">Enviant al proveïdor…</span>';
  if(a.estat==="prova") return '<span class="chip warn" title="Mode prova: no s\'ha enviat al proveïdor">Mode prova · no enviat</span>';
  if(a.estat==="enviat") return '<span class="chip good"'+(a.a?' title="'+esc(a.a.join(", "))+'"':'')+'>'+(a.prova?'Prova enviada ':'Correu enviat ')+fdata(a.hora.slice(0,10))+'</span>';
  return '<span class="chip crit" title="'+esc(a.msg||"")+'">Correu no enviat</span>'; }

function formComanda(){
  const C=D.compres, F=S.nc||(S.nc={casal:S.casal==="tots"?"c1":S.casal,prov:"",q:{},nota:"",nec:addDays(isoAvui(),5)});
  const perm=catsPermeses(), provs=C.proveidors.filter(p=>p.actiu&&p.cats.some(c=>perm.includes(c)));
  if(!provs.some(p=>p.id===F.prov)) F.prov=provs[0]?provs[0].id:"";
  const ps=C.productes.filter(p=>p.prov===F.prov&&p.actiu&&!p.nostock&&perm.includes(p.cat));
  const tot=Object.entries(F.q).reduce((t,[id,q])=>t+q*(prodC(id).preu||0),0), n=Object.values(F.q).filter(q=>q>0).length;
  const coord=can("aprovacio","M");
  overlay(hdr("Nova comanda","Comandes")+'<form class="form" id="fnc" novalidate>'+
    (S.casal==="tots"?'<div class="field"><label for="nc_c">Per a quin casal?</label><select id="nc_c">'+D.casals.map(c=>'<option value="'+c.id+'"'+(F.casal===c.id?' selected':'')+'>'+esc(c.nom)+'</option>').join("")+'</select></div>':'')+
    '<div class="field'+(S.casal==="tots"?'':' full')+'"><label for="nc_p">Proveïdor</label><select id="nc_p">'+provs.map(p=>'<option value="'+p.id+'"'+(F.prov===p.id?' selected':'')+'>'+esc(p.nom)+' · '+p.cats.map(k=>CATS_C[k].t).join(", ")+'</option>').join("")+'</select></div>'+
    '<div class="full"><div class="section-t" style="margin-bottom:6px">Productes</div><div class="list nc-list">'+ps.map(p=>{ const q=F.q[p.id]||0; return '<div class="row"><div class="t"><b>'+esc(p.nom)+'</b><span>'+esc(p.unitat)+' · '+eur(p.preu)+'</span></div><div class="qty"><button type="button" class="btn sm" data-nq="'+p.id+'|-1" aria-label="Treure">−</button><b class="num" style="min-width:26px;text-align:center">'+q+'</b><button type="button" class="btn sm" data-nq="'+p.id+'|1" aria-label="Afegir">+</button></div></div>'; }).join("")+'</div></div>'+
    '<div class="field"><label for="nc_d">Quan la necessiteu?</label><input type="date" id="nc_d" value="'+F.nec+'" min="'+isoAvui()+'"></div>'+
    '<div class="field"><label>Import aproximat</label><div style="font-size:22px;font-weight:800;padding:6px 0" class="num">'+eur(tot)+' <small style="font-size:13px;color:var(--muted);font-weight:600">'+n+' productes</small></div></div>'+
    '<div class="field full"><label for="nc_n">Per a què és? (opcional)</label><textarea id="nc_n" rows="2" placeholder="Ex.: taller de manualitats de novembre">'+esc(F.nota)+'</textarea></div>'+
    '<p class="note full" style="margin:0">'+(coord?'Com a Coordinació, la pots aprovar ara: '+((D.compres.correu||{}).mode==="real"?'s\'enviarà per correu a '+esc(mails(provC(F.prov)).join(", ")||"—")+'.':'mode prova: no s\'enviarà al proveïdor.'):'La revisarà la Coordinació. Quan l\'aprovi, s\'enviarà per correu al proveïdor.')+'</p>'+
    '<div class="full alert" id="ncerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" id="ncCancel">Cancel·lar</button>'+(coord?'<button class="btn" type="submit" data-mode="pend">Desar pendent</button><button class="btn primary" type="submit" data-mode="ok">Aprovar i enviar</button>':'<button class="btn primary" type="submit" data-mode="pend">Enviar a aprovar</button>')+'</div></form>');
  const keep=()=>{ const c=$("#nc_c"); if(c) F.casal=c.value; F.nota=$("#nc_n").value; F.nec=$("#nc_d").value; };
  $("#nc_p").onchange=e=>{ keep(); F.prov=e.target.value; F.q={}; closeOverlay(); formComanda(); };
  document.querySelectorAll("[data-nq]").forEach(b=>b.onclick=()=>{ keep(); const [id,d]=b.dataset.nq.split("|"); F.q[id]=Math.max(0,(F.q[id]||0)+Number(d)); const sc=$(".nc-list").scrollTop; closeOverlay(); formComanda(); const l=$(".nc-list"); if(l) l.scrollTop=sc; });
  $("#ncCancel").onclick=()=>{ S.nc=null; closeOverlay(); };
  let mode="pend"; document.querySelectorAll("#fnc [data-mode]").forEach(b=>b.onclick=()=>{ mode=b.dataset.mode; });
  $("#fnc").onsubmit=async e=>{ e.preventDefault(); keep(); const er=$("#ncerr");
    const linies=Object.entries(F.q).filter(([,q])=>q>0).map(([p,q])=>({p,q,preu:prodC(p).preu}));
    if(!linies.length){ er.textContent="Afegeix almenys un producte."; er.hidden=false; return; }
    if(!F.nec){ er.textContent="Indica quan la necessiteu."; er.hidden=false; return; }
    const u=treb(S.user), qui=u?nomT(u):ROLS[S.rol];
    let num; try{ num=await nouNum(); }catch(err){ er.textContent="No s'ha pogut numerar la comanda: "+textError(err); er.hidden=false; return; }
    const c={id:uid("cm"),num,cats:catsDe(linies),casal:F.casal,prov:F.prov,linies,nota:F.nota.trim(),necessari:F.nec,estat:"pendent",creat:araIso(),per:qui,perRol:S.rol};
    D.compres.comandes.push(c); logCanvi("Nova comanda",c.num+" · "+provC(c.prov).nom+" · "+eur(totalC(c))); S.nc=null; save(); closeOverlay();
    if(mode==="ok"){ aprovarC(c,""); } else { toast("Comanda "+c.num+" enviada a la Coordinació per aprovar-la."); S.cTab="com"; render(); }
  };
}
function veureComanda(id){
  const c=D.compres.comandes.find(x=>x.id===id), p=provC(c.prov);
  const pot=c.estat==="pendent"&&can("aprovacio","M");
  overlay(hdr(c.num+" · "+p.nom, casal(c.casal).nom)+
    '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">'+estChip(c)+(c.estat==="aprovada"||c.estat==="rebuda"?correuChipC(c):'')+'</div>'+
    '<div class="tablewrap"><table><thead><tr><th>Producte</th><th>Quantitat</th><th>Import aprox.</th></tr></thead><tbody>'+
    c.linies.map(l=>{ const x=prodC(l.p); return '<tr><td>'+esc(x.nom)+'<div style="font-size:12px;color:var(--muted)">'+(x.codi?'Codi '+esc(x.codi)+' · ':'')+esc(x.unitat)+' · '+eur(l.preu||0)+(l.com?'<br><i style="color:var(--ink)">'+esc(l.com)+'</i>':'')+'</div></td><td class="num"><b>'+l.q+'</b></td><td class="num">'+eur(l.q*(l.preu||0))+'</td></tr>'; }).join("")+
    '<tr><td colspan="2"><b>Total aproximat</b></td><td class="num"><b>'+eur(totalC(c))+'</b></td></tr></tbody></table></div>'+
    (p.min&&totalC(c)<p.min?'<div class="alert">Per sota de la comanda mínima d\'aquest proveïdor ('+eur(p.min)+').</div>':'')+(p.condicions?'<p class="note" style="margin:0">'+esc(p.nom)+': '+esc(p.condicions)+'</p>':'')+
    '<dl class="dl"><dt>Demanada per</dt><dd>'+esc(c.per)+' ('+esc(ROLS[c.perRol]||"")+') · '+fdata(c.creat.slice(0,10))+' '+c.creat.slice(11,16)+'</dd><dt>La necessiten</dt><dd>'+(c.necessari?fdLlarga(c.necessari):'—')+'</dd><dt>Per a què</dt><dd>'+esc(c.nota||"—")+'</dd>'+
    (c.resol?'<dt>'+(c.estat==="denegada"?'Denegada per':'Aprovada per')+'</dt><dd>'+esc(c.resol.per)+' · '+fdata(c.resol.data.slice(0,10))+' '+c.resol.data.slice(11,16)+(c.resol.com?'<br><i>'+esc(c.resol.com)+'</i>':'')+'</dd>':'')+
    (c.rebuda?'<dt>Rebuda</dt><dd>'+esc(c.rebuda.per)+' · '+fdata(c.rebuda.data.slice(0,10))+(c.rebuda.inc?'<br><span style="color:var(--crit)">'+esc(c.rebuda.inc)+'</span>':' · tot correcte')+'</dd>':'')+
    '<dt>Proveïdor</dt><dd>'+esc(p.nom)+(p.cif?' · NIF '+esc(p.cif):'')+'<br>'+esc([p.telMag||p.tel,mails(p).join(", ")].filter(Boolean).join(" · "))+(p.mag&&p.mag.nom?'<br><span style="color:var(--muted)">Serveix: '+esc(p.mag.nom)+'</span>':'')+'</dd></dl>'+
    (pot?'<form class="form" id="fcr" novalidate><div class="field full"><label for="cr_c">Comentari (obligatori si la denegues)</label><textarea id="cr_c" rows="2"></textarea></div><div class="full alert" id="crerr" hidden></div></form>':'')+
    '<div class="m-f">'+
      (c.estat==="aprovada"&&c.correu&&(c.correu.estat!=="enviat"||c.correu.prova)&&can("aprovacio","M")?'<button class="btn" id="cReenv">Tornar a enviar el correu</button>':'')+
      '<button class="btn" data-cpdf="'+c.id+'">Descarregar PDF</button>'+
      (c.estat==="aprovada"?'<button class="btn" id="cCopia">Copiar la comanda</button>':'')+
      (c.estat==="pendent"&&(meu(c)||can("aprovacio","M"))?'<button class="btn ghost danger" id="cAnul">Anul·lar</button>':'')+
      (pot?'<button class="btn danger" id="cNo">Denegar</button><button class="btn primary" id="cOk">Aprovar i enviar al proveïdor</button>':'')+
      (c.estat==="aprovada"&&can("comandes","E")?'<button class="btn primary" id="cReb">Marcar com a rebuda</button>':'')+
      '<button class="btn ghost" data-close>Tancar</button></div>');
  const on=(i,f)=>{ const e=$("#"+i); if(e) e.onclick=f; };
  on("cOk",()=>{ const com=$("#cr_c").value.trim(); closeOverlay(); aprovarC(c,com); });
  on("cNo",()=>{ const com=$("#cr_c").value.trim(); if(!com){ const er=$("#crerr"); er.textContent="Explica per què la denegues. Ho veurà qui l'ha demanada."; er.hidden=false; return; }
    const u=ME; c.estat="denegada"; c.resol={per:u?nomT(u):ROLS[S.rol],data:araIso(),com}; logCanvi("Comanda denegada",c.num,com); save(); closeOverlay(); toast("Comanda "+c.num+" denegada."); render(); });
  on("cAnul",()=>confirmMotiu("Anul·lar "+c.num,"La comanda no s'enviarà al proveïdor.","Anul·lar",m=>{ c.estat="anullada"; logCanvi("Comanda anul·lada",c.num,m); save(); toast("Comanda anul·lada."); render(); }));
  on("cReenv",()=>{ closeOverlay(); enviarComanda(c); });
  on("cCopia",()=>{ const m=correuComanda(c); copiar("Per a: "+mails(p).join(", ")+"\nAssumpte: "+m.subject+"\n\n"+m.text); });
  on("cReb",()=>{ closeOverlay(); overlay(hdr("Marcar com a rebuda",c.num)+'<form class="form" id="frb" novalidate><label class="check full"><input type="checkbox" id="rb_ok" checked>Ha arribat tot correcte</label><div class="field full"><label for="rb_i">Incidències (si falta o arriba malament alguna cosa)</label><textarea id="rb_i" rows="2" placeholder="Ex.: falten 2 garrafes de lleixiu"></textarea></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Desar</button></div></form>');
    $("#frb").onsubmit=e=>{ e.preventDefault(); const u=treb(S.user), inc=$("#rb_i").value.trim(); c.estat="rebuda"; c.rebuda={per:u?nomT(u):ROLS[S.rol],data:araIso(),inc:$("#rb_ok").checked&&!inc?"":inc||"Hi ha incidències"}; logCanvi("Comanda rebuda",c.num,c.rebuda.inc); save(); closeOverlay(); toast("Comanda "+c.num+" rebuda."); render(); }; });
}
function aprovarC(c,com){
  const u=ME; c.estat="aprovada"; c.resol={per:u?nomT(u):ROLS[S.rol],data:araIso(),com};
  logCanvi("Comanda aprovada",c.num+" · "+provC(c.prov).nom+" · "+eur(totalC(c))); save(); S.cTab="com"; render(); enviarComanda(c);
}
function correuComanda(c){
  const p=provC(c.prov), cs=casal(c.casal);
  const subject="Comanda "+c.num+" · "+cs.nom+" · Fundació Ave Maria";
  const files=c.linies.map(l=>{ const x=prodC(l.p); return [x.nom,x.unitat,l.q,x.codi||"",l.com||""]; });
  const html='<p>Bon dia,</p><p>Us fem arribar la comanda <b>'+esc(c.num)+'</b> per al <b>'+esc(cs.nom)+'</b>, gestionat per la Fundació Ave Maria.</p>'+
    '<table border="1" cellpadding="6" style="border-collapse:collapse"><tr><th>Codi</th><th align="left">Producte</th><th align="left">Format</th><th>Quantitat</th><th align="left">Observacions</th></tr>'+files.map(r=>'<tr><td>'+esc(r[3])+'</td><td>'+esc(r[0])+'</td><td>'+esc(r[1])+'</td><td align="center"><b>'+r[2]+'</b></td><td>'+esc(r[4])+'</td></tr>').join("")+'</table>'+(D.compres.codisClient&&c.petitori==="net"&&D.compres.codisClient[c.casal]?'<p><b>Codi de client:</b> '+esc(D.compres.codisClient[c.casal])+'</p>':'')+
    '<p><b>Lliurament:</b> '+esc(D.compres.adreces[c.casal]||cs.nom)+'<br><b>La necessitem el:</b> '+esc(c.necessari?fdLlarga(c.necessari):"quan us vagi bé")+'</p>'+
    '<p>Si us plau, confirmeu la recepció d\'aquest correu i indiqueu el número de comanda a l\'albarà i a la factura.</p><p>Moltes gràcies.<br>Casals de gent gran · Fundació Ave Maria</p>';
  const text="Comanda "+c.num+" · "+cs.nom+"\n\n"+files.map(r=>"- "+r[2]+" × "+(r[3]?"["+r[3]+"] ":"")+r[0]+" ("+r[1]+")"+(r[4]?" · "+r[4]:"")).join("\n")+"\n\nLliurament: "+(D.compres.adreces[c.casal]||cs.nom)+"\nLa necessitem el: "+(c.necessari?fdLlarga(c.necessari):"")+"\n\nFundació Ave Maria";
  return {subject,html,text};
}
async function enviarComanda(c){
  const id=c.id, act=()=>D.compres.comandes.find(x=>x.id===id)||c;
  act().correu={estat:"enviant"}; save(); if(S.view==="comandes") render();
  await flush();
  let res;
  try{ const r=await fn("enviar-correu",{tipus:"comanda",id});
    res = r.estat==="enviat" ? {estat:"enviat",hora:araIso(),prova:!!r.prova,a:r.a} : {estat:r.estat==="prova"?"prova":"error",msg:r.msg};
    toast(r.estat==="enviat" ? "Comanda "+c.num+" enviada a "+r.a.join(", ")+(r.prova?" (prova).":".") : r.estat==="prova" ? "Comanda "+c.num+" aprovada. Mode prova: no s'ha enviat al proveïdor." : "Aprovada, però no s'ha enviat: "+r.msg);
  }catch(e){ res={estat:"error",msg:e.message}; toast("Aprovada, però el correu no s'ha enviat: "+e.message); }
  act().correu=res; save(); if(S.view==="comandes") render();
}
function formProv(id){
  const p=id?provC(id):{codi:"",nom:"",cif:"",tel:"",adr:{via:"",cp:"",pob:"",prov:""},mag:{nom:"",via:"",cp:"",pob:""},telMag:"",fax:"",emails:[],contacte:"",dies:null,cats:[],obs:"",revisar:false,actiu:true};
  const a=p.adr||{}, m=p.mag||{}, F=(k,l,v,o)=>'<div class="field'+(o&&o.full?' full':'')+'"><label for="pv_'+k+'">'+l+'</label><input id="pv_'+k+'" value="'+esc(v==null?"":v)+'"'+(o&&o.ph?' placeholder="'+esc(o.ph)+'"':'')+(o&&o.type?' type="'+o.type+'"':'')+'></div>';
  overlay(hdr(id?"Fitxa del proveïdor":"Nou proveïdor",p.codi||"Comandes")+'<form class="form" id="fpv" novalidate>'+
    '<div class="section-t full">Dades fiscals</div>'+
    F("n","Raó social",p.nom,{full:true})+F("cod","Codi de proveïdor",p.codi,{ph:"Ex.: ESR0036"})+F("cif","NIF",p.cif,{ph:"Ex.: B12345678"})+
    F("av","Adreça",a.via,{full:true})+F("acp","Codi postal",a.cp)+F("apob","Població",a.pob)+F("aprov","Província",a.prov)+F("t","Telèfon",p.tel)+
    '<div class="section-t full" style="margin-top:6px">Magatzem o distribuïdor que serveix les comandes</div>'+
    F("mn","Nom",m.nom,{full:true})+F("mv","Adreça",m.via,{full:true})+F("mcp","Codi postal",m.cp)+F("mpob","Població",m.pob)+F("mt","Telèfon",p.telMag)+F("mf","Fax",p.fax)+
    '<div class="section-t full" style="margin-top:6px">Comandes</div>'+
    F("e","Correus per a comandes",mails(p).join(", "),{full:true,ph:"Separa'ls amb comes si n'hi ha més d'un"})+F("ct","Persona de contacte",p.contacte)+F("d","Dies de lliurament",p.dies,{type:"number"})+F("min","Comanda mínima (€)",p.min,{type:"number"})+F("cond","Condicions i dies de servei",p.condicions,{full:true,ph:"Ex.: serveixen dilluns i dimecres · feu-la 1 cop al mes"})+
    '<div class="field full"><span class="section-t">Què ens subministra</span><div style="display:flex;gap:14px;flex-wrap:wrap">'+Object.entries(CATS_C).map(([k,v])=>'<label class="check"><input type="checkbox" data-pvc="'+k+'"'+(p.cats.includes(k)?' checked':'')+'>'+esc(v.t)+'</label>').join("")+'</div></div>'+
    '<div class="field full"><label for="pv_o">Observacions</label><textarea id="pv_o" rows="2">'+esc(p.obs||"")+'</textarea></div>'+
    '<label class="check"><input type="checkbox" id="pv_r"'+(p.revisar?' checked':'')+'>Hi ha dades per revisar</label><label class="check"><input type="checkbox" id="pv_a"'+(p.actiu?' checked':'')+'>Actiu (es pot triar a les comandes noves)</label>'+
    '<div class="full alert" id="pverr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button>'+(can("proveidors","M")||!id?'<button class="btn primary" type="submit">Desar</button>':'')+'</div></form>');
  if(!can("proveidors","M")) document.querySelectorAll("#fpv input,#fpv textarea").forEach(x=>x.disabled=true);
  $("#fpv").onsubmit=e=>{ e.preventDefault(); const v=k=>$("#pv_"+k).value.trim(), er=$("#pverr"), err=t=>{ er.textContent=t; er.hidden=false; };
    const cats=[...document.querySelectorAll("[data-pvc]:checked")].map(x=>x.dataset.pvc);
    const ems=v("e").split(/[,;\s]+/).map(x=>x.trim().toLowerCase()).filter(Boolean);
    if(!v("n")) return err("Cal la raó social.");
    if(v("cif")&&!nifOk(v("cif"))) return err("El NIF no és correcte. Revisa'l (lletra, 7 xifres i dígit de control).");
    if(D.compres.proveidors.some(x=>x.id!==id&&x.cif&&v("cif")&&x.cif.toUpperCase()===v("cif").toUpperCase())) return err("Ja hi ha un proveïdor amb aquest NIF.");
    const mal=ems.find(x=>!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x)); if(mal) return err("Aquest correu no és vàlid: "+mal);
    if(acp(v("acp"))||acp(v("mcp"))) return err("El codi postal ha de tenir 5 xifres.");
    if(!cats.length) return err("Marca almenys una categoria.");
    const o=id?p:{id:uid("pv")};
    Object.assign(o,{nom:v("n"),codi:v("cod").toUpperCase(),cif:v("cif").toUpperCase(),tel:v("t"),adr:{via:v("av"),cp:v("acp"),pob:v("apob"),prov:v("aprov")},mag:{nom:v("mn"),via:v("mv"),cp:v("mcp"),pob:v("mpob")},telMag:v("mt"),fax:v("mf"),emails:ems,contacte:v("ct"),dies:v("d")===""?null:Math.max(0,Number(v("d"))),cats,min:v("min")===""?null:Math.max(0,Number(v("min"))),condicions:v("cond"),obs:v("o"),revisar:$("#pv_r").checked,actiu:$("#pv_a").checked});
    delete o.email;
    if(!id) D.compres.proveidors.push(o); logCanvi(id?"Canvi de proveïdor":"Nou proveïdor",o.nom); save(); closeOverlay(); toast("Proveïdor desat."); render(); };
}
const acp = c => c!=="" && !/^\d{5}$/.test(c);
function nifOk(c){ c=c.toUpperCase().replace(/[\s-]/g,"");
  if(/^[XYZ]?\d{7,8}[A-Z]$/.test(c)){ const n=c.replace(/^X/,"0").replace(/^Y/,"1").replace(/^Z/,"2"); return "TRWAGMYFPDXBNJZSQVHLCKE"[Number(n.slice(0,-1))%23]===c.slice(-1); }
  if(!/^[ABCDEFGHJNPQRSUVW]\d{7}[0-9A-J]$/.test(c)) return false;
  let s=0; c.slice(1,8).split("").forEach((d,i)=>{ let n=Number(d); if(i%2===0){ n*=2; n=Math.floor(n/10)+n%10; } s+=n; });
  const k=(10-s%10)%10; return c[8]===String(k) || c[8]==="JABCDEFGHI"[k]; }
function formCorreuCom(){
  const k=D.compres.correu||(D.compres.correu={mode:"prova",prova:""});
  overlay(hdr("Enviament de comandes per correu","Comandes")+'<form class="form" id="fcc" novalidate>'+
    '<label class="check full"><input type="radio" name="cc_m" value="prova"'+(k.mode!=="real"?' checked':'')+'><span><b>Mode prova</b> — no s\'envia res als proveïdors. Si poses un correu de prova, la comanda arriba allà amb «[PROVA]».</span></label>'+
    '<div class="field full"><label for="cc_p">Correu de prova (opcional)</label><input id="cc_p" type="email" value="'+esc(k.prova||"")+'" placeholder="Ex.: el teu correu"></div>'+
    '<label class="check full"><input type="radio" name="cc_m" value="real"'+(k.mode==="real"?' checked':'')+'><span><b>Enviament real</b> — en aprovar una comanda, s\'envia als correus del proveïdor.</span></label>'+
    '<p class="note full" style="margin:0">Mentre fem proves amb dades d\'exemple, deixa-ho en mode prova: els correus dels proveïdors són reals.</p>'+
    '<div class="full alert" id="ccerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Desar</button></div></form>');
  $("#fcc").onsubmit=e=>{ e.preventDefault(); const m=document.querySelector('[name=cc_m]:checked').value, pr=$("#cc_p").value.trim();
    if(pr&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(pr)){ const er=$("#ccerr"); er.textContent="El correu de prova no és vàlid."; er.hidden=false; return; }
    k.mode=m; k.prova=pr; logCanvi("Configuració d'enviament de comandes",m==="real"?"Enviament real":"Mode prova"+(pr?" → "+pr:"")); save(); closeOverlay(); toast(m==="real"?"Les comandes aprovades s'enviaran als proveïdors.":"Mode prova activat."); render(); };
}
function formProdC(id){
  const p=id?prodC(id):{nom:"",cat:"neteja",prov:(D.compres.proveidors[0]||{}).id,unitat:"unitat",preu:1,actiu:true};
  overlay(hdr(id?"Editar producte":"Nou producte","Catàleg de comandes")+'<form class="form" id="fpc" novalidate>'+
    '<div class="field full"><label for="pc_n">Nom</label><input id="pc_n" value="'+esc(p.nom)+'"></div>'+
    '<div class="field"><label for="pc_c">Categoria</label><select id="pc_c">'+Object.entries(CATS_C).map(([k,v])=>'<option value="'+k+'"'+(p.cat===k?' selected':'')+'>'+esc(v.t)+'</option>').join("")+'</select></div>'+
    '<div class="field"><label for="pc_p">Proveïdor</label><select id="pc_p">'+D.compres.proveidors.map(x=>'<option value="'+x.id+'"'+(p.prov===x.id?' selected':'')+'>'+esc(x.nom)+'</option>').join("")+'</select></div>'+
    '<div class="field"><label for="pc_u">Format o unitat</label><input id="pc_u" value="'+esc(p.unitat)+'" placeholder="Ex.: paquet 12 u."></div>'+
    '<div class="field"><label for="pc_r">Preu (€)</label><input id="pc_r" type="number" step="0.01" min="0" value="'+(p.preu==null?"":p.preu)+'"></div>'+
    '<div class="field"><label for="pc_k">Codi del proveïdor</label><input id="pc_k" value="'+esc(p.codi||"")+'"></div>'+
    '<div class="field"><label for="pc_t">Surt al petitori</label><select id="pc_t"><option value="">Cap</option>'+Object.entries(PET_INFO).map(([k,v])=>'<option value="'+k+'"'+(p.pet===k?' selected':'')+'>'+esc(v.t)+'</option>').join("")+'</select></div>'+
    '<label class="check full"><input type="checkbox" id="pc_a"'+(p.actiu?' checked':'')+'>Es pot demanar</label><label class="check full"><input type="checkbox" id="pc_s"'+(p.nostock?' checked':'')+'>Ara no n\'hi ha en estoc</label>'+
    '<div class="full alert" id="pcerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Desar</button></div></form>');
  $("#fpc").onsubmit=e=>{ e.preventDefault(); const v=k=>$("#pc_"+k).value.trim(), er=$("#pcerr");
    if(!v("n")){ er.textContent="Cal el nom."; er.hidden=false; return; }
    if(D.compres.productes.some(x=>x.id!==id&&x.prov===v("p")&&norm(x.nom)===norm(v("n")))){ er.textContent="Aquest proveïdor ja té un producte amb aquest nom."; er.hidden=false; return; }
    const o=id?p:{id:uid("cp")}; Object.assign(o,{nom:v("n"),cat:v("c"),prov:v("p"),unitat:v("u")||"unitat",preu:v("r")===""?null:Math.max(0,Number(v("r"))||0),codi:v("k"),pet:v("t"),nostock:$("#pc_s").checked,actiu:$("#pc_a").checked});
    if(!id) D.compres.productes.push(o); logCanvi(id?"Canvi de producte (comandes)":"Nou producte (comandes)",o.nom); save(); closeOverlay(); toast("Producte desat."); render(); };
}
function formAdreces(){
  overlay(hdr("Adreces de lliurament","Comandes")+'<form class="form" id="fad" novalidate>'+D.casals.map(c=>'<div class="field full"><label for="ad_'+c.id+'">'+esc(c.nom)+'</label><input id="ad_'+c.id+'" value="'+esc(D.compres.adreces[c.id]||"")+'"></div>').join("")+'<div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Desar</button></div></form>');
  $("#fad").onsubmit=e=>{ e.preventDefault(); D.casals.forEach(c=>D.compres.adreces[c.id]=$("#ad_"+c.id).value.trim()); save(); closeOverlay(); toast("Adreces desades."); render(); };
}
BIND.comandes = () => {
  bindPetitori();
  document.querySelectorAll("[data-ct]").forEach(b=>b.onclick=()=>{ S.cTab=b.dataset.ct; render(); });
  document.querySelectorAll("[data-cf]").forEach(b=>b.onclick=()=>{ S.cF=b.dataset.cf; render(); });
  document.querySelectorAll("[data-vc]").forEach(r=>{ r.onclick=e=>{ if(e.target.closest("button")) return; veureComanda(r.dataset.vc); }; r.onkeydown=e=>{ if(e.key==="Enter") veureComanda(r.dataset.vc); }; });
  document.querySelectorAll("[data-vc2],[data-cok]").forEach(b=>b.onclick=()=>veureComanda(b.dataset.vc2||b.dataset.cok));
  const nc=$("#novaComanda"); if(nc) nc.onclick=()=>formComanda();
  const np=$("#nouProv"); if(np) np.onclick=()=>formProv();
  document.querySelectorAll("[data-eprov]").forEach(b=>b.onclick=()=>formProv(b.dataset.eprov));
  const npc=$("#nouProdC"); if(npc) npc.onclick=()=>formProdC();
  document.querySelectorAll("[data-eprod]").forEach(b=>b.onclick=()=>formProdC(b.dataset.eprod));
  const ea=$("#edAdr"); if(ea) ea.onclick=()=>formAdreces();
  const cfc=$("#cfgCorreuCom"); if(cfc) cfc.onclick=()=>formCorreuCom();
  document.querySelectorAll("[data-fprov]").forEach(r=>{ r.onclick=e=>{ if(e.target.closest("button")) return; formProv(r.dataset.fprov); }; r.onkeydown=e=>{ if(e.key==="Enter") formProv(r.dataset.fprov); }; });
  const pq=$("#pvQ"); if(pq) pq.oninput=()=>{ S.pvQ=pq.value; const pos=pq.selectionStart; render(); const n=$("#pvQ"); n.focus(); n.setSelectionRange(pos,pos); };
  const q=$("#cQ"); if(q) q.oninput=()=>{ S.cQ=q.value; const pos=q.selectionStart; render(); const n=$("#cQ"); n.focus(); n.setSelectionRange(pos,pos); };
  const cc=$("#cCat"); if(cc) cc.onchange=()=>{ S.cCat=cc.value; render(); };
  const cp=$("#cProv"); if(cp) cp.onchange=()=>{ S.cProv=cp.value; render(); };
};

/* ---------- PDF de la comanda (jsPDF) ---------- */
let JSPDF_P=null;
function carregaJsPDF(){
  if(window.jspdf&&window.jspdf.jsPDF) return Promise.resolve(window.jspdf.jsPDF);
  if(JSPDF_P) return JSPDF_P;
  JSPDF_P=new Promise((ok,ko)=>{ const s=document.createElement("script"); s.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"; s.integrity="sha384-JcnsjUPPylna1s1fvi1u12X5qjY5OL56iySh75FdtrwhO/SWXgMjoVqcKyIIWOLk"; s.crossOrigin="anonymous"; s.referrerPolicy="no-referrer"; s.onload=()=>window.jspdf&&window.jspdf.jsPDF?ok(window.jspdf.jsPDF):ko(new Error("jsPDF")); s.onerror=()=>{ JSPDF_P=null; ko(new Error("jsPDF")); }; document.head.appendChild(s); });
  return JSPDF_P;
}
const eurP = v => n2(v)+" EUR";
const imgMida = src => new Promise(r=>{ const i=new Image(); i.onload=()=>r({w:i.naturalWidth,h:i.naturalHeight}); i.onerror=()=>r({w:1,h:1}); i.src=src; });
async function pdfComanda(c){
  let JsPDF; try{ JsPDF=await carregaJsPDF(); }catch(e){ toast("No s'ha pogut preparar el PDF. Comprova la connexió."); return; }
  const doc=new JsPDF({unit:"mm",format:"a4"}), p=provC(c.prov), cs=casal(c.casal), W=210, M=16;
  const lila=[108,75,216], fosc=[43,27,92], gris=[107,95,160], linia=[228,220,247];
  const txt=(t,x,y,o)=>doc.text(String(t==null?"":t),x,y,o||{});
  // capçalera amb logos
  const [m1,m2]=await Promise.all([imgMida(LOGO_AM),imgMida(LOGO_AJT)]);
  const h1=14, w1=h1*m1.w/m1.h, h2=16, w2=h2*m2.w/m2.h;
  try{ doc.addImage(LOGO_AM,"PNG",M,12,w1,h1); }catch(e){}
  try{ doc.addImage(LOGO_AJT,"PNG",W-M-w2,11,w2,h2); }catch(e){}
  doc.setFont("helvetica","bold"); doc.setFontSize(7); doc.setTextColor(...gris); txt("GESTIONAT",M,10); txt("TITULARITAT",W-M,9.5,{align:"right"});
  doc.setDrawColor(...lila); doc.setLineWidth(0.8); doc.line(M,31,W-M,31);
  // títol
  doc.setTextColor(...fosc); doc.setFontSize(20); txt("Full de comanda",M,42);
  doc.setFontSize(12); doc.setTextColor(...lila); txt(c.num,W-M,42,{align:"right"});
  doc.setFont("helvetica","normal"); doc.setFontSize(9.5); doc.setTextColor(...gris);
  txt("Casals de gent gran de Sant Pere de Ribes · Data de la comanda: "+fdLlarga(c.creat.slice(0,10)),M,48);
  // estat
  const est={pendent:["PENDENT D'APROVAR",[242,181,68]],aprovada:["APROVADA",[31,143,95]],rebuda:["REBUDA",[31,143,95]],denegada:["DENEGADA",[217,68,42]],anullada:["ANUL·LADA",[150,150,150]]}[c.estat];
  doc.setFont("helvetica","bold"); doc.setFontSize(8.5); const ew=doc.getTextWidth(est[0])+8;
  doc.setFillColor(...est[1]); doc.roundedRect(W-M-ew,45,ew,6,1.5,1.5,"F"); doc.setTextColor(255,255,255); txt(est[0],W-M-ew/2,49.2,{align:"center"});
  // caixes proveïdor / lliurament
  const box=(x,y,w,h,tit,rows)=>{ doc.setFillColor(246,243,255); doc.roundedRect(x,y,w,h,2.5,2.5,"F"); doc.setFont("helvetica","bold"); doc.setFontSize(7.5); doc.setTextColor(...gris); txt(tit,x+4,y+6);
    let yy=y+11.5; rows.forEach((r,i)=>{ doc.setFont("helvetica",i===0?"bold":"normal"); doc.setFontSize(i===0?10.5:9); doc.setTextColor(...fosc); doc.splitTextToSize(r,w-8).slice(0,2).forEach(l=>{ txt(l,x+4,yy); yy+=4.6; }); }); };
  const bw=(W-2*M-6)/2;
  box(M,55,bw,34,"PROVEÏDOR",[p.nom,[p.codi,p.cif?"NIF: "+p.cif:""].filter(Boolean).join(" · "),p.mag&&p.mag.nom?"Serveix: "+p.mag.nom+(p.mag.pob?" ("+p.mag.pob+")":""):adrTxt(p.adr),[p.contacte,p.telMag||p.tel].filter(Boolean).join(" · "),mails(p).join(", ")].filter(Boolean));
  box(M+bw+6,55,bw,34,"LLIURAMENT",[cs.nom,D.compres.adreces[c.casal]||"","La necessitem el: "+(c.necessari?fdLlarga(c.necessari):"—")]);
  // taula
  let y=97; const cols=[{t:"Producte",x:M+3,w:70},{t:"Format",x:M+75,w:42},{t:"Quantitat",x:M+128,a:"right"},{t:"Preu orient.",x:M+153,a:"right"},{t:"Import",x:W-M-3,a:"right"}];
  doc.setFillColor(...fosc); doc.rect(M,y,W-2*M,8,"F"); doc.setFont("helvetica","bold"); doc.setFontSize(8.5); doc.setTextColor(255,255,255);
  cols.forEach(k=>txt(k.t,k.x,y+5.4,k.a?{align:k.a}:{})); y+=8;
  doc.setFont("helvetica","normal"); doc.setFontSize(9.5);
  c.linies.forEach((l,i)=>{ const x=prodC(l.p); if(y>250){ doc.addPage(); y=20; }
    if(i%2){ doc.setFillColor(250,248,255); doc.rect(M,y,W-2*M,8,"F"); }
    doc.setTextColor(...fosc); txt(doc.splitTextToSize(x.nom,68)[0],M+3,y+5.4); doc.setTextColor(...gris); txt(doc.splitTextToSize((x.codi?x.codi+" · ":"")+(x.unitat||""),40)[0],M+75,y+5.4);
    if(l.com){ doc.setFontSize(7.5); txt(doc.splitTextToSize("Obs.: "+l.com,W-2*M-6)[0],M+3,y+9.4); doc.setFontSize(9.5); }
    doc.setTextColor(...fosc); doc.setFont("helvetica","bold"); txt(l.q,M+128,y+5.4,{align:"right"}); doc.setFont("helvetica","normal");
    txt(eurP(l.preu||0),M+153,y+5.4,{align:"right"}); txt(eurP(l.q*(l.preu||0)),W-M-3,y+5.4,{align:"right"});
    const rh=l.com?11:8; doc.setDrawColor(...linia); doc.setLineWidth(0.2); doc.line(M,y+rh,W-M,y+rh); y+=rh; });
  doc.setFillColor(238,232,255); doc.rect(M,y,W-2*M,9,"F"); doc.setFont("helvetica","bold"); doc.setFontSize(10); doc.setTextColor(...fosc);
  txt("Total aproximat",M+3,y+6); txt(eurP(totalC(c)),W-M-3,y+6,{align:"right"}); y+=13;
  doc.setFont("helvetica","normal"); doc.setFontSize(8); doc.setTextColor(...gris);
  txt("Preus orientatius. L'import definitiu és el de la factura del proveïdor.",M,y); y+=8;
  if(c.nota){ doc.setFont("helvetica","bold"); doc.setFontSize(9); doc.setTextColor(...fosc); txt("Observacions",M,y); y+=5; doc.setFont("helvetica","normal");
    doc.splitTextToSize(c.nota,W-2*M).forEach(l=>{ txt(l,M,y); y+=4.6; }); y+=4; }
  // circuit de control
  if(y>235){ doc.addPage(); y=20; }
  const cw=(W-2*M-8)/3, ctl=[["DEMANADA PER",c.per,(ROLS[c.perRol]||"")+" · "+fdata(c.creat.slice(0,10))+" "+c.creat.slice(11,16)],
    [c.estat==="denegada"?"DENEGADA PER":"APROVADA PER (COORDINACIÓ)",c.resol?c.resol.per:"Pendent",c.resol?fdata(c.resol.data.slice(0,10))+" "+c.resol.data.slice(11,16)+(c.resol.com?" · "+c.resol.com:""):"Encara no s'ha revisat"],
    ["REBUDA",c.rebuda?c.rebuda.per:"—",c.rebuda?fdata(c.rebuda.data.slice(0,10))+(c.rebuda.inc?" · "+c.rebuda.inc:" · tot correcte"):(c.estat==="aprovada"?"Pendent de rebre":"")]];
  ctl.forEach((k,i)=>{ const x=M+i*(cw+4); doc.setDrawColor(...linia); doc.setLineWidth(0.4); doc.roundedRect(x,y,cw,26,2,2,"S");
    doc.setFont("helvetica","bold"); doc.setFontSize(7); doc.setTextColor(...gris); txt(k[0],x+3,y+5.5);
    doc.setFontSize(9.5); doc.setTextColor(...fosc); txt(doc.splitTextToSize(k[1],cw-6)[0],x+3,y+11.5);
    doc.setFont("helvetica","normal"); doc.setFontSize(8); doc.setTextColor(...gris); doc.splitTextToSize(k[2],cw-6).slice(0,3).forEach((l,j)=>txt(l,x+3,y+16.5+j*3.8)); });
  // peu
  const np=doc.getNumberOfPages();
  for(let i=1;i<=np;i++){ doc.setPage(i); doc.setDrawColor(...linia); doc.setLineWidth(0.3); doc.line(M,283,W-M,283); doc.setFont("helvetica","normal"); doc.setFontSize(7.5); doc.setTextColor(...gris);
    txt("Gestió: Fundació Ave Maria · Titularitat: Ajuntament de Sant Pere de Ribes · "+c.num,M,288); txt("Pàgina "+i+" de "+np,W-M,288,{align:"right"}); }
  const nom="Comanda "+c.num+" "+p.nom.replace(/[^\w\sÀ-ÿ·-]/g,"").trim()+".pdf", blob=doc.output("blob");
  const dl = null;
  if(dl){ try{ await dl.save({filename:nom,data:blob}); toast("PDF de la comanda "+c.num+" descarregat."); return; }
    catch(e){ if(e&&e.code==="declined") return; if(e&&e.code==="rate_limited"){ toast("Ja hi ha una descàrrega pendent."); return; } } }
  try{ doc.save(nom); toast("PDF de la comanda "+c.num+" descarregat."); }catch(e){ toast("No s'ha pogut descarregar el PDF."); }
}
/* ---------- Petitoris de comanda (bar-cafeteria, neteja, farmaciola i material de tallers) ---------- */
const PET_INFO={bar:{t:"Bar-cafeteria",d:"Aigües, cafè i infusions, refrescos, llet, cerveses, sucre, snacks, licors, brioixeria i sucs.",ic:"cup"},net:{t:"Neteja",d:"Productes i estris de neteja, paper, bosses, guants i gots.",ic:"tool"},far:{t:"Farmaciola",d:"Material de primeres cures: tiretes, gasses, antisèptic i gel hidroalcohòlic.",ic:"heart"},tal:{t:"Material de tallers",d:"Material per a manualitats i tallers: cartolines, cola, llapis, llana, tisores i pintura.",ic:"act"}};
const petProds = (k,prov) => D.compres.productes.filter(p=>p.pet===k&&(!prov||p.prov===prov));
const petProvs = k => { const o=(D.compres.petitoris&&D.compres.petitoris[k]&&D.compres.petitoris[k].provs)||[]; const extra=[...new Set(petProds(k).map(p=>p.prov))].filter(x=>!o.includes(x)); return o.concat(extra).filter(id=>petProds(k,id).some(p=>p.actiu)); };
function nouPetitori(k){ if(!catsPermeses().includes(PET_CAT[k])){ toast("El teu perfil no pot fer aquesta comanda."); return; } const u=ME; S.petF={k,casal:S.casal==="tots"?"":S.casal,data:isoAvui(),nom:u?nomT(u):"",q:{},com:{}}; S.cTab="pet"; render(); window.scrollTo(0,0); }
function petTotals(){ const F=S.petF, per={}; Object.entries(F.q).forEach(([id,q])=>{ if(q>0){ const p=prodC(id); per[p.prov]=(per[p.prov]||0)+q*(p.preu||0); } }); return per; }
function petitoriHTML(){
  const F=S.petF, k=F.k, I=PET_INFO[k], per=petTotals(), tot=Object.values(per).reduce((a,b)=>a+b,0), nLin=Object.values(F.q).filter(q=>q>0).length;
  const cc=D.compres.codisClient||{};
  let h='<section class="panel pet-head"><div class="panel-h"><div><div class="eyebrow">Petitori de comanda</div><h2>'+esc(I.t)+'</h2></div><button class="btn sm ghost" id="petBack">'+ICON.back+'Tornar</button></div>'+
    '<div class="form" style="padding:0"><div class="field"><span class="section-t">Casal</span><div style="display:flex;gap:16px;flex-wrap:wrap;padding-top:6px">'+D.casals.map(c=>'<label class="check"><input type="radio" name="petC" value="'+c.id+'"'+(F.casal===c.id?' checked':'')+'>'+(k==="net"&&cc[c.id]?'<b>'+esc(cc[c.id])+'</b> ':'')+esc(c.nom)+'</label>').join("")+'</div></div>'+
    '<div class="field"><label for="petD">Data de la comanda</label><input type="date" id="petD" value="'+F.data+'"></div>'+
    '<div class="field full"><label for="petN">Nom de la persona que fa la comanda</label><input id="petN" value="'+esc(F.nom)+'"></div></div>'+
    '<p class="note" style="margin:0">Posa la quantitat al costat de cada producte. En enviar-lo, es crea una comanda per a cada proveïdor i la Coordinació les revisa. Fixa\'t en les comandes mínimes i els dies de servei.</p></section>';
  petProvs(k).forEach(pid=>{ const p=provC(pid), ps=petProds(k,pid).filter(x=>x.actiu), st=per[pid]||0, sota=p.min&&st>0&&st<p.min;
    h+='<section class="panel pet-sec"><div class="pet-band"><div><b>'+esc(p.nom)+'</b>'+(p.condicions?'<span> · '+esc(p.condicions)+'</span>':'')+'</div><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">'+(p.min?'<span class="chip">Mínim '+eur(p.min)+'</span>':'')+'<span class="chip '+(sota?'crit':st?'good':'')+'" id="pst_'+pid+'">'+(sota?'Per sota del mínim · ':'')+eur(st)+'</span></div></div>'+
      '<div class="tablewrap" style="border:0"><table class="pet-t"><thead><tr><th>Producte</th><th>Format</th><th>Codi</th><th>Preu</th><th style="width:110px">Quantitat</th><th>Comentaris</th></tr></thead><tbody>'+
      ps.map(x=>'<tr class="'+(x.nostock?'ns':'')+((F.q[x.id]||0)>0?' on':'')+'" id="pr_'+x.id+'"><td><b style="font-weight:700">'+esc(x.nom)+'</b></td><td>'+esc(x.unitat)+'</td><td class="num">'+esc(x.codi||"")+'</td><td class="num">'+(x.preu!=null?eur(x.preu):'—')+'</td>'+
        (x.nostock?'<td colspan="2"><span class="chip warn">Ara no n\'hi ha en estoc</span></td>':'<td><input type="number" min="0" step="1" inputmode="numeric" class="pet-q" data-pq="'+x.id+'" value="'+(F.q[x.id]||"")+'" aria-label="Quantitat de '+esc(x.nom)+'"></td><td><input class="pet-c" data-pc="'+x.id+'" value="'+esc(F.com[x.id]||"")+'" placeholder="Opcional"></td>')+'</tr>').join("")+'</tbody></table></div></section>'; });
  h+='<div class="pet-bar"><div><b id="petTot">'+eur(tot)+'</b><span id="petLin">'+nLin+' productes · '+Object.keys(per).length+' proveïdors</span></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="petBuida">Buidar</button><button class="btn" id="petPdf">Descarregar PDF</button>'+(can("aprovacio","M")?'<button class="btn" id="petSend2">Aprovar i enviar</button>':'')+'<button class="btn primary" id="petSend">Enviar a aprovar</button></div></div>';
  return h;
}
function petitorisInici(){
  return '<div class="grid2" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">'+Object.entries(PET_INFO).filter(([k])=>catsPermeses().includes(PET_CAT[k])).map(([k,I])=>{ const pv=petProvs(k), n=petProds(k).filter(p=>p.actiu).length;
    return '<section class="panel"><div class="panel-h"><div style="display:flex;gap:12px;align-items:center"><span class="avatar" style="width:46px;height:46px;background:var(--surface2);color:var(--ink)">'+ICON[I.ic]+'</span><div><div class="eyebrow">Petitori de comanda</div><h2>'+esc(I.t)+'</h2></div></div></div>'+
    '<p style="margin:0;color:var(--muted)">'+esc(I.d)+'</p><div style="display:flex;gap:6px;flex-wrap:wrap"><span class="chip">'+pv.length+' proveïdors</span><span class="chip">'+n+' productes</span></div>'+
    '<div style="display:flex;gap:8px;flex-wrap:wrap">'+(can("comandes","E")?'<button class="btn primary" data-petnou="'+k+'">'+ICON.plus+'Omplir el petitori</button>':'')+'<button class="btn" data-petblanc="'+k+'">PDF en blanc</button></div></section>'; }).join("")+'</div>'+
    '<p class="note">Són els fulls de comanda dels casals, ara amb el logo de la Fundació Ave Maria. Es poden omplir aquí mateix o descarregar en blanc per omplir a mà.</p>';
}
function bindPetitori(){
  document.querySelectorAll("[data-petnou]").forEach(b=>b.onclick=()=>nouPetitori(b.dataset.petnou));
  document.querySelectorAll("[data-petblanc]").forEach(b=>b.onclick=()=>pdfPetitori({k:b.dataset.petblanc,casal:"",data:"",nom:"",q:{},com:{}}));
  const F=S.petF; if(!F) return;
  const upd=()=>{ const per=petTotals(), tot=Object.values(per).reduce((a,b)=>a+b,0);
    petProvs(F.k).forEach(pid=>{ const e=$("#pst_"+pid); if(!e) return; const st=per[pid]||0, p=provC(pid), sota=p.min&&st>0&&st<p.min; e.className="chip "+(sota?"crit":st?"good":""); e.textContent=(sota?"Per sota del mínim · ":"")+eur(st); });
    $("#petTot").textContent=eur(tot); $("#petLin").textContent=Object.values(F.q).filter(q=>q>0).length+" productes · "+Object.keys(per).length+" proveïdors"; };
  document.querySelectorAll("[data-pq]").forEach(i=>i.oninput=()=>{ const v=Math.max(0,Math.floor(Number(i.value)||0)); if(v) F.q[i.dataset.pq]=v; else delete F.q[i.dataset.pq]; const r=$("#pr_"+i.dataset.pq); if(r) r.classList.toggle("on",v>0); upd(); });
  document.querySelectorAll("[data-pc]").forEach(i=>i.oninput=()=>{ F.com[i.dataset.pc]=i.value; });
  document.querySelectorAll("[name=petC]").forEach(r=>r.onchange=()=>{ F.casal=r.value; });
  $("#petD").onchange=e=>{ F.data=e.target.value; }; $("#petN").oninput=e=>{ F.nom=e.target.value; };
  $("#petBack").onclick=()=>{ const surt=()=>{ S.petF=null; render(); }; if(Object.keys(F.q).length) confirmar("Sortir del petitori","Es perdran les quantitats que has posat.","Sortir",surt); else surt(); };
  $("#petBuida").onclick=()=>{ F.q={}; F.com={}; render(); };
  $("#petPdf").onclick=()=>pdfPetitori(F);
  const send=aprova=>{ const err=t=>toast(t);
    if(!F.casal) return err("Tria el casal.");
    if(!F.nom.trim()) return err("Escriu el nom de la persona que fa la comanda.");
    const per={}; Object.entries(F.q).forEach(([id,q])=>{ if(q>0){ const p=prodC(id); (per[p.prov]=per[p.prov]||[]).push({p:id,q,preu:p.preu||0,com:(F.com[id]||"").trim()}); } });
    const provs=Object.keys(per); if(!provs.length) return err("Posa la quantitat d'algun producte.");
    const sota=provs.filter(pid=>{ const p=provC(pid); return p.min && per[pid].reduce((t,l)=>t+l.q*l.preu,0)<p.min; });
    const fer=async()=>{
    const creades=[];
    for(const pid of provs){ let num; try{ num=await nouNum(); }catch(err){ toast("No s'ha pogut numerar la comanda: "+textError(err)); break; } const c={id:uid("cm"),num,cats:catsDe(per[pid]),casal:F.casal,prov:pid,petitori:F.k,linies:per[pid],nota:"Petitori "+PET_INFO[F.k].t.toLowerCase()+(F.data?" del "+fdata(F.data):""),necessari:null,estat:"pendent",creat:araIso(),per:F.nom.trim(),perRol:S.rol};
      D.compres.comandes.push(c); logCanvi("Nova comanda (petitori "+PET_INFO[F.k].t.toLowerCase()+")",c.num+" · "+provC(pid).nom+" · "+eur(totalC(c))); creades.push(c); }
    if(!creades.length) return;
    S.petF=null; S.cTab="com"; save();
    if(aprova){ creades.forEach(c=>aprovarC(c,"")); toast(creades.length+" comandes aprovades."); }
    else { render(); toast("S'han creat "+creades.length+" comandes ("+creades.map(c=>c.num).join(", ")+"). Ara les revisarà la Coordinació."); }
    window.scrollTo(0,0); };
    if(sota.length) confirmar("Hi ha comandes per sota del mínim",sota.map(x=>provC(x).nom+" (mínim "+eur(provC(x).min)+")").join(", ")+". Les vols enviar igualment? La Coordinació ho veurà.","Enviar igualment",fer); else fer(); };
  $("#petSend").onclick=()=>send(false); const s2=$("#petSend2"); if(s2) s2.onclick=()=>send(true);
}
async function desaPDF(doc,nom){
  const blob=doc.output("blob"), dl = null;
  if(dl){ try{ await dl.save({filename:nom,data:blob}); toast("PDF descarregat."); return; }
    catch(e){ if(e&&e.code==="declined") return; if(e&&e.code==="rate_limited"){ toast("Ja hi ha una descàrrega pendent."); return; } } }
  try{ doc.save(nom); toast("PDF descarregat."); }catch(e){ toast("No s'ha pogut descarregar el PDF."); }
}
async function pdfPetitori(F){
  let JsPDF; try{ JsPDF=await carregaJsPDF(); }catch(e){ toast("No s'ha pogut preparar el PDF. Comprova la connexió."); return; }
  const doc=new JsPDF({unit:"mm",format:"a4"}), W=210, M=12, k=F.k, I=PET_INFO[k], cc=D.compres.codisClient||{};
  const fosc=[43,27,92], gris=[90,80,130], banda=[217,217,217];
  const txt=(t,x,y,o)=>doc.text(String(t==null?"":t),x,y,o||{});
  const m1=await imgMida(LOGO_AM), lh=15, lw=lh*m1.w/m1.h;
  const cap=()=>{ doc.setDrawColor(0); doc.setLineWidth(0.4); doc.rect(M,10,W-2*M,28); doc.line(W/2+8,10,W/2+8,38);
    doc.setFont("helvetica","bold"); doc.setFontSize(9); doc.setTextColor(0);
    D.casals.forEach((c,i)=>{ const y=16+i*7; txt((k==="net"&&cc[c.id]?cc[c.id]+" ":"")+(k==="bar"?"CASAL DE GENT GRAN DE ":"")+(k==="bar"?c.curt.toUpperCase():c.curt.toUpperCase()),M+2,y); const bx=M+(k==="bar"?78:48); doc.rect(bx,y-3.6,4.5,4.5); if(F.casal===c.id){ doc.setLineWidth(0.6); doc.line(bx+0.8,y-1.4,bx+2,y+0.2); doc.line(bx+2,y+0.2,bx+3.9,y-3); doc.setLineWidth(0.4); } });
    txt("DATA DE LA COMANDA: ",M+2,30); doc.setFont("helvetica","normal"); txt(F.data?fdLlarga(F.data):"",M+42,30);
    doc.setFont("helvetica","bold"); txt("NOM DE LA PERSONA QUE FA LA COMANDA: ",M+2,35.5); doc.setFont("helvetica","normal"); txt(F.nom||"",M+79,35.5);
    try{ doc.addImage(LOGO_AM,"PNG",W-M-lw-4,14,lw,lh); }catch(e){}
    doc.setFont("helvetica","bold"); doc.setFontSize(8); doc.setTextColor(...gris); txt("PETITORI DE COMANDA · "+I.t.toUpperCase(),W/2+12,34); };
  const cols=[{t:"PRODUCTE",x:M,w:66},{t:"FORMAT",x:M+66,w:32},{t:"CODI",x:M+98,w:14},{t:"PREU",x:M+112,w:16},{t:"QUANTITAT",x:M+128,w:18},{t:"OBSERVACIONS",x:M+146,w:W-2*M-146}];
  const rh=5.4; let y;
  const capTaula=()=>{ doc.setFillColor(255,255,255); doc.setFont("helvetica","bold"); doc.setFontSize(7.5); doc.setTextColor(0); cols.forEach(c=>{ doc.rect(c.x,y,c.w,rh); txt(c.t,c.x+c.w/2,y+3.8,{align:"center"}); }); y+=rh; };
  const nova=()=>{ doc.addPage(); y=14; };
  cap(); y=42;
  let total=0;
  petProvs(k).forEach(pid=>{ const p=provC(pid), ps=petProds(k,pid).filter(x=>x.actiu);
    if(y+rh*3>282) nova();
    doc.setFillColor(...banda); doc.rect(M,y,W-2*M,rh,"FD"); doc.setFont("helvetica","bold"); doc.setFontSize(8); doc.setTextColor(0);
    txt(p.nom.toUpperCase()+(p.min?"  (mínim "+n2(p.min)+" EUR)":"")+(p.condicions?"  ("+p.condicions+")":""),W/2,y+3.8,{align:"center"}); y+=rh; capTaula();
    ps.forEach(x=>{ if(y+rh>282){ nova(); capTaula(); }
      const q=F.q[x.id]||0, com=x.nostock?"Ara no n'hi ha en estoc":(F.com[x.id]||""); total+=q*(x.preu||0);
      if(q>0){ doc.setFillColor(238,232,255); doc.rect(M,y,W-2*M,rh,"F"); }
      doc.setFont("helvetica","normal"); doc.setFontSize(7.3); doc.setTextColor(0);
      cols.forEach(c=>doc.rect(c.x,y,c.w,rh));
      txt(doc.splitTextToSize(x.nom,cols[0].w-2)[0],cols[0].x+1.2,y+3.8); txt(doc.splitTextToSize(x.unitat||"",cols[1].w-2)[0],cols[1].x+cols[1].w/2,y+3.8,{align:"center"});
      txt(x.codi||"",cols[2].x+cols[2].w/2,y+3.8,{align:"center"}); txt(x.preu!=null?n2(x.preu)+" EUR":"-",cols[3].x+cols[3].w-1.2,y+3.8,{align:"right"});
      if(q>0){ doc.setFont("helvetica","bold"); doc.setFontSize(8.5); txt(q,cols[4].x+cols[4].w/2,y+3.9,{align:"center"}); doc.setFont("helvetica","normal"); doc.setFontSize(7.3); }
      if(com){ doc.setTextColor(x.nostock?150:0); txt(doc.splitTextToSize(com,cols[5].w-2)[0],cols[5].x+1.2,y+3.8); doc.setTextColor(0); }
      y+=rh; }); y+=2; });
  if(total>0){ if(y+10>282) nova(); doc.setFont("helvetica","bold"); doc.setFontSize(9.5); doc.setTextColor(...fosc); txt("Total aproximat de la comanda: "+n2(total)+" EUR",W-M,y+5,{align:"right"}); }
  const np=doc.getNumberOfPages();
  for(let i=1;i<=np;i++){ doc.setPage(i); doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.setTextColor(...gris);
    txt("Fundació Ave Maria · Casals de gent gran de Sant Pere de Ribes · Petitori "+I.t.toLowerCase(),M,291); txt("Pàgina "+i+" de "+np,W-M,291,{align:"right"}); }
  await desaPDF(doc,"Petitori "+I.t.toLowerCase()+(F.data?" "+F.data:" en blanc")+".pdf");
}
function confirmar(titol,text,boto,ok){ overlay(hdr(titol)+'<p style="margin:0">'+esc(text)+'</p><div class="m-f"><button class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" id="cfOk">'+esc(boto)+'</button></div>'); $("#cfOk").onclick=()=>{ closeOverlay(); ok(); }; }
document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest("[data-cpdf]"); if(!b) return; e.stopPropagation(); const c=D.compres.comandes.find(x=>x.id===b.dataset.cpdf); if(c) pdfComanda(c); },true);

/* ---------- Àpats amb companyia ---------- */
const apDia = () => S.apDia==null ? avuiIdx7() : S.apDia;
const apNom = r => r.soci ? nomComplet(soci(r.soci)) : r.nom;
/* Preus del plec (Annex IV i Annex VI) — només Roquetes:
   · persones inscrites al servei d'àpats en companyia: 5,20 € (o el que els toqui pagar si tenen bonificació de Serveis Socials);
   · persones no inscrites que dinen al menjador: preu del bar, menú complet 7,00 € o mig menú 4,50 €. */
function apCfg(){ const A=D.apats;
  if(A.preuServei==null) A.preuServei=5.20; if(A.preuMenu==null) A.preuMenu=7.00; if(A.preuMig==null) A.preuMig=4.50;
  if(!A.bonif){ A.bonif={}; (A.subvencionats||[]).forEach(x=>{ A.bonif[x]=A.preuSubv!=null&&A.preuSubv<A.preuServei?A.preuSubv:2; }); }
  if(!A.cobraments) A.cobraments={}; A.subvencionats=Object.keys(A.bonif); return A; }
const esBonif = sid => !!sid && (sid in apCfg().bonif);
const apPreuUsuari = sid => { const A=apCfg(); return esBonif(sid) ? A.bonif[sid] : A.preuServei; };
const apPreu = r => r.soci ? apPreuUsuari(r.soci) : (r.mig ? apCfg().preuMig : apCfg().preuMenu);
const NORMATIVA_APATS = [
  "El contractista s'obliga a prestar sense interrupcions el servei d'àpats en companyia de dilluns a diumenge, amb excepció dels dies que puguin pactar-se en funció de les necessitats del servei i del calendari de festes laborals a Catalunya.",
  "El servei d'àpats en companyia s'adreça a totes les persones a partir de 65 anys i els pensionistes. També en poden fer ús el cònjuge d'un usuari encara que no tingui els 65 anys. De la mateixa manera està adreçat a persones, en d'altres franges d'edat, amb dificultats socials i econòmiques.",
  "L'horari del servei serà de les 13 h a les 14:30 h.",
  "El servei consisteix en un càtering amb un menú genèric. També es serviran menús adaptats a les necessitats dietètiques concretes de cada persona quan hi hagi informe mèdic que avali aquesta necessitat. En el moment de la inscripció s'haurà d'especificar el tipus de menú.",
  "La valoració del servei i les inscripcions es faran des de Serveis Socials. En el cas de baixa abans d'inici, la persona usuària està obligada a fer-se càrrec de la despesa corresponent als menús ja elaborats.",
  "El preu del servei és de 5,20 €.",
  "La forma de pagament és mensual i per avançat. L'abonament es farà directament a l'empresa que presta el servei.",
  "En cas de baixa o modificació de la inscripció s'haurà d'avisar al servei amb 5 dies d'antelació. En cas de no respectar el termini s'haurà d'abonar la despesa corresponent dels menús ja elaborats. Les persones beneficiàries de la bonificació municipal que no assisteixin al servei sense prèvia justificació (justificant mèdic o deure inexcusable) hauran d'abonar tant la part pròpia com la bonificació.",
  "La persona assistent al servei es compromet a respectar i participar de les normes de convivència establertes al Reglament de Règim intern del Casal de les persones grans."];
function veureNormativa(){
  overlay(hdr("Normativa del servei d'àpats en companyia","Annex IV del plec tècnic")+'<ol style="margin:0;padding-left:22px;display:flex;flex-direction:column;gap:8px">'+NORMATIVA_APATS.map(t=>'<li>'+esc(t)+'</li>').join("")+'</ol>'+
  '<div class="note">Preus aplicats al menjador de Roquetes: servei d\'àpats '+eur(apCfg().preuServei)+' · persones no inscrites, preu del bar (Annex VI): menú complet '+eur(apCfg().preuMenu)+', mig menú '+eur(apCfg().preuMig)+'.</div>');
}
/* Dies que una persona té dinar reservat dins un mes (reserves setmanals) */
function diesReservats(sid, mes){ const dies=new Set(D.apats.reserves.filter(r=>r.soci===sid).map(r=>r.dia)); let n=0; const f=ultimDia(mes);
  for(let d=mes+"-01"; d<=f; d=addDays(d,1)) if(dies.has(avuiIdx7Of(d))) n++; return n; }
const avuiIdx7Of = d => wd(d);
function cobramentsMes(mes){ const A=apCfg(), ant=addDays(mes+"-01",-1).slice(0,7);
  const ids=[...new Set(A.reserves.filter(r=>r.soci&&soci(r.soci)).map(r=>r.soci))];
  return ids.map(x=>{ const n=diesReservats(x,mes), pu=apPreuUsuari(x);
    const reg=esBonif(x) ? (A.historic||[]).filter(h=>h.data.startsWith(ant)&&h.absents.includes(x)&&!(h.just||[]).includes(x)).reduce((t,h)=>t+(((h.preus&&h.preus.servei)??A.preuServei)-((h.bonif&&h.bonif[x]!=null)?h.bonif[x]:pu)),0) : 0;
    return {x,n,pu,reg,imp:Math.round((n*pu+reg)*100)/100,c:A.cobraments[mes+"|"+x]}; }).sort((p,q)=>nomComplet(soci(p.x)).localeCompare(nomComplet(soci(q.x)))); }
function cobramentsModal(mes){
  const A=apCfg(); mes=mes||isoAvui().slice(0,7); const L=cobramentsMes(mes), seg=addDays(ultimDia(mes),1).slice(0,7), prev=addDays(mes+"-01",-1).slice(0,7);
  const pend=L.filter(o=>!o.c&&o.imp>0);
  overlay(hdr("Cobraments de "+nomMes(mes),"Pagament mensual i per avançat (normativa, punt 7)")+
  '<div class="filters" role="group" aria-label="Mes"><button data-cm="'+prev+'">← '+nomMes(prev)+'</button><button aria-pressed="true">'+nomMes(mes)+'</button><button data-cm="'+seg+'">'+nomMes(seg)+' →</button></div>'+
  '<div class="minikpis"><div><small>Persones</small><b class="num">'+L.length+'</b></div><div><small>Per cobrar</small><b class="num">'+eur(pend.reduce((t,o)=>t+o.imp,0))+'</b></div><div><small>Cobrat</small><b class="num">'+eur(L.filter(o=>o.c).reduce((t,o)=>t+o.c.import,0))+'</b></div></div>'+
  '<div class="list">'+(L.map(o=>'<div class="row" style="flex-wrap:wrap"><div class="t" style="min-width:200px"><b>'+esc(nomComplet(soci(o.x)))+'</b><span>'+o.n+' dinars × '+eur(o.pu)+(esBonif(o.x)?' (bonificada)':'')+(o.reg?' + '+eur(o.reg)+' d\'absències sense justificar de '+nomMes(prev):'')+'</span></div><b class="num">'+eur(o.imp)+'</b>'+(o.c?'<span class="chip good">Pagat '+fdata(o.c.data)+'</span><button class="btn sm ghost" data-cdes="'+o.x+'">Desfer</button>':'<button class="btn sm primary" data-cpag="'+o.x+'">Cobrar</button>')+'</div>').join("")||'<div class="empty">No hi ha persones inscrites amb dinars reservats.</div>')+'</div>'+
  '<p class="note" style="margin:0">Es compten els dies de la setmana que cada persona té reservats. Les persones bonificades paguen la seva part; si l\'Ajuntament els bonifica i falten sense justificar-ho, el mes següent paguen també la bonificació (normativa, punt 8).</p>');
  document.querySelectorAll(".modal [data-cm]").forEach(b=>b.onclick=()=>cobramentsModal(b.dataset.cm));
  document.querySelectorAll(".modal [data-cpag]").forEach(b=>b.onclick=()=>{ const o=L.find(y=>y.x===b.dataset.cpag); A.cobraments[mes+"|"+o.x]={data:isoAvui(),import:o.imp,dinars:o.n,preu:o.pu,reg:o.reg}; logCanvi("Cobrament d'àpats",nomComplet(soci(o.x))+" · "+nomMes(mes)+" · "+eur(o.imp)); save(); toast("Cobrat "+eur(o.imp)+" a "+soci(o.x).nom+"."); cobramentsModal(mes); render(); });
  document.querySelectorAll(".modal [data-cdes]").forEach(b=>b.onclick=()=>{ delete A.cobraments[mes+"|"+b.dataset.cdes]; logCanvi("Cobrament d'àpats desfet",nomComplet(soci(b.dataset.cdes))+" · "+nomMes(mes)); save(); cobramentsModal(mes); render(); });
}
function preusModal(){
  const A=apCfg(); const bon=Object.keys(A.bonif).filter(x=>soci(x));
  const cand=D.socis.filter(x=>x.casal==="c2"&&!(x.id in A.bonif)&&A.reserves.some(r=>r.soci===x.id));
  overlay(hdr("Preus i bonificacions","Àpats en companyia · Roquetes")+'<form class="form" id="fpr" novalidate>'+
  '<div class="field"><label for="pr_s">Servei d\'àpats (Annex IV)</label><input id="pr_s" type="number" step="0.01" min="0" value="'+A.preuServei+'"></div>'+
  '<div class="field"><label for="pr_m">No inscrits: menú complet (Annex VI)</label><input id="pr_m" type="number" step="0.01" min="0" value="'+A.preuMenu+'"></div>'+
  '<div class="field"><label for="pr_g">No inscrits: mig menú (Annex VI)</label><input id="pr_g" type="number" step="0.01" min="0" value="'+A.preuMig+'"></div>'+
  '<div class="full section-t">Persones bonificades per Serveis Socials (el que paga la persona)</div>'+
  (bon.map(x=>'<div class="field"><label for="bn_'+x+'">'+esc(nomComplet(soci(x)))+'</label><div style="display:flex;gap:6px"><input id="bn_'+x+'" data-bn="'+x+'" type="number" step="0.01" min="0" value="'+A.bonif[x]+'"><button type="button" class="btn sm ghost danger" data-bnx="'+x+'" aria-label="Treure la bonificació">'+ICON.x+'</button></div></div>').join("")||'<p class="note full" style="margin:0">Cap persona bonificada.</p>')+
  (cand.length?'<div class="field full"><label for="bn_nou">Afegir persona bonificada</label><div style="display:flex;gap:6px"><select id="bn_nou"><option value="">Tria la persona</option>'+cand.map(x=>'<option value="'+x.id+'">'+esc(nomComplet(x))+'</option>').join("")+'</select><input id="bn_imp" type="number" step="0.01" min="0" placeholder="Paga (€)" style="max-width:120px"></div></div>':'')+
  '<p class="note full" style="margin:0">La resta fins al preu del servei la paga l\'Ajuntament i surt a la justificació mensual (Annex II). Els preus els fixa l\'Ajuntament per ordenança i no es revisen durant el contracte.</p>'+
  '<div class="full alert" id="prerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Desar</button></div></form>');
  const treure=new Set();
  document.querySelectorAll(".modal [data-bnx]").forEach(b=>b.onclick=()=>{ treure.add(b.dataset.bnx); b.closest(".field").remove(); });
  $("#fpr").onsubmit=e=>{ e.preventDefault(); const er=t=>{ const x=$("#prerr"); x.textContent=t; x.hidden=false; };
    const sv=Number($("#pr_s").value), mn=Number($("#pr_m").value), mg=Number($("#pr_g").value);
    if(!(sv>0)||!(mn>0)||!(mg>0)) return er("Els preus han de ser més grans que 0.");
    const nous={}; for(const i of document.querySelectorAll(".modal [data-bn]")){ const v=Number(i.value); if(!(v>=0)||v>sv) return er("L'import que paga una persona bonificada ha d'estar entre 0 i el preu del servei."); nous[i.dataset.bn]=Math.round(v*100)/100; }
    const nn=$("#bn_nou"); if(nn&&nn.value){ const v=Number($("#bn_imp").value); if(!($("#bn_imp").value!=="")||!(v>=0)||v>sv) return er("Indica quant paga la persona nova (entre 0 i "+eur(sv)+")."); nous[nn.value]=Math.round(v*100)/100; }
    treure.forEach(x=>delete nous[x]);
    A.preuServei=sv; A.preuMenu=mn; A.preuMig=mg; A.bonif=nous; A.subvencionats=Object.keys(nous);
    A.reserves.forEach(r=>{ r.subv=esBonif(r.soci); });
    logCanvi("Preus i bonificacions d'àpats","Servei "+eur(sv)+" · menú "+eur(mn)+" · mig "+eur(mg)+" · "+Object.keys(nous).length+" bonificades"); save(); closeOverlay(); toast("Preus desats."); render(); };
}
function tancarDiaModal(){
  const A=apCfg(), d=isoAvui(), rs=A.reserves.filter(r=>r.dia===avuiIdx7());
  if((A.historic||[]).some(h=>h.data===d)){ toast("El dia d'avui ja està tancat."); return; }
  const abs=rs.filter(r=>r.soci&&!r.vingut), ext=rs.filter(r=>!r.soci&&r.vingut);
  overlay(hdr("Tancar el dia","Àpats en companyia · "+fdata(d))+
  '<div class="minikpis"><div><small>Han dinat</small><b class="num">'+rs.filter(r=>r.vingut).length+'</b></div><div><small>No han vingut</small><b class="num">'+abs.length+'</b></div><div><small>No inscrits</small><b class="num">'+ext.length+' · '+eur(ext.reduce((t,r)=>t+apPreu(r),0))+'</b></div></div>'+
  (abs.length?'<div class="section-t">Absències: marca les justificades (justificant mèdic o deure inexcusable)</div><div class="list">'+abs.map(r=>'<label class="row check" style="justify-content:space-between"><span><b>'+esc(apNom(r))+'</b>'+(esBonif(r.soci)?' <span class="chip warn">Bonificada</span>':'')+'</span><span><input type="checkbox" data-just="'+r.soci+'"> Justificada</span></label>').join("")+'</div>':'<div class="note">Hi han vingut totes les persones inscrites.</div>')+
  (ext.some(r=>!r.pagat)?'<div class="alert">Hi ha persones no inscrites que no consta que hagin pagat: '+ext.filter(r=>!r.pagat).map(r=>esc(apNom(r))).join(", ")+'.</div>':'')+
  '<p class="note" style="margin:0">Les absències sense justificar de persones bonificades es cobren senceres el mes següent (normativa, punt 8). Les persones no inscrites que no han vingut no es compten.</p>'+
  '<div class="m-f"><button class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" id="tdOk">Tancar el dia</button></div>');
  $("#tdOk").onclick=()=>{ const just=[...document.querySelectorAll(".modal [data-just]")].filter(c=>c.checked).map(c=>c.dataset.just);
    const serv=rs.filter(r=>r.soci&&r.vingut).map(r=>r.soci), absents=abs.map(r=>r.soci);
    const bonif={}; serv.concat(absents).forEach(x=>{ if(esBonif(x)) bonif[x]=A.bonif[x]; });
    A.historic=A.historic||[]; A.historic.push({data:d,servits:serv,absents,just,externs:ext.length,extMig:ext.filter(r=>r.mig).length,extImp:Math.round(ext.reduce((t,r)=>t+apPreu(r),0)*100)/100,preus:{servei:A.preuServei,menu:A.preuMenu,mig:A.preuMig},bonif});
    A.reserves=A.reserves.filter(r=>!(r.dia===avuiIdx7()&&!r.soci)); A.reserves.forEach(r=>{ if(r.dia===avuiIdx7()){ r.vingut=false; r.pagat=false; } });
    logCanvi("Tancament del dia d'àpats",fdata(d)+" · "+serv.length+" inscrites · "+ext.length+" no inscrites"); save(); closeOverlay(); toast("Dia tancat. Queda a l'informe del mes."); render(); };
}
VIEWS.apats = () => {
  const A=apCfg(), d=apDia(), m=A.menus[d], rs=A.reserves.filter(r=>r.dia===d), mes=isoAvui().slice(0,7);
  const ext=rs.filter(r=>!r.soci), pag=ext.filter(r=>r.pagat), rec=pag.reduce((t,r)=>t+apPreu(r),0), vin=rs.filter(r=>r.vingut).length;
  const avui=d===avuiIdx7(), tancat=(A.historic||[]).some(h=>h.data===isoAvui());
  return '<div class="head"><div><div class="eyebrow">Casal de Roquetes</div><h1>Àpats amb companyia</h1><p>Dinar a les '+A.hora+' al menjador · '+A.places+' places · cada dia · servei '+eur(A.preuServei)+' · persones no inscrites: menú '+eur(A.preuMenu)+', mig menú '+eur(A.preuMig)+'.</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="apNorm">Normativa</button><button class="btn" id="apCob">Cobraments del mes</button>'+(can("menu","M")?'<button class="btn" id="apPreus">Preus i bonificacions</button>':'')+(avui?'<button class="btn" id="apTancar"'+(tancat?' disabled':'')+'>'+(tancat?'Dia tancat':'Tancar el dia')+'</button>':'')+'<button class="btn primary" id="nouCom">'+ICON.plus+'Afegir comensal</button></div></div>'+
  '<div class="filters" role="group" aria-label="Dia">'+DIES7.map((x,i)=>'<button data-ad="'+i+'" aria-pressed="'+(d===i)+'">'+x+(i===avuiIdx7()?' · avui':'')+'</button>').join("")+'</div>'+
  '<div class="minikpis"><div><small>Comensals</small><b class="num">'+rs.length+' / '+A.places+'</b></div><div><small>Han vingut</small><b class="num">'+vin+'</b></div><div><small>No inscrits pagats</small><b class="num">'+pag.length+' de '+ext.length+'</b></div><div><small>Cobrat avui (no inscrits)</small><b class="num">'+eur(rec)+'</b></div></div>'+
  '<div class="grid2"><section class="panel"><div class="panel-h"><h2>Comensals de '+DIES7[d].toLowerCase()+'</h2><span class="chip">'+(A.places-rs.length)+' places lliures</span></div><div class="list">'+
  (rs.map(r=>{ const s0=r.soci&&soci(r.soci), cb=r.soci&&A.cobraments[mes+"|"+r.soci]; return '<div class="row" style="flex-wrap:wrap"><div class="t" style="min-width:200px"><b>'+esc(apNom(r))+'</b><span>'+(r.soci?(esBonif(r.soci)?'Bonificada SS · paga '+eur(apPreuUsuari(r.soci))+' (Ajuntament '+eur(A.preuServei-apPreuUsuari(r.soci))+')':'Inscrita · '+eur(A.preuServei))+(s0&&!s0.apNorm?' · <button class="chip warn" data-norm="'+r.soci+'" title="Marcar que ha signat la normativa">Falta signar la normativa</button>':'')+' · '+(cb?'<span class="chip good">Mes pagat</span>':'<span class="chip">Mes pendent</span>'):'No inscrita · '+(r.mig?'mig menú ':'menú ')+eur(apPreu(r)))+(r.dieta?' · <span class="chip warn">'+esc(r.dieta)+'</span>':'')+'</span></div><div style="display:flex;gap:6px"><button class="tog" data-vin="'+r.id+'" aria-pressed="'+r.vingut+'">'+(r.vingut?'Ha vingut':'Marcar arribada')+'</button>'+(r.soci?'':'<button class="tog" data-pag="'+r.id+'" aria-pressed="'+r.pagat+'">'+(r.pagat?'Pagat':'Pendent')+'</button>')+'<button class="btn sm ghost danger" data-anl="'+r.id+'" aria-label="Anul·lar">'+ICON.x+'</button></div></div>'; }).join("")||'<div class="empty">Encara no hi ha reserves.</div>')+
  '</div></section><section class="panel"><div class="panel-h"><h2>Menú del dia</h2><button class="btn sm" id="edMenu">Editar</button></div><div class="menu"><div><small>Primer</small><b>'+esc(m.primer)+'</b></div><div><small>Segon</small><b>'+esc(m.segon)+'</b></div><div><small>Postres</small><b>'+esc(m.postres)+'</b></div></div>'+
  '<div class="note">Per a cuina: '+rs.length+' racions'+(rs.some(r=>r.dieta)?', de les quals '+Object.entries(rs.filter(r=>r.dieta).reduce((o,r)=>(o[r.dieta]=(o[r.dieta]||0)+1,o),{})).map(([k,v])=>v+' '+k.toLowerCase()).join(', '):'')+'.</div>'+
  '<div class="section-t">La setmana</div><div class="list">'+A.menus.map((mm,i)=>{ const n=A.reserves.filter(r=>r.dia===i).length; return '<div class="row"><div class="t"><b>'+DIES7[i]+'</b><span>'+esc(mm.segon)+'</span></div><span class="num">'+n+' / '+A.places+'</span></div>'; }).join("")+'</div>'+
  (()=>{ const ab=[...new Set((A.historic||[]).flatMap(h=>h.absents))].map(x=>({x,n:absApats(x)})).filter(o=>o.n>=2); return ab.length?'<div class="alert">Absències reiterades (14 dies): '+ab.map(o=>esc(nomComplet(soci(o.x)))+' ('+o.n+')').join(', ')+'. Cal comunicar-ho a Serveis Socials.</div>':''; })()+'<p class="note" style="margin:0">Les indicacions de dieta són dades de salut: cal consentiment explícit i només les veu l\'equip de cuina.</p></section></div>';
};
BIND.apats = () => {
  const A=apCfg(), d=apDia();
  $("#apNorm").onclick=veureNormativa;
  document.querySelectorAll("[data-norm]").forEach(b=>b.onclick=()=>{ const p=soci(b.dataset.norm); confirmar("Normativa signada",nomComplet(p)+" ha signat l'imprès d'acceptació de la normativa del servei d'àpats (Annex IV)?","Sí, l'ha signat",()=>{ p.apNorm=isoAvui(); logCanvi("Normativa d'àpats signada",nomComplet(p)); save(); toast("Anotat."); render(); }); }); $("#apCob").onclick=()=>cobramentsModal();
  const bp=$("#apPreus"); if(bp) bp.onclick=preusModal; const bt=$("#apTancar"); if(bt) bt.onclick=tancarDiaModal;
  document.querySelectorAll("[data-ad]").forEach(b=>b.onclick=()=>{ S.apDia=Number(b.dataset.ad); render(); });
  const f=(k,id)=>A.reserves.find(r=>r.id===id);
  document.querySelectorAll("[data-vin]").forEach(b=>b.onclick=()=>{ const r=f(0,b.dataset.vin); r.vingut=!r.vingut; save(); render(); });
  document.querySelectorAll("[data-pag]").forEach(b=>b.onclick=()=>{ const r=f(0,b.dataset.pag); r.pagat=!r.pagat; save(); if(r.pagat) toast("Cobrat "+eur(apPreu(r))+" a "+apNom(r)+"."); render(); });
  document.querySelectorAll("[data-anl]").forEach(b=>b.onclick=()=>{ const r=f(0,b.dataset.anl);
    const fer=()=>{ A.reserves=A.reserves.filter(x=>x.id!==r.id); if(r.soci) logCanvi("Baixa de dinar",apNom(r)+" · "+DIES7[r.dia]); save(); toast("Reserva anul·lada."); render(); };
    if(r.soci) confirmar("Anul·lar el dinar de "+DIES7[r.dia].toLowerCase(),"Cal avisar amb 5 dies d'antelació. Si no s'ha respectat el termini, s'han d'abonar els menús ja elaborats (normativa, punt 8).","Anul·lar",fer); else fer(); });
  $("#edMenu").onclick=()=>{ const m=A.menus[d];
    overlay(hdr("Menú de "+DIES7[d].toLowerCase(),"Àpats amb companyia")+'<form class="form" id="fm" novalidate>'+
    ['primer','segon','postres'].map(k=>'<div class="field full"><label for="m_'+k+'">'+k[0].toUpperCase()+k.slice(1)+'</label><input id="m_'+k+'" value="'+esc(m[k])+'"></div>').join("")+
    '<div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Desar menú</button></div></form>');
    $("#fm").onsubmit=e=>{ e.preventDefault(); ['primer','segon','postres'].forEach(k=>m[k]=$("#m_"+k).value.trim()||m[k]); save(); closeOverlay(); toast("Menú desat."); render(); };
  };
  $("#nouCom").onclick=()=>comensalModal("");
};
function comensalModal(q){
  const A=D.apats, d=apDia(), rs=A.reserves.filter(r=>r.dia===d);
  if(rs.length>=A.places){ toast("El menjador és ple per a "+DIES7[d].toLowerCase()+"."); return; }
  const cand=D.socis.filter(s=>s.casal==="c2" && !rs.find(r=>r.soci===s.id) && (!q||nomComplet(s).toLowerCase().includes(q.toLowerCase())));
  overlay(hdr("Afegir comensal", DIES7[d]+" · "+(A.places-rs.length)+" places lliures")+
  '<div class="field"><label for="c_dieta">Indicació de dieta (opcional)</label><select id="c_dieta"><option value="">Cap</option><option>Sense sal</option><option>Triturat</option><option>Sense gluten</option><option>Diabètic</option><option>Vegetarià</option></select></div>'+
  '<label class="search">'+ICON.search+'<input id="qc" type="search" placeholder="Cerca persona de Roquetes" value="'+esc(q)+'" aria-label="Cerca soci"></label><div class="list">'+
  (cand.map(s=>'<div class="row"><div class="who" style="flex:1"><span class="avatar">'+inicials(s)+'</span><div>'+esc(nomComplet(s))+'<small>Núm. '+s.num+'</small></div></div><button class="btn sm primary" data-cs="'+s.id+'">Afegir</button></div>').join("")||'<div class="empty">Cap soci disponible amb aquesta cerca.</div>')+'</div>'+
  '<div class="section-t">Persona no inscrita al servei (paga el preu del bar)</div><form id="fns" style="display:flex;gap:8px;flex-wrap:wrap" novalidate><input id="c_nom" class="select" style="flex:1;min-width:180px;background:var(--surface)" placeholder="Nom i cognoms" aria-label="Nom de la persona no inscrita"><select id="c_mig" class="select" aria-label="Tipus de menú"><option value="0">Menú complet · '+eur(apCfg().preuMenu)+'</option><option value="1">Mig menú · '+eur(apCfg().preuMig)+'</option></select><button class="btn" type="submit">Afegir</button></form>');
  const qc=$("#qc"); qc.oninput=()=>{ const p=qc.selectionStart, dv=$("#c_dieta").value; comensalModal(qc.value); $("#c_dieta").value=dv; const n=$("#qc"); n.focus(); n.setSelectionRange(p,p); };
  const add=(sid,nom,mig,dieta)=>{ A.reserves.push(Object.assign({id:uid("m"),dia:d,soci:sid,nom:nom||"",pagat:false,vingut:false,dieta:dieta||"",subv:esBonif(sid)},sid?{}:{mig:!!mig})); save(); closeOverlay(); toast((sid?soci(sid).nom:nom)+" té dinar reservat."); render(); };
  document.querySelectorAll("[data-cs]").forEach(b=>b.onclick=()=>{ const s=soci(b.dataset.cs), dieta=$("#c_dieta").value;
    if(s.apNorm||A.reserves.some(r=>r.soci===s.id)) return add(s.id,"",false,dieta);
    overlay(hdr("Inscripció al servei d'àpats",nomComplet(s))+'<p style="margin:0">Primer dinar de '+esc(s.nom)+' al servei. Cal que signi la normativa (Annex IV): preu '+eur(apPreuUsuari(s.id))+', pagament mensual i per avançat, avisar de les baixes amb 5 dies d\'antelació.</p>'+
    '<button class="btn sm" id="nrVeure" style="align-self:flex-start">Veure la normativa</button><label class="check"><input type="checkbox" id="nrOk">Ha signat l\'imprès d\'acceptació de la normativa</label><div class="alert" id="nrErr" hidden>Cal la signatura de la normativa per inscriure\'s al servei.</div>'+
    '<div class="m-f"><button class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" id="nrSi">Inscriure i reservar</button></div>');
    $("#nrVeure").onclick=()=>{ veureNormativa(); };
    $("#nrSi").onclick=()=>{ if(!$("#nrOk").checked){ $("#nrErr").hidden=false; return; } s.apNorm=isoAvui(); logCanvi("Normativa d'àpats signada",nomComplet(s)); add(s.id,"",false,dieta); }; });
  $("#fns").onsubmit=e=>{ e.preventDefault(); const n=$("#c_nom").value.trim(); if(!n){ $("#c_nom").focus(); return; } add(null,n+" (no inscrita)",$("#c_mig").value==="1",$("#c_dieta").value); };
}

/* ---------- Acollida i seguiment ---------- */
function passosAcollida(s){
  const a=s.acollida, due=a.entrevista?addDays(a.entrevista,30):null;
  const st=(ok,t,sub)=>'<div class="step'+(ok?' done':'')+'"><i>'+(ok?'✓':'')+'</i><div><b>'+t+'</b>'+(sub?'<span>'+sub+'</span>':'')+'</div></div>';
  return '<div class="steps">'+st(!!a.entrevista,"Entrevista inicial",a.entrevista?fdata(a.entrevista):"Pendent")+st(a.benvinguda,"Sessió de benvinguda","")+st(!!a.referent,"Persona referent",a.referent?esc(nomComplet(soci(a.referent))):"Sense assignar")+st(!!a.revisio,"Revisió dels 30 dies",a.revisio?fdata(a.revisio):(due?"Prevista "+fdata(due):""))+'</div>';
}
const INTERESSOS=["Activitat física","Memòria","Tecnologia","Cultura","Manualitats","Música i cant","Relació social","Voluntariat","Sortides"];
function formAcollida(id){
  const s=soci(id), a=s.acollida; const cands=D.socis.filter(x=>x.casal===s.casal&&x.id!==id&&(!x.acollida||x.acollida.completada));
  overlay(hdr("Acollida de "+s.nom, "Pla d'acollida")+passosAcollida(s)+'<form class="form" id="fac" novalidate>'+
  '<div class="field"><label for="ac_ent">Data de l\'entrevista inicial</label><input id="ac_ent" type="date" value="'+(a.entrevista||"")+'"></div>'+
  '<label class="check" style="align-self:end;padding-bottom:10px"><input type="checkbox" id="ac_ben"'+(a.benvinguda?' checked':'')+'>Ha fet la sessió de benvinguda</label>'+
  '<div class="field full"><label for="ac_ref">Persona referent (mentor/a)</label><select id="ac_ref"><option value="">Sense assignar</option>'+cands.map(x=>'<option value="'+x.id+'"'+(a.referent===x.id?' selected':'')+'>'+esc(nomComplet(x))+'</option>').join("")+'</select></div>'+
  '<div class="full" style="display:flex;flex-direction:column;gap:8px"><span class="field"><label>Interessos</label></span><div class="filters">'+INTERESSOS.map(t=>'<button type="button" class="tg-int" aria-pressed="'+a.interessos.includes(t)+'">'+t+'</button>').join("")+'</div></div>'+
  '<label class="check full"><input type="checkbox" id="ac_rev"'+(a.revisio?' checked':'')+'>Revisió dels 30 dies feta: tanca l\'acollida</label>'+
  '<div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Desar</button></div></form>');
  document.querySelectorAll(".tg-int").forEach(b=>b.onclick=()=>b.setAttribute("aria-pressed", b.getAttribute("aria-pressed")!=="true"));
  $("#fac").onsubmit=e=>{ e.preventDefault(); a.entrevista=$("#ac_ent").value||null; a.benvinguda=$("#ac_ben").checked; a.referent=$("#ac_ref").value||null;
    a.interessos=[...document.querySelectorAll(".tg-int")].filter(b=>b.getAttribute("aria-pressed")==="true").map(b=>b.textContent);
    if($("#ac_rev").checked){ a.revisio=a.revisio||isoAvui(); a.completada=true; D.seguiments.push({id:uid("sg"),soci:id,data:isoAvui(),tipus:"Revisió dels 30 dies",nota:"Acollida tancada.",autor:"Dinamitzadora"}); }
    save(); closeOverlay(); toast(a.completada?"Acollida tancada.":"Acollida actualitzada."); render(); };
}
function formSeguiment(id){
  const s=soci(id);
  overlay(hdr("Registrar seguiment", nomComplet(s))+'<form class="form" id="fsg" novalidate>'+
  '<div class="field"><label for="sg_t">Tipus</label><select id="sg_t"><option>Trucada</option><option>Conversa presencial</option><option>Entrevista inicial</option><option>Revisió dels 30 dies</option><option>Visita a domicili</option></select></div>'+
  '<div class="field"><label for="sg_d">Data</label><input id="sg_d" type="date" value="'+isoAvui()+'"></div>'+
  '<div class="field full"><label for="sg_n">Què s\'ha parlat</label><textarea id="sg_n" rows="3" placeholder="Ex.: Està bé, vindrà a la coral dijous."></textarea></div>'+
  '<p class="note full" style="margin:0">Escriu només el necessari per al seguiment. No hi posis diagnòstics ni dades de salut.</p>'+
  '<div class="full alert" id="sgerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Desar</button></div></form>');
  $("#fsg").onsubmit=e=>{ e.preventDefault(); const n=$("#sg_n").value.trim(); if(!n){ const er=$("#sgerr"); er.textContent="Escriu una nota breu del seguiment."; er.hidden=false; return; }
    D.seguiments.push({id:uid("sg"),soci:id,data:$("#sg_d").value||isoAvui(),tipus:$("#sg_t").value,nota:n,autor:S.rol==="direccio"?"Coordinadora":"Dinamitzadora"}); save(); closeOverlay(); toast("Seguiment registrat."); render(); };
}
function formDerivacio(id){
  const s=soci(id);
  overlay(hdr("Derivar", nomComplet(s))+'<form class="form" id="fdv" novalidate>'+
  '<div class="field full"><label for="dv_a">A quin servei</label><select id="dv_a"><option>Oficina +65</option><option>Serveis Socials</option><option>Centre d\'atenció primària</option></select></div>'+
  '<div class="field full"><label for="dv_m">Motiu</label><input id="dv_m" placeholder="Ex.: Absències reiterades i viu sol/a"></div>'+
  '<div class="full alert" id="dverr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Derivar</button></div></form>');
  $("#fdv").onsubmit=e=>{ e.preventDefault(); const m=$("#dv_m").value.trim(), srv=$("#dv_a").value; if(!m){ const er=$("#dverr"); er.textContent="Indica el motiu de la derivació."; er.hidden=false; return; }
    D.derivacions.unshift({id:uid("dv"),soci:id,data:isoAvui(),a:srv,motiu:m,estat:"Enviada"}); save(); closeOverlay(); toast("Derivació enviada a "+srv+"."); render(); };
}
VIEWS.seguiment = () => {
  const ps=D.socis.filter(inCasal), AV=isoAvui();
  const acol=ps.filter(s=>s.acollida&&!s.acollida.completada);
  const al=ps.map(s=>({s,a:alertesDe(s).filter(x=>x.k!=="acollida")})).filter(o=>o.a.length);
  const dvs=D.derivacions.filter(d=>inCasal(soci(d.soci)));
  const segMes=D.seguiments.filter(g=>g.data.startsWith(AV.slice(0,7))&&inCasal(soci(g.soci)));
  return '<div class="head"><div><h1>Seguiment de persones</h1><p>Acollida, detecció de solitud i derivacions a l\'Oficina +65 i Serveis Socials.</p></div></div>'+
  '<div class="minikpis"><div><small>En acollida</small><b class="num">'+acol.length+'</b></div><div><small>Alertes actives</small><b class="num">'+al.length+'</b></div><div><small>Derivacions obertes</small><b class="num">'+dvs.filter(d=>d.estat!=="Tancada").length+'</b></div><div><small>Seguiments aquest mes</small><b class="num">'+segMes.length+'</b></div></div>'+
  '<section class="panel"><div class="panel-h"><h2>Alertes</h2><span class="chip">Sense assistència més de 21 dies o absències als àpats</span></div><div class="list">'+
  (al.map(o=>{ const dv=derivOberta(o.s.id); return '<div class="row" style="flex-wrap:wrap"><div class="who" style="flex:1;min-width:220px;cursor:pointer" data-fp="'+o.s.id+'"><span class="avatar">'+inicials(o.s)+'</span><div>'+esc(nomComplet(o.s))+'<small>'+esc(casal(o.s.casal).curt)+(o.s.viuSol?' · Viu sol/a':'')+'</small></div></div>'+o.a.map(x=>'<span class="chip crit">'+esc(x.t)+'</span>').join("")+'<div style="display:flex;gap:6px"><button class="btn sm" data-sg="'+o.s.id+'">Seguiment</button>'+(dv?'<span class="chip warn">'+esc(dv.a)+' · '+esc(dv.estat)+'</span>':'<button class="btn sm" data-dv="'+o.s.id+'">Derivar</button>')+'</div></div>'; }).join("")||'<div class="empty">Cap alerta. Tothom participa amb regularitat.</div>')+'</div></section>'+
  '<section class="panel"><div class="panel-h"><h2>Acollides en curs</h2></div><div class="list">'+
  (acol.map(s=>{ const a=alertesDe(s).find(x=>x.k==="acollida"); return '<div class="row" style="flex-wrap:wrap;align-items:flex-start"><div class="who" style="min-width:220px;cursor:pointer" data-fp="'+s.id+'"><span class="avatar">'+inicials(s)+'</span><div>'+esc(nomComplet(s))+'<small>Alta '+fdata(s.alta)+' · '+esc(casal(s.casal).curt)+'</small></div></div><div style="flex:1;min-width:260px">'+passosAcollida(s)+'</div>'+(a?'<span class="chip '+a.c+'">'+esc(a.t)+'</span>':'')+'<button class="btn sm primary" data-ac="'+s.id+'">Actualitzar</button></div>'; }).join("")||'<div class="empty">No hi ha cap acollida en curs.</div>')+'</div></section>'+
  '<section class="panel"><div class="panel-h"><h2>Derivacions</h2></div><div class="tablewrap" style="border:0"><table><thead><tr><th>Persona</th><th>Servei</th><th>Motiu</th><th>Data</th><th>Estat</th></tr></thead><tbody>'+
  (dvs.map(d=>'<tr><td>'+esc(nomComplet(soci(d.soci)))+'</td><td>'+esc(d.a)+'</td><td style="white-space:normal;min-width:200px">'+esc(d.motiu)+'</td><td class="num">'+fdata(d.data)+'</td><td><select class="select" data-dvst="'+d.id+'" aria-label="Estat">'+["Enviada","En curs","Tancada"].map(x=>'<option'+(d.estat===x?' selected':'')+'>'+x+'</option>').join("")+'</select></td></tr>').join("")||'<tr><td colspan="5" class="empty" style="padding:16px">Cap derivació.</td></tr>')+'</tbody></table></div></section>'+
  '<section class="panel"><div class="panel-h"><h2>Darrers seguiments</h2></div><div class="list">'+D.seguiments.filter(g=>inCasal(soci(g.soci))).sort((a,b)=>b.data.localeCompare(a.data)).slice(0,8).map(g=>'<div class="row"><div class="time num" style="width:64px">'+fdata(g.data)+'</div><div class="t"><b>'+esc(nomComplet(soci(g.soci)))+' · '+esc(g.tipus)+'</b><span style="white-space:normal">'+esc(g.nota)+'</span></div></div>').join("")+'</div></section>';
};
BIND.seguiment = () => {
  document.querySelectorAll("[data-fp]").forEach(b=>b.onclick=()=>fitxaSoci(b.dataset.fp));
  document.querySelectorAll("[data-sg]").forEach(b=>b.onclick=()=>formSeguiment(b.dataset.sg));
  document.querySelectorAll("[data-dv]").forEach(b=>b.onclick=()=>formDerivacio(b.dataset.dv));
  document.querySelectorAll("[data-ac]").forEach(b=>b.onclick=()=>formAcollida(b.dataset.ac));
  document.querySelectorAll("[data-dvst]").forEach(sl=>sl.onchange=()=>{ const d=D.derivacions.find(x=>x.id===sl.dataset.dvst); d.estat=sl.value; save(); toast("Estat actualitzat."); render(); });
};

/* ---------- Manteniment i neteja ---------- */
const URG={urgent:{t:"Urgent",h:24,c:"crit"},preferent:{t:"Preferent",h:72,c:"warn"},programable:{t:"Programable",h:360,c:""}};
const hores = (a,b) => (new Date(b)-new Date(a))/36e5;
const araIso = () => { const d=new Date(); return isoAvui()+"T"+String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0"); };
function terminiInc(i){ const lim=URG[i.urg].h, fi=i.resolt||araIso(), u=hores(i.obert,fi); return {dins:u<=lim, queden:lim-u}; }
const fh = h => h<48 ? Math.max(0,Math.round(h))+" h" : Math.round(h/24)+" dies";
VIEWS.manteniment = () => {
  const M=D.manteniment, t=S.mTab||"inc";
  const tabs='<div class="seg" role="tablist" aria-label="Seccions">'+[["inc","Incidències"],["net","Neteja"],["inv","Inventari i revisions"]].map(x=>'<button role="tab" data-mt="'+x[0]+'" aria-pressed="'+(t===x[0])+'">'+x[1]+'</button>').join("")+'</div>';
  let body='';
  if(t==="inc"){
    const inc=M.incidencies.filter(inCasal); const ob=inc.filter(i=>i.estat!=="resolta"); const fora=ob.filter(i=>!terminiInc(i).dins);
    const res=inc.filter(i=>i.estat==="resolta"); const pct=res.length?Math.round(res.filter(i=>terminiInc(i).dins).length/res.length*100):100;
    const ord={urgent:0,preferent:1,programable:2};
    body='<div class="minikpis"><div><small>Obertes</small><b class="num">'+ob.length+'</b></div><div><small>Urgents obertes</small><b class="num">'+ob.filter(i=>i.urg==="urgent").length+'</b></div><div><small>Fora de termini</small><b class="num" style="color:'+(fora.length?'var(--crit)':'inherit')+'">'+fora.length+'</b></div><div><small>Resoltes en termini</small><b class="num">'+pct+'%</b></div></div>'+
    '<div class="note" style="display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap"><span>Terminis: urgent 24 h · preferent 72 h · programable 15 dies. '+(D.config.avisos.actiu?'Cada incidència nova s\'envia per correu a <b>'+esc(D.config.avisos.destinataris.join(", "))+'</b>.':'Els avisos per correu estan desactivats.')+'</span>'+(esCoord()?'<button class="btn sm" id="cfgAvis">Configurar avisos</button>':'')+'</div>'+
    '<section class="panel"><div class="list">'+inc.slice().sort((a,b)=>(a.estat==="resolta")-(b.estat==="resolta")||ord[a.urg]-ord[b.urg]||a.obert.localeCompare(b.obert)).map(i=>{ const tm=terminiInc(i), u=URG[i.urg];
      return '<div class="row" style="flex-wrap:wrap"><span class="chip '+u.c+'">'+u.t+'</span><div class="t" style="min-width:200px"><b>'+esc(i.desc)+'</b><span>'+esc(casal(i.casal).curt)+(i.espai&&sala(i.espai)?' · '+esc(sala(i.espai).nom):'')+' · '+esc(i.resp)+' · obert '+fdata(i.obert.slice(0,10))+' '+i.obert.slice(11)+'</span></div>'+
      avisChip(i)+(i.estat==="resolta"?'<span class="chip '+(tm.dins?'good':'crit')+'">Resolta '+(tm.dins?'en termini':'fora de termini')+'</span>':
      '<span class="chip '+(tm.dins?'':'crit')+'">'+(tm.dins?'Queden '+fh(tm.queden):'Fora de termini')+'</span>'+(i.estat==="oberta"?'<button class="btn sm" data-ist="'+i.id+'|en curs">Començar</button>':'<span class="chip warn">En curs</span>')+'<button class="btn sm primary" data-ist="'+i.id+'|resolta">Resoldre</button>')+'<button class="btn sm ghost danger" data-delinc="'+i.id+'" aria-label="Esborrar">'+ICON.x+'</button></div>'; }).join("")+'</div></section>';
  } else if(t==="net"){
    const cs=D.casals.filter(inCasal), AV=isoAvui();
    body='<div class="grid2"'+(cs.length===1?' style="grid-template-columns:1fr"':' style="grid-template-columns:1fr 1fr"')+'>'+cs.map(c=>{ const tq=M.tasques.filter(x=>!x.casal||x.casal===c.id), fet=M.neteja[c.id+"|"+AV]||[];
      const zones=[...new Set(tq.map(x=>x.zona))];
      const hist=[]; for(let k=7;k>=1;k--){ const d=addDays(AV,-k); if(wd(d)<5){ const f=M.neteja[c.id+"|"+d]; hist.push({d,p:f?Math.round(f.length/tq.length*100):0}); } }
      return '<section class="panel"><div class="panel-h"><h2>'+esc(c.nom)+'</h2><span class="chip '+(fet.length===tq.length?'good':'')+'">Avui '+fet.length+'/'+tq.length+'</span></div>'+
      zones.map(z=>'<div><div class="section-t" style="margin-bottom:6px">'+esc(z)+'</div>'+tq.filter(x=>x.zona===z).map(x=>'<label class="check" style="padding:6px 0"><input type="checkbox" data-nt="'+c.id+'|'+x.id+'"'+(fet.includes(x.id)?' checked':'')+'>'+esc(x.t)+'</label>').join("")+'</div>').join("")+
      '<div><div class="section-t" style="margin-bottom:8px">Compliment darrers dies</div><div class="hist">'+hist.map(h=>'<div title="'+h.p+'%"><i style="height:'+h.p+'%;background:'+(h.p>=90?'var(--good)':'var(--warn)')+'"></i><span>'+DIES_C[wd(h.d)]+'</span></div>').join("")+'</div></div></section>'; }).join("")+'</div>';
  } else {
    const inv=M.inventari.filter(inCasal), pv=M.preventiu.filter(inCasal), AV=isoAvui();
    body='<section class="panel"><div class="panel-h"><h2>Revisions preventives</h2></div><div class="list">'+pv.slice().sort((a,b)=>a.propera.localeCompare(b.propera)).map(v=>{ const q=diesEntre(AV,v.propera); return '<div class="row"><div class="t"><b>'+esc(v.element)+'</b><span>'+esc(casal(v.casal).curt)+' · '+esc(v.freq)+'</span></div><span class="chip '+(q<0?'crit':q<=14?'warn':'')+'">'+(q<0?'Vençuda fa '+(-q)+' dies':'Propera: '+fdata(v.propera))+'</span><button class="btn sm" data-pvok="'+v.id+'">Feta</button></div>'; }).join("")+'</div></section>'+
    '<div class="panel-h"><h2>Inventari</h2><button class="btn sm primary" id="nouInv">'+ICON.plus+'Afegir</button></div><div class="tablewrap"><table><thead><tr><th>Element</th><th>Casal</th><th>Espai</th><th>Quantitat</th><th>Estat</th></tr></thead><tbody>'+inv.map(v=>'<tr><td>'+esc(v.nom)+'</td><td>'+esc(casal(v.casal).curt)+'</td><td>'+(v.espai&&sala(v.espai)?esc(sala(v.espai).nom):'—')+'</td><td class="num">'+v.q+'</td><td><span class="chip '+(v.estat==="Bo"?'good':v.estat==="Regular"?'warn':'crit')+'">'+esc(v.estat)+'</span></td></tr>').join("")+'</tbody></table></div>';
  }
  return '<div class="head"><div><h1>Manteniment i neteja</h1><p>Incidències amb terminis, pla de neteja i inventari dels dos casals.</p></div><button class="btn primary" id="novaInc">'+ICON.plus+'Nova incidència</button></div>'+tabs+body;
};
BIND.manteniment = () => {
  const M=D.manteniment;
  document.querySelectorAll("[data-mt]").forEach(b=>b.onclick=()=>{ S.mTab=b.dataset.mt; render(); });
  document.querySelectorAll("[data-delinc]").forEach(b=>b.onclick=()=>{ const i=M.incidencies.find(x=>x.id===b.dataset.delinc); confirmMotiu("Esborrar incidència",i.desc,"Esborrar",m=>{ M.incidencies=M.incidencies.filter(x=>x!==i); logCanvi("Esborrat d'incidència",i.desc+" · "+casal(i.casal).curt,m); save(); toast("Incidència esborrada."); render(); }); });
  document.querySelectorAll("[data-reav]").forEach(b=>b.onclick=()=>enviarAvis(M.incidencies.find(x=>x.id===b.dataset.reav)));
  document.querySelectorAll("[data-cpav]").forEach(b=>b.onclick=()=>{ const i=M.incidencies.find(x=>x.id===b.dataset.cpav); const c=correuInc(i); copiar("Per a: "+D.config.avisos.destinataris.join(", ")+"\nAssumpte: "+c.subject+"\n\n"+c.text); });
  const cfa=$("#cfgAvis"); if(cfa) cfa.onclick=()=>configAvisos();
  document.querySelectorAll("[data-ist]").forEach(b=>b.onclick=()=>{ const [id,st]=b.dataset.ist.split("|"); const i=M.incidencies.find(x=>x.id===id); i.estat=st; if(st==="resolta") i.resolt=araIso(); save(); toast(st==="resolta"?"Incidència resolta.":"Incidència en curs."); render(); });
  document.querySelectorAll("[data-nt]").forEach(cb=>cb.onchange=()=>{ const [c,t]=cb.dataset.nt.split("|"), k=c+"|"+isoAvui(); const arr=M.neteja[k]||(M.neteja[k]=[]); const j=arr.indexOf(t); if(cb.checked&&j<0) arr.push(t); if(!cb.checked&&j>=0) arr.splice(j,1); save(); render(); });
  document.querySelectorAll("[data-pvok]").forEach(b=>b.onclick=()=>{ const v=M.preventiu.find(x=>x.id===b.dataset.pvok); const n={Trimestral:90,Semestral:182,Anual:365}[v.freq]||365; v.propera=addDays(isoAvui(),n); save(); toast("Revisió registrada. Propera: "+fdata(v.propera)+"."); render(); });
  const ni=$("#nouInv"); if(ni) ni.onclick=()=>{ const cs=S.casal==="tots"?"c1":S.casal;
    overlay(hdr("Afegir a l'inventari",casal(cs).nom)+'<form class="form" id="fiv" novalidate><div class="field full"><label for="iv_n">Element</label><input id="iv_n"></div><div class="field"><label for="iv_c">Casal</label><select id="iv_c">'+D.casals.map(c=>'<option value="'+c.id+'"'+(c.id===cs?' selected':'')+'>'+esc(c.nom)+'</option>').join("")+'</select></div><div class="field"><label for="iv_q">Quantitat</label><input id="iv_q" type="number" min="1" value="1"></div><div class="field full"><label for="iv_e">Estat</label><select id="iv_e"><option>Bo</option><option>Regular</option><option>Cal substituir</option></select></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Afegir</button></div></form>');
    $("#fiv").onsubmit=e=>{ e.preventDefault(); const n=$("#iv_n").value.trim(); if(!n){ $("#iv_n").focus(); return; } M.inventari.push({id:uid("v"),casal:$("#iv_c").value,nom:n,espai:"",q:Number($("#iv_q").value)||1,estat:$("#iv_e").value}); save(); closeOverlay(); toast("Afegit a l'inventari."); render(); }; };
  $("#novaInc").onclick=()=>{ const cs=S.casal==="tots"?"c1":S.casal;
    const opts=c=>'<option value="">Zones comunes</option>'+D.sales.filter(x=>x.casal===c).map(x=>'<option value="'+x.id+'">'+esc(x.nom)+'</option>').join("");
    overlay(hdr("Nova incidència","Manteniment")+'<form class="form" id="fin" novalidate>'+
    '<div class="field"><label for="in_c">Casal</label><select id="in_c">'+D.casals.map(c=>'<option value="'+c.id+'"'+(c.id===cs?' selected':'')+'>'+esc(c.nom)+'</option>').join("")+'</select></div>'+
    '<div class="field"><label for="in_e">Espai</label><select id="in_e">'+opts(cs)+'</select></div>'+
    '<div class="field full"><label for="in_d">Què passa</label><input id="in_d" placeholder="Ex.: No funciona la calefacció de la sala gran"></div>'+
    '<div class="field full"><label>Urgència</label><div class="filters" id="in_u">'+Object.entries(URG).map(([k,u],ix)=>'<button type="button" data-u="'+k+'" aria-pressed="'+(ix===1)+'">'+u.t+' · '+(u.h<48?u.h+' h':u.h/24+' dies')+'</button>').join("")+'</div></div>'+
    '<div class="field full"><label for="in_r">Qui ho resol</label><select id="in_r"><option>Equip intern</option><option>Empresa externa</option><option>Ajuntament (brigada)</option></select></div>'+
    '<div class="full alert" id="inerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Registrar</button></div></form>');
    $("#in_c").onchange=()=>{ $("#in_e").innerHTML=opts($("#in_c").value); };
    document.querySelectorAll("#in_u [data-u]").forEach(b=>b.onclick=()=>document.querySelectorAll("#in_u [data-u]").forEach(x=>x.setAttribute("aria-pressed",x===b)));
    $("#fin").onsubmit=e=>{ e.preventDefault(); const d=$("#in_d").value.trim(); if(!d){ const er=$("#inerr"); er.textContent="Descriu breument la incidència."; er.hidden=false; return; }
      const u=document.querySelector('#in_u [aria-pressed="true"]').dataset.u;
      const inc={id:uid("i"),casal:$("#in_c").value,espai:$("#in_e").value,desc:d,urg:u,estat:"oberta",obert:araIso(),resolt:null,resp:$("#in_r").value,avis:null};
      M.incidencies.unshift(inc); S.mTab="inc"; save(); closeOverlay(); toast("Incidència registrada. Termini: "+(URG[u].h<48?URG[u].h+" h":URG[u].h/24+" dies")+"."); render();
      if(D.config.avisos.actiu) enviarAvis(inc); };
  };
};


/* ---------- Avisos per correu (Microsoft 365) ---------- */
const M365="Microsoft 365";
function correuInc(i){
  const u=URG[i.urg], c=casal(i.casal), e=i.espai&&sala(i.espai)?sala(i.espai).nom:"Zones comunes";
  const term=u.h<48?u.h+" hores":u.h/24+" dies", data=fdata(i.obert.slice(0,10))+" a les "+i.obert.slice(11);
  const subject="[Casals SPR] Incidència "+u.t.toLowerCase()+" · "+c.nom+" · "+i.desc.slice(0,80);
  const rows=[["Casal",c.nom],["Espai",e],["Urgència",u.t+" (termini de resposta: "+term+")"],["Descripció",i.desc],["Qui ho resol",i.resp],["Registrada",data]];
  const html='<p>S\'ha registrat una nova incidència de manteniment.</p><table>'+rows.map(r=>'<tr><td><b>'+esc(r[0])+'</b></td><td>'+esc(r[1])+'</td></tr>').join("")+'</table><p>Cal resoldre-la abans de '+term+' des del registre.</p><p>Aplicatiu de gestió dels casals · Fundació Ave Maria</p>';
  const text="S'ha registrat una nova incidència de manteniment.\n\n"+rows.map(r=>r[0]+": "+r[1]).join("\n");
  return {subject, html, text};
}
const AVIS_ERR={
  needs_reauth:"Cal tornar a connectar Microsoft 365 a claude.ai (Configuració → Connectors).",
  server_not_connected:"Microsoft 365 no està connectat. Afegeix-lo a claude.ai (Configuració → Connectors).",
  selection_required:"Tens més d'un compte de Microsoft 365. Tria'n un quan t'ho demani.",
  not_in_manifest:"No has permès que l'aplicatiu enviï correus.",
  blocked_by_policy:"La teva organització no permet enviar correus des d'aquí.",
  approval_required:"La teva organització demana aprovació per enviar correus des d'aquí.",
  server_unavailable:"No s'ha pogut confirmar l'enviament. Mira Elements enviats abans de tornar-ho a provar.",
  upstream_error:"No s'ha pogut confirmar l'enviament. Mira Elements enviats abans de tornar-ho a provar."
};
async function enviarAvis(i){
  if(!i) return;
  const id=i.id, act=()=>D.manteniment.incidencies.find(x=>x.id===id)||i;
  act().avis={estat:"enviant",a:D.config.avisos.destinataris.slice()}; save(); if(S.view==="manteniment") render();
  await flush();
  let res;
  try{ const r=await fn("enviar-correu",{tipus:"incidencia",id});
    res = r.estat==="enviat" ? {estat:"enviat",a:r.a,hora:araIso()} : {estat:"no",a:[],msg:r.msg};
    if(r.estat==="enviat") toast("Avís enviat a "+r.a.join(", ")+".");
  }catch(e){ res={estat:"error",a:[],msg:e.message}; toast("Correu no enviat: "+e.message); }
  act().avis=res; save(); if(S.view==="manteniment") render();
}
function avisChip(i){
  const a=i.avis; if(!a) return '';
  if(a.estat==="enviant") return '<span class="chip">Enviant correu…</span>';
  if(a.estat==="enviat") return '<span class="chip good" title="'+esc((a.a||[]).join(", "))+'">Correu enviat '+(a.hora||"").slice(11)+'</span>';
  return '<span class="chip crit" title="'+esc(a.msg||"")+'">Correu no enviat</span><button class="btn sm" data-reav="'+i.id+'">Tornar a enviar</button><button class="btn sm ghost" data-cpav="'+i.id+'">Copiar avís</button>';
}
function configAvisos(){
  const A=D.config.avisos;
  overlay(hdr("Avisos d'incidències","Correu electrònic")+'<form class="form" id="fav" novalidate>'+
  '<label class="check full"><input type="checkbox" id="av_on"'+(A.actiu?' checked':'')+'>Enviar un correu cada vegada que es registra una incidència</label>'+
  '<div class="field full"><label for="av_to">Destinataris (separats per comes)</label><input id="av_to" value="'+esc(A.destinataris.join(", "))+'"></div>'+
  '<p class="note full" style="margin:0">El correu surt de la bústia de la Fundació. El text el prepara el servidor amb les dades de la incidència.</p>'+
  '<div class="full alert" id="averr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Desar</button></div></form>');
  $("#fav").onsubmit=e=>{ e.preventDefault(); const l=$("#av_to").value.split(/[,;\s]+/).map(x=>x.trim()).filter(Boolean); const bad=l.filter(x=>!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x));
    if(!l.length||bad.length){ const er=$("#averr"); er.textContent=bad.length?"Adreça no vàlida: "+bad.join(", "):"Posa almenys una adreça."; er.hidden=false; return; }
    A.actiu=$("#av_on").checked; A.destinataris=l; save(); closeOverlay(); toast("Avisos desats."); render(); };
}
/* ---------- Informes i justificació ---------- */
const PREV={p2any:84098.52, p3any:17651.56};
const MESOS=["gener","febrer","març","abril","maig","juny","juliol","agost","setembre","octubre","novembre","desembre"];
const nomMes = m => MESOS.at(Number(m.slice(5,7))-1)+" "+m.slice(0,4);
function mesosContracte(){ const out=[], AV=isoAvui().slice(0,7); for(let m=INICI_CONTRACTE.slice(0,7); m<=AV; m=addDays(m+"-28",5).slice(0,7)) out.push(m); return out; }
function apCalc(hs){ const A=apCfg(), per={}; let ext=0, extImp=0, dies=0;
  const P=x=>per[x]||(per[x]={n:0,abs:0,inj:0,us:0,aj:0,real:0,pu:null,bon:false});
  hs.forEach(h=>{ dies++; const sv=(h.preus&&h.preus.servei)??A.preuServei; ext+=h.externs||0; extImp+=h.extImp!=null?h.extImp:(h.externs||0)*A.preuMenu;
    const pu=x=> (h.bonif&&h.bonif[x]!=null)?h.bonif[x]:((x in A.bonif)?A.bonif[x]:sv), bo=x=>(h.bonif&&h.bonif[x]!=null)||(x in A.bonif);
    h.servits.forEach(x=>{ const o=P(x), p=pu(x); o.n++; o.us+=p; o.aj+=sv-p; o.real+=sv; o.pu=p; o.bon=o.bon||bo(x); });
    h.absents.forEach(x=>{ const o=P(x); o.abs++; o.bon=o.bon||bo(x); if(!(h.just||[]).includes(x)){ o.inj++; o.us+=sv; } }); });
  const rows=Object.entries(per).filter(([x])=>soci(x)).map(([x,o])=>({x,n:o.n,abs:o.abs,inj:o.inj,subv:o.bon,pr:o.pu??apPreuUsuari(x),imp:Math.round(o.us*100)/100,aj:Math.round(o.aj*100)/100,real:Math.round(o.real*100)/100})).sort((p,q)=>nomComplet(soci(p.x)).localeCompare(nomComplet(soci(q.x))));
  const tot=rows.reduce((t,r)=>t+r.imp,0)+extImp; return {rows,ext,extImp,dies,tot,aj:rows.reduce((t,r)=>t+r.aj,0),nApats:rows.reduce((t,r)=>t+r.n,0)+ext}; }
function apatsMes(m){ return apCalc((D.apats.historic||[]).filter(h=>h.data.startsWith(m))); }
function copiar(text){ const done=()=>toast("Copiat. Enganxa-ho a l'Excel."); const fb=()=>{ overlay(hdr("Copia aquestes dades","CSV")+'<textarea id="csvta" rows="12" style="width:100%;font-family:ui-monospace,monospace;font-size:12px;border:1px solid var(--line);border-radius:10px;padding:10px;background:var(--surface)">'+esc(text)+'</textarea><p class="note" style="margin:0">Selecciona-ho tot i copia-ho.</p>'); const t=$("#csvta"); t.focus(); t.select(); };
  try{ navigator.clipboard.writeText(text).then(done,fb); }catch(e){ fb(); } }
const csv = rows => rows.map(r=>r.map(v=>{ let s=String(v??""); if(/^[=+\-@\t\r]/.test(s) && !/^-?\d+([.,]\d+)?$/.test(s)) s="'"+s; return /[;"\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s; }).join(";")).join("\n");
const n2 = v => (Math.round(v*100)/100).toFixed(2).replace(".",",");
const ultimDia = m => { const [y,mm]=m.split("-").map(Number); return iso(new Date(y,mm,0)); };
const fdLlarga = d => new Date(d+"T12:00:00").toLocaleDateString("ca-ES",{day:"numeric",month:"long",year:"numeric"});
const SECCIONS=[["p1","Dinamització i gestió (prestació 1)"],["ass","Assistència i arribades"],["p2","Àpats en companyia (prestació 2)"],["p3","Activitats complementàries (prestació 3)"],["ap","Àpats per persona"],["co","Comandes de material"]];
function presetsInforme(){
  const AV=isoAvui(), m=AV.slice(0,7), mp=addDays(m+"-01",-1).slice(0,7), q=Math.floor((Number(m.slice(5,7))-1)/3)*3+1, qi=m.slice(0,4)+"-"+String(q).padStart(2,"0")+"-01";
  return [["mes","Aquest mes",m+"-01",AV],["mesp","Mes passat",mp+"-01",ultimDia(mp)],["tri","Aquest trimestre",qi>INICI_CONTRACTE?qi:INICI_CONTRACTE,AV],["tot","Des de l'inici del contracte",INICI_CONTRACTE,AV]];
}
function rangInforme(){
  const AV=isoAvui();
  if(!S.rDes||!S.rFins){ const p=presetsInforme()[0]; S.rDes=p[2]; S.rFins=p[3]; }
  if(S.rDes<INICI_CONTRACTE) S.rDes=INICI_CONTRACTE; if(S.rFins>AV) S.rFins=AV; if(S.rDes>S.rFins) S.rDes=S.rFins;
  if(!S.rSec) S.rSec=SECCIONS.map(x=>x[0]);
  return [S.rDes,S.rFins];
}
const mesosRang = (a,b) => { const out=[]; for(let m=a.slice(0,7); m<=b.slice(0,7); m=addDays(m+"-28",5).slice(0,7)) out.push(m); return out; };
function apatsRang(a,b){ return apCalc((D.apats.historic||[]).filter(h=>h.data>=a&&h.data<=b)); }
function dadesInforme(){
  const [a,b]=rangInforme(), inR=d=>d>=a&&d<=b, dies=diesEntre(a,b)+1, ms=mesosRang(a,b);
  const ps=D.socis, noves=ps.filter(s=>inR(s.alta)).length;
  const asE=Object.entries(D.assist).filter(([k])=>inR(k.split("|")[1]));
  const assist=asE.reduce((t,[,x])=>t+x.length,0);
  const arE=Object.entries(D.arribades||{}).filter(([k])=>inR(k.split("|")[1]));
  const arribades=arE.reduce((t,[,x])=>t+x.length,0);
  const actives=new Set(asE.flatMap(([,x])=>x).concat(arE.flatMap(([,x])=>x.map(y=>y.s)))).size;
  const deriv=D.derivacions.filter(d=>inR(d.data)).length, acol=ps.filter(s=>inR(s.alta)||(s.acollida&&!s.acollida.completada)).length;
  const inc=D.manteniment.incidencies.filter(i=>i.estat==="resolta"&&i.resolt&&inR(i.resolt.slice(0,10))); const incPct=inc.length?Math.round(inc.filter(i=>terminiInc(i).dins).length/inc.length*100):100;
  const net=Object.entries(D.manteniment.neteja).filter(([k])=>inR(k.split("|")[1])); const netPct=net.length?Math.round(net.reduce((t,[k,x])=>t+x.length/D.manteniment.tasques.filter(y=>!y.casal||y.casal===k.split("|")[0]).length,0)/net.length*100):0;
  const ap=apatsRang(a,b), p2=ap.tot;
  const comp=D.activitats.filter(x=>x.comp), rb=D.rebuts.filter(r=>ms.includes(r.mes));
  const p3rows=comp.map(x=>{ const r=rb.filter(y=>y.act===x.id); return {a:x,ins:x.inscrits.length,em:r.reduce((t,y)=>t+y.import,0),cob:r.filter(y=>y.pagat).reduce((t,y)=>t+y.import,0),pend:r.filter(y=>!y.pagat).length}; });
  const p3=p3rows.reduce((t,r)=>t+r.cob,0), p3em=p3rows.reduce((t,r)=>t+r.em,0), p3prev=PREV.p3any/12*ms.length;
  const perCasal=D.casals.map(c=>({c, arr:arE.filter(([k])=>k.startsWith(c.id+"|")).reduce((t,[,x])=>t+x.length,0), dies:new Set(arE.filter(([k])=>k.startsWith(c.id+"|")&&D.arribades[k].length).map(([k])=>k)).size}));
  const perAct=D.activitats.map(x=>{ const ses=asE.filter(([k])=>k.startsWith(x.id+"|")); const pres=ses.reduce((t,[,y])=>t+y.length,0); return {a:x, ses:ses.length, pres, mitj:ses.length?pres/ses.length:0}; }).filter(o=>o.ses).sort((p,q)=>q.pres-p.pres);
  const coL=D.compres.comandes.filter(c=>inR(c.creat.slice(0,10))).sort((x,y)=>x.creat.localeCompare(y.creat));
  const coOk=coL.filter(c=>c.estat==="aprovada"||c.estat==="rebuda"), coImp=coOk.reduce((t,c)=>t+totalC(c),0);
  const coCat=Object.keys(CATS_C).map(k=>({k,imp:coOk.reduce((t,c)=>t+c.linies.filter(l=>prodC(l.p).cat===k).reduce((s,l)=>s+l.q*(l.preu||0),0),0)})).filter(o=>o.imp>0);
  const coCas=D.casals.map(cs=>({cs,n:coOk.filter(c=>c.casal===cs.id).length,imp:coOk.filter(c=>c.casal===cs.id).reduce((t,c)=>t+totalC(c),0)}));
  const co={L:coL,ok:coOk,imp:coImp,cat:coCat,cas:coCas,pend:coL.filter(c=>c.estat==="pendent").length,den:coL.filter(c=>c.estat==="denegada").length,reb:coL.filter(c=>c.estat==="rebuda").length};
  return {co,a,b,dies,ms,ps,noves,assist,arribades,actives,deriv,acol,incPct,netPct,ap,p2,p3rows,p3,p3em,p3prev,perCasal,perAct};
}
VIEWS.informes = () => {
  const R=dadesInforme(), ro=S.rol==="ajuntament", sec=k=>S.rSec.includes(k), AV=isoAvui();
  const pr=presetsInforme(), act=pr.find(p=>p[2]===R.a&&p[3]===R.b);
  const tile=(l,v,s)=>'<div class="kpi"><div class="label">'+l+'</div><div class="val num" style="font-size:26px">'+v+'</div>'+(s?'<div class="sub">'+s+'</div>':'')+'</div>';
  const meter=(v,prev,txt)=>{ const p=Math.round(v/Math.max(prev,0.01)*100); return '<div style="display:flex;justify-content:space-between;font-size:13px;color:var(--muted)"><span>'+txt+' '+eur(prev)+'</span><span class="num">'+p+'%</span></div><div class="bar" style="margin-top:6px"><i style="width:'+Math.min(100,p)+'%;background:'+(p>=100?'var(--good)':'var(--accent)')+'"></i></div>'; };
  const ms=mesosContracte();
  const ctrl='<section class="panel rep-ctrl no-print"><div class="panel-h"><h2>Què vols veure?</h2><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm primary" id="repPrint">Imprimir</button></div></div>'+
    '<div><div class="section-t" style="margin-bottom:8px">Període</div><div class="filters">'+pr.map(p=>'<button data-rp="'+p[0]+'" aria-pressed="'+(act&&act[0]===p[0])+'">'+p[1]+'</button>').join("")+'</div>'+
    '<div class="rep-dates"><label class="field"><span class="section-t">Des de</span><input type="date" id="rDes" min="'+INICI_CONTRACTE+'" max="'+AV+'" value="'+R.a+'"></label><label class="field"><span class="section-t">Fins a</span><input type="date" id="rFins" min="'+INICI_CONTRACTE+'" max="'+AV+'" value="'+R.b+'"></label></div></div>'+
    '<div><div class="section-t" style="margin-bottom:8px">Apartats de l\'informe</div><div class="rep-secs">'+SECCIONS.map(x=>'<label class="check"><input type="checkbox" data-rs="'+x[0]+'"'+(sec(x[0])?' checked':'')+'>'+x[1]+'</label>').join("")+'</div></div>'+
    '<p class="note" id="repNota" style="margin:0">En prémer «Imprimir» s\'obre la finestra per imprimir l\'informe o desar-lo en PDF.</p></section>';
  const tanc='<section class="panel no-print"><div class="panel-h"><div><h2>Tancament mensual</h2><p style="margin:2px 0 0;color:var(--muted);font-size:14px">Un mes tancat queda bloquejat i és el que es justifica a l\'Ajuntament.</p></div></div><div class="list">'+
    ms.map(m=>{ const t=D.mesosTancats[m]; return '<div class="row"><div class="t"><b>'+nomMes(m).charAt(0).toUpperCase()+nomMes(m).slice(1)+'</b><span>'+(t?'Tancat el '+fdata(t.data)+(t.per?' per '+esc(t.per):''):m===AV.slice(0,7)?'Mes en curs':'Sense tancar')+'</span></div>'+(t?'<span class="chip good">Tancat</span>'+(ro?'':'<button class="btn sm" data-rmes="'+m+'">Reobrir</button>'):(ro?'<span class="chip">Obert</span>':'<button class="btn sm primary" data-tmes="'+m+'">Tancar el mes</button>'))+'</div>'; }).join("")+'</div></section>';
  let rep='<div class="rep-print print-only"><div class="rep-logos"><img src="'+LOGO_AM+'" alt="Ave Maria Fundació"><img src="'+LOGO_AJT+'" alt="Ajuntament de Sant Pere de Ribes"></div><h1>Informe dels casals de gent gran</h1><p>Contracte 01040604/2026/9 · Casals de Ribes i Roquetes</p></div>'+
    '<div class="rep-per"><b>Període:</b> del '+fdLlarga(R.a)+' al '+fdLlarga(R.b)+' ('+R.dies+' dies) <span class="print-only"> · Generat el '+fdLlarga(AV)+'</span></div>';
  if(sec("p1")) rep+='<section class="panel"><div class="panel-h"><div><div class="eyebrow">Prestació 1</div><h2>Dinamització i gestió dels casals</h2></div></div><div class="kpis">'+
    tile("Persones usuàries",R.ps.filter(s=>!s.baixa).length,R.noves+" altes noves al període")+tile("Persones que han vingut",R.actives,R.arribades+" arribades · "+R.assist+" assistències")+tile("Acollides i derivacions",R.acol,R.deriv+" derivacions")+tile("Manteniment i neteja",R.incPct+"%","incidències en termini · neteja "+R.netPct+"%")+'</div></section>';
  if(sec("ass")) rep+='<section class="panel"><div class="panel-h"><div><div class="eyebrow">Assistència</div><h2>Arribades i assistència a activitats</h2></div><button class="btn sm no-print" id="cpAss">Copiar dades</button></div>'+
    '<div class="tablewrap" style="border:0"><table><thead><tr><th>Casal</th><th>Dies oberts amb registre</th><th>Arribades</th><th>Mitjana per dia</th></tr></thead><tbody>'+
    R.perCasal.map(o=>'<tr><td>'+esc(o.c.nom)+'</td><td class="num">'+o.dies+'</td><td class="num"><b>'+o.arr+'</b></td><td class="num">'+(o.dies?(o.arr/o.dies).toFixed(1).replace(".",","):"—")+'</td></tr>').join("")+'</tbody></table></div>'+
    '<div class="tablewrap" style="border:0"><table><thead><tr><th>Activitat</th><th>Casal</th><th>Sessions</th><th>Assistències</th><th>Mitjana per sessió</th><th>Places</th></tr></thead><tbody>'+
    (R.perAct.map(o=>'<tr><td>'+esc(o.a.nom)+'</td><td>'+esc(casal(o.a.casal).curt)+'</td><td class="num">'+o.ses+'</td><td class="num"><b>'+o.pres+'</b></td><td class="num">'+o.mitj.toFixed(1).replace(".",",")+'</td><td class="num">'+o.a.places+'</td></tr>').join("")||'<tr><td colspan="6" class="empty" style="padding:14px 16px">No hi ha sessions en aquest període.</td></tr>')+'</tbody></table></div></section>';
  if(sec("p2")) rep+='<section class="panel"><div class="panel-h"><div><div class="eyebrow">Prestació 2 · concessió</div><h2>Àpats en companyia</h2></div><button class="btn sm no-print" id="cpP2">Copiar dades</button></div>'+
    '<div class="tablewrap" style="border:0"><table><thead><tr><th>Servei</th><th>Dies</th><th>Àpats</th><th>Persones</th><th>Ingressos</th></tr></thead><tbody>'+
    '<tr><td>Àpats en companyia · Roquetes</td><td class="num">'+R.ap.dies+'</td><td class="num">'+R.ap.nApats+'</td><td>'+R.ap.rows.length+' persones · '+R.ap.rows.filter(r=>r.subv).length+' bonificades SS · '+R.ap.ext+' àpats de no inscrits</td><td class="num"><b>'+eur(R.ap.tot)+'</b></td></tr>'+
    '<tr><td>Aportació de l\'Ajuntament per bonificacions (Annex II)</td><td></td><td></td><td></td><td class="num"><b>'+eur(R.ap.aj)+'</b></td></tr></tbody></table></div></section>';
  if(sec("p3")) rep+='<section class="panel"><div class="panel-h"><div><div class="eyebrow">Prestació 3 · concessió</div><h2>Activitats complementàries</h2></div><div style="display:flex;gap:8px" class="no-print">'+(ro?'':'<button class="btn sm" id="rbPend">Rebuts pendents</button>')+'<button class="btn sm" id="cpP3">Copiar dades</button></div></div>'+
    '<div class="tablewrap" style="border:0"><table><thead><tr><th>Activitat</th><th>Casal</th><th>Inscrits</th><th>Tarifa</th><th>Emès</th><th>Cobrat</th><th>Pendents</th></tr></thead><tbody>'+
    R.p3rows.map(r=>'<tr><td>'+esc(r.a.nom)+'</td><td>'+esc(casal(r.a.casal).curt)+'</td><td class="num">'+r.ins+'</td><td class="num">'+(r.a.preu?eur(r.a.preu)+'/mes':'Gratuïta')+'</td><td class="num">'+eur(r.em)+'</td><td class="num"><b>'+eur(r.cob)+'</b></td><td>'+(r.pend?'<span class="chip warn">'+r.pend+'</span>':'—')+'</td></tr>').join("")+
    '<tr><td><b>Total</b></td><td></td><td></td><td></td><td class="num">'+eur(R.p3em)+'</td><td class="num"><b>'+eur(R.p3)+'</b></td><td></td></tr></tbody></table></div>'+meter(R.p3,R.p3prev,"Previsió per als mesos del període")+
    '<p class="note" style="margin:0">Els rebuts són mensuals: s\'hi compten els dels mesos que toca el període ('+R.ms.map(nomMes).join(", ")+').</p></section>';
  if(sec("ap")) rep+='<section class="panel"><div class="panel-h"><div><div class="eyebrow">Detall</div><h2>Àpats en companyia per persona</h2></div><button class="btn sm no-print" id="cpAp">Copiar informe</button></div>'+
    '<div class="tablewrap" style="border:0"><table><thead><tr><th>Persona</th><th>Àpats</th><th>Absències (sense justificar)</th><th>Tipus</th><th>Preu</th><th>Paga la persona</th><th>Paga l\'Ajuntament</th></tr></thead><tbody>'+
    R.ap.rows.map(r=>'<tr><td>'+esc(nomComplet(soci(r.x)))+'</td><td class="num">'+r.n+'</td><td>'+(r.abs>=2?'<span class="chip crit">'+r.abs+'</span>':r.abs||'—')+(r.inj?' ('+r.inj+')':'')+'</td><td>'+(r.subv?'<span class="chip warn">Bonificada SS</span>':'Inscrita')+'</td><td class="num">'+eur(r.pr)+'</td><td class="num">'+eur(r.imp)+'</td><td class="num">'+(r.aj?eur(r.aj):'—')+'</td></tr>').join("")+
    '<tr><td>Persones no inscrites (preu del bar)</td><td class="num">'+R.ap.ext+'</td><td></td><td>No inscrita</td><td></td><td class="num">'+eur(R.ap.extImp)+'</td><td>—</td></tr>'+
    '<tr><td><b>Total</b></td><td class="num"><b>'+R.ap.nApats+'</b></td><td></td><td></td><td></td><td class="num"><b>'+eur(R.ap.tot)+'</b></td><td class="num"><b>'+eur(R.ap.aj)+'</b></td></tr></tbody></table></div>'+
    '<div class="panel-h" style="margin-top:14px"><div><div class="eyebrow">Annex II</div><h2>Justificació de la despesa del servei de menjador</h2></div><button class="btn sm no-print" id="cpAnx">Copiar per a l\'Ajuntament</button></div>'+
    '<div class="tablewrap" style="border:0"><table><thead><tr><th>Nom i cognoms</th><th>NIF</th><th>Adreça</th><th>Núm. menús</th><th>Preu usuari</th><th>Import pagat usuari</th><th>Preu real</th><th>Pagament Ajuntament</th></tr></thead><tbody>'+
    (R.ap.rows.filter(r=>r.subv).map(r=>{ const p=soci(r.x); return '<tr><td>'+esc(nomComplet(p))+'</td><td>'+esc((p.priv&&p.priv.dni)||"")+'</td><td>'+esc(p.domicili||"")+'</td><td class="num">'+r.n+'</td><td class="num">'+eur(r.pr)+'</td><td class="num">'+eur(r.imp)+'</td><td class="num">'+eur(r.real)+'</td><td class="num"><b>'+eur(r.aj)+'</b></td></tr>'; }).join("")||'<tr><td colspan="8" class="empty" style="padding:14px 16px">Cap persona bonificada en aquest període.</td></tr>')+
    '</tbody></table></div></section>';
  if(sec("co")) rep+='<section class="panel"><div class="panel-h"><div><div class="eyebrow">Compres</div><h2>Comandes de material</h2></div><button class="btn sm no-print" id="cpCo">Copiar dades</button></div><div class="kpis">'+
    tile("Comandes fetes",R.co.L.length,R.co.pend+" pendents · "+R.co.den+" denegades")+tile("Aprovades",R.co.ok.length,R.co.reb+" ja rebudes")+tile("Import aprovat",eur(R.co.imp),"preus orientatius")+tile("Per casal",R.co.cas.map(o=>o.n).join(" · "),R.co.cas.map(o=>o.cs.curt+" "+eur(o.imp)).join(" · "))+'</div>'+
    (R.co.cat.length?'<div class="tablewrap" style="border:0"><table><thead><tr><th>Categoria</th><th>Import aprovat</th><th>%</th></tr></thead><tbody>'+R.co.cat.map(o=>'<tr><td>'+esc(CATS_C[o.k].t)+'</td><td class="num">'+eur(o.imp)+'</td><td class="num">'+Math.round(o.imp/Math.max(R.co.imp,0.01)*100)+'%</td></tr>').join("")+'</tbody></table></div>':'')+
    '<div class="tablewrap" style="border:0"><table><thead><tr><th>Núm.</th><th>Data</th><th>Casal</th><th>Proveïdor</th><th>Demanada per</th><th>Aprovada per</th><th>Estat</th><th>Import</th></tr></thead><tbody>'+
    (R.co.L.map(c=>'<tr><td class="num" style="white-space:nowrap">'+esc(c.num)+' <button class="btn sm ghost no-print" data-cpdf="'+c.id+'" title="Descarregar en PDF" style="padding:2px 8px">PDF</button></td><td class="num">'+fdata(c.creat.slice(0,10))+'</td><td>'+esc(casal(c.casal).curt)+'</td><td>'+esc(provC(c.prov).nom)+'</td><td>'+esc(c.per)+'</td><td>'+(c.resol?esc(c.resol.per):'—')+'</td><td>'+EST_C[c.estat][0]+'</td><td class="num"><b>'+eur(totalC(c))+'</b></td></tr>').join("")||'<tr><td colspan="8" class="empty" style="padding:14px 16px">No hi ha comandes en aquest període.</td></tr>')+'</tbody></table></div>'+
    '<p class="note" style="margin:0">Cada comanda té el seu full en PDF amb qui l\'ha demanada, qui l\'ha aprovada i la recepció.</p></section>';
  if(!S.rSec.length) rep+='<div class="empty">Tria almenys un apartat per veure l\'informe.</div>';
  return '<div class="head no-print"><div><div class="eyebrow">Contracte 01040604/2026/9 · Ajuntament de Sant Pere de Ribes</div><h1>Informes i justificació</h1><p>Tria el període i els apartats. Pots imprimir l\'informe o descarregar-lo.</p></div></div>'+
    ctrl+'<div id="report" class="report">'+rep+'</div>'+tanc;
};
const REP_CSS='body{font-family:Nunito,Arial,sans-serif;color:#222;margin:24px;font-size:13px}h1{font-size:22px;margin:6px 0}h2{font-size:16px;margin:0}.rep-logos{display:flex;justify-content:space-between;align-items:center}.rep-logos img{height:56px}.rep-print p{margin:0 0 6px;color:#555}.rep-per{margin:10px 0 14px;padding:8px 10px;background:#f3f0fa;border-radius:6px}.panel{border:1px solid #ddd;border-radius:8px;padding:12px;margin-bottom:12px;break-inside:avoid}.panel-h{margin-bottom:8px}.eyebrow{font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#666}.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.kpi{border:1px solid #e5e5e5;border-radius:6px;padding:8px}.kpi .label,.kpi .sub{font-size:11px;color:#555}.kpi .val{font-size:20px!important;font-weight:800}table{width:100%;border-collapse:collapse;margin:6px 0}th,td{border-bottom:1px solid #e5e5e5;padding:5px 6px;text-align:left;font-size:12px}th{background:#f5f5f5;font-size:10.5px;text-transform:uppercase}.rep-per .print-only{display:inline}.note{font-size:11px;color:#555}.bar{height:6px;background:#eee;border-radius:3px}.bar i{display:block;height:100%;background:#6C4BD8;border-radius:3px}.chip{font-size:11px}.print-only{display:block}.no-print,button{display:none!important}.imp{display:inline-block!important;margin:0 0 12px;padding:8px 14px;font:inherit;border:1px solid #6C4BD8;color:#6C4BD8;background:#fff;border-radius:6px;cursor:pointer}@media print{.imp{display:none!important}body{margin:0}}';
function htmlInforme(){
  const r=document.getElementById("report").cloneNode(true);
  r.querySelectorAll(".no-print,button").forEach(x=>x.remove());
  return '<!doctype html><html lang="ca"><head><meta charset="utf-8"><title>Informe casals '+S.rDes+' a '+S.rFins+'</title><style>'+REP_CSS+'</style></head><body><button class="imp" onclick="window.print()">Imprimir</button>'+r.innerHTML+'<p class="note">Gestió: Fundació Ave Maria · Titularitat: Ajuntament de Sant Pere de Ribes</p><script>window.addEventListener("load",function(){setTimeout(function(){window.print()},400)})<\/script></body></html>';
}
BIND.informes = () => {
  const R=dadesInforme(), a=R.a, b=R.b;
  document.querySelectorAll("[data-rp]").forEach(x=>x.onclick=()=>{ const p=presetsInforme().find(y=>y[0]===x.dataset.rp); S.rDes=p[2]; S.rFins=p[3]; render(); });
  const d1=$("#rDes"), d2=$("#rFins");
  d1.onchange=()=>{ if(d1.value){ S.rDes=d1.value; if(S.rFins<S.rDes) S.rFins=S.rDes; render(); } };
  d2.onchange=()=>{ if(d2.value){ S.rFins=d2.value; if(S.rDes>S.rFins) S.rDes=S.rFins; render(); } };
  document.querySelectorAll("[data-rs]").forEach(x=>x.onchange=()=>{ const k=x.dataset.rs; S.rSec = x.checked ? SECCIONS.map(y=>y[0]).filter(y=>y===k||S.rSec.includes(y)) : S.rSec.filter(y=>y!==k); render(); });
  const pb=$("#repPrint");
  if(!window.__dlP) window.__dlP = Promise.resolve(null);
  pb.onclick=async()=>{ pb.disabled=true; const dl=await window.__dlP; pb.disabled=false;
    if(!dl){ try{ window.print(); }catch(e){} toast("Si no s'obre la finestra d'impressió, prem Ctrl+P."); return; }
    try{ await dl.save({filename:"Informe casals "+a+" a "+b+".html", data:htmlInforme()}); toast("Informe descarregat. Obre'l i s'obrirà la finestra per imprimir."); }
    catch(e){ if(e&&e.code==="declined") return; if(e&&e.code==="rate_limited"){ toast("Ja hi ha una descàrrega pendent."); return; } toast("No s'ha pogut descarregar l'informe."); } };
  const cp=(id,f)=>{ const el=$("#"+id); if(el) el.onclick=f; };
  cp("cpAss",()=>copiar(csv([["Casal","Dies amb registre","Arribades"]].concat(R.perCasal.map(o=>[o.c.nom,o.dies,o.arr])).concat([[""],["Activitat","Casal","Sessions","Assistències","Mitjana"]]).concat(R.perAct.map(o=>[o.a.nom,casal(o.a.casal).curt,o.ses,o.pres,n2(o.mitj)])))));
  cp("cpP2",()=>copiar(csv([["Període",a+" a "+b],["Servei","Dies","Àpats","Ingressos","Aportació Ajuntament"],["Àpats Roquetes",R.ap.dies,R.ap.nApats,n2(R.ap.tot),n2(R.ap.aj)]])));
  cp("cpAnx",()=>copiar(csv([["JUSTIFICACIÓ DE LA DESPESA DEL SERVEI DE MENJADOR",a+" a "+b],["Nom i cognoms","NIF","Adreça","Núm. menús","Preu usuari","Import pagat usuari","Preu real","Pagament Ajuntament"]].concat(R.ap.rows.filter(r=>r.subv).map(r=>{ const p=soci(r.x); return [nomComplet(p),(p.priv&&p.priv.dni)||"",p.domicili||"",r.n,n2(r.pr),n2(r.imp),n2(r.real),n2(r.aj)]; }),[["Total","","",R.ap.rows.filter(r=>r.subv).reduce((t,r)=>t+r.n,0),"",n2(R.ap.rows.filter(r=>r.subv).reduce((t,r)=>t+r.imp,0)),n2(R.ap.rows.filter(r=>r.subv).reduce((t,r)=>t+r.real,0)),n2(R.ap.aj)]]))));
  cp("cpP3",()=>copiar(csv([["Activitat","Casal","Inscrits","Tarifa","Emès","Cobrat"]].concat(R.p3rows.map(r=>[r.a.nom,casal(r.a.casal).curt,r.ins,n2(r.a.preu),n2(r.em),n2(r.cob)])))));
  cp("cpAp",()=>copiar(csv([["Persona","Àpats","Absències","Sense justificar","Tipus","Preu","Paga la persona","Paga l'Ajuntament"]].concat(R.ap.rows.map(r=>[nomComplet(soci(r.x)),r.n,r.abs,r.inj,r.subv?"Bonificada SS":"Inscrita",n2(r.pr),n2(r.imp),n2(r.aj)]),[["Persones no inscrites",R.ap.ext,"","","No inscrita","",n2(R.ap.extImp),""]]))));
  cp("rbPend",()=>rebutsPendents());
  cp("cpCo",()=>copiar(csv([["Període",a+" a "+b],["Núm.","Data","Casal","Proveïdor","Demanada per","Aprovada per","Estat","Import"]].concat(R.co.L.map(c=>[c.num,c.creat.slice(0,10),casal(c.casal).curt,provC(c.prov).nom,c.per,c.resol?c.resol.per:"",EST_C[c.estat][0],n2(totalC(c))])))));
  document.querySelectorAll("[data-tmes]").forEach(x=>x.onclick=()=>{ const m=x.dataset.tmes; overlay(hdr("Tancar "+nomMes(m),"Justificació")+'<p style="margin:0">Un cop tancat, no es podran canviar els rebuts ni les dades d\'aquest mes. És el que es justifica a l\'Ajuntament.</p><div class="m-f"><button class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" id="okTM">Tancar el mes</button></div>'); $("#okTM").onclick=()=>{ D.mesosTancats[m]={data:isoAvui(),per:nomT(ME)}; publicarMes(m); logCanvi("Tancament mensual",nomMes(m)); save(); closeOverlay(); toast(nomMes(m)+" tancat i publicat per a l'Ajuntament."); render(); }; });
  document.querySelectorAll("[data-rmes]").forEach(x=>x.onclick=()=>{ const m=x.dataset.rmes; confirmMotiu("Reobrir "+nomMes(m),"Les dades del mes es podran tornar a modificar. Si ja l'has justificat, caldrà enviar-ne una versió corregida a l'Ajuntament.","Reobrir",mo=>{ delete D.mesosTancats[m]; logCanvi("Reobertura de mes",nomMes(m),mo); save(); toast(nomMes(m)+" reobert."); render(); }); });
};
function rebutsPendents(){
  const R=dadesInforme(), rb=D.rebuts.filter(r=>R.ms.includes(r.mes)&&!r.pagat);
  overlay(hdr("Rebuts pendents", R.ms.map(nomMes).join(", "))+'<div class="list">'+(rb.map(r=>{ const a=D.activitats.find(x=>x.id===r.act), s=soci(r.soci); if(!a||!s) return ''; const tancat=!!D.mesosTancats[r.mes]; return '<div class="row"><div class="t"><b>'+esc(nomComplet(s))+'</b><span>'+esc(a.nom)+' · '+esc(casal(a.casal).curt)+' · '+nomMes(r.mes)+'</span></div><span class="num">'+eur(r.import)+'</span>'+(tancat?'<span class="chip">Mes tancat</span>':'<button class="btn sm primary" data-rbok="'+r.id+'">Cobrat</button>')+'</div>'; }).join("")||'<div class="empty">Tots els rebuts d\'aquest període estan cobrats.</div>')+'</div>');
  document.querySelectorAll("[data-rbok]").forEach(b=>b.onclick=()=>{ const r=D.rebuts.find(x=>x.id===b.dataset.rbok); r.pagat=true; save(); toast("Rebut cobrat."); render(); rebutsPendents(); });
}

const VIEWS_INFORMES_INTERN=VIEWS.informes, BIND_INFORMES_INTERN=BIND.informes;
VIEWS.informes = () => S.rol==="ajuntament" ? informesAjuntament() : VIEWS_INFORMES_INTERN();
BIND.informes = () => { if(S.rol!=="ajuntament") return BIND_INFORMES_INTERN();
  document.querySelectorAll("[data-mesaj]").forEach(b=>b.onclick=()=>{ S.mesAj=b.dataset.mesaj; render(); });
  const p=$("#ajPrint"); if(p) p.onclick=()=>window.print(); };

boot();
})();
