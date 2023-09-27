export class DuplicateuserError extends Error{
    public readonly name = 'DuplicateuserError' 

    constructor(){
        super('Duplicate user')
    }

}