'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";
import { Provider } from "react-redux";
import store from "./store";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
      <body className={inter.className}>
        <Header/>
        {children}
      </body>
    </html>
    </Provider>
  );
}
