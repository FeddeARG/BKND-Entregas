//src/routes/views.router.js
import { Router } from "express";
import passport from "passport";
import ProductDAO from "../dao/product.dao.js";
import CartDAO from "../dao/cart.dao.js";
import { isAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get(
  "/realtimeproducts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Si el rol del usuario es admin, redirige a la vista de admin
      if (req.user && req.user.role === "admin") {
        return res.redirect("/admin/products");
      }

      // Si es un usuario regular, carga los productos y el carrito
      const products = await ProductDAO.getAllProducts();
      const cart = await CartDAO.getOrCreateCartByUserId(req.user._id);

      res.render("realTimeProducts", { products, cart });
    } catch (error) {
      console.error("Error al renderizar realtimeproducts:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);


router.get(
  "/admin/products",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  async (req, res) => {
    try {
      const products = await ProductDAO.getAllProducts();
      res.render("adminCrudProducts", { products });
    } catch (error) {
      console.error("Error al renderizar la vista de admin:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
);

router.get("/auth/login", (req, res) => res.render("login"));
router.get("/auth/register", (req, res) => res.render("register"));

router.get(
  "/auth/current",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.render("current");
  }
);

router.get("/auth/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/auth/login");
});

export default router;
