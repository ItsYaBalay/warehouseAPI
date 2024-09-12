const { route } = require("../share");
const {
  create,
  allProducts,
  skuSearch,
  newLocation,
  allLocations,
  singleLocation,
  newStock,
  updateStockAtLocation,
} = require("../controllers/controllers");

route.post("/products", create);
route.get("/products", allProducts);
route.get("/products/:sku", skuSearch);
route.post("/locations", newLocation);
route.get("/locations", allLocations);
route.get("/locations/:id", singleLocation);
route.post("/locations/:id", newStock);
route.put("/locations/:id", updateStockAtLocation);

module.exports = route;
