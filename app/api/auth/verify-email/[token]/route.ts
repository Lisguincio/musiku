import db from "@/db/schema";
import { users } from "@/db/schema/users";
import { SQL, eq } from "drizzle-orm";
import jsonwebtoken from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { token: string } }
) {
  const { token } = context.params;

  try {
    const decodedToken = jsonwebtoken.verify(
      token,
      process.env.NEXTAUTH_SECRET as string
    );

    const { email } = decodedToken as {
      email: string;
    };

    await db
      .update(users)
      .set({
        emailVerified: new Date(),
      })
      .where(eq(users.email, email));
  } catch (err) {
    return new NextResponse("Token non valido", { status: 401 });
  }

  return NextResponse.redirect("/signin");
}
