import { DeleteOutlined,InfoCircleOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import React, { ReactElement } from "react";
interface Props {
    onDelete: ()=>void
    message:string
}
export default function CustomButtonItemDelete({onDelete,message}: Props): ReactElement {
	const content = (
		<div>
			<Button className="mr-2" size="small"  type="ghost" >
                Cancel
			</Button>
			<Button type="ghost" danger size="small" onClick={() => { onDelete(); }}>
                Delete
			</Button>
		</div>
	);
	const title = (
		<div className="flex items-center py-2">
			<InfoCircleOutlined style={{ color:"#faad14"}} className="mr-2"/>
			{message}
		</div>
	);
	return (
		<Popover content={content} title={title} trigger="click">
			<DeleteOutlined />
		</Popover>
	);
}
