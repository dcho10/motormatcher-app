const User = require('./User');
const Listing = require('./Listing');

User.hasMany(Listing, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
});

Listing.belongsTo(User, {
  foreignKey: 'id'
});

module.exports = { User, Listing };
