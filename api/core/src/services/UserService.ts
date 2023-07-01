import {UserCreationRequest} from "../dtos/user/UserCreationRequest";
import {UserInterface} from "../interfaces/user/UserInterface"
import {v4 as uuidv4} from 'uuid';
import {sessionList} from "./SessionService";
import {pusher} from "../server";
import {UserVoteRequest} from "../dtos/user/UserVoteRequest";
import {UserRemoveRequest} from "../dtos/user/UserRemoveRequest";

export class UserService {

    async createUser(req: UserCreationRequest): Promise<UserInterface> {
        console.log("-----------------------CREATE-USER----------------------")

        const newUser: UserInterface = {
            userId: uuidv4(),
            userName: req.name,
            vote: "",
            spectator: req.spectator,
            roomId: req.sessionId,
        }

        const found = sessionList.find((obj) => {
            return obj.sessionId === req.sessionId;
        });

        console.log(req)
        if (found) {
            found.userList.push(newUser);
            console.log("User Found", found.userList)
            await pusher.trigger('session_' + req.sessionId, 'user_created', found.userList);
        }

        return newUser
    }
    async removeUser(req: UserRemoveRequest) {
        console.log("-----------------------REMOVE-USER----------------------")

        const sessionFound = sessionList.find((obj) => {
            return obj.sessionId === req.sessionId;
        });

        if (sessionFound) {
            const userFound = sessionFound.userList.find((obj)=> {
                return obj.userId === req.userId;
            });

            if(userFound){
                console.log("User Found", userFound)
                sessionFound.userList = sessionFound.userList.filter(user=> user.userId !== userFound.userId);

                await pusher.trigger('session_' + req.sessionId, 'user_created', sessionFound.userList);

                console.log("User list final", sessionFound.userList)
            }
        }

    }

    async userVoted(req : UserVoteRequest){
        console.log("------------------------VOTE------------------------")
        const sessionFound = sessionList.find((obj) => {
            return obj.sessionId === req.sessionId;
        });

        if(sessionFound){
            console.log("Session Found", sessionFound)
            const userFound = sessionFound.userList.find((obj)=> {
                return obj.userId === req.userId;
            });

            if(userFound){
                console.log("User Found", userFound)
                userFound.vote = req.vote;
                await pusher.trigger('session_' + req.sessionId, 'user_created', sessionFound.userList);

                console.log("User list final", sessionFound.userList)
            }
        }
    }
}