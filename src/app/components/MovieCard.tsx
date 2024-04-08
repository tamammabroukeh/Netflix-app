"use client";
import { Button } from "@/components/ui/button";
import { IMovieCard } from "@/interfaces/interfaces";
import { Heart, PlayCircle } from "lucide-react";
import MovieVideo from "./MovieVideo";
import MovieVideoModal from "./MovieVideoModal";
import { useState } from "react";
import { addToWatchList, deleteFromWatchList } from "../action";
import { usePathname } from "next/navigation";
const MovieCard = ({
  movieId,
  overview,
  title,
  watchList,
  watchListId,
  youtubeUrl,
  age,
  time,
  year,
}: IMovieCard) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <button onClick={() => setOpen(true)} className="-mt-14">
        <PlayCircle className="h-20 w-20" />
      </button>
      <div className="right-5 top-5 z-10 absolute">
        {watchList && (
          <form action={deleteFromWatchList}>
            <input type="hidden" name="watchListId" value={watchListId} />
            <input type="hidden" name="pathname" value={pathname} />
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4 text-red-500" />
            </Button>
          </form>
        )}
        {!watchList && (
          <form action={addToWatchList}>
            <input type="hidden" name="movieId" value={movieId} />
            <input type="hidden" name="pathname" value={pathname} />
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
      <div className="p-5 bottom-0 absolute left-0">
        <h1 className="text-lg font-bold line-clamp-1">{title}</h1>
        <div className="flex gap-x-2 items-center">
          <p className="font-normal text-sm">{year}</p>
          <p className="font-normal text-sm py-0.5 px-1 border rounded border-gray-200">
            {age}+
          </p>
          <p className="font-normal text-sm">{time}h</p>
        </div>
        <p className="line-clamp-1 text-sm text-gray-200 font-light">
          {overview}
        </p>
      </div>
      <MovieVideoModal
        overview={overview}
        title={title}
        youtubeUrl={youtubeUrl}
        state={open}
        changeState={setOpen}
        age={age}
        time={time}
        year={year}
      />
    </>
  );
};
export default MovieCard;
