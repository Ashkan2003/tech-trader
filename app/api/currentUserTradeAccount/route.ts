import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { UserBoughtSymbol } from "@prisma/client";
import toast from "react-hot-toast";

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
  newboughtSymbolName: string;
  newboughtSymbolCount: number;
  userNewProperty: number;
};

export async function POST(request: NextRequest) {
  // get the body
  const body = await request.json();

  // destructure the body
  const {
    currentTradeAccountId,
    currentBoughtSymbol,
    newboughtSymbolName,
    newboughtSymbolCount,
    userNewProperty,
  } = body as customType;

  const currentBoughtSymbolId = currentBoughtSymbol?.id
    ? currentBoughtSymbol.id
    : 0;
  const currentBoughtSymbolCount = currentBoughtSymbol?.count
    ? currentBoughtSymbol.count
    : 0;

  //1: update or create a boughtSymbol   // upsert : if where true => update the current record. if where false => create new record
  const res1 = await prisma.userBoughtSymbol.upsert({
    where: {
      id: currentBoughtSymbolId,
    },
    // if the where condition true// if the prisma find a boughtSymbol with the givin id in where so its exist so update it
    update: {
      count: currentBoughtSymbolCount + newboughtSymbolCount,
    },
    // if the where condition false // if the the prisma can not find boughtSymbol with the givin id in where so it is not exist so create it
    create: {
      symbolName: newboughtSymbolName,
      count: newboughtSymbolCount,
      tradeAccountId: currentTradeAccountId,
    },
  });

  // if res null
  if (!res1)
    return NextResponse.json({ error: "error on api" }, { status: 400 });

  //2: update the user-property
  const res2 = await prisma.tradeAccount.update({
    where: { id: currentTradeAccountId },
    data: {
      userProperty: userNewProperty,
    },
  });

  if (!res2)
    return NextResponse.json({ error: "error on api" }, { status: 400 });

  // fetch the current-symbol that user is buying from it
  const symbol = await prisma.symbols.findUnique({
    where: { symbolName: newboughtSymbolName },
  });

  if(symbol?.volume! < newboughtSymbolCount){
    toast.error("لطفا مقدار حجم خریداری شده را کاهش دهید.")
  }

  //3: update(decrice volume) the symbol that user bought
  const res3 = await prisma.symbols.update({
    where: { symbolName: newboughtSymbolName },
    data: {
      volume: symbol?.volume! - newboughtSymbolCount,
    },
  });

  return NextResponse.json(res3);
}
