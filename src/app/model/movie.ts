export interface MovieModel {
    id: string;
    adult: boolean;
    backdrop_path: string;
    budget: number;
    homepage: string;
    revenue: number;
    release_date: string;
    title: string;
    vote_average?: number;
    isTVSeries: boolean;
    original_language: boolean;
    genre_ids: Array<string>;
    overview:string;
    original_title:string;
    video: boolean;
}

export interface MovieModelCamelCase {
    id: string,
    adult: false,
    backdrop_path: string,
    budget: number,
    homepage: string,
    originalLanguage: string,
    originalTitle:string,
    overview: string,
    posterPath: string,
    releaseDate: string,
    revenue: number,
    title: string,
    voteAverage: number,
    voteCount: number,
    likeCount: number,
    viewCount: number,
    genreIds: Array<string>,
    isTVSeries: boolean,
}

export const MovieModelMapPattern= {
	release_date : "releaseDate",
	releaseDate:"release_date",
	poster_path:"posterPath",
	posterPath:"poster_path",
	genreIds:"genre_ids",
	genre_ids:"genreIds",
	original_title:"originalTitle",
	originalTitle:"original_title",
};


