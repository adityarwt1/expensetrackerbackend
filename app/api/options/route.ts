import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS(req:NextRequest) {

    try {
        
        return NextResponse.json({message: "Hello world"},{
            headers:{
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"POST",
                
            }
        })
    } catch (error) {
        return NextResponse.json({error: (error as Error).message},{
            status: 500,
            headers:{
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"POST",

            }
        })
    }
    
}