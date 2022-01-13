import { Episode } from "./episode";
import { Genre } from "./genre";
import { Video } from "./video";

export interface MovieModel {
    id: string;
    adult: boolean;
    backdrop_path: string;
    poster_path:string;
    budget: number;
    homepage: string;
    revenue: number;
    release_date: string;
    title: string;
    vote_count:number;
    vote_average?: number;
    // isTVSeries: boolean;
    original_language: boolean;
    genre_ids: Array<Genre> | Array<string>;
    genres:Array<Genre>;
    overview:string;
    original_title:string;
    video: boolean;
    episodes: Array<Episode>
    enabled:boolean;
    trailer1:string;
    trailer2:string;
    movie_id_fake:string;
    videos?:Video[],
    is_tv_series:boolean,
    name?:string
}

export interface MovieModelCamelCase {
    id: string,
    backdrop_path: string,
    title: string,
    originalTitle:string,
    overview: string,
    posterPath: string,
    releaseDate: string,
    budget: number,
    homepage: string,
    is_tv_series: boolean,
    adult: false,
    genreIds: Array<string>,
    originalLanguage: string,
    revenue: number,
    voteAverage: number,
    voteCount: number,
    likeCount: number,
    viewCount: number,
    episodes:Array<Episode>
}

export const MovieModelMapPattern= {
	// release_date : "release_date",
	// releaseDate:"release_date",
	// poster_path:"posterPath",
	// posterPath:"poster_path",
	// genreIds:"genre_ids",
	// genre_ids:"genreIds",
	// original_title:"originalTitle",
	// originalTitle:"original_title",
	// is_tv_series:"isTVSeries",
	back_drop_path:"backdrop_path",
	genres:"genre_ids",
};


