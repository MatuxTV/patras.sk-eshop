import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Script from "next/script";
import Head from "next/head";
import Link from "next/link";
import { CartProvider } from "@/lib/cart-context";
import { cookies } from "next/headers";

const plus_jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weights: [400, 500, 600, 700],
});

export const metadata = {
  title: "Patras.sk",
  description: "Voda pre vsetkych",
};

export default async function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <Script
        src="https://kit.fontawesome.com/c53c92435c.js"
        crossorigin="anonymous"
      ></Script>
      <Head>
        <link rel="favicon" href="/favicon-32x32.png" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={plus_jakarta.className}>
        <CartProvider>
          <div className="hidden bg-white2 drop-shadow md:flex content-center p-2 gap-8 px-6">
            <a className="flex items-center gap-3" href="tel:+421 905 249 998">
              <i className="fa-solid fa-phone text-black1" />
              <p className="font-plus-jakarta">+421 905 249 998</p>
            </a>
            <a
              className="flex items-center gap-3"
              href="mailto:patras@patras.sk"
            >
              <i className="fa-solid fa-envelope text-black1" />
              <p className="font-plus-jakarta">patras@patras.sk</p>
            </a>
            <div className="ml-auto flex flex-row gap-4">
              <p className="font-plus-jakarta">Kontakty</p>
              <p className="font-plus-jakarta">O nas</p>
              
              user ? (
                <Link href="/">
                  <p>Prihlaseny</p>
                </Link>
              ) : (
                <Link href="/login">
                  <p className="font-plus-jakarta">Prihlasenie</p>
                </Link>
              )
              
            </div>
          </div>{" "}
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
        </CartProvider>
      </body>
    </html>
  );
}
