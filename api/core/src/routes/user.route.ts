import {Router} from "express";
import {UserController} from "../controllers/UserController"

const controller = new UserController()
const userRoute = Router();

userRoute.post('/',controller.createUser)
export {userRoute};
