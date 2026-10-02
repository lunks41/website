import { useRef } from "react";

const TimingFunctions = () => {
  const interval = useRef<any>(null);
  const functions = {
    deBounce: (callback: any, time: number) => {
      let milseconds = time ? time : 500;
      clearInterval(interval.current);
      interval.current = setTimeout(() => {
        callback();
      }, milseconds);
    },
  };
  return functions;
};

export default TimingFunctions;
