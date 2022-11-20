import fs from 'fs';
import http from 'http';
import path from 'path';
const server = http.createServer((req, res) => {
  const dirname = req.url.includes('css')
    ? path.dirname(`${req.url}.css`)
    : path.dirname(`${req.url}.html`);
  console.log(dirname);
  console.log('-----' + req.url.includes('css'));
  const file =
    req.url === '/'
      ? './index.html'
      : path.join(
          '.' + dirname,
          req.url + (req.url.includes('css') ? '' : '.html')
        );
  console.log('***', file);
  const type = `text/${path.extname(file).slice(1)}`;
  console.log(type);

  fs.readFile(file, (e, data) => {
    if (e) {
      if ((e.code = 'ENOENT')) {
        console.log(e.code);
        fs.readFile('./404.html', (e, data) => {
          if (e) throw e;
          res.writeHead(200, { 'content-type': type });

          res.end(data, 'utf-8', () => console.log('404 RES END'));
          console.log('END OF ERROR RESPONSE');
        });
      } else {
        res.writeHead(500);
        res.end('<h2>NONE</h2>');
        throw e;
      }
    } else {
      res.writeHead(200, { 'content-type': type });
      res.end(data, 'utf-8', () => console.log('RESPONSE END'));
    }
  });
});

const port = process.env.port || 5000;
server.listen(port, () => {
  console.log(`SERVER RUNNING ON: ${port}`);
});
