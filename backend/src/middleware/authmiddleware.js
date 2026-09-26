import { readAccessToken } from "../utils/auth.js";

export function authenticate(req, res, next) {
  try {
    //auhtnticate access header c token niklna
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res.status(400).json({
        status: false,
        message: "AccessToken is not found in the request",
      });
    }
    //Access Token verify karna
    const decoded = readAccessToken(accessToken);

    //  User data request mein attach karna
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth Error:", error);

    return res.status(401).json({
      status: false,
      message: "Invalid or expired access token",
    });
  }
}
