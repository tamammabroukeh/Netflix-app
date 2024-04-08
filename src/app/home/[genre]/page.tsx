import { options } from "@/app/api/auth/[...nextauth]/options";
import MovieCard from "@/app/components/MovieCard";
import prisma from "@/app/utils/db";
import { getServerSession } from "next-auth";
import Image from "next/image";

const getData = async (category: string, userId: string) => {
  switch (category) {
    case "shows": {
      const data = await prisma.movie.findMany({
        where: {
          category: "show",
        },
        select: {
          age: true,
          id: true,
          duration: true,
          overview: true,
          imageString: true,
          title: true,
          release: true,
          youtubeString: true,
          WatchLists: {
            where: {
              userId: userId,
            },
          },
        },
      });
      return data;
    }
    case "movies": {
      const data = await prisma.movie.findMany({
        where: {
          category: "movie",
        },
        select: {
          age: true,
          id: true,
          overview: true,
          imageString: true,
          title: true,
          youtubeString: true,
          release: true,
          duration: true,
          WatchLists: {
            where: {
              userId: userId,
            },
          },
        },
      });
      return data;
    }
    case "recently": {
      const data = await prisma.movie.findMany({
        where: {
          category: "recent",
        },
        select: {
          age: true,
          id: true,
          overview: true,
          imageString: true,
          title: true,
          youtubeString: true,
          release: true,
          duration: true,
          WatchLists: {
            where: {
              userId: userId,
            },
          },
        },
      });
      return data;
    }
    default: {
      throw new Error();
    }
  }
};

const Categorypage = async ({ params }: { params: { genre: string } }) => {
  const session = await getServerSession(options);
  const data = await getData(params.genre, session?.user?.email as string);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6">
      {data.map((movie) => {
        return (
          <div key={movie.id} className="relative h-60">
            <Image
              src={movie.imageString}
              alt={movie.title}
              width={500}
              height={400}
              className="object-cover w-full h-full absolute rounded-sm"
            />
            <div className="duration-500 transform transition h-60 relative w-full z-10 hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
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

export default Categorypage;
