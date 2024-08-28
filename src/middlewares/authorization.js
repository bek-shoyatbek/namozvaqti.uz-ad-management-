import config from "../config/index.js";
import jwt from "jsonwebtoken";

// Middleware to authenticate the JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader || req.query.token;

  if (!token) {
    res.render("login");
    return;
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      res.render("login");
      return;
    }

    // Attach the user data to the request object
    req.user = user;
    next();
  });
}

export default authenticateToken;
