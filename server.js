const express = require('express');
const sequelize = require('./config/connections');
const path = require('path');
const routes = require('./controllers');

const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelizeStore = requre('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'password', 
    cookie: {}, 
    resave: false, 
    saveUninittialized: true, 
    store: new sequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: ture }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', 'hbs.engine');
app.set('view engine', 'handlebars');
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Server now listening'));
  });