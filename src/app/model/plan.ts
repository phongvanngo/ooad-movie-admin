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

export interface PlanStatistical {
    plan_id:string;
    title:string;
    total:number;
}