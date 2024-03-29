import type { Metadata } from "next";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Inter } from "next/font/google";
import Script from "next/script";
import { getMyLikes } from "../apis/user/user";
import Header from "../components/UI/layout/Header";
import { AuthContextProvider } from "../context/AuthContext";
import { MyLikesContextProvider } from "../context/MyLikesContext";
import SWRProvider from "../provider/swrProvider";
import { MyFavoriteEvent } from "../types/user";
import { Cookie } from "../utils/store/cookieAdapter";
import { Token } from "../utils/token/token";
import Error from "./global-error";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seoul Event Info",
  description: "서울시에서 개최하는 문화행사 정보를 제공합니다.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 쿠키에서 토큰 정보확인
  const { allToken } = new Token(new Cookie());
  let likesEvent: MyFavoriteEvent[] | [] = [];

  if (allToken) {
    likesEvent = (await getMyLikes(allToken))?.payload.data || [];
  }

  return (
    <html lang="en">
      <head>
        <Script
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=2bye4zyjsa`}
        />
      </head>
      <body
        className={`${inter.className} flex flex-col justify-center items-center`}>
        <ErrorBoundary errorComponent={Error}>
          <SWRProvider>
            <AuthContextProvider
              hasToken={allToken.at && allToken.rt ? true : false}>
              <MyLikesContextProvider likesEvent={likesEvent}>
                <div id="modal"></div>
                <Header />
                {children}
              </MyLikesContextProvider>
            </AuthContextProvider>
          </SWRProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
