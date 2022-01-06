import { planApi } from "app/api/plan";
import { Plan } from "app/model/plan";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import PlanForm from "./PlanForm";
import { message, Button } from "antd";
import { useAppSelector } from "app/redux/store";
import { selectEditingPlan } from "app/redux/plan/planSlice";

export default function AddEditPage(): ReactElement {
	const navigate = useNavigate();
	const initialValue = useAppSelector(selectEditingPlan);
	function handleSubmit(plan: Partial<Plan>): void {
		(async () => {
			try {
				if (initialValue) {
					const response = await planApi.update({id:planId,...plan});
				} else {
					const response = await planApi.add(plan);
				}
				navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.PLAN}`);
			} catch (error) {
				message.error("Không thể thực hiện");
			}
		})();
	}
	const { planId } = useParams();
	useEffect(() => {
		// if (planId) {
		// }
	}, []);
	return (
		<div>
			<PlanForm onSubmit={handleSubmit} initialValue={initialValue} />
		</div>
	);
}
