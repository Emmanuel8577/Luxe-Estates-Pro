import User from "../models/User.js";
import jwt from "jsonwebtoken";

/**
 * PROTECT: Validates the JWT and attaches the user to the request object.
 */
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode the token to get the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB, excluding password but INCLUDING role
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      return next();
    } catch (err) {
      console.error("Token verification failed: ", err.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

/**
 * ADMIN ONLY: Ensures the authenticated user has the 'admin' role.
 * This MUST be placed after the 'protect' middleware in your routes.
 */
export const adminOnly = (req, res, next) => {
    // req.user is populated by the protect middleware
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Access denied. High-level clearance required (Admins only)." });
    }
};