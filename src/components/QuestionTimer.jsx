import { useState, useEffect } from "react";

export default function QuestionTimer({ timeOut, onTimeOut }) {
  const [remainingTime, setRemainingTime] = useState(timeOut);

  useEffect(() => {
    console.log("SETTING TIMEOUT");
    const timer = setTimeout(onTimeOut, timeOut);
return () => {
    clearTimeout(timer);
}
  }, [timeOut, onTimeOut]);



  useEffect(() => {
    console.log("SETTING INTERVAL");
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id={"question-time"} max={timeOut} value={remainingTime} />;
}
