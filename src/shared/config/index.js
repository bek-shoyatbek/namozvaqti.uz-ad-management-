import "dotenv/config";
import appRootPath from "app-root-path";


export default {
    port: process.env.APP_PORT || 3000,
    mongoUri: process.env.MONGO_URI,
    sessionSecret: process.env.SESSION_SECRET,
    adminLogin: process.env.ADMIN_LOGIN,
    adminPassword: process.env.ADMIN_PASS,
    appRootPath: appRootPath.path,
    jwtSecret: process.env.JWT_SECRET
}