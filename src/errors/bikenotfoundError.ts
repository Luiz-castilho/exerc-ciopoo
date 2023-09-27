export class BikenotfoundError extends Error{
    public readonly name = 'BikenotfoundError' 

    constructor(){
        super('Bike not found')
    }

}