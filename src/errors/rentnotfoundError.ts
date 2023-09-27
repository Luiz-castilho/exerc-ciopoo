export class RentnotfoundError extends Error{
    public readonly name = 'RentnotfoundError' 

    constructor(){
        super('Rent not found')
    }

}