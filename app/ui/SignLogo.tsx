import { Grid, Typography } from "@mui/material";
import Image from "next/image";

const SignLogo = () => {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <Image src="/Trade-brand.png" alt="brand" width="90" height="60" />
      </Grid>
      <Typography align="center" component="h1" fontWeight="bold" variant="h5">
        تک تریدر
      </Typography>
    </Grid>
  );
};

export default SignLogo;
