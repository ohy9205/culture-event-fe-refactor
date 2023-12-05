type Props = {
  params: {
    status: string;
  };
};

const ErrorPage = ({ params: { status } }: Props) => {
  if (status === "404") {
    return <div>Not Found Page : 요청한 경로가 없는 경로입니다.</div>;
  } else if (status === "403" || status === "401") {
    return <div>{status} : 접근할 수 없는 페이지입니다.</div>;
  }

  return <div>{status} : 알 수 없는 오류가 발생했습니다</div>;
};

export function generateStaticParams() {
  const errorStatus = ["404", "403"];
  return errorStatus.map((status) => ({
    status,
  }));
}

export default ErrorPage;
