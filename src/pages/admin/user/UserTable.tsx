import { EditOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Button, Image, Space, Table, Tag, Tooltip } from "antd";
import { User } from "app/model/User";
import {
	userActions,
	selectUserList,
	selectUserLoading,
} from "app/redux/user/userSlice";
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

export default function UserList({ searchTerm }: Props): ReactElement {
	const dispatch = useAppDispatch();
	const users = useAppSelector(selectUserList);
	const loading = useAppSelector(selectUserLoading);
	const navigate = useNavigate();

	const currentListUser = filterArrayBySearchTerm(
		users,
		searchTerm,
	) as User[];

	const columns = [
		{
			title: "Username",
			dataIndex: "username",
			sorter: true,
			width: 100,
		},
		{
			title: "Role",
			dataIndex: "role",
			sorter: true,
			width: 100,
		},
	];

	useEffect(() => {
		dispatch(userActions.setEditingUser(undefined));
		dispatch(userActions.fetchUserList());

		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			<Table
				columns={columns}
				rowKey={(record) => record.id}
				dataSource={currentListUser}
				pagination={{ pageSize: 5 }}
				loading={loading}
				// onChange={handleTableChange}
			/>
		</div>
	);
}
