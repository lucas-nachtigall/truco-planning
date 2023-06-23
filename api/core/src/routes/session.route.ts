import {Router} from "express";
import {SessionController} from "../controllers/SessionController";

const controller = new SessionController();
const sessionRoute = Router();

sessionRoute.post('/', controller.createSession);
sessionRoute.get('/:sessionId', controller.getSessionById);

export {sessionRoute};
