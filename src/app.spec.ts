import sinon from "sinon"
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"
import { BikenotfoundError } from "./errors/bikenotfoundError"
import { DuplicateuserError } from "./errors/duplicateuserError"
import { RentnotfoundError } from "./errors/rentnotfoundError"
import { UserdoesnotexistError } from "./errors/userdoesnotexist"
import { UsernotfoundError } from "./errors/usernotfoundError"
import { BikeunvailableError } from "./errors/bikeunavailableError"
describe('App', () => {
    it('should correctly calculate the rent amount', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers();
        app.rentBike(bike.id, user.email)
        const hour = 1000 * 60 * 60
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike.id, user.email)
        expect(rentAmount).toEqual(200.0)
    })

    it('should be able to move a bike to a specific location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        app.moveBikeTo(bike.id, newYork)
        expect(bike.location.latitude).toEqual(newYork.latitude)
        expect(bike.location.longitude).toEqual(newYork.longitude)
    })

    it('should throw an exception when trying to move an unregistered bike', () => {
        const app= new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        const newYork = new Location(40.753056, -73.983056)    
        expect(app.moveBikeTo(bike.id, newYork)).toThrow(BikenotfoundError)
    })
    it('should throw an exception when trying to register a alredy registered user', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        expect(await app.registerUser(user)).toThrow(DuplicateuserError)
    })
    it('should throw an exception when trying to rent bike already rented', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const user2 = new User('Maria', 'maria@mail.com', '2222')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)
        expect(app.rentBike(bike.id, user2.email)).toThrow(BikeunvailableError)
    })

    it('should throw an exception when trying remove a user who does not exist',  () => {
        const app = new App()
       
        expect(app.removeUser("fake@mail.com")).toThrow(UserdoesnotexistError)
    })
    it('should throw an exception when trying return a rent that does not exist',  () => {
        const app = new App()
       
        expect(app.returnBike("12345","fake@mail" )).toThrow(RentnotfoundError)
    })
    it('should throw an exception when trying return a rent that does not exist',  () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
            app.registerBike(bike)
        expect(app.rentBike("1234","fake@mail" )).toThrow(UsernotfoundError)
    })
})