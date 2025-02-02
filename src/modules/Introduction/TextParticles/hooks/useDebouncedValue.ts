import { useState, useEffect } from "react";

const useDebouncedValue = (initialValue: string, delay: number) => {
  const [currentValue, setCurrentValue] = useState(initialValue); // The current value (immediate)
  const [debouncedValue, setDebouncedValue] = useState(initialValue); // The debounced value (after delay)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(currentValue); // Set the debounced value after the delay
    }, delay);

    // Cleanup function to clear the timeout if the component unmounts or value changes before the timeout
    return () => {
      clearTimeout(handler);
    };
  }, [currentValue, delay]); // Effect depends on currentValue and delay

  return { currentValue, debouncedValue, setCurrentValue };
};

export default useDebouncedValue;
