import Link from "next/link";
import AuthLinks from "./AuthLinks";

const Header = () => {
  return (
    <header className="bg-slate-200 w-full h-[50px] flex justify-center items-center">
      <nav className="flex justify-between gap-16 flex-none">
        <h1 className="font-semibold hidden sm:block">
          <Link href={"/"}>
            <span className="text-2xl font-bold text-slate-700">서</span>울시
            <span className="text-2xl font-bold text-slate-700">행</span>사
            <span className="text-2xl font-bold text-slate-700">안</span>내
          </Link>
        </h1>
        <div className="flex gap-5 text-xl justify-center items-center max-w-[1200px]">
          <Link href={"/"}>Home</Link>
          <Link href={"/event"}>Event</Link>
          <AuthLinks />
        </div>
      </nav>
    </header>
  );
};

export default Header;
