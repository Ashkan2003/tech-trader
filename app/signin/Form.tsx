"use client";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

import Copyright from "../ui/Copyright";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

interface FormData {
  email: string;
  password: string;
}

const schema = z.object({
  email: z.string().email({ message: "فرمت ایمیل باید درست باشد." }),
  password: z
    .string()
    .min(8, { message: "حداقل رمز عبور باید 8 کاراکتر باشد." }),
});

export default function Form() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!res?.error) {
        toast.success("ورود با موفقیت انجام شد.");
        router.push("/");
        setLoading(false);
      } else if (res.status == 401) {
        toast.error("نام کاربری یا رمز عبور اشتباه");
        setLoading(false);
      }
    } catch (error: any) {
      toast.error("ورود ناموفق");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 1 }}
    >
      <TextField
        color="info"
        margin="normal"
        fullWidth
        id="email"
        label="آدرس ایمیل"
        autoComplete="email"
        autoFocus
        {...register("email")}
      />
      {errors.email?.message && (
        <Typography color="red">{errors.email?.message}</Typography>
      )}
      <TextField
        color="info"
        margin="normal"
        required
        fullWidth
        label="رمز عبور"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register("password")}
      />
      {errors.password?.message && (
        <Typography color="red">{errors.password?.message}</Typography>
      )}
      <FormControlLabel
        control={<Checkbox value="remember" color="info" />}
        label="مرا به خاطر بسپار"
      />
      <Button
        type="submit"
        color="info"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ mt: 2, mb: 2 }}
      >
        {loading ? <CircularProgress size={25} color="info" /> : "ورود"}
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
