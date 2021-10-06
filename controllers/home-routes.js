const router = require("express").Router();

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
    console.log(req.session);
    res.render("contact");
});

module.exports = router;