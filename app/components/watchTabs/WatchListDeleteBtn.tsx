import { IconButton } from "@mui/material";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { useDeleteWatchList } from "../../features/reactQueryWatchList/useDeleteWatchList";

interface Props {
  itemId: number;
}
// this is the watch-list delete-btn
const WatchListDeleteBtn = ({ itemId }: Props) => {
  const { mutate } = useDeleteWatchList();
  // this function is for deleting the selected watch from the watchList by its id
  const handleListDeleteBtn = (currentId: number) => {
    mutate(currentId);
  };
  return (
    <IconButton onClick={() => handleListDeleteBtn(itemId)} size="medium">
      <HighlightOffRoundedIcon fontSize="inherit" color="warning" />
    </IconButton>
  );
};

export default WatchListDeleteBtn;
