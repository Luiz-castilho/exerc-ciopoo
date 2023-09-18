
import { Bike } from "./bike";
import { Rent } from "./rent";
import { crypt } from "./crypt";
import { User } from "./user";
import crypto from "crypto";

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []
    crypt: crypt = new crypt()
    findUser(email: string): User | undefined {
        return this.users.find(user => user.email === email)
    }
    deleteUser(email: string):void{
        const index= this.users.findIndex(user => user.email === email)    
        if(index !== -1){
        this.users.splice(index, 1)
    return
    }
    throw new Error ('User does not exist')
    }
    async registerUser(user: User): Promise<string> {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        user.id = crypto.randomUUID()
        const encrypassword= await this.crypt.encrypt(user.password)
        user.password= encrypassword
        
        this.users.push(user)
        return user.id
    }
    async authenticare(email:string, password: string): Promise<boolean>{
        const user= this.findUser(email)
        if(!user) throw new Error("User not found")
        return await this.crypt.compare(password,user.password)
    }
    registerBike(bike:Bike): string{
        bike.id= crypto.randomUUID()
        this.bikes.push(bike)
        return bike.id
        }
    doRent (bikeid:string, email:string): void {
        
        const tbike=this.bikes.find(bike => bike.id === bikeid )
        if(!tbike){
            throw new Error('Bike not found')
        }
        if(!tbike.available){
            throw new Error ("Unavailable bike")
        }
        const tuser=this.findUser(email)
        if(!tuser){
            throw new Error('User not found')
        }
        tbike.available=false
       
       
       const newRent= new Rent(tbike,tuser, new Date())
        this.rents.push(newRent)
       }
    
    returnBike (rents:Rent[], bike:Bike, user:User,useremail:string, bikeid:string, startDate:Date, endDate:Date):number{
        const now= new Date()
        const rent= this.rents.find(rent => rent.bike.id === bikeid && rent.user.email === useremail && !rent.dateEnd)
        if(!rent) throw new Error('Rent not found')
        rent.dateEnd=now
        rent.bike.available= true
        const temp= delTemp(rent.dateEnd, rent.dateFrom)
        return temp* rent.bike.rate
       
    }

    userList (): User[]{
        return this.users;
        }
    
    bikeList(): Bike[]{
        return this.bikes;
        }
    
    rentList(): Rent[]{
        return this.rents;
    }

    getLocation(bike: Bike): void{
    if(!navigator.geolocation)
    return
    navigator.geolocation.getCurrentPosition((pos)=>{
        bike.lat=  pos.coords.latitude
        bike.lon=  pos.coords.longitude
    })
    }
}
    
   function delTemp(temp1: Date, temp2: Date){
    var diff= (temp1.getTime()- temp2.getTime())/3600000
    return Math.abs(diff)
   }
