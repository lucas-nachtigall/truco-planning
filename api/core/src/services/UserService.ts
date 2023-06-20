import {UserCreationRequest} from "../dtos/user/UserCreationRequest";
import {UserInterface} from "../interfaces/user/UserInterface"
import {v4 as uuidv4} from 'uuid';
import {sessionList} from "./SessionService";

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
        }

        return newUser
    }
}