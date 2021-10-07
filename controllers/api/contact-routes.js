const router = require("express").Router();
const { Contact } = require("../../models");

router.get("/", (req, res) => {
    Contact.findAll({})
        .then(dbContactData => res.json(dbContactData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/", (req, res) => {
    Contact.create({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        preferred: req.body.preferred,
        request_text: req.body.request_text
    })
        .then(dbContactData => res.json(dbContactData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete("/:id", (req, res) => {
    Contact.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbContactData => {
            if (!dbContactData) {
                res.status(404).json({ message: "No contact request found with this id" });
                return;
            }
            res.json(dbContactData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;