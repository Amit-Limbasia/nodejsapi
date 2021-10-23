const { Router } = require("express");
const controllers = require("../controllers");
const beforelogin = require("../controllers/beforelogin");
const { userdetail } = require("../controllers/users");
const router = Router();
const auth = require("../middleware/auth");

router.get("/", (req, res) => res.send("This is root!"));

router.post("/users", beforelogin.createUser);

router.post("/login", beforelogin.dologin);

router.get("/users", auth, userdetail);

// router.put("/users/:id", controllers.updateUser);

// router.post("/welcome", auth, (req, res) => {
//   res.status(200).send("Welcome 🙌 ");
// });

module.exports = router;
