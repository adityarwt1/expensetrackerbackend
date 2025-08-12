import { DBconnect } from "@/lib/mongobd";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS(request: NextRequest) {
  try {
    const { fullname, email, image, password } = await request.json();

    console.log(fullname, email,password)
    /// condition of when not found the data
    if (!fullname || !email || !password) {
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

    // checking the existence from the databse
    await DBconnect();
    const exist = await User.findOne({ email });

    if (exist) {
      return NextResponse.json(
        { message: "User already exists" },
        {
          status: 409,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    //// hashing the password
    const hashedPassword = await bcrypt.hash(password, 5);

    /// time make the user successfully
    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      image: image ? image : "/logo.svg",
    });
    await user.save();

    return NextResponse.json(
      { user },
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
    /// internal server issue condition
    console.log((error as Error).message);
    return NextResponse.json(
      { error: "Internal server issue" },
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
