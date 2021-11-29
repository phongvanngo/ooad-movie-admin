import { Menu } from "antd";
import { default as React, ReactElement } from "react";
import { IMenuItem, menus } from "./options";
const { SubMenu } = Menu;
export default function SidebarMenu(): ReactElement {
	console.log(menus);
	function MenuItem({ option, ...res }: { option: IMenuItem }): ReactElement {
		if (option.subMenu) return (
			<SubMenu title={option.title} key={option.key} {...res}>
				{option.subMenu.map(item => {
					return (
						<MenuItem option={item} key={item.key} />
					);
				})}
			</SubMenu>
		);
		return (
			<Menu.Item key={option.key} {...res}>
				{option.title}
			</Menu.Item>
		);
	}
	return (
		<Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
			{menus.map(menuItem => {
				return (
					<MenuItem option={menuItem} key={menuItem.key} />
				);
			})}
		</Menu>
	);
}
