import Link from "next/link";
import Button from "./Button";

type Props = {
  children: React.ReactNode;
};

type LinkButtonProps = Props & {
  pathname: string;
  query?: Record<string, any>;
};

const SectionHeader = ({ children }: Props) => {
  return <div className="flex justify-between items-end">{children}</div>;
};

const Title = ({ children }: Props) => {
  return <h1 className="text-2xl text-center">{children}</h1>;
};

const LinkButton = ({ children, pathname, query }: LinkButtonProps) => {
  return (
    <Link href={{ pathname, query }}>
      <Button size="md" color="dark">
        {children}
      </Button>
    </Link>
  );
};

export default SectionHeader;
SectionHeader.Title = Title;
SectionHeader.LinkButton = LinkButton;
