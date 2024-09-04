const { route } = require("../share");
const {
  create,
  allProducts,
  skuSearch,
  newLocation,
  allLocations,
  newStock,
  updateStockAtLocation,
} = require("../controllers/controllers");

route.post("/products", create);
route.get("/products", allProducts);
route.get("/products/:sku", skuSearch);
route.post("/location", newLocation);
route.get("/location", allLocations);
route.post("/location/:id", newStock);
route.put("/location/:id", updateStockAtLocation);

module.exports = route;
