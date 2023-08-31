const { Schema, SchemaTypes, model } = require("mongoose");

const empSchema = new Schema({
  empID: {
    type: SchemaTypes.Number,
    unique: true,
  },
  empName: {
    type: SchemaTypes.String,
    required: true,
  },
  empContact: {
    type: SchemaTypes.Number,
    required: true,
  },
  empDesignation: {
    type: SchemaTypes.String,
    required: true,
  },
  empEmail: {
    type: SchemaTypes.String,
    required: true,
    validate: {
      validator: function (v) {
        const regex =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regex.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
});

module.exports = model("employee", empSchema);
