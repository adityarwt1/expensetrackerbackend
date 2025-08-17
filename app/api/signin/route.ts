import { DBconnect, DBdisconnect } from "@/lib/mongobd";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Bad request" },
        {
          status: 400,
          headers: corsHeaders
        }
      );
    }

    /// gettin the user data from the db
    await DBconnect();
    const user = await User.findOne({ email }).select(
      "email password fullname"
    );
    await DBdisconnect();
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        {
          status: 404,
          headers: corsHeaders
        }
      );
    }

    /// checking the passoword tru orr not
    const isPasswordTrue = await bcrypt.compare(password, user.password);
    if (!isPasswordTrue) {
      return NextResponse.json(
        { error: "Wrong Password" },
        {
          status: 400,
          headers: corsHeaders
        }
      );
    }

    // returning the final user login data
    return NextResponse.json(
      { message: "Hellow from the cors api", user },
      {
        status: 200,
        headers: corsHeaders
      }
    );
  } catch (error) {
    /// internal server issue condition
    console.log((error as Error).message);
    return NextResponse.json(
      { error: "Internal server issue" },
      {
        status: 500,
        headers: corsHeaders
      }
    );
  }
}


export async function OPTIONS() {
  return NextResponse.json(
    { message: "CORS preflight successful" },
    { status: 200, headers: corsHeaders }
  );
}
