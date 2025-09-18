import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { CartProvider } from "@/lib/cart-context";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { MdEmail ,MdPhone,MdShoppingCart} from "react-icons/md";

import { ToastContainer } from "react-toastify";
import { ShippingProvider } from "@/lib/shipping-context";
import { UserProvider } from "@/lib/user-context";
import { SpeedInsights } from "@vercel/speed-insights/next";

const plus_jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weights: [400, 500, 600, 700],
});

export const metadata = {
  title: "Patras.sk",
  description: "Voda pre vsetkych",
  icons: {
    icon: "/IMG/favicon.ico",
  },
};

export default async function RootLayout({ children }) {
  let data = await getServerSession(options);
  let user = data?.user;
  return (
    <html lang="sk">
      <UserProvider user={user}>
        <ShippingProvider>
          <CartProvider>
            <body className={plus_jakarta.className + " min-[100vh]"}>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                zIndex={1}
              />
              <div className="hidden bg-white2 drop-shadow md:flex content-center p-2 gap-8 px-6">
                <a
                  className="flex items-center gap-3"
                  href="tel:+421 905 249 998"
                >
                  <MdPhone 
                    className="text-black" 
                    size={20}
                  />
                  <p className="font-plus-jakarta">+421 905 249 998</p>
                </a>
                <a
                  className="flex items-center gap-3"
                  href="mailto:patras@patras.sk"
                >
                  {/* Replace FontAwesome with React Icons */}
                  <MdEmail 
                    className="text-black"
                    size={20}
                  />
                  <p className="font-plus-jakarta">patras@patras.sk</p>
                </a>
                <div className="ml-auto flex flex-row gap-4">
                  {user ? (
                    user.role == process.env.ADMIN_ROLE ? (
                      <Link href="/admin">
                        <b className=" text-green">{user?.first_name}</b>
                      </Link>
                    ) : (
                      <Link href="/user">
                        <b className=" text-blue1">{user?.first_name}</b>
                      </Link>
                    )
                  ) : (
                    <Link href="/login">
                      <p className="font-plus-jakarta hover:underline">
                        Prihlásenie
                      </p>
                    </Link>
                  )}
                </div>
              </div>
              {children}
              <footer className="flex items-center m-4 justify-center md:m-8">
                <div className="flex items-center gap-5 md:gap-12">
                  <div className="relative hidden md:h-[95px] md:w-44 md:block">
                    <Image src="/IMG/logo.png" alt="patras.sk" fill />
                  </div>
                  <p className="font-plus-jakarta text-[8px] md:text-h7">
                    patras@patras.sk
                  </p>
                  <p className="font-plus-jakarta text-[8px] md:text-h7">
                    +421 905 249 998
                  </p>
                  <p className="font-plus-jakarta flex text-[8px] md:text-h7">
                    Mlynská 34 976 11 Selce
                  </p>
                  <a href="/podmienky">
                    <p className="font-plus-jakarta text-[8px] md:text-h7">
                      Obchodne podmienky
                    </p>
                  </a>
                  <a href="reklamacia">
                    <p className="font-plus-jakarta text-[8px] md:text-h7">
                      Podmienky reklamácie
                    </p>
                  </a>
                </div>
              </footer>
            </body>
          </CartProvider>
        </ShippingProvider>
      </UserProvider>
    </html>
  );
}
