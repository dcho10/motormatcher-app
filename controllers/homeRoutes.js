const router = require("express").Router();
const { Listing, User } = require("../models");
const withAuth = require("../utils/auth");

// router.get("/", async (req, res) => {
//     try {
//         const listingData = await Listing.findAll({
//             include: [
//                 {
//                     model: User,
//                     attributes: ["username"],
//                 },
//             ],
//         });

//         const listings = listingData.map((listing) => listing.get({ plain: true }));

//         res.render("./layouts/main", {
//             listings,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get("/listings/:id", async (req, res) => {
    try {
        const listingData = await Listing.findByPk(req.params.id, {

        });

        const listing = listingData.get({ plain: true });

        res.render("listing", {
            ...listing,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.get("/profile", withAuth, async (req, res) => {
//     try {
//         const userData = await User.findByPk(req.session.user_id, {
//             attributes: { exclude: ["password"] },
//             include: [{ model: Listing }],
//         });

//         const user = userData.get({ plain: true });

//         res.render("profile", {
//             ...user,
//             logged_in: true
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get("/", (req, res) => {
    res.render("homepage");
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/buy", (req, res) => {
    res.render ("buy")
})

router.get("/sell", (req, res) => {
    res.render ("sell")
})

router.get("/reset", (req, res) => {
    res.render ("reset")
})

router.get("/signup", (req, res) => {
    res.render ("signup")
})

router.get("/listing", (req, res) => {
    res.render ("listing")
})

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }

    res.render("login");
});

module.exports = router;