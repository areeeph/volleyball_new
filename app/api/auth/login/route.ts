// app/api/auth/login/route.ts

import { NextResponse } from "next/server";

const API_URL = process.env.API_URL!;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    const result = NextResponse.json({
      user: data.user,
    });

    result.cookies.set("access_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 2, // 2 hours
      path: "/",
    });

    return result;
  } catch {
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
