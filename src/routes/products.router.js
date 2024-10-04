//src/routes/products.router.js
import { Router } from "express";
import passport from "passport";
import ProductController from "../controllers/product.controller.js";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  ProductController.getAllProducts
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ProductController.getProductById
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ProductController.createProduct
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ProductController.updateProduct
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ProductController.deleteProduct
);

export default router;
