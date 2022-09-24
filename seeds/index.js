const sequelize = require('../config/connection');
const seedPosts = require('./posts');
const seedUsers = require('./users');
const seedComments = require('./comments');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedPosts();

  await seedUsers();

  await seedComments();

  process.exit(0);
};

seedAll();