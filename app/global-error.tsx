"use client";

import { UnknownErrorContent } from "@/src/entities/error";
import { Button } from "@/src/shared/components";

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
