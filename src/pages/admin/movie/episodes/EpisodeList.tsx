import { Button } from "antd";
import { Episode } from "app/model/episode";
import ButtonItemDelete from "components/common/ButtonItemDelete";
import React, { ReactElement } from "react";

interface Props {
    episodes: Array<Episode>;
    selectedEpisodeId: string;
    handleSelectEpisode: (id: string) => void;
    handleDeleteEpisode: (id: string) => void;
}

export default function EpisodeList({
	handleDeleteEpisode,
	selectedEpisodeId,
	episodes,
	handleSelectEpisode,
}: Props): ReactElement {
	return (
		<>
			{episodes
				.filter((episode) => episode.enabled === true)
				.map((episode, index) => {
					return (
						<div key={episode.id} className="inline-block">
							<div className="flex">
								<Button
									className="mr-2 mb-2"
									onClick={() => {
										handleSelectEpisode(episode.id);
									}}
									type={
										selectedEpisodeId === episode.id
											? "primary"
											: "default"
									}
								>
                                    Episode&nbsp;{index + 1}
								</Button>
								{selectedEpisodeId === episode.id ? (
									<div className="mr-5">
										<ButtonItemDelete
											message="Are your sure ?"
											key="genre-item-delete"
											onDelete={() => {
												handleDeleteEpisode(episode.id);
											}}
										/>
									</div>
								) : (
									""
								)}
							</div>
						</div>
					);
				})}
		</>
	);
}
