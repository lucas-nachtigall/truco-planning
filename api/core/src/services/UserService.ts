import {UserCreationRequest} from "../dtos/user/UserCreationRequest";
import {UserInterface} from "../interfaces/user/UserInterface"
import {v4 as uuidv4} from 'uuid';
import {sessionList} from "./SessionService";
import {pusher} from "../server";

export class UserService {

    async createUser(req: UserCreationRequest): Promise<UserInterface> {


        const newUser: UserInterface = {
            userId: uuidv4(),
            userName: req.name,
            spectator: req.spectator,
            sessionId: req.sessionId,
        }

        const found = sessionList.find((obj) => {
            return obj.sessionId === req.sessionId;
        });

        console.log(req)
        if (found) {
            found.userList.push(newUser);
            console.log(found.userList)
            await pusher.trigger('session_' + req.sessionId, 'user_created', found.userList);
        }

        return newUser
    }
}