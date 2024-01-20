import { Box, CircularProgress } from "@mui/material";

const loading = () => {
  return (
    <div className="text-center mt-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <Box sx={{ display: "flex" }} color="blue">
        <CircularProgress />
      </Box>
    </div>
  );
};

export default loading;
