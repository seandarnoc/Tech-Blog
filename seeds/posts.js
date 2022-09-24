const { Post } = require('../models/Index');

const postData = [{
    title: 'my post about MERN',
    content: 'learning MERN stack is fun',
    user_id: 1
},
{
    title: 'my first experience coding',
    content: 'hello world',
    user_id: 2
},
{
    title: 'coding is fun',
    content: 'challenging, but its worth the effort!',
    user_id: 3
}
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;