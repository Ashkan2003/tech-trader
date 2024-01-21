"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

const schema = z.object({
  name: z.string().min(3, { message: "حداقل کاراکتر برای نام رعایت نشده." }),
  lastName: z
    .string()
    .min(3, { message: "حداقل کاراکتر برای نام خانوادگی رعایت نشده" }),
  email: z.string().email({ message: "فرمت ایمیل باید درست باشد." }),
  password: z
    .string()
    .min(8, { message: "حداقل رمز عبور باید 8 کاراکتر باشد." }),
});

const Form = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    try {
      const res = await axios({
        method: "post",
        url: "/api/signupApi",
        data: {
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        },
      });

      if (res.status == 200) {
        router.push("/");
        toast.success("ثبت نام با موفقیت انجام شد.");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error("ثبت نام ناموفق بود.");
      if (error.response.status == 409)
        toast.error("این آدرس ایمیل قبلا استفاده شده است.");
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            color="info"
            autoComplete="given-name"
            fullWidth
            id="firstName"
            label="نام"
            autoFocus
            {...register("name")}
          />
          {errors.name?.message && (
            <Typography color="red">{errors.name?.message}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            color="info"
            required
            fullWidth
            id="lastName"
            label="نام خانوادگی"
            autoComplete="family-name"
            {...register("lastName")}
          />
          {errors.lastName?.message && (
            <Typography color="red">{errors.lastName?.message}</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="info"
            required
            fullWidth
            id="email"
            label="آدرس ایمیل"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email?.message && (
            <Typography color="red">{errors.email?.message}</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="info"
            required
            fullWidth
            label="رمز عبور"
            type="password"
            id="password"
            autoComplete="new-password"
            {...register("password")}
          />
          {errors.password?.message && (
            <Typography color="red">{errors.password?.message}</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="info" />}
            label="دریافت ایمیل از تک تریدر"
          />
        </Grid>
      </Grid>
      <Button
        color="info"
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ mt: 3, mb: 2 }}
      >
        {loading ? <CircularProgress size={25} color="info" /> : "ثبت نام"}
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/signin" className="text-blue-600">
            حساب کاربری دارید؟ ورود
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
