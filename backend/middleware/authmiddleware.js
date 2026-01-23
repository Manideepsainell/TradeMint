import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;

  // ✅ 1) Check cookie first (cookie auth)
  if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // ✅ 2) Fallback to Authorization header (optional)
  if (!token && req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default protect;
