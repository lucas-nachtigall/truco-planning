import {SessionInterface} from "../interfaces/session/SessionInterface"
import {CreateSessionRequest} from "../dtos/session/CreateSessionRequest";
import {VoteRevealRequest} from "../dtos/session/VoteRevealRequest";
import {ResetRequest} from "../dtos/session/ResetRequest";
import { v4 as uuidv4 } from 'uuid';
import {VotingSystemService} from "./VotingSystemService";
import {pusher} from "../server";
import {SessionDTO} from "../dtos/session/SessionDTO";

export const sessionList : SessionInterface[] = [];

const votingSystemService = new VotingSystemService();
export class SessionService {

    async createSession(req : CreateSessionRequest) : Promise<SessionInterface> {
        console.log("Started: Session Creation Flow")
        console.log("req ->")
        console.log(req)
        try{
            const votingSystem = await votingSystemService.getVotingSystem(req.votingSystemId);

            if(votingSystem){
                console.log("Voting System found")
                const newSession : SessionInterface = {
                    sessionId : uuidv4(),
                    roomName : req.name,
                    sessionSystem : votingSystem,
                    userList : []
                }
                sessionList.push(newSession);
                console.log("Session Created:")
                console.log(newSession)
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

    async voteReveal(req : VoteRevealRequest) {
        //const session = this.getSessionById(req.sessionId);

        await pusher.trigger('presence-session_' + req.sessionId, 'vote_reveal', req.mean);

    }

    async reset(req : ResetRequest) {
        let userList;
        console.log(req.sessionId)
        const session = sessionList.find(session => session.sessionId === req.sessionId);

        console.log(session)
        if(session){
            session.userList.map(user => user.vote = '')
            userList = session.userList;
        }

        await pusher.trigger('presence-session_' + req.sessionId, 'reset', userList);

    }
}

