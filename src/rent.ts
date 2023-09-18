import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
     constructor(
        public bike: Bike,
        public user: User,
        public dateFrom: Date,
        public dateEnd?: Date,
    ) {}

    
}