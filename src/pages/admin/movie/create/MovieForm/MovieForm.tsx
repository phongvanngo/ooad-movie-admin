import { MovieModel } from "app/model/movie";
import UploadFile from "components/common/UploadFile";
import React, { ReactElement } from "react";

interface Props {
    movie?:MovieModel
}

export default function MovieForm({movie}: Props): ReactElement {
	return (
		<div>
			<UploadFile onComplete={(data:string)=>{
				console.log(data);
			}} />
		</div>
	);
}
