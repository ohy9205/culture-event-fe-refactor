"use client";

import Button from "@/src/components/UI/common/Button";
import UnknownErrorContent from "@/src/components/error/UnknownErrorContent";

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
