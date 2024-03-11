import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export { default } from "next-auth/middleware"

export const config = { matcher: ["/user,","/admin"] }

export async function middleware(req) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET});
    const { pathname } = req.nextUrl;
  
    // Ak sa užívateľ pokúša pristúpiť na admin stránku a nie je admin, presmerujte ho
    if (pathname.startsWith('/admin') && session?.user?.role !== process.env.ADMIN_ROLE) {
      return NextResponse.redirect(new URL('/login', req.url)); // Presmerovanie na neautorizovanú stránku alebo na prihlásenie
    }
    //Ak sa uzivatel pokusá pristúpiť na user stránku a nie je user, presmerujte ho
    if (pathname.startsWith('/user') && session?.user?.role !== process.env.USER_ROLE) {
        return NextResponse.redirect(new URL('/login', req.url)); // Presmerovanie na neautorizovanú stránku alebo na prihlásenie
      }
      
    return NextResponse.next();
  }
