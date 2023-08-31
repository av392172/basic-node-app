const Product = require("../models/product.schema");

const add = async (data) => {
  try {
    await Product.create(data);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(e);
  }
};
const update = async (id, data) => {
  try {
    await Product.update(data, { where: { id: id } });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(e);
  }
};
const remove = async (id) => {
  try {
    await Product.destroy({ where: { id: id } });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(e);
  }
};
const getAll = async () => {
  try {
    const data = await Product.findAll();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(e);
  }
};
const getById = async (id) => {
  try {
    await Product.findOne({ where: { id: id } });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(e);
  }
};

module.exports = { add, update, remove, getAll, getById };
