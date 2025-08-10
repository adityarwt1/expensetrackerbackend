import { DBconnect } from "@/lib/mongobd";
import Expense from "@/models/Expense";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, amount, method, userid } = await req.json();
    /// in case of bad request
    if (!title || !amount || !method || !userid) {
      return NextResponse.json(
        { error: "Bad request" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    /// time to addd the expense to the
    await DBconnect();
    const expense = new Expense({
      title,
      amount,
      method,
      userid: new mongoose.Types.ObjectId(userid as string),
    });
    await expense.save();

    return NextResponse.json(
      { expense },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}
