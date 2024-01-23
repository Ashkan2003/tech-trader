import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Form from "./Form";
import SignLogo from "../components/SignLogo";

export default function SignIn() {
  return (
    <Grid container  component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        xl={4}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 7,
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
          }}
        >
          <SignLogo />
          <Form />
        </Box>
      </Grid>
      <Grid className="relative" item xs={false} sm={4} md={7} xl={8} sx={{}}>
        <Image src="/p1.png" fill={true} alt="backgroundImg" />
      </Grid>
    </Grid>
  );
}
