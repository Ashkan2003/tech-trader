import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Copyright from "../components/Copyright";
import SignLogo from "../components/SignLogo";
import Form from "./Form";

export default function SignUp() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SignLogo />
        <Form />
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
