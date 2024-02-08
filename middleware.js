import { getSession } from "next-auth/react";

export { default } from "next-auth/middleware"

export const config = { matcher: ["/user,","/admin"] }


// export async function middleware(request) {
//     const { pathname } = request.nextUrl;
    
//     const session = await getSession();

//     console.log(request)

//     // Restrict access to the /admin path
//     if (pathname.startsWith('/admin')) {
//         if (session.user.role != '95863818-e696-411d-bae4-c1e04725c376') {
//             return NextResponse.redirect(new URL('/login', request.url));
//         }
//     }

//     return NextResponse.next();
// }


