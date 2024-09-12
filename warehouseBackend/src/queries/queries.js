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
  return await prisma.products.findMany({
    include: {
      stock: true,
    }
  });
};

const getProductBySku = async (sku) => {
  return await prisma.products.findUnique({
    where: {
      sku,
    },
    include: {
      stock: true,
    }
  });
};

const createLocation = async ({ id, aisle, side, top, position }) => {
  const createLocation = await prisma.location.create({
    data: {
      id,
      aisle,
      side,
      top,
      position,
    },
  });
  return createLocation;
};

const getAllLocations = async () => {
  return await prisma.location.findMany({
    include: {
      stock: true,
    }
  });
};

const getLocation = async (id) => {
  return await prisma.location.findUnique({
    where: {
      id,
    },
    include: {
      stock: true,
    }
  });
};

const createStock = async (
  locationId,
  { productId, masterAmount, innerAmount, unitAmount }
) => {
  const makeStock = await prisma.stock.create({
    data: {
      locationId,
      productId,
      masterAmount,
      innerAmount,
      unitAmount,
    },
  });
  return makeStock;
};

const updateLocationStock = async (
  locationId,
  { productId, master, inner, unit }
) => {
  return await prisma.stock.update({
    where: {
      locationId,
    },
    data: {
      productId,
      master,
      inner,
      unit,
    },
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductBySku,
  createLocation,
  getAllLocations,
  getLocation,
  createStock,
  updateLocationStock,
};
