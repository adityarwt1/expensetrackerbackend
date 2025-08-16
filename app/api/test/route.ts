import { NextRequest, NextResponse } from "next/server";

// Handle POST requests
export async function POST(request: NextRequest) {
  try {
    const { fullname, email, password } = await request.json();
    if (!fullname || !email || !password) {
      return NextResponse.json(
        { error: "Bad request" },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }
    return NextResponse.json(
      { message: "Hello from expense tracker backend" },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

// Handle CORS preflight (OPTIONS requests)
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 204,
      headers: corsHeaders,
    }
  );
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
