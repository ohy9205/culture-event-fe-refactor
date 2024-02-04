"use client";

import { useState } from "react";
import { SimpleEvent } from "../types/events";

const useMapList = (initCurEvent: SimpleEvent) => {
  const [curEvent, setCurEvent] = useState<SimpleEvent>(initCurEvent);

  return {
    data: {
      curEvent,
    },
    changeCurrentEvent: (event: SimpleEvent) => setCurEvent(event),
  };
};

export default useMapList;
