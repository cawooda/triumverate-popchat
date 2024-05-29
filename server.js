require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.port || 3001;
const path = require('path');
const session = require('express-session');

const routes = require('./controller');
// const helpers = require('./utils/helpers');

// set up sequelize and session storage
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// create session options object
const sess = {
	secret: process.env.SESSION_SECRET,
	cookie: {
		// maxAge: 1000 * 60 * 60
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
}

// use session middleware with the sess options object
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(PORT, () => {
	console.log(`PopChat server listening in on http://localhost:${PORT}`);
});
