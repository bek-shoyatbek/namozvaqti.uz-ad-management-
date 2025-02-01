import config from "../config/index.js";
import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = (authHeader && authHeader.split(" ")[1]) || req.query.token;

  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      res.status(401).send("Unauthorized");
      return;
    }

    req.user = user;
    next();
  });
}
