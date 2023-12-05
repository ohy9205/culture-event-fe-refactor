type Props = {
  params: {
    status: string;
  };
};

const ErrorPage = ({ params: { status } }: Props) => {
  if (status === "404") {
    return <div>Not FOund ERror 하아아아</div>;
  } else if (status === "403") {
    return <div>접근할 수 없는 페이지임당</div>;
  }

  return <div>{status} : 오류가 발생했습니다</div>;
};

export function generateStaticParams() {
  const errorStatus = ["404", "403"];
  return errorStatus.map((status) => ({
    status,
  }));
}

export default ErrorPage;
