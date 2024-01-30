"use client";

import { useState } from "react";
import { Event, SimpleEvent } from "../types/events";

const useMapList = (initCurEvent: Event) => {
  const [curEvent, setCurEvent] = useState<SimpleEvent>(initCurEvent);

  return {
    data: {
      curEvent,
    },
    changeCurrentEvent: (event: SimpleEvent) => setCurEvent(event),
  };
};

export default useMapList;
