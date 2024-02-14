import{ useState, useEffect } from 'react';

export default function TimeAgo({ timestamp }: {timestamp: string}) {
  const [timeAgoOrDate, setTimeAgoOrDate] = useState('');

  useEffect(() => {
    const calculateTimeAgoOrDate = () => {
      const now = new Date();
      const pastDate = new Date(timestamp);
      const timeDifference = now.getTime() - pastDate.getTime();
      const minutesAgo = Math.floor(timeDifference / (1000 * 60));
      const hoursAgo = Math.floor(minutesAgo / 60);

      if (minutesAgo < 1) {
        setTimeAgoOrDate('just now');
      } else if (minutesAgo < 60) {
        setTimeAgoOrDate(`${minutesAgo} min${minutesAgo === 1 ? '' : 's'}`);
      } else if (hoursAgo < 24) {
        setTimeAgoOrDate(`${hoursAgo} h${hoursAgo === 1 ? '' : 's'}`);
      } else {
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' };
        setTimeAgoOrDate(pastDate.toLocaleDateString(undefined, options));
      }
    };
    calculateTimeAgoOrDate();
    const intervalId = setInterval(calculateTimeAgoOrDate, 60000);
    return () => clearInterval(intervalId);
  }, [timestamp]);

  return <span>{timeAgoOrDate}</span> 
}
