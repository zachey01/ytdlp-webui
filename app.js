const express = require("express");
const { exec } = require("child_process");
const ejs = require("ejs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

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
  const command = `yt-dlp.exe ${url} -f b --get-url`;

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
