import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL!;


export async function GET() {
  try {

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;



    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    return NextResponse.json({
      message: "Success",
      data: data
    });
  } catch {
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}