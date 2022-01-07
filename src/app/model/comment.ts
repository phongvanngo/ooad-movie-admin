export interface CommentModel {
    id:string;
    time:number;
    commentStatus:CommentStatus;
    content: "123";
    movie_id;
}

export enum CommentStatus {
    pending = "Pending",
    accepted = "Accept",
    rejected = "Reject",
}

export type GetCommentParameters = {
    status?:CommentStatus
    movie_id?:string
}