import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
import {handleReading} from './ai/http.mjs';

const root=dirname(fileURLToPath(import.meta.url));
const files=new Set(['index.html','style.css','element-motion.css','app.js','oracle.js','topics.js','glyphs.js','motion.js','ai-client.js','config.js','vendor/lunar.js']);
const mime={html:'text/html; charset=utf-8',css:'text/css; charset=utf-8',js:'text/javascript; charset=utf-8',svg:'image/svg+xml'};
const server=createServer(async(req,res)=>{
 try {
  const path=new URL(req.url,'http://localhost').pathname;
  if(path==='/api/reading') {
   const url=`http://localhost:${server.address().port}${path}`;
   const abort=new AbortController();res.on('close',()=>{if(!res.writableEnded)abort.abort();});
   const request=new Request(url,{method:req.method,headers:req.headers,body:['GET','HEAD'].includes(req.method)?undefined:req,duplex:'half',signal:abort.signal});
   const response=await handleReading(request,process.env);res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));return;
  }
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
  const name=path==='/'?'index.html':path.slice(1);
  if(!files.has(name)&&!/^assets\/element-(wood|fire|earth|metal|water)\.svg$/.test(name)){res.writeHead(404);res.end('Not found');return;}
  const data=await readFile(resolve(root,name));res.writeHead(200,{'Content-Type':mime[name.split('.').pop()]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:data);
 }catch {res.writeHead(500);res.end('Server error');}
});
const port=Number(process.env.PORT||8787);
server.listen(port,'127.0.0.1',()=>console.log(`Ming Oracle: http://localhost:${port} (AI ${process.env.OPENAI_API_KEY?'configured':'needs OPENAI_API_KEY'})`));
