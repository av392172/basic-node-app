const { model, Schema, SchemaTypes } = require("mongoose");

const userSchema = new Schema({
  email: {
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
  password: {
    type: SchemaTypes.String,
    required: true,
  },
  createdAt: {
    type: SchemaTypes.Date,
    default: new Date(),
  },
});

module.exports = model("user", userSchema);
