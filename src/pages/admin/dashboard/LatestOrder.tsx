import { Order } from "app/model/order";
import React, { ReactElement } from "react";

interface Props {
    orders: Order[]
}

export default function LatestOrders({orders}: Props): ReactElement {
	return (
		<div className="mt-10">
			<h1
				className="text-2xl font-bold "
				style={{
					color: "#001529",
				}}
			>
                Latest Orders
			</h1>
			<div>

			</div>
		</div>
	);
}
