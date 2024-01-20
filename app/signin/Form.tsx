"use client";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import Copyright from "../components/Copyright";

export default function Form() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        color="info"
        margin="normal"
        required
        fullWidth
        id="email"
        label="آدرس ایمیل"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        color="info"
        margin="normal"
        required
        fullWidth
        name="password"
        label="رمز عبور"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="info" />}
        label="مرا به خاطر بسپار"
      />
      <Button
        type="submit"
        color="info"
        fullWidth
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
      >
        ورود
      </Button>

      <Grid container>
        <Grid item xs>
          <Link href="#" className="text-blue-600">
            فراموشی کلمه عبور
          </Link>
        </Grid>
        <Grid item>
          <Link href="/signup" className="text-blue-600">
            ثبت نام
          </Link>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
}
