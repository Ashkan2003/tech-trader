import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import bcrypt from "bcrypt";

// this post-resquet is for sign up the user
export async function POST(request: NextRequest) {
  // post the new user email and password in the database
  try {
    // so get the body of request from the signup form witch send the inforamtion by axios
    const body = await request.json();

    // check if the new user email (in body) is in the database by prisma-findUnique-mathod
    const user = await prisma.user.findUnique({ where: { email: body.email } });

    //this is server-side validation
    if (user) {
      // so if the user exist, it means that the new user-email is allready in the data base
      return NextResponse.json(
        { error: "User already exist" },
        { status: 409 }
      );
    }

    // hash the password for security reosens
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.user.create({
      // set these new datas in the user-table
      data: {
        name: body.name,
        email: body.email,
        hashedPassword: hashedPassword,
      },
    });

    return NextResponse.json({ email: newUser.email });


  } catch (error: any) {
    JSON.stringify({
      status: "error",
      message: error.message,
    }),
      { status: 300 };
  }
}
