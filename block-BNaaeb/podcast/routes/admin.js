var express = require("express");
var router = express.Router();
var Podcast = require("../models/Podcast");

/*
var conn = mongoose.createConnection(mongoURI);

var gfs;

conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  //init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

//create storage engine
var storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const title = file.title;
        const description = file.description;
        const fileInfo = {
          filename: filename,
          title: title,
          description: description,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });


router.get("/", (req, res) => {
  //res.render("index");
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.render("index", { files: false });
    } else {
      files.map((file) => {
        if (
          file.contentType === "audio/m4a" ||
          file.contentType === "audio/mp3" ||
          file.contentType === "audio/flac" ||
          file.contentType === "audio/mp4" ||
          file.contentType === "audio/wav" ||
          file.contentType === "audio/wam" ||
          file.contentType === "audio/aac"
        ) {
          file.isImage = true;
        } else {
          files.isImage = false;
        }
      });
      return res.render("adminView", { files });
    }
  });
});

router.post("/new", upload.single("file"), (req, res) => {
  //res.json({ file: req.file });
  res.redirect("/");
});
*/

router.get("/", (req, res) => {
  res.render("adminView");
});

router.get("/new", (req, res) => {
  res.render("addPodcast");
});

router.post("/new", (req, res, next) => {
  Podcast.create(req.body, (err, podcast) => {
    if (err) return next(err);
    console.log(podcast);
    res.redirect("/admin");
  });
});

module.exports = router;
