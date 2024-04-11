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
    adId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// define association between models
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

app.post('/inquiry', async (req, res) => {
  const { adId, message } = req.body;

  try {
      // fetch the seller's email
      const ad = await ad.findOne({ where: { id: adId } });
      if (!ad) {
          return res.status(404).send('Item not found.');
      }

      // send an email to the seller
      console.log(`Sending inquiry email to ${ad.sellerEmail} regarding item ${adId}: ${message}`);

      // Save the inquiry to the database if needed
      await Inquiry.create({ adId, message });

      res.status(200).send('Inquiry sent successfully.');
  } catch (error) {
      console.error('Error sending inquiry:', error);
      res.status(500).send('An error occurred while sending the inquiry.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// **** Replace ID # with actual adID ****
const inquiryData = {
  adId: 123, 
  message: 'I am interested in this vehicle. Can you provide more details?'
};

fetch('/inquiry', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(inquiryData)
})
.then(response => {
  if (!response.ok) {
      throw new Error('Network response error');
  }
  return response.text();
})
.then(data => {
// logs response from the server
  console.log(data);
})
.catch(error => {
  console.error('There was a problem with your fetch request', error);
});