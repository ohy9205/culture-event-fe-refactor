import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

const HotEventList = () => {
  return (
    <section>
      <h1>타이틀1</h1>
      <div className="flex gap-7">
        <Image src="/" alt="사진" width={100} height={100} />
        <div className="grid grid-cols-3">
          <Image
            src="/"
            alt="사진"
            width={100}
            height={100}
            className="bg-slate-300 w-full"
          />
          <Image
            src="/"
            alt="사진"
            width={100}
            height={100}
            className="bg-slate-300 w-full"
          />
          <Image
            src="/"
            alt="사진"
            width={100}
            height={100}
            className="bg-slate-300 w-full"
          />
          <Image
            src="/"
            alt="사진"
            width={100}
            height={100}
            className="bg-slate-300 w-full"
          />
          <Image
            src="/"
            alt="사진"
            width={100}
            height={100}
            className="bg-slate-300 w-full"
          />
          <Image
            src="/"
            alt="사진"
            width={100}
            height={100}
            className="bg-slate-300 w-full"
          />
        </div>
      </div>
      <Button>
        <Link href={"/events"}>인기순으로 전체보기</Link>
      </Button>
    </section>
  );
};

export default HotEventList;
