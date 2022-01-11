import { Duration } from "luxon";

export const toMinutesOrSeconds = (time) => {
  const ms = time * 1000;
  if (ms >= 60000) {
    const minutes = Duration.fromMillis(ms).as("minutes").toFixed();
    const unit = minutes == 1 ? "minute" : "minutes";
    return `${minutes} ${unit}`;
  } else {
    const seconds = Duration.fromMillis(ms).as("seconds");
    const unit = seconds == 1 ? "second" : "seconds";
    return `${seconds} ${unit}`;
  }
};
