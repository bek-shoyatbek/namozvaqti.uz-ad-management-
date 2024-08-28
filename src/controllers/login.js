import config from "../config/index.js";
import jwt from "jsonwebtoken";

export function getLogin(req, res, next) {
  res.render("login");
  return;
}

export function login(req, res, next) {
  try {
    console.log(
      "username: %s and password: %s from req.body\n",
      req.body?.username,
      req.body?.password
    );

    console.log(
      "username: %s && password %s",
      config.adminLogin,
      config.adminPassword
    );
    if (
      req.body.username !== config.adminLogin ||
      req.body.password !== config.adminPassword
    ) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { username: req.body.username, password: req.body.password },
      config.jwtSecret,
      { expiresIn: "30m" }
    );
    req.session.jwt = token;
    res.status(200).send({ message: "success", token });
    return;
  } catch (err) {
    next(err);
  }
}
