import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useMemo, useState } from "react";

dayjs.extend(relativeTime);

type Props = {
  from?: dayjs.ConfigType;
  to?: dayjs.ConfigType;
  interval?: number;
};

const RelativeTime = (
  props: Props = {
    interval: 1000,
  },
) => {
  const from = useMemo(() => dayjs(props.from), [props.from]);
  const to = useMemo(() => dayjs(props.to), [props.to]);
  const intervalMs = props.interval ?? 1000;

  const [text, setText] = useState(from.to(to));

  useEffect(() => {
    const interval = setInterval(() => {
      setText(from.to(to));
    }, intervalMs);
    return () => clearInterval(interval);
  }, [from, intervalMs, to]);

  return <>{text}</>;
};

export default RelativeTime;
