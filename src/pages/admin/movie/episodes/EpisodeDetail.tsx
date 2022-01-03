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
			
			setEpisode(response.data);
		} catch (error) {
			message.error("Can not load the episode");
		}
	}

	async function updateEpsisode(episode: Episode) {
		try {
			const response = await episodeApi.update(episode);
			
			message.success("Updated Episode");
		} catch (error) {
			message.error("Updated episode failed");
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

	return (
		<div>
			<div className="text-2xl mt-5 uppercase">
				<ToggleInput
					currentValue={episode.name}
					onSubmit={(data: string) => {
						const newEpisode = {
							...episode,
							name: data,
						};
						setEpisode(newEpisode);
						updateEpsisode(newEpisode);
					}}
				/>
			</div>
			<p className="font-bold">Upload Video</p>
			<div>
				<UploadFile
					onComplete={(data) => {
						const newEpisode = { ...episode, content: data };
						setEpisode(newEpisode);
						updateEpsisode(newEpisode);
					}}
				/>
			</div>
			<div>
				<div className="mt-5 max-w-md mx-auto">
					<PlayVideo path={episode.content} />
				</div>
			</div>
		</div>
	);
}

interface PlayVideoProps {
    path: string;
}

function PlayVideo({ path }: PlayVideoProps): ReactElement {
	const [link, setLink] = useState<string>();
	
	async function generateDownloadLink(path: string) {
		try {
			const response = await commonApi.generateDownloadLink(path);
			
			setLink(response.data);
		} catch (error) {
			message.error("Something went wront when generate download link");
		}
	}

	useEffect(() => {
		generateDownloadLink(path);
	}, [path]);

	

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
			<VideoPlayer options={videoJsOptions} />
		</div>
	);
}
