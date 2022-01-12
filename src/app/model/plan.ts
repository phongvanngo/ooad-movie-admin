export interface Plan {
    id: string;
    title:string;
    price:number;
    description:Array<Descriptions> | string;
    duration:number;
}

export type Descriptions = {
    entry: string;
    content: string;
}