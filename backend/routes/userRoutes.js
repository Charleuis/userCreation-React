import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

import {
  authAdmin,
  logoutAdmin,
  usersList,
  deleteUser,
  createUser,
  userDetails,
  editUser,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
  import multer from "multer";
  import { fileURLToPath } from 'url';
  import { dirname, join } from 'path';

  // Get the current module's file path
  const __filename = fileURLToPath(import.meta.url);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, join(dirname(__filename), "../../frontend/public/assets"));
    },
    filename: function (req, file, cb) {
      const fileName = Date.now() + "-" + file.originalname;
      cb(null, fileName);
    },
  });

  const upload = multer({
    storage: storage,
  });

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
  router
    .route("/profile")
    .get(protect, getUserProfile)
    .post(protect, upload.single("image"), updateUserProfile);

  //admin side route
router.post("/adminlogin",authAdmin);
router.get("/userslist",protect,usersList);
router.post("/userdetails",protect, userDetails);
router.post("/deleteuser",protect, deleteUser);
router.post("/createuser",protect, createUser);
router.post("/edituser",protect, editUser);
router.post("/adminout",logoutAdmin)

export default router;
