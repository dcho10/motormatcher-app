const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
      return res.status(400).send('No files were uploaded.');
  }

  const fileName = req.file.filename;

  res.send('File uploaded successfully.');
});

