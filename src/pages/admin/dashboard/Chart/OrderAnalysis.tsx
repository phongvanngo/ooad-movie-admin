import { Spin } from "antd";
import { Order } from "app/model/order";
import { getRandomArbitrary } from "app/utils/my-library";
import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import React, { ReactElement, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

interface Props {
    orders: Order[];
    loading: boolean;
}

type Revenue = {
    name: string;
    value: number;
};

export default function OrderAnalysis({
	orders,
	loading,
}: Props): ReactElement {
	console.log(orders);
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Chart.js Line Chart",
			},
		},
	};
	const [monthToRender, setMonthToRender] = useState<string>("2022");

	const month = [
		"Tháng 1",
		"Tháng 2",
		"Tháng 3",
		"Tháng 4",
		"Tháng 5",
		"Tháng 6",
		"Tháng 7",
		"Tháng 8",
		"Tháng 9",
		"Tháng 10",
		"Tháng 11",
		"Tháng 12",
	];

	let revenues: Revenue[] = month.map((e) => {
		return {
			name: e,
			value: 0,
		};
	});

	if (monthToRender != "2022") {
		revenues = month.map((e) => {
			return {
				name: e,
				value: getRandomArbitrary(0, 100),
			};
		});
		console.log("hello");
	} else {
		revenues[0].value = orders.length;
	}

	console.log("RevenueBarChar, data", revenues);

	const yearOption = [];
	for (let i = 2008; i <= 2022; i++) yearOption.push(i);

	return (
		<div className="m-5">
			<div className="min-h-20 border-b border-gray-200 rounded-t-3xl bg-white">
				<div className="flex justify-between items-center">
					<h1
						className="text-2xl font-bold "
						style={{
							color: "#001529",
						}}
					>
                        Orders Analysis
					</h1>
					<div className="flex">
						<h1 className="mr-5">Year &nbsp;</h1>
						<select
							value={monthToRender}
							onChange={(e) => {
								console.log("change year ", e.target.value);
								setMonthToRender(e.target.value);
							}}
							className="h-full w-full focus:border-indigo-500 rounded-full  w-30 py-2 px-10 leading-tight focus:outline-none border  text-gray-500 "
						>
							{yearOption.map((e) => (
								<option key={e} value={e}>
									{e}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
			<div className="px-8 py-6 rounded-b-3xl bg-white shadow-sm">
				<div>
					<div className="mx-auto max-w-5xl">
						<Line
							data={{
								labels: revenues.map((e) => e.name),
								datasets: [
									{
										label: "Subcribes",
										data: revenues.map((e) => e.value),
										backgroundColor:
                                            "rgba(255, 99, 132, 0.2)",
										borderColor: "rgb(255, 99, 132)",

										borderWidth: 1,
									},
								],
							}}
							options={options}
							
						></Line>
					</div>
				</div>
			</div>
		</div>
	);
}
