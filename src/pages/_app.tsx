import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { CartProvider } from "../context/CartContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WhatsAppWidget } from "../components/WhatsAppWidget";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

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
        <AnimatePresence mode="wait">
          <motion.main
            key={router.asPath}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-grow"
          >
            <Component {...pageProps} />
          </motion.main>
        </AnimatePresence>
        <Footer />
        <WhatsAppWidget />
      </div>
    </CartProvider>
  );
}
