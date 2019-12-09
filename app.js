const express = require('express');
const app = express();
var cors = require('cors');
const port = 3000;

app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/received', (req, res) => {
    res.writeHead(200, '', { Connection: 'keep-alive', 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache'});
    let num = 0;
    setInterval(() => {
        res.write(`id: ${num}\n`);
        res.write("event: message\n");
        res.write(`data: Data Number ${num}\n\n`);
        res.flushHeaders();
        num+=1;
        if(num > 9) {
            res.write(`id: ${-1}\n`);
            res.write("event: message\n");
            res.write(`data: Fin del listening: ${num}\n\n`);
            res.flushHeaders();
        }
    }, 3000);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));