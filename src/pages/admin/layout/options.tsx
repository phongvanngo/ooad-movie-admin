import { PlaySquareOutlined, HomeOutlined } from "@ant-design/icons";
import React, { ReactElement } from "react";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";

export interface IMenuItem {
    key: string;
    icon?: () => ReactElement;
    title: string;
    path?: string;
    subMenuKey?: string;
    subMenu?: Array<IMenuItem>;
}

export const menus: Array<IMenuItem> = [
	{
		key: "dashboard",
		icon: () => <HomeOutlined />,
		title: "Home",
		path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.DASHBOARD}`,
	},
	{
		key: "movie",
		icon: () => <PlaySquareOutlined />,
		title: "Movie",
		subMenuKey: "sub_movie",
		subMenu: [
			{
				key: "danhsachphim",
				title: "All Movies",
				path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.MOVIE}`,
			},
			{
				key: "taophimmoi",
				title: "Create Movie",
				path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.MOVIE_CREATE}`,
			},
		],
	},
	{
		key: "genre",
		icon: () => <PlaySquareOutlined />,
		title: "Genre",
		subMenuKey: "genre_management",
		subMenu: [
			{
				key: "danhsachtheloai",
				title: "All Genres",
				path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.GENRE}`,
			},
			{
				key: "taotheloaimoi",
				title: "Create Genre",
				path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.GENRE_CREATE}`,
			},
		],
	},
	{
		key: "person",
		icon: () => <PlaySquareOutlined />,
		title: "Cast",
		subMenuKey: "person_management",
		subMenu: [
			{
				key: "allcasts",
				title: "All Casts",
				path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.CAST}`,
			},
			{
				key: "creatcast",
				title: "Create Cast",
				path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.CAST_CREATE}`,
			},
		],
	},
	{
		key: "Discount",
		icon: () => <PlaySquareOutlined />,
		title: "Discount",
		subMenuKey: "discount_management",
		subMenu: [
			{
				key: "alldiscounts",
				title: "All Discounts",
				path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.DISCOUNT}`,
			},
			{
				key: "creatediscount",
				title: "Create Discount",
				path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.DISCOUNT_CREATE}`,
			},
		],
	},
	{
		key: "planmanagement",
		icon: () => <HomeOutlined />,
		title: "Plan",
		path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.PLAN}`,
	},
];
