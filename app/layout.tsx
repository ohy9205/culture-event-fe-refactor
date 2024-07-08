import { AuthProvider, MyLikesProvider, SWRProvider } from "@/src/app/provider";
import {
  MyFavoriteEvent,
  User,
  getMyLikes,
  getUserMe,
} from "@/src/entities/user";
import { Header } from "@/src/shared/components";
import { Cookie } from "@/src/shared/store";
import { Token } from "@/src/shared/token";
import { Metadata } from "next";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Noto_Sans } from "next/font/google";
import Script from "next/script";
import Error from "./global-error";
import "./globals.css";

type Props = { children: React.ReactNode };

const notoSans = Noto_Sans({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Seoul Event Info",
  description: "서울시에서 개최하는 문화행사 정보를 제공합니다.",
};

const RootLayout = async ({ children }: Props) => {
  // 쿠키에서 토큰 정보확인
  const { at, rt } = new Token(new Cookie());
  let likesEvent: MyFavoriteEvent[] | [] = [];
  let userInfo: User | undefined = undefined;
  const isLoggedIn = at && rt ? true : false;

  if (isLoggedIn) {
    // likesEvent 데이터
    likesEvent = (await getMyLikes({ at, rt }))?.payload.data || [];
    // auth 데이터
    userInfo = (await getUserMe({ at, rt }))?.payload.user;
  }

  return (
    <html lang="ko">
      <head>
        <Script
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=2bye4zyjsa`}
        />
      </head>
      <body
        className={`${notoSans.className} flex flex-col justify-center items-center`}>
        <ErrorBoundary errorComponent={Error}>
          <SWRProvider>
            <AuthProvider initialValue={userInfo}>
              <MyLikesProvider initialValue={likesEvent}>
                <div id="modal"></div>
                <Header />
                {children}
              </MyLikesProvider>
            </AuthProvider>
          </SWRProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;
