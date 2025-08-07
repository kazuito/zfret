import dayjs from "dayjs";
import "dayjs/locale/ja";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

dayjs.locale("ja");
dayjs.extend(relativeTime);

type Props = {
  from?: dayjs.Dayjs | Date | string | number;
  to?: dayjs.Dayjs | Date | string | number;
};

const RelativeTime = (
  { from, to }: Props = {
    from: dayjs(),
    to: dayjs(),
  }
) => {
  const [text, setText] = useState(dayjs(from).to(dayjs(to)));

  useEffect(() => {
    const interval = setInterval(() => {
      setText(dayjs(from).to(dayjs(to)));
    }, 1000);
    return () => clearInterval(interval);
  }, [from, to]);

  return <>{text}</>;
};

export default RelativeTime;
