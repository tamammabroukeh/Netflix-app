import Image from "next/image";
import prisma from "../utils/db";
import MovieCard from "./MovieCard";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const getData = async (userId: string) => {
  const data = await prisma.movie.findMany({
    select: {
      id: true,
      WatchLists: {
        where: {
          userId: userId,
        },
      },
      imageString: true,
      videoSource: true,
      title: true,
      overview: true,
      youtubeString: true,
      age: true,
      release: true,
      duration: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });
  return data;
};
const RecentlyAdded = async () => {
  const session = await getServerSession(options);
  const data = await getData(session?.user?.email as string);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {data.map((movie) => {
        return (
          <div className="relative h-48" key={movie.id}>
            <Image
              src={movie.imageString}
              alt={movie.title}
              width={400}
              height={400}
              className="rounded-sm absolute h-full w-full object-cover"
            />
            <div className="duration-500 transform transition h-60 relative w-full z-10 hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center border">
                <Image
                  src={movie.imageString}
                  alt={movie.title}
                  width={800}
                  height={800}
                  className="rounded-lg -z-10 absolute h-full w-full object-cover"
                />
                <MovieCard
                  movieId={movie.id}
                  overview={movie.overview}
                  title={movie.title}
                  watchList={movie.WatchLists.length > 0 ? true : false}
                  watchListId={movie.WatchLists[0]?.id}
                  youtubeUrl={movie.youtubeString}
                  age={movie.age}
                  time={movie.duration}
                  year={movie.release}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentlyAdded;
