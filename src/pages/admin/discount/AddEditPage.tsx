import { discountApi } from "app/api/discount";
import { Discount } from "app/model/discount";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import DiscountForm from "./DiscountForm";
import { message, Button } from "antd";
import { useAppSelector } from "app/redux/store";
import { selectEditingDiscount } from "app/redux/discount/discountSlice";

export default function AddEditPage(): ReactElement {
	const navigate = useNavigate();
	const initialValue = useAppSelector(selectEditingDiscount);
	function handleSubmit(discount: Partial<Discount>): void {
		(async () => {
			try {
				if (initialValue) {
					const response = await discountApi.update(discount);
				} else {
					const response = await discountApi.add(discount);
				}
				navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.DISCOUNT}`);
			} catch (error) {
				message.error("Không thể thực hiện");
			}
		})();
	}
	const { discountId } = useParams();
	useEffect(() => {
		// if (discountId) {
		// }
	}, []);
	return (
		<div>
			<DiscountForm onSubmit={handleSubmit} initialValue={initialValue} />
		</div>
	);
}
