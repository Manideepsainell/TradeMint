import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const protect = (req, res, next) => {
  let token;

  // ✅ Cookie auth
  if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // ✅ Header fallback
  if (!token && req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Convert string → ObjectId
    req.user = {
      id: new mongoose.Types.ObjectId(decoded.id),
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default protect;
