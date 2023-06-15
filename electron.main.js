const { app, BrowserWindow } = require("electron");
const url = require("url");
const fs = require("fs");
const http = require("http");
const path = require("path");
const Readable = require("stream").Readable;

const BASE_PORT = 8000;
let port = BASE_PORT;
const STATIC_PATH = path.join(process.cwd(), ".");

function createServer() {
    const MIME_TYPES = {
        default: "application/octet-stream",
        html: "text/html; charset=UTF-8",
        js: "application/javascript",
        css: "text/css",
        png: "image/png",
        jpg: "image/jpg",
        gif: "image/gif",
        ico: "image/x-icon",
        svg: "image/svg+xml",
    };

    const toBool = [() => true, () => false];
    const strStream = (str) => {
        const s = new Readable();
        s.push(str);
        s.push(null);
        return s;
    };
    const fsStream = (p) => fs.createReadStream(p);
    const isExists = (filePath) => fs.promises.access(filePath).then(...toBool);

    const prepareFile = async (url) => {
        const paths = [STATIC_PATH, url.split("?")[0]];
        if (url.endsWith("/")) paths.push("index.html");
        const filePath = path.join(...paths);
        const pathTraversal = !filePath.startsWith(STATIC_PATH);
        const exists = await isExists(filePath);
        const found = !pathTraversal && exists;
        const streamPath = found ? filePath : STATIC_PATH + "/404.html";
        const ext = path.extname(streamPath).substring(1).toLowerCase();
        const result = {
            found,
            ext,
            stream: found
                ? fsStream(streamPath)
                : (await isExists(streamPath))
                ? fsStream(streamPath)
                : strStream("404 Not Found"),
        };
        return result;
    };

    return new Promise((resolve, reject) => {
        const server = http.createServer(async (req, res) => {
            try {
                const file = await prepareFile(req.url);
                const statusCode = file.found ? 200 : 404;
                const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
                res.writeHead(statusCode, { "Content-Type": mimeType });
                file.stream.pipe(res);
                if (process.env.NODE_ENV === "development")
                    console.log(`${req.method} ${req.url} ${statusCode}`);
            } catch (e) {
                strStream("Internal Server Error").pipe(res);
                console.log(`${req.method} ${req.url} ${500}`);
            }
        });

        const onError = (e) => {
            if (e.code === "EADDRINUSE") {
                server.listen(++port);
            } else {
                console.log(e);
                reject(e);
            }
        };

        server.addListener("error", onError);

        server.listen(port, () => {
            server.removeListener("error", onError);
            console.log(`Server running at http://127.0.0.1:${port}/`);
            resolve();
        });
    });
}

app.on("ready", async () => {
    await createServer();

    let mainWindow = new BrowserWindow({
        show: false,
    });
    mainWindow.maximize();
    mainWindow.loadURL(
        url.format({
            pathname: `localhost:${port}`,
            protocol: "http:",
            slashes: true,
        })
    );
    mainWindow.show();
});
