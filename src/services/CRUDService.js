const { reject, has } = require("lodash");
const { resolve } = require("path");
import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.Users.create({
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender === "1" ? true : false,
        email: data.email,
        password: hashPasswordFromBcrypt,
        address: data.address,
        phone: data.phonenumber,
        isAdmin: data.role === "1" ? true : false,
      });
      resolve("ok create a new user succeed");
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.Users.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;

        await user.save();
        let allUsers = await db.Users.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (e) {
      console.log(e);
    }
  });
};

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
        let allUsers = await db.Users.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
