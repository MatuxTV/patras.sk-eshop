import { NextResponse } from "next/server";
import { createUser } from "@directus/sdk";
import directus from "@/lib/directus";

export async function POST(request) {
  try {
    const { first_name, last_name, email, password } = await request.json();
    console.log(first_name, last_name, email, password);
    const result = await directus.request(
      createUser({
        first_name,
        last_name,
        email,
        password,
        role: "bb4da356-49ec-44b3-88af-5c8612676ae4",
      })
    );

    // const result =await fetch("http://localhost:8055/users", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     first_name,
    //     last_name,
    //     email,
    //     password,
    //     role: "bb4da356-49ec-44b3-88af-5c8612676ae4", // Nastavte ID role pre nových užívateľov
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    console.log(result);
    return NextResponse.json({ message: "Account Created!" }, { status: 201 });
  } catch (e) {
    const code = e.errors[0].extensions.code;
    if (code === "RECORD_NOT_UNIQUE") {
      return NextResponse.json(
        { message: "This user already exist" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "An unexpected error occurred, please try again" },
      { status: 500 }
    );
  }
}
