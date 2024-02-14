import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export { default } from "next-auth/middleware"

export const config = { matcher: ["/user,","/admin"] }

// export async function middleware(req) {
//     const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//     const { pathname } = req.nextUrl;
  
//     // Ak sa užívateľ pokúša pristúpiť na admin stránku a nie je admin, presmerujte ho
//     if (pathname.startsWith('/admin') && session?.user?.role !== '95863818-e696-411d-bae4-c1e04725c376') {
//       return NextResponse.redirect(new URL('/unauthorized', req.url)); // Presmerovanie na neautorizovanú stránku alebo na prihlásenie
//     }
//     // if (pathname.startsWith('/user') && session?.user?.role !== 'bb4da356-49ec-44b3-88af-5c8612676ae4') {
//     //     return NextResponse.redirect(new URL('/login', req.url)); // Presmerovanie na neautorizovanú stránku alebo na prihlásenie
//     //   }
  
//     // Pre /user cesty alebo ak je užívateľ admin, nechajte požiadavku prejsť
//     return NextResponse.next();
//   }
