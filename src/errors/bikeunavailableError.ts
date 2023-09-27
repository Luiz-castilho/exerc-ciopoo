export class BikeunvailableError extends Error{
    public readonly name = 'BikeunavailableError' 

    constructor(){
        super('Unavailable bike')
    }

}