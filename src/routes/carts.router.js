//src/router/carts.router.js
import { Router } from "express";
import passport from "passport";
import CartController from "../controllers/cart.controller.js";

const router = Router();

router.post(
  "/add/:productId",
  passport.authenticate("jwt", { session: false }),
  CartController.addProductToCart
);

router.post(
  "/remove/:productId",
  passport.authenticate("jwt", { session: false }),
  CartController.removeProductFromCart
);

router.post(
  "/clear",
  passport.authenticate("jwt", { session: false }),
  CartController.clearCart
);

router.get(
  "/mycart",
  passport.authenticate("jwt", { session: false }),
  CartController.getMyCart
);

export default router;