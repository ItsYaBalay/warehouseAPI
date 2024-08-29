const { bcrypt, prisma, jwt } = require("../share");

const createProduct = async ({ upc, sku, name, perInner, perMaster }) => {
  //const hashPassword = await bcrypt.hash(password, 10);
  const createProduct = await prisma.products.create({
    data: {
      upc,
      sku,
      name,
      perInner,
      perMaster,
    },
  });
  return createProduct;
};

const getAllProducts = async () => {
  return await prisma.products.findMany();
};

const getProductBySku = async (sku) => {
  return await prisma.products.findUnique({
    where: {
      sku,
    },
  });
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductBySku,
}
