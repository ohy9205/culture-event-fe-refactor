import Image from "next/image";
import MultiCarousel from "./MultiCarousel";
import Button from "./Button";
import Link from "next/link";

type Props = {
  eventList: any;
};

const RecentEventList = () => {
  return (
    <section>
      <h1>타이틀</h1>
      <MultiCarousel>
        {/* {eventList.map((event)=>(<Image src='/' alt='사진' width={100} height={100}/> ))} */}
        <Image
          src="/"
          alt="사진1"
          width={247.5}
          height={324}
          className="bg-slate-400"
        />
        <Image
          src="/"
          alt="사진2"
          width={100}
          height={100}
          className="bg-slate-400"
        />
        <Image
          src="/"
          alt="사진3"
          width={100}
          height={100}
          className="bg-slate-400"
        />
        <Image
          src="/"
          alt="사진4"
          width={100}
          height={100}
          className="bg-slate-400"
        />
        <Image
          src="/"
          alt="사진5"
          width={100}
          height={100}
          className="bg-slate-400"
        />
        <Image
          src="/"
          alt="사진6"
          width={100}
          height={100}
          className="bg-slate-400"
        />
        <Image
          src="/"
          alt="사진7"
          width={100}
          height={100}
          className="bg-slate-400"
        />
        <Image
          src="/"
          alt="사진8"
          width={100}
          height={100}
          className="bg-slate-400"
        />
        <Image
          src="/"
          alt="사진9"
          width={100}
          height={100}
          className="bg-slate-400"
        />
        <Image
          src="/"
          alt="사진10"
          width={100}
          height={100}
          className="bg-slate-400"
        />
      </MultiCarousel>
      <Button>
        <Link href={"/events"}>최신순으로 전체보기</Link>
      </Button>
    </section>
  );
};

export default RecentEventList;
