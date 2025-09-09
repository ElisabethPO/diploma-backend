import Product from "./product.js";
import ProductService from "./productService.js";

class ProductController {
  async createMany(req, res) {
    try {
      const products = await ProductService.createMany(req.body.products);
      res.json(products);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async createOne(req, res) {
    try {
      const products = await ProductService.createOne(req.body, req.files.picture);
      res.json(products);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const products = await ProductService.getAll();
      return res.json(products);
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getOne(req, res) {
    try {
      const product = await ProductService.getOne(req.params.id);
      return res.json(product)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async update(req, res) {
    try {
      const updatedProduct = await ProductService.update(req.body);
      return res.json(updatedProduct);
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async delete(req, res) {
    try {
        const product = await ProductService.delete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.json({ message: "Product deleted successfully", product });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
  }


  async filter(req, res) {
    try {
      const filters = {};

      if (req.query.type) {
        filters.type = { $regex: `^${req.query.type}$`, $options: 'i' };
      }

      if (req.query.subCategory) {
        filters.subCategory = { $regex: `^${req.query.subCategory}$`, $options: 'i' };
      }

      if (req.query.color) {
        filters.color = { $regex: `^${req.query.color}$`, $options: 'i' };
      }

      const products = await Product.find(filters);
      res.json(products);
    } catch (e) {
      console.error('Filter error:', e.message);
      res.status(500).json({ error: e.message });
    }
  }

  async getRandomProducts(req, res) {
    try {
      const products = await ProductService.getRandomProducts();
      res.json(products);
    } catch (error) {
      console.error('Ошибка при получении случайных товаров:', error);
      res.status(500).json({ message: 'Ошибка при загрузке случайных товаров' });
    }
  }

  async updateProduct(req, res) {
    const { name, price, image } = req.body;
    console.log(req.params)
    const { id: productId } = req.params;

    console.log('Aboba', productId)
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, price, image },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
  }
}

export default new ProductController();
