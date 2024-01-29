// npm i @mui/icons-material
// npm install @mui/material @emotion/react @emotion/styled for stylign
// npm i react-redux @reduxjs/toolkit
// npm install @mui/x-data-grid for data-grid-tables
// npm install prisma --save-dev // npx prisma init for the first-time
// npm install @prisma/client //npx prisma generate for the first time
// npm i next-auth
// npm i @next-auth/prisma-adapter
// npm i bcrypt //npm i --save-dev @types/bcrypt
// npm install react-hook-form
// npm i zod
// npm i @hookform/resolvers
// npm i react-hot-toast
// npm i axios
// npm i @tanstack/react-query
// npm i @tanstack/react-query-devtools
// npm install recharts
import type { Metadata } from "next";
import "./globals.css";
import { MaterialRTLProvider } from "./MaterialUiRTL";
import localFont from "next/font/local";
import CustomThemeProvider from "./MaterialUiThemeProvider";
import { ReduxProvider } from "./GlobalRedux/provider";
import AuthProvider from "./auth/Provider";
import { Toaster } from "react-hot-toast";
import QueryClientProvider from "./QueryClientProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// const inter = Inter({ subsets: ["latin"] });

// this is the way of importing a local font
const IranSansWeb = localFont({
  src: "../public/fonts/teqh_iransansweb.ttf",
  variable: "--font-IranSansWeb",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <link rel="icon" href="/trade-logo-brad.png" />
      </head>
      {/* this MaterialRTLProvider is a context that provides the functionality of right to left   */}
      <MaterialRTLProvider>
        <body className={`${IranSansWeb.variable} dark:bg-slate-900`}>
          {/* this is the provider of the react-query */}
          <QueryClientProvider>
            {/* this is the provider of the next-Auth */}
            <AuthProvider>
              {/* this Providers is a provider of redux-toolkit */}
              <ReduxProvider>
                {/* this CustomThemeProvider is a provider of material ui for the app theme */}
                <CustomThemeProvider>{children}</CustomThemeProvider>
              </ReduxProvider>
            </AuthProvider>
            <Toaster // react-hot-toast
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                  style: {
                    fontSize: "16px",
                    maxWidth: "500px",
                    padding: "10px 24px",
                    backgroundColor: "#46dc5c",
                    color: "#000000",
                  },
                },
                error: {
                  duration: 5000,
                  style: {
                    fontSize: "16px",
                    maxWidth: "500px",
                    padding: "10px 24px",
                    backgroundColor: "#cc2525",
                    color: "#000000",
                  },
                },
              }}
            />
            {/* this is not the part of app,its the react-query-dev-tools */}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </body>
      </MaterialRTLProvider>
    </html>
  );
}
