const router = require("express").Router();

const contactRoutes = require("./contact-routes");
const adminRoutes = require("./admin-routes");

router.use("/contact", contactRoutes);
router.use("/admin", adminRoutes);

module.exports = router;