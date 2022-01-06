import { Spin } from "antd";
import React, { ReactElement } from "react";

export default function PageLoader(): ReactElement {
	return (
		<div className="fixed h-full w-full flex items-center justify-center z-10 bg-opacity-70 bg-white ">
			<span className="">
				<Spin size="large" />
			</span>
		</div>
	);
}
