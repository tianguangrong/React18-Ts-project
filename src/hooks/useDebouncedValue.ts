import React, { useCallback, useState, useRef, useEffect } from "react";

type valueType = string;

export function useDebouncedValue(value: valueType, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<valueType>(value);
  const timeoutRef = useRef<number>(null);
  useEffect(() => {
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(() => value)
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [value, delay]);
  return debouncedValue;
}
