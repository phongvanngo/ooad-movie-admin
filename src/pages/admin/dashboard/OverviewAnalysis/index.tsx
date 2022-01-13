import React, { ReactElement, useEffect } from "react";
import {
	VideoCameraOutlined,
	UnorderedListOutlined,
	UserOutlined,
	CommentOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
interface Props {
    orders: number | boolean;
    users: number | boolean;
    comments: number | boolean;
    movies: number | boolean;
}

export default function OverviewAnalysis({
	orders,
	users,
	comments,
	movies,
}: Props): ReactElement {
	console.log(users);
	return (
		<div className="w-full">
			<h1
				className="text-2xl font-bold "
				style={{
					color: "#001529",
				}}
			>
                Overview Analysis
			</h1>
			<div className="grid grid-cols-4 w-full gap-5 mt-5">
				<div
					style={{
						borderLeft: "5px solid #f59e0b",
					}}
					className=" shadow-lg bg-white text-yellow-500  py-3 pl-5 pr-5 flex items-center gap-10 rounded-lg"
				>
					<div className="flex-1">
						<div className="text-4xl font-bold">
							{(movies === true) ? <Spin /> : movies}
						</div>
						<div className="text-xl">Movies</div>
					</div>
					<div className="text-4xl">
						<VideoCameraOutlined />
					</div>
				</div>
				<div
					style={{
						borderLeft: "5px solid #3B82F6",
					}}
					className=" shadow-lg bg-white text-blue-500  py-3 pl-5 pr-5 flex items-center gap-10 rounded-lg"
				>
					<div className="flex-1">
						<div className="text-4xl font-bold">
							{(orders === true) ? <Spin /> : orders}
						</div>
						<div className="text-xl">Orders</div>
					</div>
					<div className="text-4xl">
						<UnorderedListOutlined />
					</div>
				</div>
				<div
					style={{
						borderLeft: "5px solid #EC4899",
					}}
					className=" shadow-lg bg-white text-pink-500  py-3 pl-5 pr-5 flex items-center gap-10 rounded-lg"
				>
					<div className="flex-1">
						<div className="text-4xl font-bold">
							{(users === true) ? <Spin /> : users}
						</div>
						<div className="text-xl">Users</div>
					</div>
					<div className="text-4xl">
						<UserOutlined />
					</div>
				</div>
				<div
					style={{
						borderLeft: "5px solid #22C55E",
					}}
					className=" shadow-lg bg-white text-green-500  py-3 pl-5 pr-5 flex items-center gap-10 rounded-lg"
				>
					<div className="flex-1">
						<div className="text-4xl font-bold">
							{(comments === true) ? <Spin /> : comments}
						</div>
						<div className="text-xl">Comments</div>
					</div>
					<div className="text-4xl">
						<CommentOutlined />
					</div>
				</div>
			</div>
		</div>
	);
}
