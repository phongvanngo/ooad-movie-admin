export interface Discount {
    id: string;
    name: string;
    description: string;
    remaining_amount: number;
    time_begin: string;
    time_end: string;
    value: number;
    code: string;
    enabled: boolean;
};
