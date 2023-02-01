const express = require("express");
const router = express.Router();
const { CreateGoal, DeleteGoal, GetUserGoals, UpdateGoal } = require("../Controllers/GoalController");

router.get("/", GetUserGoals);
router.post("/", CreateGoal);
router.put("/", UpdateGoal);
router.delete("/", DeleteGoal);

module.exports = router;
