import {UserInterface} from "../user/UserInterface";

export interface SessionInterface {
    sessionId: string,
    sessionName: string,
    sessionSystem: string;
    userList : UserInterface[]
}