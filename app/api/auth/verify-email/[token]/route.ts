import prisma from "@/prisma/prismaClient";
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
    await prisma.user.update({
      data: { emailVerified: new Date() },
      where: { email },
    });
  } catch (err) {
    return new NextResponse("Token non valido", { status: 401 });
  }

  return NextResponse.redirect("/signin");
}
