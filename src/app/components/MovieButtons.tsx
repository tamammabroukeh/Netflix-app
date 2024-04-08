"use client";
import { Button } from "@/components/ui/button";
import { IMovieVideo } from "@/interfaces/interfaces";
import { InfoIcon, PlayCircle } from "lucide-react";
import { useState } from "react";
import MovieVideoModal from "./MovieVideoModal";
const MovieButtons = ({
  age,
  overview,
  time,
  title,
  year,
  youtubeUrl,
}: IMovieVideo) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} className="text-lg font-medium">
        <PlayCircle className="w-6 h-6 mr-2" /> Play
      </Button>
      <Button
        onClick={() => setOpen(true)}
        className="text-lg font-medium bg-white/40 text-white hover:bg-white/30"
      >
        <InfoIcon className="w-6 h-6 mr-2" /> Learn More
      </Button>
      <MovieVideoModal
        age={age}
        changeState={setOpen}
        overview={overview}
        state={open}
        time={time}
        title={title}
        year={year}
        youtubeUrl={youtubeUrl}
      />
    </>
  );
};

export default MovieButtons;
