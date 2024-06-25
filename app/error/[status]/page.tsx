import {
  NotAllowedErrorContent,
  NotFoundErrorContent,
  UnknownErrorContent,
} from "@/src/entities/error";

type Props = {
  params: {
    status: string;
  };
};

const ErrorPage = ({ params: { status } }: Props) => {
  if (status === "404") {
    return <NotFoundErrorContent />;
  } else if (status === "403" || status === "401") {
    return <NotAllowedErrorContent status={status} />;
  }

  return <UnknownErrorContent status={status} />;
};

export const generateStaticParams = () => {
  const errorStatus = ["404", "403"];
  return errorStatus.map((status) => ({
    status,
  }));
};

export default ErrorPage;
