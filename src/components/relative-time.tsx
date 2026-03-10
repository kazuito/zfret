import { formatDistance, isValid } from "date-fns";
import { useCallback, useEffect, useReducer } from "react";

type DateInput = Date | number | string | undefined;

const parseDateInput = (value: DateInput): Date | null => {
  if (value instanceof Date) {
    return value;
  }
  if (value === undefined) {
    return null;
  }

  const parsed = new Date(value);
  return isValid(parsed) ? parsed : null;
};

export const RelativeTime = ({
  from,
  to,
  interval = 1000,
}: {
  from?: DateInput;
  to?: DateInput;
  interval?: number;
}) => {
  const intervalMs = interval ?? 1000;

  const computeLabel = useCallback(() => {
    const baseDate = parseDateInput(from) ?? new Date();
    const targetDate = parseDateInput(to) ?? new Date();

    if (!isValid(baseDate) || !isValid(targetDate)) {
      return "";
    }

    return formatDistance(targetDate, baseDate, { addSuffix: true });
  }, [from, to]);

  const [, bump] = useReducer((count: number) => count + 1, 0);

  useEffect(() => {
    const id = setInterval(() => {
      bump();
    }, intervalMs);

    return () => clearInterval(id);
  }, [intervalMs]);

  const text = computeLabel();

  return <>{text}</>;
};
