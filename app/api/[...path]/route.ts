// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL!;

export async function POST(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const body = await request.json();

    let url = `${API_URL}/${path[0]}`;
    console.log(url);

    if (path.length == 2) {
      url = `${API_URL}/${path[0]}/${path[1]}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        //Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    return NextResponse.json({
      message: "Success",
      data: data,
    });
  } catch {
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const body = await request.json();

    const response = await fetch(`${API_URL}/${path[0]}/${path[1]}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    return NextResponse.json({
      message: "Success",
    });
  } catch {
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const response = await fetch(`${API_URL}/${path[0]}/${path[1]}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({
        status: response.status,
      });
    }

    return NextResponse.json({
      message: "Success",
    });
  } catch {
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
