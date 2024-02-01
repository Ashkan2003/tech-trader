import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";


export async function GET(request: NextRequest) {
  //this is the way of geetting the user authState in server components
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email;

  // the relation in db: 1 user can have 1 tradeAccount.and 1 tradeAccount can have many userBoughtSymbol
  // this data includes all the user data-information. like User-model, UserTradeAccount, UserBoughtSymbol-model
  const userFullInformation = await prisma.user.findMany({
    where: { email: currentUserEmail },

    include: {
      tradeAccount: {
        include: { userBoughtSymbols: true },
      },
    },
  });

  // we only need the user trade-account from the userFullInformation
  const userTradeAccount = userFullInformation.at(0)?.tradeAccount

  return NextResponse.json(userTradeAccount);
}
