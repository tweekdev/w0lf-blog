import { parseISO, format } from 'date-fns';
import styles from './Date.module.css';

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return (
    <time className={styles.date} dateTime={dateString}>
      {format(date, 'LLLL, d, yyyy')}
    </time>
  );
};

export default DateFormatter;
