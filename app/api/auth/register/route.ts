import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jsonwebToken from "jsonwebtoken";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import prisma from "@/prisma/prismaClient";

type SignupCredential = {
  email: string;
  name: string;
  password: string;
};

export async function POST(request: NextRequest) {
  console.log("Richiesta di iscrizione");
  const body = (await request.json()) as SignupCredential;
  const { email, name, password } = body;
  console.log(`L'utente ${name}<${email}> ha richiesto di iscriversi`);
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log(`Password Generata: ${hashedPassword}`);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }

  console.log(`Invio email di verifica`);

  //verify email
  const server: SMTPTransport.Options = {
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT as unknown as number,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  };

  try {
    const transport = nodemailer.createTransport(server);
    const host = process.env.NEXTAUTH_URL as string;
    const jwt = jsonwebToken.sign(
      { email: email },
      process.env.NEXTAUTH_SECRET as string,
      { expiresIn: "1h" }
    );
    const url = `${host}/api/auth/verify-email/${jwt}`;

    const result = transport.sendMail({
      to: email,
      from: process.env.EMAIL_FROM,
      subject: "Sign in to " + host,
      text: text({ host, url: url }),
      html: html({ host, url: url }),
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        type: "error",
        message: "Errore nell'invio della mail di verifica",
      },
      { status: 500, statusText: `Errore nell'invio della mail di verifica` }
    );
  }
  return NextResponse.json(
    {
      type: "success",
      message: "Utente registrato",
    },
    { status: 200, statusText: "Utente creato con successo" }
  );
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}

function html(params: { url: string; host: string }) {
  const { url, host } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; text-decoration: none; border-radius: 5px; padding: 10px 20px; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}
