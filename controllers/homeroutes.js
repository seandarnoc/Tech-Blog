const router = require('express').Router();
const { Post, User, Comment } = require('../models/Index');


router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            include: {
                model: User,
                attributes: ['username']
            }
        });

        const posts = dbPostData.map((post) =>
            post.get({ plain: true })
        );

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.get('/post/:id', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        try {
            const dbPostData = await Post.findByPk(req.params.id, {
                include: [
                    {
                        model: Comment,
                        attributes: ['comment_id', 'comment_text', 'post_id', 'user_id', 'createdAt'],
                        include: {
                            model: User,
                            attributes: ['username']
                        }
                    },
                    {
                        model: User,
                        attributes: ['user_id', 'username']
                    }
                ],
            })
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found!' });
                return;
            }
            const post = dbPostData.get({ plain: true });
            res.render('single-post', { post, loggedIn: req.session.loggedIn });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
})

module.exports = router;