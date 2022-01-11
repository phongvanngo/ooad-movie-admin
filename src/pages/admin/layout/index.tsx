import { Breadcrumb, Button, Layout } from "antd";
import { icons } from "antd/lib/image/PreviewGroup";
import React, { ReactElement } from "react";
import { Outlet } from "react-router";
import AppBreadcrumb from "./AppBreadCrumb";
import Sidebar from "./sidebar";
import "./style.scss";
import {LogoutOutlined} from "@ant-design/icons";
import { useAppDispatch } from "app/redux/store";
import { signOut } from "app/redux/actions";

const { Header, Content, Footer } = Layout;


function MainLayout():ReactElement {
	const dispatch = useAppDispatch();
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sidebar />
			<Layout className="site-layout">
				<Header
					className="site-layout-background"
					style={{ height: "45px", padding: 0 }}
				>
					<div className="h-full w-full flex items-center justify-end">
						<Button
							onClick={() => {
								dispatch(signOut());
							}}
							className="mr-2"
							icon={<LogoutOutlined />}
						>
                            Logout
						</Button>
					</div>
				</Header>
				<Content
					style={{
						margin: "0 0px",
						padding: "0 16px",
						// backgroundImage: "url(images/mainbg.jpg)",
					}}
				>
					<AppBreadcrumb />
					<div
						className="site-layout-background"
						style={{ padding: 24, minHeight: "75vh" }}
					>
						<Outlet />
					</div>
				</Content>
				<Footer
					style={{
						textAlign: "center",
						backgroundColor: "rgba(76, 175, 80, 0.0)",
					}}
				>
                    Ant Design ©2018 Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	);
}


export default MainLayout;


