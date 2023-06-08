import { Request, Response } from 'express';
import {SessionService} from "../services/SessionService";

const service = new SessionService();
export class SessionController {

    async createSession(req:Request,res:Response){

        const body = req.body;

        const result = await service.createSession(body)

        return res.status(201).json(result);
    }
}