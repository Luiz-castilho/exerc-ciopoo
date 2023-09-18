import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import sinon from 'sinon'
async function main(){
const bike = new Bike('mountain bike', 'mountain', 
    123, 500, 100.5, 'desc', 5, [])
const user = new User('Maria', 'maria@mail.com', '1234')
const app= new App()
app.registerBike(bike)
app.registerUser(user)
app.doRent(bike.id, user.id)
}