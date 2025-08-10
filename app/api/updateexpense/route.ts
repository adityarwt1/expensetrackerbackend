import { DBconnect } from "@/lib/mongobd";
import Expense from "@/models/Expense";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { amount, title, _id } = await request.json();

    /// in case invalid json
    if (!amount || !title || !_id) {
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

    // find and update the expense
    await DBconnect();
    const expense = await Expense.findOneAndUpdate(
      {
        _id,
      },
      {
        amount,
        title,
      },
      { new: true }
    );
    return NextResponse.json(
      {
        expense,
        message: "Expense update successfully",
      },
      {
        status: 200,
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
