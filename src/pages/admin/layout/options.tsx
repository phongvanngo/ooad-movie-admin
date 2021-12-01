import {
	PlaySquareOutlined, HomeOutlined
} from "@ant-design/icons";
import React, { ReactElement } from "react";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";

export interface IMenuItem  {
    key:string;
    icon?:()=>ReactElement;
    title:string;
    path?:string;
    subMenuKey?:string;
    subMenu?:Array<IMenuItem>
}



export const menus: Array<IMenuItem> = [
	{
		key:"dashboard",
		icon: () => <HomeOutlined />,
		title:"Home",
		path:`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.DASHBOARD}`
	},
	{
		key:"movie",
		icon: () => <PlaySquareOutlined />,
		title:"Movie",
		subMenuKey:"sub_movie",
		subMenu:[
			{
				key:"danhsachphim",
				title:"Danh sách phim",
				path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.MOVIE}`
			},
			{
				key:"taophimmoi",
				title:"Tạo phim mới",
				path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.MOVIE_CREATE}`
			},
		]

	},
	{
		key:"genre",
		icon: () => <PlaySquareOutlined />,
		title:"Genre",
		subMenuKey:"genre_management",
		subMenu:[
			{
				key:"danhsachtheloai",
				title:"Tất cả",
				path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.GENRE}`
			},
			{
				key:"taotheloaimoi",
				title:"Tạo thể loại mới",
				path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.GENRE_CREATE}`
			},
		]

	}
];