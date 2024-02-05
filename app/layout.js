import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { CartProvider } from "@/lib/cart-context";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

import { ShippingProvider } from "@/lib/shipping-context";


config.autoAddCss = false;

const plus_jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weights: [400, 500, 600, 700],
});

export const metadata = {
  title: "Patras.sk",
  description: "Voda pre vsetkych",
};

export default async function RootLayout({ children }) {
  let data = await getServerSession(options);
  let user = data?.user;
  return (
    <html lang="sk">
      <Head>
        <link rel="favicon" href="/favicon-32x32.png" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <ShippingProvider>
        <CartProvider>
          <body className={plus_jakarta.className + " min-[100vh]"}>
            <div className="hidden bg-white2 drop-shadow md:flex content-center p-2 gap-8 px-6">
              <a
                className="flex items-center gap-3"
                href="tel:+421 905 249 998"
              >
                <FontAwesomeIcon
                  icon={faPhone}
                  className="fas fa-phone"
                  style={{ color: "black" }}
                />
                <p className="font-plus-jakarta">+421 905 249 998</p>
              </a>
              <a
                className="flex items-center gap-3"
                href="mailto:patras@patras.sk"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="fas fa-envelop"
                  style={{ color: "black" }}
                />
                <p className="font-plus-jakarta">patras@patras.sk</p>
              </a>
              <div className="ml-auto flex flex-row gap-4">
                <p className="font-plus-jakarta">Kontakty</p>
                <p className="font-plus-jakarta">O nas</p>

                {user ? (
                  <Link href="/user">
                    <b className=" text-blue1">{user?.first_name}</b>
                  </Link>
                ) : (
                  <Link href="/login">
                    <p className="font-plus-jakarta hover:underline">Prihlasenie</p>
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
                  Mlynska 34 976 Selce
                </p>
                <a href="">
                  <p className="font-plus-jakarta text-[8px] md:text-h7">
                    Obchodne podmienky
                  </p>
                </a>
                <a href="">
                  <p className="font-plus-jakarta text-[8px] md:text-h7">
                    Podmienky reklamacie
                  </p>
                </a>
              </div>
            </footer>
          </body>
        </CartProvider>
      </ShippingProvider>
    </html>
  );
}
