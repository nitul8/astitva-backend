const express = require("express");
const router = express.Router();

const {
    getAllUser,
    createNewUser,
    getTheUserById,
    deleteTheUserById,
} = require("../controllers/user");

router.get("/favicon.ico", (req, res) => res.status(204).end());

router.route("/").get(getAllUser).post(createNewUser);

router.route("/:id").get(getTheUserById).delete(deleteTheUserById);

module.exports = router;
