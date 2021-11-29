import {
	DesktopOutlined
} from "@ant-design/icons";
import React, { ReactElement } from "react";

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
		key:"1",
		icon:():ReactElement => (<DesktopOutlined />),
		title:"Trang chủ",
		path:"/admin/movie",
		subMenuKey:"sub1",
		subMenu:[
			{
				key:"2",
				title:"Novapo",
				path:"/admin/novapo"
			},
			{
				key:"3",
				title:"Novapo",
				path:"/admin/novapo",
				subMenuKey: "sub6",
				subMenu: [
					{
						key: "24545",
						title: "Nov fse fse apo",
						path: "/admin/novapo"
					},
					{
						key: "3fse",
						title: "Novafsefpo",
						path: "/admin/novapo"
					},
					{
						key: "4fsef",
						title: "Nofsefvapo",
						path: "/admin/novapo"
					},
				]
			},
			{
				key:"4",
				title:"Novapo",
				path:"/admin/novapo"
			},
		]

        
	},
	{
		key:"5",
		icon:():ReactElement => (<DesktopOutlined />),
		title:"Hello",
		path:"/admin/movie",
		subMenuKey:"sub2",
		subMenu:[
			{
				key:"6",
				title:"fasfs f",
				path:"/admin/novapo"
			},
			{
				key:"7",
				title:"fgsef",
				path:"/admin/novapo"
			},
			{
				key:"8",
				title:"Novadgdrgdrgrdgrgpo",
				path:"/admin/novapo"
			},
		]

        
	},
];