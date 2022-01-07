import { Skeleton } from "antd";
import React, { ReactElement } from "react";

interface Props {
    rows: number;
    loading:boolean;
    avatar?:boolean;
    paragraph?: {
        rows?:number;
        width?:number|string;
    }

}

export default function MySkeleton({ rows,avatar,loading,paragraph}: Props): ReactElement {
	const skeletons: ReactElement[] =[];
	for (let i = 0; i < rows; i++) {
		skeletons.push(<Skeleton key={i} active loading={loading} avatar={avatar} />);
	}
	return (
		<>
			{skeletons}
		</>
	);
}
