"use client";

import Button from "../components/UI/common/Button";

type Props = {
  error: Error;
  reset: () => void;
};

function Error({ error, reset }: Props) {
  return (
    <main className="flex flex-col justify-center items-center gap-5 mt-5">
      <h1>뭔가 단단히 잘못됨...</h1>
      <p>{error.message}</p>
      <p>{error.name}</p>
      <p>{error.stack}</p>

      <Button color="dark" size="md" onClick={reset}>
        다시 시도하기
      </Button>
    </main>
  );
}

export default Error;
