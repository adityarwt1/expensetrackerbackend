import { DBconnect } from "@/lib/mongobd";
import Expense from "@/models/Expense";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const corseHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
export async function POST(req: NextRequest) {
  try {
    const { title, amount, currency, userid, type } = await req.json();

    if (!title || !amount || !currency || !userid) {
      return NextResponse.json(
        { error: "Bad request" },
        {
          status: 400,
          headers: corseHeader
        }
      );
    }

    await DBconnect();
    const expense = new Expense({
      title,
      amount,
      currency,
      type,
      userid: new mongoose.Types.ObjectId(userid as string),
    });
    await expense.save();

    return NextResponse.json(
      { expense },
      {
        status: 201,
        headers: corseHeader
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      {
        status: 500,
        headers: corseHeader
      }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
  {
    message:"Corse preflight"
  },
  {
    status: 200,
    headers:corseHeader
  })
  
}