const User = require('./User');
const Listing = require('./Listing');
const Seller = require('./Seller'); // Added Seller

User.hasMany(Listing, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
});

Listing.belongsTo(User, {
  foreignKey: 'id'
});

module.exports = { User, Listing, Seller }; // Included Seller in exports
