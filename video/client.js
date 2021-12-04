const { BrowserWindow, app } = require('electron');
const express = require('express');
const expapp = express();
const fs = require('fs');

expapp.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "style.css");
});
//expapp.use(express.static(directory));
expapp.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

expapp.get("/video", (req, res) => {
    const range = req.headers.range;
    if(!range){
        res.status(400).send("Requires Range Header");
    }

    const videoPath = __dirname + "/<name>.mp4";
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, { start, end });

    videoStream.pipe(res);
});

expapp.listen(8880, () => {
    console.log("Listening on Port 8880!");
});


app.once('ready', () => {
    //create a window that fills the entire screen
    const window = new BrowserWindow({ 
        show : false,
        fullscreen: true,
        autoHideMenuBar: true
    });
    //show gracefully
    window.once('ready-to-show', () => {
        window.show();
    });
    //load local webserver
    window.loadURL('http://localhost:8880');
});
