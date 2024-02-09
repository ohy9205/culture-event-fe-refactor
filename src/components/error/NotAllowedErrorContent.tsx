type Props = {
  status: string;
};

const NotAllowedErrorContent = ({ status }: Props) => {
  return (
    <div className="w-full flex justify-center items-center mt-16">
      <div>{status} : 접근할 수 없는 페이지입니다.</div>;
    </div>
  );
};

export default NotAllowedErrorContent;
