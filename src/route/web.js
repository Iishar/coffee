import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
let router = express.Router();

let initWebRouters = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);

  //Create
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);

  //Read
  router.get("/get-crud", homeController.displayGetCRUD);

  //Update
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);

  //Delete
  router.get("/delete-crud", homeController.deleteCRUD);

  //API

  return app.use("/", router);
};

module.exports = initWebRouters;
0;
