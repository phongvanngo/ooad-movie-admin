export interface Plan {
    id: string;
    title:string;
    price:number;
    descriptions:Array<Descriptions> | string;
}

export type Descriptions = {
    entry: string;
    content: string;
}