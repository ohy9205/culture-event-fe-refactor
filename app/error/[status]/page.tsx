import NotAllowedErrorContent from "@/src/components/error/NotAllowedErrorContent";
import NotFoundErrorContent from "@/src/components/error/NotFoundErrorContent";
import UnknownErrorContent from "@/src/components/error/UnknownErrorContent";

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
