import "../styles/globals.css";
import type { AppProps } from "next/app";
import { makeServer } from "../services/miragejs/server";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
