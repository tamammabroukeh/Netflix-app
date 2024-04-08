export interface INavbar {
  id: number;
  name: string;
  href: string;
}
export interface IMovieCard {
  movieId: number;
  overview: string;
  title: string;
  watchListId: string;
  watchList: boolean;
  youtubeUrl: string;
  age: number;
  year: number;
  time: number;
}
export interface IMovieVideo {
  overview: string;
  title: string;
  state: boolean;
  changeState?: (state: boolean) => void;
  youtubeUrl: string;
  age: number;
  time: number;
  year: number;
}
