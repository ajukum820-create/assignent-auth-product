import { Router } from "express";
import {
  loginValidtion,
  registerValidtion,
} from "../validations/auth.validations.js";
import {
  refreshController,
  loginController,
  getmeController,
  regitserController,
  logoutController,
} from "../controllers/auth.controllers.js";
import { authenticate } from "../middleware/authmiddleware.js";

const router = Router();

//==================REGISTER CONTROLLER========================
//==================METHOD POST =============================
router.post("/register", registerValidtion, regitserController);

//=====------------------LOGIN ROUTE-------------------------
router.post("/login", loginValidtion, loginController);

//======================refresh-token======================
router.post("/refresh", refreshController);

//=========================get me route=================
router.get("/me", authenticate, getmeController);

//===========================LOGOUT Route================
router.post("/logout", authenticate, logoutController);

export default router;
