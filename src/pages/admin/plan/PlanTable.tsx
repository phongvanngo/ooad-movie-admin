import { EditOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Button, Image, Space, Table, Tag, Tooltip } from "antd";
import { Plan } from "app/model/plan";
import {
	planActions,
	selectPlanList,
	selectPlanLoading,
} from "app/redux/plan/planSlice";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import { convertDateTime, filterArrayBySearchTerm, formatCurrency } from "app/utils/my-library";
import ButtonItemDelete from "components/common/ButtonItemDelete";
import React, { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";

type TableFilter = {
    pagination: {
        current: number;
        pageSize: number;
        total: number;
    };
};

interface Props {
    searchTerm: string;
}

export default function PlanList({ searchTerm }: Props): ReactElement {
	const dispatch = useAppDispatch();
	const plans = useAppSelector(selectPlanList);
	const loading = useAppSelector(selectPlanLoading);
	const navigate = useNavigate();

	const currentListPlan = filterArrayBySearchTerm(
		plans,
		searchTerm,
	) as Plan[];

	const columns = [
		{
			title: "Title",
			dataIndex: "title",
			sorter: true,
		},
		{
			title: "Price",
			dataIndex: "price",
			sorter: true,
			render: (price) => <div>{formatCurrency(price)}</div>,
		},
		{
			title: "Duration (Day)",
			dataIndex: "expired",
			sorter: true,
		},
		{
			title: "Action",
			// fixed: "right",
			render: (text, record) => (
				<Space size="middle">
					{/* <a>Invite {record.name}</a>
					<a>Delete</a> */}
					<Tooltip placement="topLeft" title="Edit Plan">
						<Button
							onClick={() => {
								// dispatch(genreActions.setEditingGenre(genre));
								dispatch(planActions.setEditingPlan(record));
								navigate(
									`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.PLAN}/${record.id}`,
								);
							}}
							key="delete-genre"
							type="ghost"
							size="small"
							icon={<EditOutlined />}
						/>
					</Tooltip>
					{/* <Tooltip placement="topLeft" title="Delete Plan">
						<ButtonItemDelete
							message="Are your sure ?"
							key="genre-item-delete"
							onDelete={() => {
								dispatch(planActions.deletePlan(record.id));
							}}
						/>
					</Tooltip> */}
				</Space>
			),
			width: 100,
		},
	];

	useEffect(() => {
		dispatch(planActions.setEditingPlan(undefined));
		dispatch(planActions.fetchPlanList());

		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			<Table
				columns={columns}
				rowKey={(record) => record.id}
				dataSource={currentListPlan}
				pagination={{ pageSize: 5 }}
				loading={loading}
				// onChange={handleTableChange}
			/>
		</div>
	);
}
