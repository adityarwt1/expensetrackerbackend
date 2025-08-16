import { DBconnect } from "@/lib/mongobd";
import Expense from "@/models/Expense";
import { NextRequest, NextResponse } from "next/server";

const corsHeader = {
  "Access-Control-Allow-Origin":"*",
  "Access-Control-Allow-Methods":"POST, OPTIONS",
  "Access-Control-Allow-Headers":"Content-Type"
}
export async function POST(req: NextRequest) {
  try {
    const _id = req.nextUrl.searchParams.get("id");
    const userid = req.nextUrl.searchParams.get("userid");
    const query = req.nextUrl.searchParams.get("q");
    const amount = req.nextUrl.searchParams.get("amount");

    /// using the diffrent filter for the
    let filter: any = {};
    if (_id) {
      filter._id = _id;
    }

    if (userid) {
      filter.userid = userid;
    }

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { amount: { $regex: query, $options: "i" } },
      ];
    }
    if (amount) {
      filter.amount = amount;
      filter.$or = [{ amount: { $regex: amount, $options: "i" } }];
    }

    /// finding the expense \
    await DBconnect();
    const expense = await Expense.find(filter);
    return NextResponse.json(
      { expense },
      {
        status: 200,
        headers: corsHeader
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      {
        status: 500,
        headers: corsHeader
      }
    );
  }
}
