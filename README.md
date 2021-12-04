# Repo Contents
## video
The video folder contains an electron app which streams the video file to the browserwindow
in chunks.

# auth and rmtp
These folders belong to the docker compose file.
The auth folder contains a simple node server which is used to validate the key of the
stream which accessed the rtmp server running in the other container.
The stream can be provided with OBS.
```
OBS config:
Server: rtmp://localhost:1935/live
Stream Key: anton?key=supersecret
Note that the .m3u8 file created by nginx is the name of the user, for example anton.m3u8
This is important when supplying the URL in the index.html file.
```
The obs stream is converted to hls by nginx and the directory with .m3u8 and .ts files
can be mounted to the host maschine. then acces localhost:8080 to watch the video.
For some reason the stream does not play until u click on the video element to start playback.

## Clone this Repo
```
git clone https://github.com/Redstonerayy/http-stream
cd http-stream
npm install
npm update
npm exec electron-forge import
npm run make or npm start
```