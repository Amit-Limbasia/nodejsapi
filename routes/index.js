const { Router } = require("express");
//const controllers = require("../controllers");
const beforelogin = require("../controllers/beforelogin");
const users = require("../controllers/users");
const router = Router();
const auth = require("../middleware/auth");
const Validator = require("../middleware/validator");

// Routes
router.get("/", (req, res) => res.send("This is root!"));

router.post("/usercreate", Validator("createuser"), beforelogin.createUser);

router.post("/login", validator("login"), beforelogin.dologin);

router.get("/userdetail", auth, users.userdetail);

router.post(
  "/userupdate",
  auth,
  Validator("updateuser"),
  users.updateuserdetails
);

// router.put("/users/:id", controllers.updateUser);

// router.post("/welcome", auth, (req, res) => {
//   res.status(200).send("Welcome 🙌 ");
// });

module.exports = router;
