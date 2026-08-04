#!/usr/bin/env node
/**
 * Build a password-gated page for /private/<slug>/.
 *
 * The plaintext never enters the repository. This reads an HTML fragment from a
 * path outside the repo, encrypts it with AES-256-GCM under a key derived from
 * the passphrase (PBKDF2-HMAC-SHA256), and writes a self-contained page that
 * decrypts in the browser via native WebCrypto.
 *
 * There is no plaintext in the output and no `if (password === ...)` check: a
 * wrong passphrase fails the AEAD tag rather than a string comparison. Viewing
 * source gets you ciphertext.
 *
 * Node stdlib only — no dependency, which matters because qa.rb enforces an
 * exact allowlist for shipped JS.
 *
 *   node _scripts/build-private.mjs \
 *     --source ~/Desktop/interview-dossiers/zenskar/leave-behind.html \
 *     --slug zenskar-notes --title "Notes before we talk" --passphrase "..."
 */
import { createHash, pbkdf2Sync, randomBytes, createCipheriv } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const ITERATIONS = 250000;
const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const args = {};
for (let i = 2; i < process.argv.length; i += 2) {
  args[process.argv[i].replace(/^--/, "")] = process.argv[i + 1];
}
for (const k of ["source", "slug", "title", "passphrase"]) {
  if (!args[k]) { console.error(`error: --${k} is required`); process.exit(1); }
}

const src = resolve(args.source.replace(/^~/, homedir()));
if (!existsSync(src)) { console.error(`error: no such source: ${src}`); process.exit(1); }
if (!relative(REPO, src).startsWith("..")) {
  console.error(`error: source is inside the repo (${src}). Keep plaintext out of git.`);
  process.exit(1);
}

const plaintext = readFileSync(src);
const salt = randomBytes(16);
const iv = randomBytes(12);
const key = pbkdf2Sync(Buffer.from(args.passphrase, "utf8"), salt, ITERATIONS, 32, "sha256");
const cipher = createCipheriv("aes-256-gcm", key, iv);
// WebCrypto expects the GCM tag appended to the ciphertext.
const ct = Buffer.concat([cipher.update(plaintext), cipher.final(), cipher.getAuthTag()]);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const b64 = (b) => b.toString("base64");
const blurb = args.blurb || "This page is encrypted. The passphrase is in the email.";

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
:root{--bg:#faf9f7;--panel:#fff;--ink:#191a1e;--ink2:#52545c;--ink3:#83858f;
 --line:#e4e1da;--accent:#0000ee;--tint:#f1efeb}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);
 font:16px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;
 -webkit-font-smoothing:antialiased}
a{color:var(--accent)}
.gate{min-height:100vh;display:grid;place-items:center;padding:2rem}
.gate form{width:100%;max-width:26rem;background:var(--panel);border:1px solid var(--line);
 border-radius:6px;padding:1.75rem}
.gate h1{font-size:1.0625rem;margin:0 0 .35rem}
.gate p{margin:0 0 1.15rem;color:var(--ink2);font-size:.9375rem}
.gate label{display:block;font-size:.75rem;letter-spacing:.09em;text-transform:uppercase;
 color:var(--ink3);margin-bottom:.4rem}
.gate input{width:100%;padding:.6rem .7rem;font-size:1rem;font-family:inherit;
 border:1px solid var(--line);border-radius:4px;background:var(--bg);color:var(--ink)}
.gate input:focus{outline:2px solid var(--accent);outline-offset:1px}
.gate button{margin-top:.9rem;width:100%;padding:.62rem;font-size:.9375rem;font-family:inherit;
 border:0;border-radius:4px;background:var(--ink);color:var(--bg);cursor:pointer}
.gate button[disabled]{opacity:.55;cursor:default}
.err{margin-top:.8rem;font-size:.875rem;color:#b3261e;min-height:1.2em}
main{max-width:47rem;margin:0 auto;padding:3rem 1.5rem 6rem}
main h1{font-size:1.5rem;line-height:1.25;margin:0 0 .3rem}
main h2{font-size:1.0625rem;margin:2.4rem 0 .6rem;padding-top:1.1rem;border-top:1px solid var(--line)}
main h3{font-size:.9375rem;margin:1.5rem 0 .4rem}
main .sub{color:var(--ink3);font-size:.9375rem;margin:0 0 2rem}
table{border-collapse:collapse;width:100%;margin:1rem 0;font-size:.875rem}
th,td{border:1px solid var(--line);padding:.5rem .6rem;text-align:left;vertical-align:top}
th{background:var(--tint);font-weight:600}
.tablewrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
blockquote{margin:1.1rem 0;padding:.7rem 1rem;border-left:3px solid var(--line);
 background:var(--panel);color:var(--ink2)}
.note{background:var(--panel);border:1px solid var(--line);border-left:3px solid var(--accent);
 border-radius:0 4px 4px 0;padding:.85rem 1rem;margin:1.4rem 0;font-size:.9375rem}
ul,ol{padding-left:1.25rem}
li{margin:.3rem 0}
code{font:.85em ui-monospace,"SF Mono",Menlo,monospace;background:var(--tint);
 padding:.1em .35em;border-radius:3px}
footer{margin-top:3rem;padding-top:1.2rem;border-top:1px solid var(--line);
 color:var(--ink3);font-size:.8125rem}
@media (prefers-color-scheme:dark){
 :root{--bg:#15161a;--panel:#1c1e23;--ink:#e9e9ec;--ink2:#a9abb3;--ink3:#7e808a;
  --line:#2c2f36;--accent:#7ea6ff;--tint:#22252b}
}
</style>
</head>
<body>
<div class="gate" id="gate">
  <form id="f" autocomplete="off">
    <h1>${esc(args.title)}</h1>
    <p>${esc(blurb)}</p>
    <label for="p">Passphrase</label>
    <input id="p" type="password" autocomplete="off" autocapitalize="off"
           autocorrect="off" spellcheck="false" required>
    <button id="b" type="submit">Open</button>
    <div class="err" id="e" role="alert"></div>
  </form>
</div>
<div id="out" hidden></div>
<script>
const SALT=${JSON.stringify(b64(salt))},IV=${JSON.stringify(b64(iv))},
      CT=${JSON.stringify(b64(ct))},ITER=${ITERATIONS};
const dec=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
const f=document.getElementById('f'),e=document.getElementById('e'),
      btn=document.getElementById('b');
f.addEventListener('submit',async ev=>{
  ev.preventDefault();
  e.textContent='';btn.disabled=true;btn.textContent='Decrypting\\u2026';
  try{
    const pw=new TextEncoder().encode(document.getElementById('p').value);
    const base=await crypto.subtle.importKey('raw',pw,'PBKDF2',false,['deriveKey']);
    const key=await crypto.subtle.deriveKey(
      {name:'PBKDF2',salt:dec(SALT),iterations:ITER,hash:'SHA-256'},
      base,{name:'AES-GCM',length:256},false,['decrypt']);
    const pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:dec(IV)},key,dec(CT));
    document.getElementById('gate').remove();
    const out=document.getElementById('out');
    out.innerHTML=new TextDecoder().decode(pt);
    out.hidden=false;
  }catch(err){
    e.textContent='That passphrase does not open this page.';
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
//
// 1. No contiguous run of the plaintext survives into the output. Word-level
//    checks are useless here: common words like "document" and "background"
//    appear in the CSS and the decrypt shim, so they cannot distinguish a leak
//    from template vocabulary. Long substrings can.
// 2. The ciphertext actually decrypts back to the plaintext, through the same
//    WebCrypto API the browser will use. A page that builds is not a page that
//    opens.
const built = readFileSync(outPath, "utf8");
const text = plaintext.toString("utf8");
for (let i = 0; i + 48 <= text.length; i += 24) {
  const run = text.slice(i, i + 48);
  if (built.includes(run)) {
    console.error(`FATAL: plaintext survived into the page near byte ${i}. Not shipping.`);
    process.exit(1);
  }
}

const b64d = (s) => Uint8Array.from(Buffer.from(s, "base64"));
const baseKey = await crypto.subtle.importKey(
  "raw", new TextEncoder().encode(args.passphrase), "PBKDF2", false, ["deriveKey"]);
const webKey = await crypto.subtle.deriveKey(
  { name: "PBKDF2", salt: b64d(b64(salt)), iterations: ITERATIONS, hash: "SHA-256" },
  baseKey, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
const round = new TextDecoder().decode(
  await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64d(b64(iv)) }, webKey, b64d(b64(ct))));
if (round !== text) {
  console.error("FATAL: ciphertext does not round-trip to the plaintext. Not shipping.");
  process.exit(1);
}

const sha = createHash("sha256").update(built).digest("hex").slice(0, 12);
console.log(`built  private/${args.slug}/index.html`);
console.log(`  plaintext ${plaintext.length.toLocaleString()}B -> ciphertext ${ct.length.toLocaleString()}B -> page ${built.length.toLocaleString()}B`);
console.log(`  pbkdf2-sha256 x${ITERATIONS.toLocaleString()}, aes-256-gcm, sha256:${sha}`);
console.log(`  https://www.varunchoraria.com/private/${args.slug}/`);
