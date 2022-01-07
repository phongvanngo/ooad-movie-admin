import { Tabs } from "antd";
import { CommentStatus, GetCommentParameters } from "app/model/comment";
import {
	commentActions,
	selectCommentList,
	selectCommentLoading,
} from "app/redux/comment/commentSlice";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import ContainerLoader from "components/common/ContainerLoader";
import React, { ReactElement, useEffect, useState } from "react";
import CommentList from "./CommentList";

const { TabPane } = Tabs;

export default function CommentManagement(): ReactElement {
	const dispatch = useAppDispatch();
	const comments = useAppSelector(selectCommentList);
	const [activeTab, setActiveTab] = useState<CommentStatus>(
		CommentStatus.pending,
	);
	const loading = useAppSelector(selectCommentLoading);

	useEffect(() => {
		const filter: GetCommentParameters = {
			status: activeTab,
		};
		dispatch(commentActions.fetchCommentList(filter));
	}, [activeTab]);

	return (
		<div className="relative">
			<Tabs
				activeKey={activeTab}
				onChange={(activeKey) => {
					setActiveTab(activeKey as CommentStatus);
				}}
			>
				<TabPane tab="Pending" key={CommentStatus.pending}>
					<CommentList
						loading={loading}
						comments={comments}
						moderateMode={CommentStatus.pending}
					/>
				</TabPane>
				<TabPane tab="Accepted" key={CommentStatus.accepted}>
					<CommentList
						loading={loading}
						comments={comments}
						moderateMode={CommentStatus.accepted}
					/>
				</TabPane>
				<TabPane tab="Rejected" key={CommentStatus.rejected}>
					<CommentList
						loading={loading}
						comments={comments}
						moderateMode={CommentStatus.rejected}
					/>
				</TabPane>
			</Tabs>
		</div>
	);
}
