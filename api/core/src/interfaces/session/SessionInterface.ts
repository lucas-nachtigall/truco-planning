import {UserInterface} from "../user/UserInterface";
import {VotingSystemInterface} from "../votingSystem/VotingSystemInterface";

export interface SessionInterface {
    sessionId: string,
    sessionName: string,
    sessionSystem: VotingSystemInterface;
    userList : UserInterface[]
}