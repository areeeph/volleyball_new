// app/api/auth/login/route.ts

import { NextResponse } from "next/server";


export async function GET() {

    const result = NextResponse.json({
      test:"test"
    });

    

    return result;
  
}
