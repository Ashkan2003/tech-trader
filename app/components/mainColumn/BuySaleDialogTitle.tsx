import {
  DialogTitle,
  IconButton,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  symbolName: string;
  symbolState: string;
  handleClose: any;
}

const BuySaleDialogTitle = ({
  handleClose,
  symbolName,
  symbolState,
}: Props) => {
  return (
    <DialogTitle className="flex-col sm:flex sm:flex-row  items-center justify-between !p-1 !py-3">
      <div className="flex items-center">
        <IconButton size="large" onClick={handleClose}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
        <Typography fontSize="20px">
          {symbolName}-بورس-نقدی
        </Typography>
      </div>
      <FormControl>
        <RadioGroup className="!pe-3" row name="row-radio-buttons-group">
          <FormControlLabel
            sx={{
              color: "cusBlue.main",
            }}
            value="female"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#ff0505",
                  },
                }}
              />
            }
            checked
            label={symbolState === "ALLOWED" ? "مجاز" : "ممنوع"}
            labelPlacement="start"
          />
          <FormControlLabel
            sx={{
              color: "cusBlue.main",
            }}
            value="male"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#80be1c",
                  },
                }}
              />
            }
            checked
            label="مداخله ناظر"
            labelPlacement="start"
          />
        </RadioGroup>
      </FormControl>
    </DialogTitle>
  );
};

export default BuySaleDialogTitle;
