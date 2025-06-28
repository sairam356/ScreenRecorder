// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('video'), (req, res) => {
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, 'uploads', `recording-${Date.now()}.webm`);

  fs.rename(tempPath, targetPath, err => {
    if (err) return res.status(500).send("Error saving file");
    res.send("Uploaded successfully");
  });
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
