const User = require('./User');
const Listing = require('./Listing');
// const Seller = require('./Seller'); // Added Seller

User.hasMany(Listing, {
  foreignKey: 'user_id', // Specified the foreign key
  onDelete: 'CASCADE'
});

Listing.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Listing }; // Excluded Seller in exports
