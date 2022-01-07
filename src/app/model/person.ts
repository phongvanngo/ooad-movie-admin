export interface Person {
    id:string;
    name:string;
    original_name:string;
    gender:number;
    profile_path:string;
    known_for_department:string;
    place_of_birth:string;
    biography:string;
}

export interface Credits {
    id:string;
    cast:Person[]
}