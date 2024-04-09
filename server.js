const express = require('express');
const multer = require('multer');
const app = express();
// define the destination folder for the uploaded images
const upload = multer({ dest: 'uploads/' }); 

app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
      return res.status(400).send('No files were uploaded.');
  }
// Access the uploaded file via req.file
  const fileName = req.file.filename;

  // do something with the uploaded image (ie. process it)
  res.send('File uploaded successfully.');
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});