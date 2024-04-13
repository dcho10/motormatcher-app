const path = require("path");
const express = require("express");
const mysql2 = require("mysql2");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const multer = require("multer");

const Sequelize = require("./config/connection");
// const SequelizeStore = require("connect-session-sequelize")
// (session.Store);
const DataTypes = require("sequelize")

const app = express();
const PORT = 3000;

const sess = {
    secret: "Super secret secret",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine, handlebars");

app.use((req, res) => {
    res.status(404).end();
});

const upload = multer({ dest: "uploads/"});
app.post("/upload", upload.single("photo"), (req, res) => {
    if(!req.file) {
        return res.status(400).send("No files were uploaded");
    }
    const fileName = req.file.filename;
    res.send("Image uploaded successfully");
})

// const sequelize = new Sequelize("database", "username", "password", {
//     host: "localhost",
//     dialect: "mysql"
// });

const Inquiry = Sequelize.define("Inquiry", {
    adId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Item = Sequelize.define("Item", {
    sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sellerEmail: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const { v4: uuid } = require("uuid");
const Advertisement = require("./models/Listing");

const createAdvertisement = async () => {
    try {
        const adId = uuid();
        const newAdvertisement = await Advertisement.create({ adId });
        console.log("Your ad has been created", newAdvertisement);
    } catch (err) {
        console.error("Error creating your ad:", err);
    }
};

createAdvertisement();

app.post("/inquiry", async (req, res) => {
    const {adId, message } = req.body;
    try {
        const ad = await Ad.findOne({ where: { id: adId } });
        if (!ad) {
            return res.status(404).send("Ad not found.");
        }
        console.log (`Sending inquiry email to ${ad.sellerEmail} regarding ad ${adId}: ${message}`);
        await Inquiry.create({ adId, message });
        res.status(200).send("Inquiry has been sent!");
    } catch (err) {
        console.err("Error sending inquiry:", err);
        res.status(500).send("An error occure while sending your inquiry.");
    }
});

Sequelize.sync({ force: false})
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`)
    })
})
.catch(err => {
    console.error("Error syncing Sequelize:", err);
})