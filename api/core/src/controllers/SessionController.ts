import { Request, Response } from 'express';
import {SessionService} from "../services/SessionService";

const service = new SessionService();
export class SessionController {

    async createSession(req:Request,res:Response){

        const body = req.body;

        const result = await service.createSession(body)

        return res.status(201).json(result);
    }
    async getSessionById(req:Request,res:Response){

        try{
            const sessionId = req.params.sessionId;

            const result = await service.getSessionById(sessionId).catch()

            return res.status(201).json(result);
        }
        catch (error){
            res.status(404).send("Session not found");
        }
    }
}