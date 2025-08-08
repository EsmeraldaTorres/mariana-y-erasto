import { useEffect, useState } from "react";

const useCountdown = (targetDate) => {
  const [timeCountDown, setTimeCountDown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    const countDown = () => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(intervalId);
        setTimeCountDown((prev) => ({ ...prev, expired: true }));
      } else {
        setTimeCountDown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
          expired: false,
        });
      }
    };

    const intervalId = setInterval(countDown, 1000);
    return () => clearInterval(intervalId);
  }, [targetDate]);

  return timeCountDown;
};

export default useCountdown;
