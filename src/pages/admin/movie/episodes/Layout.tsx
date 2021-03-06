import { Button, Image, message } from "antd";
import { movieApi } from "app/api/movie";
import { MovieModel, MovieModelCamelCase, MovieModelMapPattern } from "app/model/movie";
import React, { ReactElement, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import EpisodeList from "./EpisodeList";
import movieDbApiConfig from "app/api/theMovieDBApi/config";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import { episodeApi } from "app/api/episode";
import { Episode } from "app/model/episode";
import { MapVariable } from "app/utils/mapVariable";
interface Props {
    movie?: string;
}

export default function EpisodeManagementLayout(): ReactElement {
	const { movieId } = useParams();
	const [movie, setMovie] = useState<MovieModel>();
	const [selectedEpisodeId, setSelectedEpisodeId] = useState<string>();

	const [listEpisodes, setListEpisodes] = useState<Episode[]>();

	const { episodeId } = useParams();

	const navigate = useNavigate();
	async function getDetailMovie(id: string) {
		try {
			const response = await movieApi.getById(id);
			const movieDetail = MapVariable<MovieModel>(response.data,MovieModelMapPattern);
			setMovie(movieDetail);
			setListEpisodes(response.data.episodes);
		} catch (error) {
			message.error("Can not load the movie detail");
		}
	}
	async function deleteEpisode(id: string) {
		try {
			const response = await episodeApi.delete(id);
			
			const newListEpisodes = listEpisodes.filter(
				(episode) => episode.id !== id,
			);
			setListEpisodes(newListEpisodes);
			message.success("Deleted Episode");
		} catch (error) {
			message.error("Something went wrong when delete episode");
		}
	}

	async function handleCreateEpisode() {
		try {
			let ordinal = 0;
			if (movie.episodes.length > 0) {
				ordinal = movie.episodes[movie.episodes.length - 1].ordinal + 1;
			}
			const episodeToCreate: Partial<Episode> = {
				name: "NEW EPISODE",
				ordinal,
				content: "no content",
				movieId: movie.id,
			};

			const response = await episodeApi.add(episodeToCreate);
			
			const newEpisode = response.data;
			setListEpisodes([...listEpisodes, newEpisode]);
			// window.location.reload();
			navigate(
				`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.MOVIE}/${movie.id}/episode/${newEpisode.id}`,
			);

			message.success("Created the episode");
		} catch (error) {
			
			message.error("Something when wrong when create episode");
		}
	}

	

	useEffect(() => {
		getDetailMovie(movieId);
	}, []);

	if (!movie)
		return (
			<div className="flex  content-center">
				<Spin />
			</div>
		);
	return (
		<div>
			<div className="flex">
				<div className="mr-5">
					<Image
						preview
						height={200}
						src={movieDbApiConfig.originalImage(movie.poster_path)}
					/>{" "}
				</div>
				<div>
					<h1 className="text-3xl">{movie.title}</h1>
					<p className="">{movie.overview}</p>
					<p className="italic">List of episodes</p>
					<EpisodeList
						episodes={listEpisodes || []}
						handleSelectEpisode={(id) => {
							navigate(
								`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.MOVIE}/${movie.id}/episode/${id}`,
							);
						}}
						handleDeleteEpisode={deleteEpisode}
						selectedEpisodeId={episodeId}
					/>
					<Button
						onClick={() => {
							handleCreateEpisode();
						}}
						type="primary"
						icon={<PlusCircleOutlined />}
					>
                        New Epispde
					</Button>
				</div>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}

/* 

1. Flow 
    + click on button "episode management" -> change route
    + open list of episode page -> get api render list of episodes
    + click on episode -> change route detail episode, color the button


2. Api
    + get episodes of movie 
    + add episode
    + update episode
    + delete episode



3. Component
    1. Main Management Episode:  movie/id/episode
        render -> get Episodes -> states
        
        1. Episode Navigation

            1. Episode Add/ Edit

                1. Episode Form

4. Task
    - l??m api
    - l??m route t??? manage movies d???n ?????n episodes
    - render danh s??ch c??c episode trong episode management
    
    - setup router cho danh s??ch episode
    - set event ????? data form v??o t???ng form n???u 

*/
