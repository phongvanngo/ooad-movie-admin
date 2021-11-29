import { Breadcrumb, Layout } from "antd";
import React, { ReactElement } from "react";
import { Outlet } from "react-router";
import Sidebar from "./sidebar";
import "./style.scss";

const { Header, Content, Footer } = Layout;


function MainLayout():ReactElement {

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sidebar />
			<Layout className="site-layout">
				<Header className="site-layout-background" style={{height:"45px", padding: 0 }} />
				<Content style={{ margin: "0 16px" }}>
					<Breadcrumb style={{ margin: "16px 0" }}>
						<Breadcrumb.Item>Dashboard</Breadcrumb.Item>
						<Breadcrumb.Item>Bill</Breadcrumb.Item>
					</Breadcrumb>
					<div className="site-layout-background" style={{ padding: 24, minHeight: "75vh" }}>
						<Outlet />
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
			</Layout>
		</Layout>
	);
}


export default MainLayout;


