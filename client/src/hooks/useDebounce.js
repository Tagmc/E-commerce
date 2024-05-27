import { useEffect, useState } from "react";

const useDebounce = (value, milisecond) => {
  const  [debounceValue, setDebounceValue] = useState('');
  useEffect(() => {
    const setTimeOutId = setTimeout(() => {
      setDebounceValue(value);
    }, milisecond);
    return () => {
      clearTimeout(setTimeOutId);
    }
  }, [value, milisecond]);
  return debounceValue;
}

export default useDebounce;