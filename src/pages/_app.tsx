import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { CartProvider } from "../context/CartContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WhatsAppWidget } from "../components/WhatsAppWidget";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Head>
        <title>Seajal | Best Water Purifier & Softeners in Pune</title>
        <meta name="description" content="Seajal is the leading RO plant manufacturer, water softener supplier and domestic smart water purifier showroom in Pune. Custom industrial & household systems." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
        <WhatsAppWidget />
      </div>
    </CartProvider>
  );
}
