import { Paper, InputBase, Divider, IconButton } from "@mui/material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { useCreateWatchList } from "../../features/reactQueryWatchList/useCreateWatchList";

interface Props {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const UserWatchInput = ({ inputValue, setInputValue }: Props) => {
  const { mutate } = useCreateWatchList();

  // this funcrion is for add a new watch to the watchList
  const handleInputAddBtn = async (watchName: string) => {
    // if the input value was empty dont do any thing
    if (watchName == "") return null;
    // send these information to useCreateWatchLists to create a new watchList
    mutate(watchName);
    // when the work finished,empty the input
    setInputValue("");
  };
  return (
    <Paper
      component="form"
      sx={{
        bgcolor: "success.main",
        mt: "10px",
        mx: "5px",
        display: "flex",
        alignItems: "center",
        height: "2.5rem",
        borderRadius: "7px",
        boxShadow: "0",
        border: "1px solid",
        borderColor: "secondary.main",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="افزودن دیده بان جدید"
      />
      <Divider sx={{ height: 28 }} orientation="vertical" />
      <IconButton
        onClick={() => handleInputAddBtn(inputValue)}
        size="large"
        sx={{ p: "10px" }}
      >
        <AddTwoToneIcon className="text-green-600" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default UserWatchInput;
