import { EditOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Button, Image, Space, Table, Tag, Tooltip } from "antd";
import { Discount } from "app/model/discount";
import {
	discountActions,
	selectDiscountList,
	selectDiscountLoading,
} from "app/redux/discount/discountSlice";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import { convertDateTime, filterArrayBySearchTerm } from "app/utils/my-library";
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

export default function DiscountList({ searchTerm }: Props): ReactElement {
	const dispatch = useAppDispatch();
	const discounts = useAppSelector(selectDiscountList);
	const loading = useAppSelector(selectDiscountLoading);
	const navigate = useNavigate();

	const currentListDiscount = filterArrayBySearchTerm(
		discounts,
		searchTerm,
	) as Discount[];

	const columns = [
		{
			title: "name",
			dataIndex: "name",
			sorter: true,
			width: 100,
		},
		{
			title: "Description",
			dataIndex: "description",
			sorter: true,
			width: 100,
		},
		{
			title: "Remaining",
			dataIndex: "remaining_amount",
			width: 100,
		},
		{
			title: "Code",
			dataIndex: "code",
			width: 100,
		},
		{
			title: "Value",
			dataIndex: "value",
			width: 100,
		},
		{
			title: "Time Begin",
			dataIndex: "time_begin",
			render: (time_begin) => <div>{convertDateTime(time_begin)}</div>,
			width: 100,
		},
		{
			title: "Time End",
			dataIndex: "time_end",
			render: (time_end) => <div>{convertDateTime(time_end)}</div>,
			width: 100,
		},
		{
			title: "Action",
			// fixed: "right",
			render: (text, record) => (
				<Space size="middle">
					{/* <a>Invite {record.name}</a>
					<a>Delete</a> */}
					<Tooltip placement="topLeft" title="Edit Discount">
						<Button
							onClick={() => {
								// dispatch(genreActions.setEditingGenre(genre));
								dispatch(
									discountActions.setEditingDiscount(record),
								);
								navigate(
									`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.DISCOUNT}/${record.id}`,
								);
							}}
							key="delete-genre"
							type="ghost"
							size="small"
							icon={<EditOutlined />}
						/>
					</Tooltip>
					<Tooltip placement="topLeft" title="Delete Discount">
						<ButtonItemDelete
							message="Are your sure ?"
							key="genre-item-delete"
							onDelete={() => {
								dispatch(
									discountActions.deleteDiscount(record.id),
								);
							}}
						/>
					</Tooltip>
				</Space>
			),
			width: 100,
		},
	];

	useEffect(() => {
		dispatch(discountActions.setEditingDiscount(undefined));
		dispatch(discountActions.fetchDiscountList());

		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			<Table
				columns={columns}
				scroll={{ x: 1500 }}
				rowKey={(record) => record.id}
				dataSource={currentListDiscount}
				pagination={{ pageSize: 5 }}
				loading={loading}
				// onChange={handleTableChange}
			/>
		</div>
	);
}
