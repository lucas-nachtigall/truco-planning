import {UserCreationRequest} from "../dtos/user/UserCreationRequest";
import {UserInterface} from "../interfaces/user/UserInterface"
import {v4 as uuidv4} from 'uuid';
import {sessionList} from "./SessionService";

export class UserService {

    async createUser(req: UserCreationRequest): Promise<UserInterface> {

        const newUser: UserInterface = {
            userId: uuidv4(),
            userName: req.name
        }

        const found = sessionList.find((obj) => {
            return obj.sessionId === req.sessionId;
        });

        if (found) {
            found.userList.push(newUser);
        }

        return newUser
    }
}