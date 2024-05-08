"use client";

import Button from "../components/UI/common/Button";
import UnknownErrorContent from "../components/error/UnknownErrorContent";

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <>
      <UnknownErrorContent />

      <Button color="dark" size="md" onClick={reset}>
        다시 시도하기
      </Button>
    </>
  );
};

export default Error;
