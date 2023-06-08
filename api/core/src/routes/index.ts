import {Router} from "express";
import {userRoute} from "./user.route";
import {sessionRoute} from "./session.route";

const routes = Router();

routes.use("/session", sessionRoute);
routes.use("/user", userRoute);

export {routes}