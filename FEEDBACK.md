# Rainmaker feedback

Defects found while running Rainmaker against this site. Reported, not fixed here.

## 2026-08-03 — CLI is a silent no-op when invoked through the global bin

`rainmaker <anything>` exits 0 and prints nothing when run from `PATH`, because
`dist/cli.js:245` gates `main()` on `import.meta.url === pathToFileURL(process.argv[1]).href`
and the npm global bin is a symlink, so `argv[1]` is
`~/.npm-global/bin/rainmaker` while `import.meta.url` is the resolved
`~/rainmaker/dist/cli.js`. The two never match. Running
`node ~/rainmaker/dist/cli.js <command>` works normally.

Suggested fix: compare `fs.realpathSync(process.argv[1])` against
`fileURLToPath(import.meta.url)` instead of comparing the raw paths.
