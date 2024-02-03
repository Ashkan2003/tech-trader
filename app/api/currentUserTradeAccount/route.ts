import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { UserBoughtSymbol } from "@prisma/client";

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
  const userTradeAccount = userFullInformation.at(0)?.tradeAccount;

  return NextResponse.json(userTradeAccount);
}

// this is for when the user buyed a symbol
// create a new userBoughtSymbol
// decrice from user property
// decrise from the main symbol-volume

type customType = {
  currentTradeAccountId: number;
  currentBoughtSymbol: UserBoughtSymbol;
  boughtSymbolName: string;
  boughtSymbolCount: number;
  newUserProperty: number;
};

export async function POST(request: NextRequest) {
  //
  const body = await request.json();

  const {
    currentTradeAccountId,
    currentBoughtSymbol,
    boughtSymbolName,
    boughtSymbolCount,
    newUserProperty,
  } = body as customType;

  // console.log(currentTradeAccountId, "ooooooooooooooo");
  // console.log(currentBoughtSymbol, "llllllllllllll");
  // console.log(boughtSymbolName, "ppppppppppppppp");
  // console.log(boughtSymbolCount, "pimmmmmmmmmmmm");

  const currentBoughtSymbolId = currentBoughtSymbol?.id ? currentBoughtSymbol.id : 0
  const currentBoughtSymbolCount = currentBoughtSymbol?.count ? currentBoughtSymbol.count : 0
 
  // upsert : if where true => update the current record. if where false => create new record
  const res = await prisma.userBoughtSymbol.upsert({
    where: {
      id: currentBoughtSymbolId,
    },
    // if the where condition true// if the prisma find a boughtSymbol with the givin id in where so its exist so update it
    update: {
      count: currentBoughtSymbolCount + boughtSymbolCount,
    },
    // if the where condition false // if the the prisma can not find boughtSymbol with the givin id in where so it is not exist so create it
    create: {
      symbolName: boughtSymbolName,
      count: boughtSymbolCount,
      tradeAccountId: currentTradeAccountId,
    },
  });

  // const res = await prisma.user.update({
  //   where: { email: currentUserEmail! },
  //   data: {
  //     tradeAccount: {
  //       update: {
  //         userProperty: newUserProperty,

  //         userBoughtSymbols: {
  //           create: {
  //             symbolName: boughtSymbolName,
  //             count: boughtSymbolCount,
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  return NextResponse.json(res);
}
