import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { getMyLikes } from "../apis/user/user";
import Header from "../components/UI/layout/Header";
import { AuthContextProvider } from "../context/AuthContext";
import { MyLikesContextProvider } from "../context/MyLikesContext";
import SWRProvider from "../provider/swrProvider";
import { Cookie } from "../utils/store/cookieAdapter";
import { Token } from "../utils/token/token";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 쿠키에서 토큰 정보확인
  const { allToken } = new Token(new Cookie());
  const likesEvent = (await getMyLikes(allToken)).payload.data;

  return (
    <html lang="en">
      <head>
        <Script
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=2bye4zyjsa`}
        />
      </head>
      <body
        className={`${inter.className} flex flex-col justify-center items-center`}
      >
        <SWRProvider>
          <AuthContextProvider
            hasToken={allToken.at && allToken.rt ? true : false}
          >
            <MyLikesContextProvider likesEvent={likesEvent}>
              <div id="modal"></div>
              <Header />
              {children}
            </MyLikesContextProvider>
          </AuthContextProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
