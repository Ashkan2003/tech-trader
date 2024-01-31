import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import { create } from "domain";

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
      // one user can have many watchList
      // set these new datas in the user-table
      data: {
        // these are the User-model informations
        name: body.name,
        lastName: body.lastName,
        email: body.email,
        hashedPassword: hashedPassword,
        // these are the WatchList-model information that have a relation with the user
        watchLists: {
          create: [{ title: "دارایی های من", symbols: "" }],
        },
        // these are the TradeAccount-mode information
        tradeAccount: {
          create: {
            // these are the UserBoughtSymbol information
            userBoughtSymbols: {
              create: [{ symbolName: "تابه",count:6000 }],
            },
          },
        },
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
