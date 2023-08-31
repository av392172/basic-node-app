const { connect, close } = require("../config/db");
const Employee = require("../models/employee.schema");
const schema = require("../validators/employee.schema");

const add = async (emp) => {
  try {
    await connect();
    const { value, error } = schema.validate(emp);
    if (error) throw error;

    const model = new Employee(value);
    const data = await model.save();
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  } finally {
    close();
  }
};
const update = async (id, data) => {
  try {
    await connect();
    await Employee.findOneAndUpdate({ empID: id }, { ...data });
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  } finally {
    close();
  }
};
const getAll = async () => {
  try {
    await connect();
    const data = await Employee.find({});
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  } finally {
    close();
  }
};
const getById = async (id) => {
  try {
    await connect();
    const data = await Employee.find({ empId: id });
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  } finally {
    close();
  }
};
const remove = async (id) => {
  try {
    await connect();
    // const emp = await Employee.find({ empID: id });
    // const allEmp = await Employee.find({});
    // const newList = allEmp.filter((item) => item.empID != emp.empID);
    // console.log("New list", newList);
    // return Promise.resolve(allEmp);
    await Employee.findOneAndDelete({ empID: id });
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  } finally {
    close();
  }
};

module.exports = { add, update, getAll, getById, delete: remove };
