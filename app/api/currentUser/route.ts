import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

// this is a get-api for getting the current user information by the email- of nextAuth
export async function GET(request: NextRequest) {
  //this is the way of geetting the user authState in server components
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;

  const user = await prisma.user.findUnique({
    where: { email: currentUserEmail! },
  });

  return NextResponse.json(user);
}
