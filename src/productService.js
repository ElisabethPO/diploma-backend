import ProductModel from "./product.js";
import fileService from "./fileService.js";
import mongoose from 'mongoose';

class ProductService {
  async createMany(products) {
    const createdProducts = [];
    for (const product of products) {
      console.log('Received picture:', product.picture);
      const fileName = product.picture ? fileService.saveFile(product.picture) : null;
      console.log('Saved file name:', fileName);
      const createdProduct = await ProductModel.create({ ...product, picture: fileName });
      createdProducts.push(createdProduct);
    }
    return createdProducts;
  }

  async createOne(product, picture) {
    const base64Picture = fileService.fileToBase64(picture.data)
    const productData = {
      ...product,
      rating: Number(product) || 0,
      picture: base64Picture
    }
    const createdProduct = await ProductModel.create(productData);
    return createdProduct
  }

  async getAll() {
    const products = await ProductModel.find();
    return products;
  }

  async getOne(id) {
    if (!id) {
      throw new Error('Id not specified');
    }
    const product = await ProductModel.findById(id);
    return product;
  }

  async update(product) {
    if (!product._id) {
      throw new Error('Id not specified');
    }
    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { new: true });
    return updatedProduct;
  }

  async delete(id) {
    if (!id) {
      throw new Error('Id not specified');
    }
    const product = await ProductModel.findByIdAndDelete(id);
    return product;
  }

  async filter(query) {
    const filters = {};

    if (query.type) {
      filters.type = query.type;
    }

    if (query.subCategory) {
      const subCategories = query.subCategory.split(",");
      filters.subCategory = { $in: subCategories };
    }

    if (req.query.color) {
      const colors = req.query.color.split(',');
      filters.color = { $in: colors };
    }

    if (query.rating) {
      filters.rating = { $gte: Number(query.rating) };
    }

    try {
      const products = await ProductModel.find(filters);
      return products;
    } catch (error) {
      throw new Error(`Ошибка фильтрации: ${error.message}`);
    }
  }

  async getRandomProducts(limit = 4) {
    try {
      const products = await ProductModel.aggregate([
        { $sample: { size: limit } }
      ]);
      return products;
    } catch (error) {
      console.error('Ошибка при выборке случайных товаров:', error);
      throw new Error('Ошибка при выборке случайных товаров');
    }
  }

  async updateProduct(productId, updatedData) {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            updatedData,
            { new: true }
        );
        return updatedProduct;
    } catch (error) {
        throw new Error('Error updating product: ' + error.message);
    }
  }
}

export default new ProductService();
