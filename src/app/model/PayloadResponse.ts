// types of api data response

export interface PaginationParams {
    page?: number;
    total_pages?:number;
    total_results?:number;
}

interface MetaField {
    succces?: boolean;
    messsage?: string;
}


export interface DataResponse<T> extends MetaField,Partial<PaginationParams> {
    data:T;
    results?:T
}

export interface AuthResponsePayload {
    accessToken:string;
    refreshToken:string;
}

export interface AuthRequestPayload {
    username:string;
    password:string;
}