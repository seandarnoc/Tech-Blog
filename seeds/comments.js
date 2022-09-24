const { Comment } = require('../models');

const commentData = [{
        comment_text: "this is a good example of a poorly written comment",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "this is a good example of a poorly written comment",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "this is a good example of a poorly written comment",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;