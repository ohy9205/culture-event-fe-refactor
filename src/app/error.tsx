"use client";

import Button from "../components/UI/common/Button";

type Props = {
  error: Error;
  reset: () => void;
};

function Error({ error, reset }: Props) {
  return (
    <main className="flex flex-col justify-center items-center gap-5 mt-5">
      <h1>알 수 없는 오류가 발생했습니다.</h1>

      <Button color="dark" size="md" onClick={reset}>
        다시 시도하기
      </Button>
    </main>
  );
}

export default Error;
