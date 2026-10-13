import {mkdir,copyFile,cp,rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const out=resolve(root,'dist');await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
for(const name of ['index.html','style.css','element-motion.css','app.js','oracle.js','topics.js','glyphs.js','motion.js','ai-client.js','config.js'])await copyFile(resolve(root,name),resolve(out,name));
for(const name of ['assets','vendor'])await cp(resolve(root,name),resolve(out,name),{recursive:true});
console.log('Static frontend prepared in dist/. Server code and secrets excluded.');
