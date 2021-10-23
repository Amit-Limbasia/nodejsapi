const { Router } = require("express");
const controllers = require("../controllers");
const { createUser } = require("../controllers/createuser");
const { dologin } = require("../controllers/login");
const { userdetail } = require("../controllers/userdetail");
const router = Router();
const auth = require("../middleware/auth");

router.get("/", (req, res) => res.send("This is root!"));

// router.put("/users/:id", controllers.updateUser);

router.post("/users", createUser);

router.post("/login", dologin);

router.get("/users", auth, userdetail);

// router.post("/welcome", auth, (req, res) => {
//   res.status(200).send("Welcome 🙌 ");
// });
module.exports = router;
