import { options } from "@/app/api/auth/[...nextauth]/options";
import MovieCard from "@/app/components/MovieCard";
import prisma from "@/app/utils/db";
import { getServerSession } from "next-auth";
import Image from "next/image";

const getData = async (userId: string) => {
  const data = await prisma.watchList.findMany({
    where: {
      userId: userId,
    },
    select: {
      Movie: {
        select: {
          age: true,
          duration: true,
          id: true,
          youtubeString: true,
          WatchLists: true,
          release: true,
          overview: true,
          title: true,
          imageString: true,
        },
      },
    },
  });
  return data;
};
const page = async () => {
  const session = await getServerSession(options);
  const data = await getData(session?.user?.email as string);
  console.log(data);
  return (
    <>
      <h1 className="font-semibold text-4xl text-white px-5 sm:px-0 mt-10">
        Your watchlist
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6">
        {data.map((movie) => {
          return (
            <div key={movie.Movie?.id} className="relative h-60">
              <Image
                src={movie.Movie?.imageString as string}
                alt={movie.Movie?.title as string}
                width={500}
                height={400}
                className="object-cover w-full h-full absolute rounded-sm"
              />
              <div className="duration-500 transform transition h-60 relative w-full z-10 hover:scale-125 opacity-0 hover:opacity-100">
                <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                  <Image
                    src={movie.Movie?.imageString as string}
                    alt={movie.Movie?.title as string}
                    width={800}
                    height={800}
                    className="rounded-lg -z-10 absolute h-full w-full object-cover"
                  />
                  <MovieCard
                    movieId={movie.Movie?.id as number}
                    overview={movie.Movie?.overview as string}
                    title={movie.Movie?.title as string}
                    watchList={
                      (movie.Movie?.WatchLists.length as number) > 0
                        ? true
                        : false
                    }
                    watchListId={movie.Movie?.WatchLists[0]?.id as string}
                    youtubeUrl={movie.Movie?.youtubeString as string}
                    age={movie.Movie?.age as number}
                    time={movie.Movie?.duration as number}
                    year={movie.Movie?.release as number}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default page;
