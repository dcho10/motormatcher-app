// <<<<<<< main
// const path = require('path');
// const express = require('express');
// // Import express-session
// const session = require('express-session');
// const exphbs = require('express-handlebars');

// const routes = require('./controllers');
// const sequelize = require('./config/connection');
// const helpers = require('./utils/helpers');

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Set up sessions
// const sess = {
//   secret: 'Super secret secret',
//   resave: false,
//   saveUninitialized: true,
// };

// app.use(session(sess));

// const hbs = exphbs.create({ helpers });

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(routes);

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });
// =======
// // photo upload 

// const express = require('express');
// const multer = require('multer');
// const app = express();
// // define the destination folder for the uploaded images
// const upload = multer({ dest: 'uploads/' }); 

// app.post('/upload', upload.single('photo'), (req, res) => {
//   if (!req.file) {
//       return res.status(400).send('No files were uploaded.');
//   }
// // Access the uploaded file via req.file
//   const fileName = req.file.filename;

//   // do something with the uploaded image (ie. process it)
//   res.send('Image uploaded successfully.');
// });

// app.listen(3001, () => {
//   console.log('Server is running on port 3001');
// });


// // defining sequelize models and esbalishing connection

// const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

// const Inquiry = sequelize.define('Inquiry', {
//     adId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     message: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// });

// // define association between models
// const Item = sequelize.define('Item', {
//   sellerId: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//   },
//   sellerEmail: {
//       type: DataTypes.STRING,
//       allowNull: false
//   }
// });

// // generating an ad ID
// const { v4: uuid } = require('uuid');

// /// import ad model
// const Advertisement = require('./models/advertisement'); 

// //create a new ad with a random ad ID
// const createAdvertisement = async () => {
//     try {
//       // generate a UUID for the ad ID
//         const adId = uuid(); 
//         const newAdvertisement = await Advertisement.create({ adId,});
//         console.log('Your ad has been created', newAdvertisement);
//     } catch (error) {
//         console.error('Error creating your ad:', error);
//     }
// };

// // call the function to create a new ad
// createAdvertisement();


// // pulling email from ad ID 

// app.post('/inquiry', async (req, res) => {
//   const { adId, message } = req.body;

//   try {
//       // fetch ad details (ie. the seller's email)
//       const ad = await Ad.findOne({ where: { id: adId } });
//       if (!ad) {
//           return res.status(404).send('Ad not found.');
//       }

//       // send an email to the seller
//       console.log(`Sending inquiry email to ${ad.sellerEmail} regarding ad ${adId}: ${message}`);

//       // save the inquiry to the database 
//       await Inquiry.create({ adId, message });

//       res.status(200).send('Inquiry has been sent!');
//   } catch (error) {
//       console.error('Error sending inquiry:', error);
//       res.status(500).send('An error occurred while sending your inquiry.');
//   }
// });

// >>>>>>> kelsey-branch
