import Image from "next/image";

const EventCard = () => {
  return (
    <div className="flex flex-col">
      <Image src={"/"} alt={` 포스터`} width={100} height={100} />
      <h2>타이틀</h2>
      <h3>날짜</h3>
      <div>좋아요 등..</div>
    </div>
  );
};

export default EventCard;
