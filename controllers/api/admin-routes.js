const router = require("express").Router();
const { Admin } = require("../../models");

// router.get("/", (req, res) => {
//     Admin.findAll({
//         attributes: { exclude: ["password"] }
//     })
//         .then(dbAdminData => res.json(dbAdminData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// router.get("/:id", (req, res) => {
//     Admin.findOne({
//         attributes: { exclude: ["password"] },
//         where: {
//             id: req.params.id
//         }
//     })
//         .then(dbAdminData => {
//             if (!dbAdminData) {
//                 res.status(404).json({ message: "No Admin found with this id" });
//                 return;
//             }
//             res.json(dbAdminData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

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

router.post("/login", (req, res) => {
    Admin.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbAdminData => {
        if (!dbAdminData) {
            res.status(400).json({ message: "Email Incorrect: Admin not found" });
            return;
        }
        
        const validPassword = dbAdminData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: "Incorrect Password." });
            return;
        }

        req.session.save(() => {
            req.session.admin_id = dbAdminData.id;
            req.session.admin_email = dbAdminData.email;
            req.session.loggedIn = true;

            res.json({ user: dbAdminData, message: "Log in successful." });
        });
    });
});

router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
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