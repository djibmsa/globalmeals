const express = require("express");

const router = express.Router();

const { browse, add, edit, read } = require(`../../../controllers/menuAction`);

router.get("/", browse);
router.get("/read", read);

router.post("/", add);

router.patch("/", edit);

module.exports = router;
