import { Spin } from "antd";
import React, { ReactElement } from "react";

interface Props {
    children: ReactElement;
    loading: boolean;
}

export default function ContainerLoader({
	loading,
	children,
}: Props): ReactElement {
	return (
		<div className="w-full h-full absolute bg-black bg-opacity-50 ">
			{loading ? <Spin size="small" /> : ""}
			{children}
		</div>
	);
}
