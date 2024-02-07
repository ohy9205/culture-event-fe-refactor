type Props = {
  status?: string;
};

const UnknownErrorContent = ({ status }: Props) => {
  return (
    <div className="w-full flex justify-center items-center mt-16">
      <div>{status && `${status} : `}알 수 없는 에러가 발생했습니다.</div>
    </div>
  );
};

export default UnknownErrorContent;
