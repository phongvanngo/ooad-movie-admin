export interface CommentModel {
    id: string;
    time: number;
    status: CommentStatus;
    content: "123";
    movie_id: string;
    user: { fullname: string; id: string; username: string }
}

export enum CommentStatus {
    pending = "Pending",
    accepted = "Accept",
    rejected = "Reject",
}

export type GetCommentParameters = {
    status?: CommentStatus
    movie_id?: string
}