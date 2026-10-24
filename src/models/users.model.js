import { model, Schema } from "mongoose";
import {
  usersGenderEnumObj,
  usersRolesEnumObj,
} from "../common/enum/user.enum.js";

const usersSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value.length < 3 ? false : true;
        },
        message: function (props) {
          return `${props.value} is not valid`;
        },
      },
    },
    lastName: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value.length < 3 ? false : true;
        },
        message: function (props) {
          return `${props.value} is not valid`;
        },
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,
    DOB: Date,
    changeCredentialTime: Date,
    role: {
      type: Number,
      enum: Object.values(usersRolesEnumObj),
      default: usersRolesEnumObj.USER,
    },
    gender: {
      type: Number,
      enum: Object.values(usersGenderEnumObj),
    },
  },
  { timestamps: true, optimisticConcurrency: true, toJson: { virtuals: true } },
);

usersSchema
  .virtual("username")
  .set(function (value) {
    const [firstName, lastName] = value.split(" ");
    this.set({ firstName, lastName });
  })
  .get(function () {
    retrun`${this.get("firstName")} ${this.get("lastName")}`;
  });

const usersModel = model("users", usersSchema);

export default usersModel;
