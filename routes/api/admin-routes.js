const router = require("express").Router();
const { Admin } = require("../../models");

router.get("/", (req, res) => {
    Admin.findAll({
        attributes: { exclude: ["password"] }
    })
        .then(dbAdminData => res.json(dbAdminData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/:id", (req, res) => {
    Admin.findOne({
        attributes: { exclude: ["password"] },
        where: {
            id: req.params.id
        }
    })
        .then(dbAdminData => {
            if (!dbAdminData) {
                res.status(404).json({ message: "No Admin found with this id" });
                return;
            }
            res.json(dbAdminData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/", (req, res) => {
    Admin.create({
        id: req.body.id,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbAdminData => res.json(dbAdminData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete("/:id", (req, res) => {
    Admin.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbAdminData => {
            if (!dbAdminData) {
                res.status(404).json({ message: "No Admin found with this id" });
                return;
            }
            res.json(dbAdminData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;