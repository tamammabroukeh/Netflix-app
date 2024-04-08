import { Button } from "@/components/ui/button";
import prisma from "../utils/db";
import MovieButtons from "./MovieButtons";

const getData = async () => {
  const data = await prisma.movie.findFirst({
    select: {
      age: true,
      id: true,
      imageString: true,
      videoSource: true,
      title: true,
      release: true,
      overview: true,
      duration: true,
      youtubeString: true,
    },
  });
  return data;
};

const MovieVideo = async () => {
  const data = await getData();
  return (
    <div className="h-[55vh] w-full flex items-center justify-start">
      <video
        loop
        autoPlay
        muted
        src={data?.videoSource}
        poster={data?.imageString}
        className="w-full absolute top-0 left-0 object-cover h-[65vh] -z-10 brightness-[60%]"
      ></video>
      <div className="absolute w-[90%] lg:w-[40%] mx-auto">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
          {data?.title}
        </h1>
        <p className="line-clamp-3 text-white text-lg mt-5">{data?.overview}</p>
        <div className="flex gap-x-4 mt-4">
          <MovieButtons
            age={data?.age as number}
            overview={data?.overview as string}
            time={data?.duration as number}
            title={data?.title as string}
            youtubeUrl={data?.youtubeString as string}
            year={data?.release as number}
          />
        </div>
      </div>
    </div>
  );
};
export default MovieVideo;
