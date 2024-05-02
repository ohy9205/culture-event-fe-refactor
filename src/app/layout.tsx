import type { Metadata } from "next";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Noto_Sans } from "next/font/google";
import Script from "next/script";
import { getMyLikes, getUserMe } from "../apis/user/user";
import Header from "../components/UI/layout/Header";
import { AuthProvider } from "../provider/AuthProvider";
import HydrationZustand from "../provider/HydrdationZustand";
import { MyLikesProvider } from "../provider/MyLikesProvider";
import SWRProvider from "../provider/swrProvider";
import { MyFavoriteEvent, User } from "../types/user";
import { Cookie } from "../utils/store/cookieAdapter";
import { Token } from "../utils/token/token";
import Error from "./global-error";
import "./globals.css";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: "400" });

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
  let userInfo: User | undefined = undefined;

  if (allToken.at && allToken.rt) {
    // likesEvent 데이터
    likesEvent = (await getMyLikes(allToken))?.payload.data || [];
    // auth 데이터
    userInfo = (await getUserMe(allToken))?.payload.user;
  }

  return (
    <html lang="en">
      <head>
        <Script
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=2bye4zyjsa`}
        />
      </head>
      <body
        className={`${notoSans.className} flex flex-col justify-center items-center`}>
        <ErrorBoundary errorComponent={Error}>
          <SWRProvider>
            <HydrationZustand>
              <AuthProvider initialValue={userInfo}>
                <MyLikesProvider initialValue={likesEvent}>
                  <div id="modal"></div>
                  <Header />
                  {children}
                </MyLikesProvider>
              </AuthProvider>
            </HydrationZustand>
          </SWRProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
