const router = require("express").Router();
const sequelize = require("../config/connection");
const { Admin, Contact } = require("../models");

router.get("/", (req, res) => {
    res.render("homepage");
});

router.get("/admin/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/api/contact");
        return;
    }

    res.render("login");
});

router.get("/api/contact", (req, res) => {
    Contact.findAll({
        attributes: [
            "id",
            "name",
            "email",
            "phone",
            "preferred",
            "request_text"
        ]
    })
    .then(dbContactData => {
        console.log(dbContactData[0]);
        res.render("contact", dbContactData[0].get({ plain: true }));
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;