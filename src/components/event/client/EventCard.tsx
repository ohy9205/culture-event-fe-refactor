import Image from "next/image";
import Likes from "./Likes";

type Props = {
  children: React.ReactNode;
};

type CardProps = Props & {
  height?: string;
};

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  style: string;
};

type LikesProps = {
  eventId: number;
};

const EventCard = ({ children, height }: CardProps) => {
  return (
    <div className="shadow-lg rounded-lg" style={{ height: `${height}` }}>
      {children}
    </div>
  );
};

const CardImage = ({ src, alt, width, height, style }: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={style}
    />
  );
};

const CardTitle = ({ children }: Props) => {
  return <h2 className="truncate font-bold">{children}</h2>;
};

const CardPeriod = ({ children }: Props) => {
  return <h3 className="text-sm">{children}</h3>;
};

const CardViews = ({ children }: Props) => {
  return (
    <div>
      <span>조회수</span>
      <span className="font-semibold">{children}</span>
    </div>
  );
};

const CardLikes = ({ eventId }: LikesProps) => {
  return <Likes eventId={eventId} />;
};

export default EventCard;
EventCard.Image = CardImage;
EventCard.Title = CardTitle;
EventCard.Period = CardPeriod;
EventCard.Views = CardViews;
EventCard.Likes = CardLikes;
