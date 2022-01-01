import { Button } from "antd";
import { Episode } from "app/model/episode";
import React, { ReactElement } from "react";

interface Props {
    episodes: Array<Episode>;
    selectedEpisodeId:string;
    handleSelectEpisode: (id:string)=> void
}

export default function EpisodeList({selectedEpisodeId,episodes,handleSelectEpisode}: Props): ReactElement {
	return (
		<>
			{
				episodes.map((episode,index)=>{return (
					<Button 
						className="mr-2"
						onClick={()=>{handleSelectEpisode(episode.id);}}
						key={episode.id} 
						type={selectedEpisodeId === episode.id ? "primary":"default"}
					>
                        Episode&nbsp;{index+1}
					</Button>
				);})
			}
		</>
	);
}
