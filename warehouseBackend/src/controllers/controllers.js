const {
    createProduct,
  getAllProducts,
  getProductBySku,
  createLocation,
  getAllLocations,
  getLocation,
  createStock,
  updateLocationStock,
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

const newLocation = async (req,res) => {
    try {
        const location = await createLocation(req.body)
        res.status(200).json(location)
    } catch (error) {
        res.status(500).send("create location error")
    }
}

const allLocations = async (req,res) => {
    try {
        const locations = await getAllLocations();
        res.status(200).json(locations);
    }catch(error) {
        res.status(500).send("getAllLocations Error")
    }
}

const singleLocation = async (req,res) => {
    try {
        const location = await getLocation(req.params.id);
        res.status(200).json(location);
    }catch(error) {
        res.status(500).send("singleLocation Error")
    }
}

const newStock = async (req,res) => {
    try {
        const stock = await createStock(req.params.id, req.body)
        res.status(200).json(stock)
    } catch (error) {
        res.status(500).send("create stock error")
    }
}

const updateStockAtLocation = async (req,res) => {
    try {
        const loc = await updateLocationStock(req.params.id, req.body)
        res.status(200).json(loc)
    } catch (error) {
        res.status(500).send("update stock error")
    }
}

module.exports = {
    create,
    allProducts,
    skuSearch,
    newLocation,
    allLocations,
    singleLocation,
    newStock,
    updateStockAtLocation,
}