"use server";
import { revalidatePath } from "next/cache";
import prisma from "./utils/db";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
export const addToWatchList = async (formData: FormData) => {
  "use server";
  const movieId = formData.get("movieId");
  const pathname = formData.get("pathname") as string;
  const session = await getServerSession(options);
  const data = await prisma.watchList.create({
    data: {
      userId: session?.user?.email,
      movieId: Number(movieId),
    },
  });
  revalidatePath(pathname);
};
export const deleteFromWatchList = async (formData: FormData) => {
  "use server";
  const watchListId = formData.get("watchListId") as string;
  const pathname = formData.get("pathname") as string;
  const data = await prisma.watchList.delete({
    where: {
      id: watchListId,
    },
  });
  revalidatePath(pathname);
};
