const { route } = require("../share");
const {
    create,
    allProducts,
    skuSearch
} = require("../controllers/controllers")

route.post("/create", create);
route.get("/", allProducts);
route.get("/:sku", skuSearch);

module.exports = route;