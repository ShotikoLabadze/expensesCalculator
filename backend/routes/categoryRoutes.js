const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");

router.post("/", CategoryController.addCategory);
router.get("/", CategoryController.getCategories);

module.exports = router;
