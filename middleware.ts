import { getServerSession } from "next-auth";
export { default } from "next-auth/middleware";

export const config = {
  // matcher: ["/profile"],
  matcher: ["/app/:path*", "/profile"],
};
