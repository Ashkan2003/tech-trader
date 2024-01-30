import { Typography } from "@mui/material";

interface Props {
  title: string;
  des: string;
  optionDes?: string;
}

const InfoBox = ({ des, title, optionDes }: Props) => {
  return (
    <div className="bg-stone-200 hover:bg-yellow-300 h-11 p-1 ps-2 dark:bg-gray-600 dark:hover:bg-[#d1bb1597] hover:dark:text-white transition-all cursor-pointer">
      <Typography>{title}</Typography>
      <div className="flex">
        <Typography className=" text-gray-600 dark:text-gray-300  pe-3">{des}</Typography>
        <Typography sx={{color:"#7bcd16",fontWeight:"bold"}}>{optionDes}</Typography>
      </div>
    </div>
  );
};

export default InfoBox;
