export interface Plan {
    id: string;
    name?:string;
    title:string;
    price:number;
    description:Array<Descriptions> | string;
    expired:number;
}

export type Descriptions = {
    entry: string;
    content: string;
}

export interface PlanStatistical {
    plan_id:string;
    title:string;
    total:number;
}