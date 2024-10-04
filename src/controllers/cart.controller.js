// src/controllers/cart.controller.js
import CartService from "../services/cart.service.js";
class CartController {
  async addProductToCart(req, res) {
    try {
      const { productId } = req.params;
      const { quantity } = req.body;
      await CartService.addProductToCart(req.user._id, productId, quantity);
      res
        .status(200)
        .json({ status: "success", message: "Producto agregado al carrito" });
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  async removeProductFromCart(req, res) {
    try {
      const { productId } = req.params;
      const { quantity } = req.body;
      await CartService.removeProductFromCart(
        req.user._id,
        productId,
        quantity
      );
      res
        .status(200)
        .json({ status: "success", message: "Producto eliminado del carrito" });
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
      res.status(400).json({ status: "error", message: error.message });
    }
  }

  async clearCart(req, res) {
    try {
      await CartService.clearCart(req.user._id);
      res
        .status(200)
        .json({ status: "success", message: "Carrito vaciado correctamente" });
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
      res
        .status(500)
        .json({ status: "error", message: "Error al vaciar el carrito" });
    }
  }

  async getMyCart(req, res) {
    try {
      const cart = await CartService.getOrCreateCartByUserId(req.user._id);
      res.json({ status: "success", cart });
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      res
        .status(500)
        .json({ status: "error", message: "Error al obtener el carrito" });
    }
  }
}

export default new CartController();
