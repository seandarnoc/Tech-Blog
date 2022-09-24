const { User } = require('../models');

const userData = [
    {
        username: 'user1',
        password: 'test.1234'
    },
    {
        username: 'user2',
        password: 'test.1234'
    },
    {
        username:'user3',
        password:'test.1234'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;