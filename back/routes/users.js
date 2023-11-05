const express = require("express");
const router = express.Router();
const { generateTokenAndSetCookie } = require("../middleware/cookies");

const {
  getUser,
  createUser,
  login,
  getAllUsers,
  getMyInfo,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const auth = require("../middleware/auth");

router
  .route("/")
  .get(auth, getAllUsers)
  .post(createUser, generateTokenAndSetCookie);
router.route("/myinfo").get(auth, getMyInfo);
// router.route("/myinfo/updatepassword").patch(auth, updateUserPassword);
router
  .route("/:id")
  .get(auth, getUser)
  .patch(auth, updateUser)
  .delete(auth, deleteUser);
// .patch().delete()
router.route("/login").post(login, generateTokenAndSetCookie);

module.exports = router;
