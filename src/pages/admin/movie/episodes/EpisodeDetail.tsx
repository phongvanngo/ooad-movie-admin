import { message, Spin } from "antd";
import { commonApi } from "app/api/common";
import { episodeApi } from "app/api/episode";
import { Episode } from "app/model/episode";
import ToggleInput from "components/common/ToggleInput";
import UploadFile from "components/common/UploadFile";
import VideoPlayer from "components/common/VideoPlayer";
import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Props {
    episodeId: string;
}

export default function EpisodeDetail(): ReactElement {
	const [episode, setEpisode] = useState<Episode>();

	const { episodeId } = useParams();

	async function getDetailEpisode(id: string) {
		try {
			const response = await episodeApi.getById(id);
			console.log(response);
			setEpisode(response.data);
		} catch (error) {
			message.error("Đã có lỗi xảy ra");
		}
	}

	async function updateEpsisode(episode:Episode) {
		try {
			const response = await episodeApi.update(episode);
			console.log(response);
			message.success(response.messsage);
		} catch (error) {
			message.error("Đã có lỗi xảy ra");
		}
	}

	// useEffect(() => {
	// 	updateEpsisode(episode);
	// }, [episode]);

	useEffect(() => {
		setEpisode(undefined);
		getDetailEpisode(episodeId);
	}, [episodeId]);

	if (!episode) 
		return (
			<div className="flex  content-center">
				<Spin />
			</div>
		);

	return <div>
		<div>
			<ToggleInput currentValue={episode.name} onSubmit={(data:string)=>{
				const newEpisode = {
					...episode,
					name: data,
				};
				setEpisode(newEpisode);
				updateEpsisode(newEpisode);
			}}/>
		</div>
		<p className="font-bold">Upload Video</p>
		<div>
			<UploadFile onComplete={(data)=>{
				const newEpisode = {...episode,content:data};
				setEpisode(newEpisode);
				updateEpsisode(newEpisode);
			}}/>
		</div>
		<div>
			<div className="mt-5 max-w-md mx-auto">
				<PlayVideo path={episode.content} />
			</div>
		</div>
	</div>;
}


interface PlayVideoProps {
	path:string;
}

function PlayVideo({ path }: PlayVideoProps): ReactElement {
	const [link, setLink] = useState<string>();

	async function generateDownloadLink(path: string) {
		try {
			const response = await commonApi.generateDownloadLink(path);
			console.log(response);
			setLink(response.data);
			message.success(response.messsage);
		} catch (error) {
			message.error("Đã có lỗi xảy ra");
		}
	}

	useEffect(() => {
		generateDownloadLink(path);
	}, [path]);

	console.log(link);

	const videoJsOptions = {
		sources: [
			{
				// src: "//vjs.zencdn.net/v/oceans.mp4",
				src: link,
				type: "video/mp4",
			},
		],
	};


	if (!link) return <div></div>;

	return (
		<div>
			<VideoPlayer options={videoJsOptions}/>
		</div>
	);
}
