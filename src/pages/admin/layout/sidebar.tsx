import { Layout } from "antd";
import { default as React, ReactElement, useState } from "react";
import SidebarMenu from "./sidebarMenu";

const { Sider } = Layout;

export default function Sidebar(): ReactElement {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<Sider collapsible collapsed={collapsed} onCollapse={() => { setCollapsed(!collapsed); }}>
			<div className="logo" />
			<SidebarMenu />
		</Sider>
	);
}
