// photo upload 

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
  res.send('Image uploaded successfully.');
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

// Email to ID association - for buyers to email sellers

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const Inquiry = sequelize.define('Inquiry', {
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
const Item = sequelize.define('Item', {
  sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  sellerEmail: {
      type: DataTypes.STRING,
      allowNull: false
  }
});