import { Discount } from "./discount";
import { MovieModel } from "./movie";
import { User } from "./User";

export interface Order {
    id:string;
    user:User;
    discount:Discount;
    movies:Array<MovieModel>;    
    order_time:number;
    total:number;
    is_plan:boolean;

}