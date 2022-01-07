import { message } from "antd";
import { Person } from "app/model/person";
import { selectEditingPerson } from "app/redux/person/personSlice";
import { useAppSelector } from "app/redux/store";
import React, { ReactElement, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import PersonForm from "./PersonForm";

export default function AddEditPage(): ReactElement {
	const navigate = useNavigate();
	const initialValue = useAppSelector(selectEditingPerson);
	function handleSubmit(person: Partial<Person>): void {
		(async () => {
			try {
				if (initialValue) {
					// const response = await personApi.update(person);
				} else {
					// const response = await personApi.add(person);
				}
				navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.DISCOUNT}`);
			} catch (error) {
				message.error("Không thể thực hiện");
			}
		})();
	}
	const { personId } = useParams();
	useEffect(() => {
		// if (personId) {
		// }
	}, []);
	return (
		<div>
			<PersonForm onSubmit={handleSubmit} initialValue={initialValue} />
		</div>
	);
}
