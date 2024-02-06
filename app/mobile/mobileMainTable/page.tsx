import { Box } from "@mui/material";
import MainColHeader from "../../components/mainColumn/MainColHeader";
import MainTable from "../../components/mainColumn/MainTable";
import WatchTabs from "@/app/components/watchTabs/WatchTabs";

export default async function MobileHomePage() {
  return (
    <Box bgcolor="lemon.main" className="mb-11">
      <WatchTabs />
      <MainColHeader />
      <MainTable />
    </Box>
  );
}
