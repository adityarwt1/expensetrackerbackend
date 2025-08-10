import { DBconnect } from "@/lib/mongobd";
import Expense from "@/models/Expense";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const _id = req.nextUrl.searchParams.get("id");

    /// is case of bad request
    if (!_id) {
      return NextResponse.json(
        { error: "bad request" },
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

    /// find and delete
    await DBconnect();
    await Expense.findOneAndDelete({
      _id,
    });

    return NextResponse.json(
      { message: "Expense deleted Successfully!" },
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
