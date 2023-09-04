import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from "crypto";

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User | undefined {
        return this.users.find(user => user.email === email)
    }
    deleteUser(user:User):void{
        const index= this.users.indexOf(user)    
        this.users.splice(index, 1)
    }
    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        user.id = crypto.randomUUID()
        this.users.push(user)
    }
    registerBike(bike:Bike): void{
        bike.id= crypto.randomUUID()
        this.bikes.push(bike)

        }
    doRent (rents: Rent[],bikeid:string, userid:string, bikes: Bike[], users: User[], startDate:Date, endDate:Date): void {
        const tuser=this.users.find(user => user.id === userid)
        const tbike=this.bikes.find(bike => bike.id === bikeid)
       const rBike: typeof  rents=rents.filter(Rent => Rent.bike === tbike)
       let ren: any;
       if(tbike!=undefined && tuser!=undefined ){
        if( ren=Rent.create(rBike,tbike,tuser, startDate, endDate)){
            rents[rents.length]=ren;
        }
       }
    else{throw new Error('The user id or bike id does not exist')}
    }
    returnBike (rents:Rent[], bike:Bike, user:User,userid:string, bikeid:string, startDate:Date, endDate:Date):void{
        
        const tuser=this.users.find(user => user.id === userid)
        const tbike=this.bikes.find(bike => bike.id === bikeid)
       const rBike: typeof  rents=rents.filter(Rent => Rent.bike === tbike)
       let  n= rBike.length;
       for(var i=0; i<=n; i++){
        if (rBike[i].user.id==userid){
            if(rBike[i].dateFrom==startDate && rBike[i].dateTo==endDate && rBike[i].dateReturned==null){
            rBike[i].dateReturned== new Date
            return
            }
            else if(rBike[i].dateFrom==startDate && rBike[i].dateTo==endDate && rBike[i].dateReturned!=null){
                throw new Error('the Bike was already returned')
                return
            }
        }
       }
    }
}