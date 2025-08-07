import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);

type Props = {
  from?: dayjs.ConfigType;
  to?: dayjs.ConfigType;
};

const RelativeTime = (props: Props) => {
  const from = dayjs(props.from);
  const to = dayjs(props.to);

  const [text, setText] = useState(from.to(to));

  useEffect(() => {
    // Update the text every second
    const interval = setInterval(() => {
      setText(from.to(to));
    }, 1000);
    return () => clearInterval(interval);
  }, [from, to]);

  return <>{text}</>;
};

export default RelativeTime;
