import { DBconnect } from "@/lib/mongobd";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// Reusable CORS headers for all responses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function POST(request: NextRequest) {
  try {
    const { fullname, email, image, password } = await request.json();
    console.log("Received signup data:", fullname, email, password);

    // Validate incoming data
    if (!fullname || !email || !password) {
      return NextResponse.json(
        { error: "Bad request: Missing required fields." },
        { status: 400, headers: corsHeaders }
      );
    }

    // Connect to DB and check if user already exists
    await DBconnect();
    const exist = await User.findOne({ email });

    if (exist) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409, headers: corsHeaders }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      image: image ? image : "/logo.svg",
    });

    await user.save();

    // Respond with the newly created user (redact password field)
    return NextResponse.json(
      {
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          image: user.image,
        },
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server issue" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle CORS preflight (OPTIONS)
export async function OPTIONS() {
  return NextResponse.json(
    { message: "CORS preflight successful" },
    { status: 200, headers: corsHeaders }
  );
}
