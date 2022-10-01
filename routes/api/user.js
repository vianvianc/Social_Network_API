const router = require("express").Router();
const userRoute = require("./user");
const thoughtRoute = require("./thought");

router.use("/user", userRoute);
router.use("/thought", thoughtRoute);

module.exports = router;