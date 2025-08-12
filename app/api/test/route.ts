import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try {
            return NextResponse.json(
              { message: "Hellow from expense tracker backend" },
              {
                status: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "GET",
                  "Access-Control-Allow-Headers": "Content-Type",
                },
              }
            );
    } catch (error) {
        return NextResponse.json({error: (error as Error).message},{status:500,
            headers:{
                'Access-Control-Allow-Origin':"*",
                "Access-Control-Allow-Methods":"GET",
                "Access-Control-Allow-Headers":'Content-Type'
            }
        })
    }
    
}