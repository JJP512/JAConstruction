const router = require("express").Router();
const sequelize = require("../config/connection");
const { Admin, Contact } = require("../models");

router.get("/", (req, res) => {
    res.render("homepage");
});

router.get("/about-us", (req, res) => {
    res.render("about");
});

router.get("/team", (req, res) => {
    res.render("team");
});

router.get("/contact-request", (req, res) => {
    res.render("contact-request");
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
        const contacts = dbContactData.map(contact => contact.get({ plain: true }));
        console.log(contacts);
        if (!req.session.loggedIn) {
            res.redirect("/admin/login");
            return;
        }
        res.render("contact", { contacts });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;