import { IMovieVideo } from "@/interfaces/interfaces";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const MovieVideoModal = ({
  changeState,
  overview,
  state,
  title,
  age,
  time,
  year,
  youtubeUrl,
}: IMovieVideo) => {
  return (
    <Dialog open={state} onOpenChange={() => changeState(!state)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="line-clamp-3">
            {overview}
          </DialogDescription>
          <div className="flex gap-x-2 items-center">
            <p>{year}</p>
            <p className="py-0.5 px-1 border rounded border-gray-200">{age}+</p>
            <p>{time}h</p>
          </div>
        </DialogHeader>
        <iframe src={youtubeUrl} height={250} className="w-full"></iframe>
      </DialogContent>
    </Dialog>
  );
};

export default MovieVideoModal;
