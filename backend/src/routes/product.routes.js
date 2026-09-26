import { Router } from "express";
import {
  createProductValidation,
  updateProductValidation,
} from "../validations/product.validation.js";
import { authenticate } from "../middleware/authmiddleware.js";
import {
  updateProductController,
  createProductController,
  getAllProductController,
  getProductbyIdController,
  deleteProudctController,
} from "../controllers/product.controllers.js";
const router = Router();

//create a new Product route
router.post(
  "/",
  authenticate,
  createProductValidation,
  createProductController,
);

//get all products routes
router.get("/", getAllProductController);

//get product by id route
router.get("/:id", getProductbyIdController);

//update product controller
router.put(
  "/:id",
  authenticate,
  updateProductValidation,
  updateProductController,
);

//delete router
router.delete("/:id", authenticate, deleteProudctController);
export default router;
