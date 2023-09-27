export class UserdoesnotexistError extends Error{
    public readonly name = 'UserdoesnotexistError' 

    constructor(){
        super('User does not exist')
    }

}