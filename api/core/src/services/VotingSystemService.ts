import {VotingSystemInterface} from "../interfaces/votingSystem/VotingSystemInterface";

export const Basic : VotingSystemInterface= {
    id : 1,
    name: "BASIC",
    values: [1, 2, 4, 8, 16],
    coffee: true
}

export const Fibonacci : VotingSystemInterface = {
    id : 2,
    name: "FIBONACCI",
    values: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55],
    coffee: true
}
export const possibleSystems : VotingSystemInterface[] = [Basic,Fibonacci];

export class VotingSystemService {

    async getVotingSystem(id:number) {
        console.log(possibleSystems)
        return possibleSystems.find(sys=> sys.id === id);
    }
}