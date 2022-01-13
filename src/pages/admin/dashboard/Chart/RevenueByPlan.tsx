// import React from "react";
// import { Bar } from "react-chartjs-2";
// import { useSelector } from "react-redux";

// export default function RevenueBarChar() {
// 	const listTheaterSystem = useSelector(
// 		(state) => state.theater.listTheaterSystem,
// 	);
// 	const revenueByTheaterSystem = useSelector(
// 		(state) => state.statistical.revenueByTheaterSystem,
// 	);

// 	const revenues = [];
// 	for (const theaterSystem of listTheaterSystem) {
// 		const name = theaterSystem.name;
// 		const element = revenueByTheaterSystem.find(
// 			(e) => e.TENHETHONGRAP === name,
// 		);
// 		if (element) {
// 			revenues.push({ name, value: element.DOANHTHU });
// 		} else {
// 			revenues.push({ name, value: 0 });
// 		}
// 	}

// 	console.log("RevenueBarChar, data", revenues);

// 	return (

// 	);
// }
import { Spin } from "antd";
import { PlanStatistical } from "app/model/plan";
import {
	ArcElement, Chart as ChartJS, Legend, RadialLinearScale, Tooltip
} from "chart.js";
import React, { ReactElement } from "react";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface Props {
    planStatistic: PlanStatistical[];
	loading:boolean;
}
export default function RevenueByPlan({ planStatistic,loading }: Props): ReactElement {
	console.log(planStatistic);
	return (
		<div className="mt-10">
			<h1
				className="text-2xl font-bold "
				style={{
					color: "#001529",
				}}
			>
                Plan Analysis
			</h1>
			{loading ? <div className="w-full h-96 flex justify-center items-center">
				<Spin size="large" />
			</div>:
				<div className="m-5">
					<div className="px-8 py-6 rounded-b-3xl bg-white shadow-sm">
						<div>
							<div className="mx-auto max-w-xl">
								<PolarArea
									data={{
										labels: planStatistic.map((e) => e.title),
										datasets: [
											{
												label: "Doanh thu",
												data: planStatistic.map(
													(e) => e.total + 1,
												),
												backgroundColor: [
													"rgba(255, 99, 132, 0.2)",
													"rgba(255, 159, 64, 0.2)",
													"rgba(255, 205, 86, 0.2)",
													"rgba(75, 192, 192, 0.2)",
													"rgba(54, 162, 235, 0.2)",
													"rgba(153, 102, 255, 0.2)",
													"rgba(201, 203, 207, 0.2)",
												],
												borderColor: [
													"rgb(255, 99, 132)",
													"rgb(255, 159, 64)",
													"rgb(255, 205, 86)",
													"rgb(75, 192, 192)",
													"rgb(54, 162, 235)",
													"rgb(153, 102, 255)",
													"rgb(201, 203, 207)",
												],
												borderWidth: 1,
											},
										],
									}}
									height={200}
									// width={400}
									options={{
										maintainAspectRatio: true,
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			}
		</div>
	);
}
