//src/dto/cart.dto.js
export class AddProductToCartDTO {
  constructor({ productId, quantity }) {
    this.productId = productId;
    this.quantity = Number(quantity);

    if (isNaN(this.quantity) || this.quantity <= 0) {
      throw new Error("La cantidad debe ser un número válido mayor a cero");
    }
  }
}


export class PurchaseCartDTO {
  constructor({ cartId }) {
    this.cartId = cartId;
  }
}

  