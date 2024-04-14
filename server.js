const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const homeRoutes = require("./controllers/homeRoutes"); // Import homeRoutes.js
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
    secret: "Super secret secret",
    cookie: {
        maxAge: 30000,
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize, // Provide the Sequelize instance
        tableName: 'Session' // Specify the session table name if different
    })
};

// Configure express-session middleware
app.use(session(sess));

// Set up handlebars engine and views
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Mount homeRoutes
app.use("/", homeRoutes);

// Sync Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Server listening on port", PORT));
});
