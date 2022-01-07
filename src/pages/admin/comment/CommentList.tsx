import { Avatar, Button, Comment, Skeleton } from "antd";
import { CommentModel, CommentStatus } from "app/model/comment";
import { convertTimestampToFullDateTime } from "app/utils/my-library";
import React, { ReactElement, useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import MySkeleton from "components/common/MySkeleton";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import {
	commentActions,
	selectUpdatingLoading,
} from "app/redux/comment/commentSlice";

interface Props {
    comments: CommentModel[];
    moderateMode: CommentStatus;
    loading?: boolean;
}

export default function CommentList({
	comments,
	moderateMode,
	loading,
}: Props): ReactElement {
	const dispatch = useAppDispatch();
	const udpatingLoading = useAppSelector(selectUpdatingLoading);
	const [updatingComment, setUpdatingComment] =
        useState<Partial<CommentModel>>();
	function handleAcceptComment(comment: CommentModel) {
		setUpdatingComment(comment);
		dispatch(
			commentActions.updateComment({
				id: comment.id,
				status: CommentStatus.accepted,
			}),
		);
	}
	function handleRejectComment(comment) {
		setUpdatingComment(comment);
		dispatch(
			commentActions.updateComment({
				id: comment.id,
				status: CommentStatus.rejected,
			}),
		);
	}
	return (
		<div>
			<MySkeleton
				rows={5}
				loading={loading}
				avatar
				paragraph={{ rows: 2 }}
			/>
			{comments.map((comment) => {
				return (
					<Comment
						key={comment.id}
						actions={[
							<span key="comment-nested-reply-to">Reply to</span>,
						]}
						datetime={convertTimestampToFullDateTime(comment.time)}
						author={<a>User</a>}
						avatar={
							<Avatar
								src="https://joeschmoe.io/api/v1/random"
								alt="User"
							/>
						}
						content={<p>{comment.content}</p>}
					>
						<div className="w-full justify-end flex gap-5">
							{moderateMode === CommentStatus.pending ||
                            moderateMode === CommentStatus.rejected ? (
									<Button
										loading={
											udpatingLoading &&
                                        updatingComment?.commentStatus ===
                                            CommentStatus.rejected &&
                                        updatingComment?.id === comment.id
										}
										onClick={() => {
											handleAcceptComment(comment);
										}}
										type="primary"
										icon={<CheckOutlined />}
									>
                                    Accept
									</Button>
								) : (
									""
								)}
							{moderateMode === CommentStatus.pending ||
                            moderateMode === CommentStatus.accepted ? (
									<Button
										loading={
											udpatingLoading &&
                                        updatingComment?.commentStatus ===
                                            CommentStatus.accepted &&
                                        updatingComment?.id === comment.id
										}
										onClick={() => {
											handleRejectComment(comment);
										}}
										danger
										icon={<CloseOutlined />}
									>
                                    Reject
									</Button>
								) : (
									""
								)}
						</div>
					</Comment>
				);
			})}
			{comments.length === 0 ? 
				<div className="text-center">There{"'s"} nothing here</div>:""	
			}
		</div>
	);
}
