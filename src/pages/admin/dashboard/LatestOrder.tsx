import { Table, Tag } from "antd";
import movieDbApiConfig from "app/api/theMovieDBApi/config";
import { MovieModel } from "app/model/movie";
import { Order } from "app/model/order";
import { User } from "app/model/User";
import React, { ReactElement } from "react";

interface Props {
    orders: Order[],
	movies?:MovieModel[],
	loading:boolean;
}

export default function LatestOrders({orders,loading}: Props): ReactElement {
	const columns = [
		{
			title: "Name",
			dataIndex: "user",
			render: (user: User) => <div>{user.fullname}</div>,
		},
		{
			title: "",
			dataIndex: "is_plan",
			render: (is_plan: boolean) =>
				is_plan ? (
					<Tag color="magenta">Subscribe Plan</Tag>
				) : (
					<Tag color="gold">Buy Movie</Tag>
				),
		},
		{
			title: "",
			render: (text, order: Order) =>{
				console.log("orderefsef",order);
				return (
					<div>
						{order.is_plan ? (
							<div>{order.plan.name}</div>
						) : (
							<div className="flex">
								{/* <img
									width={20}
									src={movieDbApiConfig.originalImage(
										order.movies[0].poster_path,
									)}
								/> */}
								<div>{order.movies[0].name}</div>
							</div>
						)}
					</div>
				);
			}
		}	
	];
				
	return (
		<div className="mt-5">
			<h1
				className="text-2xl font-bold "
				style={{
					color: "#001529",
				}}
			>
                Latest Orders
			</h1>
			<div>
				<Table
					columns={columns}
					rowKey={(record) => record.id}
					dataSource={orders}
					pagination={{ pageSize: 5 }}
					loading={loading}
					// onChange={handleTableChange}
				/>
			</div>
		</div>
	);
}
