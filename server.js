const path = require('path');
const session = require('express-session');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require("dotenv").config;

const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 2000000,
        sameSite: true
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);


sequelize.sync({ force: false }).then(() => {
    app.listen (PORT, () => console.log(`Now listening on localhost port: ${PORT}`));
})