import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "@/AuthProvider";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Upbeat",
  description: "Upbeat AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className} w-[90%] mx-auto h-[100vh]`}>
          <ToastContainer />
          <Header />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
