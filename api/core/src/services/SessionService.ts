import {SessionInterface} from "../interfaces/session/SessionInterface"
import {CreateSessionRequest} from "../dtos/session/CreateSessionRequest";
import { v4 as uuidv4 } from 'uuid';

export const sessionList : SessionInterface[] = [];
export class SessionService {

    async createSession(req : CreateSessionRequest) : Promise<SessionInterface> {

        const newSession : SessionInterface = {
            sessionId : uuidv4(),
            sessionName : req.name,
            sessionSystem : req.votingSystem,
            userList : []
        }
        sessionList.push(newSession);

        return newSession;
    }

}