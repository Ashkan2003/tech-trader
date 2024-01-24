import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

// this is a get api to get the current-user-watchLists
export async function GET(request: NextRequest) {
  //this is the way of geetting the user authState in server components
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;

  // fetch the current user-watchLists
  // becus the User-model has a relation with WatchLists-model, so we can get the watchLists from user
  const currentUser = await prisma.user.findUnique({
    where: { email: currentUserEmail! }, //filter// get only the current logged in user, by the currentUserEmail
    include: { watchLists: true }, // include the wathLists
  });

  // we only need the user watchLists information
  const currentUserWatchLists = currentUser?.watchLists;
  return NextResponse.json(currentUserWatchLists);
}

// this is a post-api to create a new watchList for the current-user
export async function POST(request: NextRequest) {
  const body = await request.json();

  //this is the way of geetting the user authState in server components
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;

  const res = await prisma.user.update({
    where: { email: currentUserEmail! }, //filter// get only the current logged in user, by the currentUserEmail
    data: {
      watchLists: {
        // when we are creating a new watchList we only need watchTitle
        create: [{ title: body.watchTitle, symbols: "" }],
      },
    },
  });

  return NextResponse.json(res);
}
