import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);

type Props = {
  from?: dayjs.ConfigType;
  to?: dayjs.ConfigType;
  interval?: number;
};

const RelativeTime = (
  props: Props = {
    interval: 1000,
  }
) => {
  const from = dayjs(props.from);
  const to = dayjs(props.to);

  const [text, setText] = useState(from.to(to));

  useEffect(() => {
    const interval = setInterval(() => {
      setText(from.to(to));
    }, props.interval);
    return () => clearInterval(interval);
  }, [from, to]);

  return <>{text}</>;
};

export default RelativeTime;
