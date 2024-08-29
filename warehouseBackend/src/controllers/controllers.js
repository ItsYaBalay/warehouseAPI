const {
    createProduct,
    getAllProducts,
    getProductBySku
} = require("../queries/queries");

const create = async (req, res) => {
    const response = await createProduct(req.body);
    res.send({ response });
}

const allProducts = async (req,res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    }catch(error) {
        res.status(500).send("getAllProducts Error")
    }
}

const skuSearch = async (req,res) => {
    try {
        const product = await getProductBySku(req.params.sku);
        if (!product) {
          return res.status(404).send("product not found");
        }
        res.status(200).json(product);
      } catch (error) {
        res.status(500).send("sku search product error");
      }
}

module.exports = {
    create,
    allProducts,
    skuSearch
}