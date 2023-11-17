const express = require("express");
const { exec } = require("child_process");
const ejs = require("ejs");
const path = require("path");
const cors = require("cors");
const os = require("os");

const app = express();
const port = 3000;
let ytdlp;

if (os.platform() === "win32") {
  ytdlp = "yt-dlp.exe";
} else if (os.platform() === "darwin") {
  ytdlp = "yt-dlp_macos";
} else {
  ytdlp = "yt-dlp_linux";
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/download", (req, res) => {
  const url = req.body.url;
  const command = `${ytdlp} ${url} -f b --get-url`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.send("Error occurred during download");
    }

    res.send(stdout);
  });
});

app.listen(port, () => {
  console.log(`Web UI for ytdlp is listening at http://localhost:${port}`);
});
