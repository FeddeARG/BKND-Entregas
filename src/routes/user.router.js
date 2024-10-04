//src/routes/user.routes.js
import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/user.controller.js";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserController.getAllUsers
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.getUserById
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.updateUser
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.deleteUser
);
router.put(
  "/:id/password",
  passport.authenticate("jwt", { session: false }),
  UserController.changeUserPassword
);
router.put(
  "/:id/role",
  passport.authenticate("jwt", { session: false }),
  UserController.updateUserRole
);

export default router;
