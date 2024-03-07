import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

type CardProps = Props & {
  height?: string;
  width?: string;
};

type ImageProps = {
  src: string;
  alt: string;
  objectFit?: "cover" | "contain";
  sizes: string;
  style?: string;
  priotity?: boolean;
};

const EventCard = ({ children, height, width }: CardProps) => {
  return (
    <div
      className="shadow-md rounded-lg overflow-hidden"
      style={{ height: `${height}`, width: `${width}` }}>
      {children}
    </div>
  );
};

const CardImage = ({
  src,
  alt,
  style,
  sizes,
  objectFit = "contain",
  priotity = false,
}: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      className={style}
      style={{ objectFit: objectFit }}
      fill
      priority={priotity}
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

export default EventCard;
EventCard.Image = CardImage;
EventCard.Title = CardTitle;
EventCard.Period = CardPeriod;
EventCard.Views = CardViews;
