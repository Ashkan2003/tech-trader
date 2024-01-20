"use client";
import {
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import Link from "next/link";
import React from "react";

const Form = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            color="info"
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="نام"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            color="info"
            required
            fullWidth
            id="lastName"
            label="نام خانوادگی"
            name="lastName"
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="info"
            required
            fullWidth
            id="email"
            label="آدرس ایمیل"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="info"
            required
            fullWidth
            name="password"
            label="رمز عبور"
            type="password"
            id="password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="info" />}
            label="دریافت ایمیل از تک تریدر"
          />
        </Grid>
      </Grid>
      <Button color="info" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        ثبت نام
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/signin" className="text-blue-600">حساب کاربری دارید؟ ورود</Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
