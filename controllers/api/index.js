const router = require('express').Router();
const userRoutes = require('./userRoutes');
const listingRoutes = require('./listingRoutes');
const sellerRoutes = require('./sellerRoutes'); // Imported sellerRoutes.js

router.use('/users', userRoutes);
router.use('/listing', listingRoutes);
router.use('/sellers', sellerRoutes); // Included sellerRoutes

module.exports = router;
