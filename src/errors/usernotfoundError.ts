export class UsernotfoundError extends Error{
    public readonly name = 'UsernotfoundError' 

    constructor(){
        super('User not found')
    }

}