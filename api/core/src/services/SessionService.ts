import {SessionInterface} from "../interfaces/session/SessionInterface"
import {CreateSessionRequest} from "../dtos/session/CreateSessionRequest";
import { v4 as uuidv4 } from 'uuid';
import {VotingSystemService} from "./VotingSystemService";

export const sessionList : SessionInterface[] = [];

const votingSystemService = new VotingSystemService();
export class SessionService {

    async createSession(req : CreateSessionRequest) : Promise<SessionInterface> {
        try{
            const votingSystem = await votingSystemService.getVotingSystem(req.votingSystemId);

            if(votingSystem){
                const newSession : SessionInterface = {
                    sessionId : uuidv4(),
                    sessionName : req.name,
                    sessionSystem : votingSystem,
                    userList : []
                }
                sessionList.push(newSession);

                return newSession;
            }
            else{
                return Promise.reject("Voting System not found")
            }
        }
        catch (error){
            throw error;
        }
    }

    async getSessionById(sessionId : string) : Promise<SessionInterface> {

        const session = sessionList.find(session => session.sessionId === sessionId);

        if(session){
            return session;
        }
        else{
            console.log("Session not found")
            return Promise.reject("Session not found");
        }
    }

}

