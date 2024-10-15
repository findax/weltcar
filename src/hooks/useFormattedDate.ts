import { useEffect, useState } from 'react';

export const useFormattedDate = (dateString: string) => {
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const date = new Date(dateString);

    // Format date (e.g., October 08, 2024)
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    };
    const formatted = date.toLocaleDateString('en-US', dateOptions);
    setFormattedDate(formatted);

    // Format time (e.g., 10:05 AM)
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    const formattedT = date.toLocaleTimeString('en-US', timeOptions);
    setFormattedTime(formattedT);
  }, [dateString]);

  return { formattedDate, formattedTime };
};
