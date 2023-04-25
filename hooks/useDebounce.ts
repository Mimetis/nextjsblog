import { useEffect, useState } from 'react';

//Improvement: Change any to generic type that should also be passed to useState
export const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};