//src/services/product.service.js
import ProductDAO from "../dao/product.dao.js";
import { CreateProductDTO, UpdateProductDTO } from "../dto/product.dto.js";

class ProductService {
  async getAllProductsPaginated(page) {
    const options = {
      page: parseInt(page, 10),
      limit: 10,
    };
    return await ProductDAO.getAllProductsPaginated(options);
  }

  async getProductById(id) {
    const product = await ProductDAO.getProductById(id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  async createProduct(productData) {
    const createProductDTO = new CreateProductDTO(productData);

    if (createProductDTO.price < 0) {
      throw new Error("El precio no puede ser negativo");
    }

    const existingProduct = await ProductDAO.getProductByCode(createProductDTO.code);
    if (existingProduct) {
      throw new Error("El código de producto ya existe");
    }

    return await ProductDAO.createProduct(createProductDTO);
  }

  async updateProduct(id, productData) {
    const updateProductDTO = new UpdateProductDTO(productData);

    const existingProduct = await ProductDAO.getProductById(id);
    if (!existingProduct) {
      throw new Error("Producto no encontrado");
    }

    if (updateProductDTO.price && updateProductDTO.price < 0) {
      throw new Error("El precio no puede ser negativo");
    }

    return await ProductDAO.updateProduct(id, updateProductDTO);
  }

  async deleteProduct(id) {
    const existingProduct = await ProductDAO.getProductById(id);
    if (!existingProduct) {
      throw new Error("Producto no encontrado");
    }

    return await ProductDAO.deleteProduct(id);
  }
}

export default new ProductService();
