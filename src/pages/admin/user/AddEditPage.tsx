import { userApi } from "app/api/user";
import { User } from "app/model/User";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import UserForm from "./UserForm";
import { message, Button } from "antd";
import { useAppSelector } from "app/redux/store";
import { selectEditingUser } from "app/redux/user/userSlice";

export default function AddEditPage(): ReactElement {
	const navigate = useNavigate();
	const initialValue = useAppSelector(selectEditingUser);
	function handleSubmit(user: Partial<User>): void {
		(async () => {
			try {
				if (initialValue) {
					const response = await userApi.update(user);
				} else {
					const response = await userApi.add(user);
				}
				navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.DISCOUNT}`);
			} catch (error) {
				message.error("Không thể thực hiện");
			}
		})();
	}
	const { userId } = useParams();
	useEffect(() => {
		// if (userId) {
		// }
	}, []);
	return (
		<div>
			<UserForm onSubmit={handleSubmit} initialValue={initialValue} />
		</div>
	);
}
