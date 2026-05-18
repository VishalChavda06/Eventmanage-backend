const express = require("express");
const router = express.Router();

const { createEvent, getAllEvents, getEventById } = require("../controllers/event.controller");
const auth = require("../middleware/auth.middleware");
const { isOrganizer } = require("../middleware/role.middleware");

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", auth, isOrganizer, createEvent);

module.exports = router;
