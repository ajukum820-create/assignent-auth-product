import userModel from "../models/auth.models.js";
import bcrypt from "bcryptjs";
import {
  createAccessToken,
  createRefreshToken,
  readRefreshToken,
} from "../utils/auth.js";
//----------------------------REGISTER CONTROLLER=======================

const regitserController = async (req, res) => {
  try {
    //=============READ DATA FROM REQUEST BODY====

    const { name, email, password, confirmPassword } = req.body;

    //===========check password is matching or not
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "Password and confirm password do not match",
        errors: [
          {
            path: "confirmPassword",
            message: "Password and confirm password do not match",
          },
        ],
      });
    }
    //================CHECK IF USER ALREADY EXITS===============

    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(409).json({
        status: false,
        message: "User already exists",
        errors: [
          {
            path: "email",
            message: "User already exists",
          },
        ],
      });
    }

    //===================USER CREATE KARNA ============= AND PASSWORD KO BCRYPT KARNA

    const user = await userModel.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10),
    });
    //=====================ACCESS TOKEN AND REFRESH TOKEN CREATE KARNA=====================

    const accessToken = createAccessToken({
      userId: user._id,
    });

    //==============REFRESH-TOKEN-CREATE====================
    const refreshToken = createRefreshToken({
      userId: user._id,
    });

    //============== SAVE REFRESH TOKE in DB============
    user.refreshToken = refreshToken;
    await user.save();

    //==============SAVE REFRESH TOKEN IN COOKIES=========
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    // ====================RESPONSE==============
    res.status(201).json({
      status: true,
      message: "User created successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
      accessToken,
    });
  } catch (error) {
    console.log("Error in Register", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//==============================LOGIN CONTROLLER=======================

const loginController = async (req, res) => {
  try {
    //==================READ DATA FROM BODY=========================
    const { email, password } = req.body;

    //===================FIND USER IN DATABASE======================
    const user = await userModel.findOne({ email });

    //===================CHECK IF USER EXISTS nhi karta==============
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid email and password",
      });
    }
    //=================COMPARE PASSWORD=============================
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        message: "Invalid email and password",
      });
    }
    //==========================CREATE ACCESS TOKEN AND REFRESH TOKEN=================
    const accessToken = createAccessToken({ userId: user._id });

    const refreshToken = createRefreshToken({ userId: user._id });

    //=========================SAVE REFRESH TOEKN IN DB==============================
    user.refreshToken = refreshToken;
    await user.save();
    //==============================save refresh Token in cookie==================
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    //=================SEND RESPONSE=============
    return res.status(200).json({
      status: true,
      message: "User login successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",

      error: error.message,
    });
  }
};

//====================================REFRESH-TOKEN==========================

const refreshController = async (req, res) => {
  try {
    // ================= GET REFRESH TOKEN FROM COOKIE =================

    const refreshToken = req.cookies.refreshToken;

    // ================= CHECK REFRESH TOKEN =================

    if (!refreshToken) {
      return res.status(401).json({
        status: false,
        message: "Refresh Token is required",
      });
    }

    // ================= VERIFY AND DECODE REFRESH TOKEN =================

    const decoded = readRefreshToken(refreshToken);

    // ================= GET USER ID FROM TOKEN =================

    const { userId } = decoded;

    // ================= FIND USER IN DATABASE =================

    const user = await userModel.findById(userId);

    // ================= CHECK USER EXISTS =================

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    }

    // ================= REFRESH TOKEN MISMATCH CHECK =================

    if (refreshToken !== user.refreshToken) {
      await userModel.findByIdAndUpdate(user._id, {
        refreshToken: null,
      });

      return res.status(401).json({
        status: false,
        message: "Refresh Token mismatch",
      });
    }

    // ================= CREATE NEW ACCESS TOKEN =================

    const accessToken = createAccessToken({
      userId: user._id,
    });

    // ================= CREATE NEW REFRESH TOKEN =================

    const newRefreshToken = createRefreshToken({
      userId: user._id,
    });

    // ================= SAVE NEW REFRESH TOKEN IN DATABASE =================

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });

    // ================= SAVE NEW REFRESH TOKEN IN COOKIE =================

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
    });

    // ================= SEND RESPONSE =================

    return res.status(200).json({
      status: true,
      message: "Token rotated successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.log("Error in Refresh Token:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//=================================GET ME======================================
const getmeController = async (req, res) => {
  try {
    // ================= GET USER ID FROM AUTHENTICATED USER =================
    const { userId } = req.user;

    // ================= FIND USER IN DATABASE =================
    const user = await userModel.findById(userId);

    // ================= CHECK USER EXISTS =================
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // ================= SEND USER DATA =================
    return res.status(200).json({
      status: true,
      message: "User data fetched successfully",
      data: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to get user data",
      error: error.message,
    });
  }
};

//================================LOGOUT CONTROLLER=============================

const logoutController = async (req, res) => {
  try {
    //===================GET USER ID==============================
    const { userId } = req.user;
    //--------------------REMOVE REFRESH TOKEN FROM DB================
    await userModel.findByIdAndUpdate(userId, {
      refreshToken: null,
    });
    // ================= CLEAR REFRESH TOKEN COOKIE =================
    res.clearCookie("refreshToken");

    //response
    return res.status(200).json({
      status: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log("Error in Logout:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
export {
  regitserController,
  loginController,
  refreshController,
  getmeController,
  logoutController,
};
