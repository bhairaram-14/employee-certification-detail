const router = require('express').Router()

const controller = require("../controller/controller")

router.post("/save", controller.save)
router.post("/login", controller.login)
router.post("/verify", controller.verify)
router.all("*", controller.all)



module.exports = router