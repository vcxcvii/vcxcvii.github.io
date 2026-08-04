#!/usr/bin/env node
/**
 * Build a password-gated page for /private/<slug>/.
 *
 * The plaintext never enters the repository. This reads an HTML fragment from a
 * path outside the repo, encrypts it, and writes a self-contained page that
 * decrypts in the browser via native WebCrypto.
 *
 * Multiple passphrases open the same page. A random 256-bit content key
 * encrypts the payload once; that content key is then wrapped separately under
 * each passphrase (PBKDF2-HMAC-SHA256 -> AES-256-GCM). The page tries each
 * wrapper against what the visitor typed. So the recipient's address and the
 * author's own address both work, without duplicating the payload and without
 * either party's passphrase revealing the other's.
 *
 * A wrong passphrase fails an AEAD tag, not a string comparison, and viewing
 * source gets ciphertext. Passphrases are trimmed and lowercased before key
 * derivation, so an email address typed with stray capitals still opens.
 *
 * Node stdlib only, which matters because qa.rb enforces an exact allowlist for
 * shipped JS.
 *
 *   node _scripts/build-private.mjs \
 *     --source ~/Desktop/.../leave-behind.html \
 *     --slug zenskar-notes --title "Before we talk" \
 *     --pass apurv@zenskar.com --pass varunbchoraria@gmail.com \
 *     --accent "#042444" --logo ~/path/logo.svg
 */
import { createHash, pbkdf2Sync, randomBytes, createCipheriv } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const ITERATIONS = 250000;
const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const args = { pass: [] };
for (let i = 2; i < process.argv.length; i += 2) {
  const k = process.argv[i].replace(/^--/, "");
  const v = process.argv[i + 1];
  if (k === "pass") args.pass.push(v);
  else args[k] = v;
}
for (const k of ["source", "slug", "title"]) {
  if (!args[k]) { console.error(`error: --${k} is required`); process.exit(1); }
}
if (!args.pass.length) { console.error("error: at least one --pass is required"); process.exit(1); }

const src = resolve(args.source.replace(/^~/, homedir()));
if (!existsSync(src)) { console.error(`error: no such source: ${src}`); process.exit(1); }
if (!relative(REPO, src).startsWith("..")) {
  console.error(`error: source is inside the repo (${src}). Keep plaintext out of git.`);
  process.exit(1);
}

const norm = (s) => s.trim().toLowerCase();
const plaintext = readFileSync(src);

// One content key, encrypted once.
const contentKey = randomBytes(32);
const bodyIv = randomBytes(12);
const bodyCipher = createCipheriv("aes-256-gcm", contentKey, bodyIv);
const body = Buffer.concat([bodyCipher.update(plaintext), bodyCipher.final(), bodyCipher.getAuthTag()]);

// Wrap that key under each passphrase.
const wraps = args.pass.map((p) => {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const k = pbkdf2Sync(Buffer.from(norm(p), "utf8"), salt, ITERATIONS, 32, "sha256");
  const c = createCipheriv("aes-256-gcm", k, iv);
  const wrapped = Buffer.concat([c.update(contentKey), c.final(), c.getAuthTag()]);
  return { s: salt.toString("base64"), i: iv.toString("base64"), w: wrapped.toString("base64") };
});

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const accent = args.accent || "#0000ee";
const accent2 = args.accent2 || accent;
const blurb = args.blurb || "Enter your email address to open this page.";
const logoSvg = args.logo && existsSync(resolve(args.logo.replace(/^~/, homedir())))
  ? readFileSync(resolve(args.logo.replace(/^~/, homedir())), "utf8").replace(/<\?xml[^>]*\?>/, "").trim()
  : "";

const page = `---
layout: none
sitemap: false
---
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive">
<title>${esc(args.title)}</title>
<style>
html{color-scheme:light}
:root{color-scheme:light;--bg:#fbfbfa;--panel:#fff;--ink:#16181d;--ink2:#4e515a;--ink3:#84868f;
 --line:#e6e5e1;--accent:${accent};--accent2:${accent2};--tint:#f2f1ee;--max:44rem}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);
 font:16px/1.68 -apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;
 -webkit-font-smoothing:antialiased}
a{color:var(--accent)}
.brandbar{background:var(--panel);border-bottom:1px solid var(--line);padding:.85rem 1.5rem;
 display:flex;align-items:center;gap:.85rem;position:sticky;top:0;z-index:20}
.brandbar svg{height:22px;width:auto;display:block}
.brandbar .by{font-size:.8125rem;color:var(--ink3);margin-left:auto;text-align:right;line-height:1.35}
.brandbar .by b{color:var(--ink2);font-weight:600}
.gate{min-height:78vh;display:grid;place-items:center;padding:2rem 1.25rem}
.gate form{width:100%;max-width:27rem;background:var(--panel);border:1px solid var(--line);
 border-radius:8px;padding:1.9rem}
.gate h1{font-size:1.125rem;margin:0 0 .4rem;letter-spacing:-.01em}
.gate p{margin:0 0 1.25rem;color:var(--ink2);font-size:.9375rem}
.gate label{display:block;font-size:.6875rem;letter-spacing:.1em;text-transform:uppercase;
 color:var(--ink3);margin-bottom:.45rem;font-weight:600}
.gate input{width:100%;padding:.65rem .75rem;font-size:1rem;font-family:inherit;
 border:1px solid var(--line);border-radius:5px;background:var(--bg);color:var(--ink)}
.gate input:focus{outline:2px solid var(--accent);outline-offset:1px;border-color:transparent}
.gate button{margin-top:1rem;width:100%;padding:.68rem;font-size:.9375rem;font-weight:600;
 font-family:inherit;border:0;border-radius:5px;background:var(--accent);color:#fff;cursor:pointer}
.gate button[disabled]{opacity:.5;cursor:default}
.err{margin-top:.85rem;font-size:.875rem;color:#b3261e;min-height:1.2em}
.shell{display:grid;grid-template-columns:15rem minmax(0,1fr);gap:2.5rem;
 max-width:66rem;margin:0 auto;padding:2.5rem 1.5rem 6rem}
@media(max-width:900px){.shell{grid-template-columns:1fr;gap:1.25rem;padding-top:1.5rem}
 .toc{position:static!important;max-height:none!important;border-right:0!important;
  border-bottom:1px solid var(--line);padding-bottom:1rem}}
.toc{position:sticky;top:5rem;align-self:start;max-height:calc(100vh - 7rem);overflow-y:auto;
 font-size:.875rem;border-right:1px solid var(--line);padding-right:1rem}
.toc .lab{font-size:.6875rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink3);
 font-weight:600;display:block;margin-bottom:.6rem}
.toc a{display:block;padding:.3rem 0;color:var(--ink2);text-decoration:none;border-left:2px solid transparent;
 padding-left:.7rem;margin-left:-.7rem}
.toc a:hover{color:var(--accent)}
.toc a.on{color:var(--accent);border-left-color:var(--accent);font-weight:600}
article{max-width:var(--max)}
article h1{font-size:1.6rem;line-height:1.22;margin:0 0 .35rem;letter-spacing:-.02em}
article h2{font-size:1.0625rem;margin:2.6rem 0 .7rem;padding-top:1.2rem;
 border-top:1px solid var(--line);letter-spacing:-.01em;scroll-margin-top:5rem}
article h3{font-size:.9375rem;margin:1.6rem 0 .45rem}
article .sub{color:var(--ink3);font-size:.9375rem;margin:0 0 2.2rem}
table{border-collapse:collapse;width:100%;margin:1.1rem 0;font-size:.875rem}
th,td{border:1px solid var(--line);padding:.55rem .65rem;text-align:left;vertical-align:top}
th{background:var(--tint);font-weight:600}
.tablewrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
blockquote{margin:1.2rem 0;padding:.75rem 1.1rem;border-left:3px solid var(--accent);
 background:var(--panel);color:var(--ink2)}
.note{background:var(--panel);border:1px solid var(--line);border-left:3px solid var(--accent);
 border-radius:0 5px 5px 0;padding:.9rem 1.1rem;margin:1.5rem 0;font-size:.9375rem}
.note p:first-child{margin-top:0}.note p:last-child{margin-bottom:0}
ul,ol{padding-left:1.3rem}li{margin:.35rem 0}
code{font:.85em ui-monospace,"SF Mono",Menlo,monospace;background:var(--tint);
 padding:.12em .35em;border-radius:3px}
footer{margin-top:3.5rem;padding-top:1.3rem;border-top:1px solid var(--line);
 color:var(--ink3);font-size:.8125rem}
/* hero takeaway - the bit that survives a 20-second skim */
.tl{background:var(--panel);border:1px solid var(--line);border-top:3px solid var(--accent);
 border-radius:0 0 6px 6px;padding:1.15rem 1.3rem;margin:0 0 2rem}
.tl .lab{font-size:.6875rem;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);
 font-weight:700;display:block;margin-bottom:.55rem}
.tl ol{margin:0;padding-left:1.15rem}
.tl li{margin:.42rem 0}
.tl li b{font-weight:650}
/* editable-assumption calculator */
.calc{background:var(--panel);border:1px solid var(--line);border-radius:7px;
 padding:1.2rem 1.3rem;margin:1.6rem 0}
.calc h3{margin:0 0 .2rem;font-size:.9375rem}
.calc .hint{font-size:.8125rem;color:var(--ink3);margin:0 0 1rem}
.calc .rows{display:grid;gap:.6rem}
.calc .row{display:grid;grid-template-columns:1fr 7.5rem;gap:.7rem;align-items:center}
.calc label{font-size:.875rem;color:var(--ink2)}
.calc label small{display:block;color:var(--ink3);font-size:.75rem}
.calc input{width:100%;padding:.4rem .5rem;font:inherit;font-size:.875rem;text-align:right;
 border:1px solid var(--line);border-radius:4px;background:var(--bg);color:var(--ink)}
.calc input:focus{outline:2px solid var(--accent);outline-offset:1px;border-color:transparent}
.calc .out{margin-top:1.1rem;padding-top:1rem;border-top:1px solid var(--line)}
.calc .big{display:flex;flex-wrap:wrap;gap:1.5rem;margin-bottom:.9rem}
.calc .big div{min-width:7rem}
.calc .big .n{font-size:1.45rem;font-weight:700;letter-spacing:-.02em;line-height:1.15;
 font-variant-numeric:tabular-nums}
.calc .big .c{font-size:.75rem;color:var(--ink3);text-transform:uppercase;letter-spacing:.07em;
 margin-top:.15rem}
.calc .verdict{font-size:.875rem;padding:.7rem .85rem;border-radius:5px;background:var(--tint);
 border-left:3px solid var(--accent)}
.calc .verdict.bad{border-left-color:#b3261e}
.calc .verdict.good{border-left-color:#1a7f4b}
.calc .reset{background:none;border:0;color:var(--accent);font:inherit;font-size:.8125rem;
 cursor:pointer;padding:0;margin-top:.7rem;text-decoration:underline}
/* pre-empted objections */
.obj{border:1px solid var(--line);border-radius:6px;margin:.6rem 0;background:var(--panel)}
.obj summary{cursor:pointer;padding:.7rem .95rem;font-size:.9375rem;font-weight:600;
 list-style:none;position:relative;padding-right:2.2rem}
.obj summary::-webkit-details-marker{display:none}
.obj summary::after{content:"+";position:absolute;right:.95rem;top:.62rem;color:var(--accent);
 font-weight:700;font-size:1.05rem}
.obj[open] summary::after{content:"\\2212"}
.obj .body{padding:0 .95rem .9rem;font-size:.9375rem;color:var(--ink2)}
.obj .body p:first-child{margin-top:0}
@media print{.toc,.brandbar{display:none}.shell{display:block;padding:0}}
</style>
</head>
<body>
<div class="brandbar">${logoSvg}<div class="by">Prepared by <b>Varun Choraria</b><br>Private &middot; not published</div></div>

<div class="gate" id="gate">
  <form id="f" autocomplete="off">
    <h1>${esc(args.title)}</h1>
    <p>${esc(blurb)}</p>
    <label for="p">Your email address</label>
    <input id="p" type="text" inputmode="email" autocomplete="off" autocapitalize="off"
           autocorrect="off" spellcheck="false" required placeholder="you@company.com">
    <button id="b" type="submit">Open</button>
    <div class="err" id="e" role="alert"></div>
  </form>
</div>

<div id="out" hidden></div>

<script>
const WRAPS=${JSON.stringify(wraps)},BODY=${JSON.stringify(body.toString("base64"))},
      BIV=${JSON.stringify(bodyIv.toString("base64"))},ITER=${ITERATIONS};
const d64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
const f=document.getElementById('f'),e=document.getElementById('e'),btn=document.getElementById('b');
f.addEventListener('submit',async ev=>{
  ev.preventDefault();
  e.textContent='';btn.disabled=true;btn.textContent='Opening\\u2026';
  const pass=document.getElementById('p').value.trim().toLowerCase();
  try{
    const base=await crypto.subtle.importKey('raw',new TextEncoder().encode(pass),'PBKDF2',false,['deriveKey']);
    let ck=null;
    for(const w of WRAPS){
      try{
        const kek=await crypto.subtle.deriveKey(
          {name:'PBKDF2',salt:d64(w.s),iterations:ITER,hash:'SHA-256'},
          base,{name:'AES-GCM',length:256},false,['decrypt']);
        const raw=await crypto.subtle.decrypt({name:'AES-GCM',iv:d64(w.i)},kek,d64(w.w));
        ck=await crypto.subtle.importKey('raw',raw,{name:'AES-GCM'},false,['decrypt']);
        break;
      }catch(_){}
    }
    if(!ck) throw new Error('no wrap');
    const pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:d64(BIV)},ck,d64(BODY));
    document.getElementById('gate').remove();
    const out=document.getElementById('out');
    out.innerHTML=new TextDecoder().decode(pt);
    out.hidden=false;
    // innerHTML never executes <script>. Re-create each one so it does.
    out.querySelectorAll('script').forEach(o=>{
      const n=document.createElement('script');
      for(const a of o.attributes) n.setAttribute(a.name,a.value);
      n.textContent=o.textContent;
      o.replaceWith(n);
    });
    const hs=[...out.querySelectorAll('article h2')];
    const toc=out.querySelector('.toc');
    if(toc&&hs.length){
      toc.insertAdjacentHTML('beforeend',hs.map((h,i)=>{
        h.id=h.id||'s'+i;return '<a href="#'+h.id+'">'+h.textContent+'</a>';}).join(''));
      const links=[...toc.querySelectorAll('a')];
      const io=new IntersectionObserver(es=>{
        es.forEach(x=>{if(x.isIntersecting){
          links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+x.target.id));}});
      },{rootMargin:'-20% 0px -70% 0px'});
      hs.forEach(h=>io.observe(h));
    }
  }catch(err){
    e.textContent='That address does not open this page.';
    btn.disabled=false;btn.textContent='Open';
  }
});
</script>
</body>
</html>
`;

const outPath = join(REPO, "private", args.slug, "index.html");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, page);

// Two assertions, because shipping a broken gate is worse than not shipping.
// 1. No contiguous run of the plaintext survives into the output.
// 2. Every passphrase actually opens it, through the same WebCrypto API the
//    browser uses. A page that builds is not a page that opens.
const built = readFileSync(outPath, "utf8");
const text = plaintext.toString("utf8");
for (let i = 0; i + 48 <= text.length; i += 24) {
  if (built.includes(text.slice(i, i + 48))) {
    console.error(`FATAL: plaintext survived into the page near byte ${i}. Not shipping.`);
    process.exit(1);
  }
}

const b64d = (s) => Uint8Array.from(Buffer.from(s, "base64"));
for (const p of args.pass) {
  const base = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(norm(p)), "PBKDF2", false, ["deriveKey"]);
  let ck = null;
  for (const w of wraps) {
    try {
      const kek = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: b64d(w.s), iterations: ITERATIONS, hash: "SHA-256" },
        base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
      const raw = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64d(w.i) }, kek, b64d(w.w));
      ck = await crypto.subtle.importKey("raw", raw, { name: "AES-GCM" }, false, ["decrypt"]);
      break;
    } catch (_) { /* wrong wrapper, try the next */ }
  }
  if (!ck) { console.error(`FATAL: "${p}" does not open the page. Not shipping.`); process.exit(1); }
  const round = new TextDecoder().decode(
    await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64d(bodyIv.toString("base64")) }, ck, b64d(body.toString("base64"))));
  if (round !== text) { console.error(`FATAL: "${p}" decrypts to the wrong content.`); process.exit(1); }
}

// And a passphrase that should NOT work, must not.
let leaked = false;
{
  const base = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode("definitely-not-a-real-passphrase"), "PBKDF2", false, ["deriveKey"]);
  for (const w of wraps) {
    try {
      const kek = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: b64d(w.s), iterations: ITERATIONS, hash: "SHA-256" },
        base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
      await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64d(w.i) }, kek, b64d(w.w));
      leaked = true;
    } catch (_) { /* expected */ }
  }
}
if (leaked) { console.error("FATAL: a bogus passphrase unwrapped a key. Not shipping."); process.exit(1); }

const sha = createHash("sha256").update(built).digest("hex").slice(0, 12);
console.log(`built  private/${args.slug}/index.html`);
console.log(`  plaintext ${plaintext.length.toLocaleString()}B -> body ${body.length.toLocaleString()}B -> page ${built.length.toLocaleString()}B`);
console.log(`  aes-256-gcm, ${wraps.length} key wrappers, pbkdf2-sha256 x${ITERATIONS.toLocaleString()}, sha256:${sha}`);
console.log(`  opens with: ${args.pass.map(norm).join(", ")}`);
console.log(`  https://www.varunchoraria.com/private/${args.slug}/`);
