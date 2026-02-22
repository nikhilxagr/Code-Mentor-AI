import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing"
      });
    }

    try {
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({
          success: false,
          message: "JWT secret is not configured"
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = decoded;
      
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Auth middleware error",
      error: error.message
    });
  }
};
