import React, { ReactElement } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import { BASE_URL_API } from "app/constants";
import Dragger from "antd/lib/upload/Dragger";
import { DataResponse } from "app/model/PayloadResponse";

interface Props {
    onComplete: (data: string) => void;
}

export default function UploadFile({ onComplete }: Props): ReactElement {
	const props = {
		name: "file",
		multiple: true,
		maxCount:1,
		onPreview: (data) => {console.log(data);},
		action: `${BASE_URL_API}/upload`,
		onChange(info) {
			const { status } = info.file;
			if (status !== "uploading") {
				console.log(info.file, info.fileList);
			}
            
			if (status === "done") {
				const response = info.file.response as DataResponse<string>;
				onComplete(response.data);
				message.success(
					`${info.file.name} file uploaded successfully.`,
				);
                
			} else if (status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
		},
	};
	return (
		<div>
			<Dragger {...props}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">
                    Click or drag video to this area to upload
				</p>
				<p className="ant-upload-hint">
                    Support for MP4, MOV, AVI, FLK
				</p>
			</Dragger>
		</div>
	);
}
