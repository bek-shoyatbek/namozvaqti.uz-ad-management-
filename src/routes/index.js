import express from "express";


import { getLogin, login } from "../controllers/login.js";
import { getHome } from "../controllers/home.js";

const router = express.Router();


// Authorization
router.get("/login", getLogin)
router.post("/login", login)

// Home
router.get("/home", getHome);


export default router