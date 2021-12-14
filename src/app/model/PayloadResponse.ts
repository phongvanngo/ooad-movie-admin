// types of api data response

export interface PaginationParams {
    page: number;
    total_page:number;
    total_results:number;
}

interface MetaField {
    succces?: boolean;
    messsage?: string;
}


export interface DataResponse<T> extends MetaField {
    data:T;
    pagination?:PaginationParams;
    results?:T
}

