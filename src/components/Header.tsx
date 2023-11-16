import Link from "next/link";
import AuthLinks from "./AuthLinks";

const Header = () => {
  return (
    <header className="bg-slate-200 w-full h-[50px] flex justify-center items-center">
      <nav className="flex gap-5 text-xl max-w-[1200px]">
        <Link href={"/"}>Home</Link>
        <a href={"/event"}>Event</a>
        <AuthLinks />
      </nav>
    </header>
  );
};

export default Header;
