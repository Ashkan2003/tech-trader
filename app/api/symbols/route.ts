import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

export async function GET(request: NextRequest) {
  const symbols = await prisma.symbols.findMany(); // get all the symbols from the db
  return NextResponse.json(symbols); // the sybmols is an array of obj
}
