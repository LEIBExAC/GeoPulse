import {
  format,
  isToday,
  isYesterday,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  parseISO
} from 'date-fns';

export function formatLastLogin(dateString) {
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  const now = new Date();

  if (isToday(date)) {
    return `Today at ${format(date, 'hh:mm a')}`;
  }

  const daysDiff = differenceInDays(now, date);
  const weeksDiff = differenceInWeeks(now, date);
  const monthsDiff = differenceInMonths(now, date);
  const yearsDiff = differenceInYears(now, date);

  if (daysDiff < 7) {
    return `${daysDiff} day${daysDiff > 1 ? 's' : ''} ago on ${format(date, 'dd MMM')}`;
  }

  if (weeksDiff < 4) {
    return `${weeksDiff} week${weeksDiff > 1 ? 's' : ''} ago on ${format(date, 'dd MMM')}`;
  }

  if (monthsDiff < 12) {
    return `${monthsDiff} month${monthsDiff > 1 ? 's' : ''} ago on ${format(date, 'dd MMM')}`;
  }

  return `${yearsDiff} year${yearsDiff > 1 ? 's' : ''} ago on ${format(date, 'MMM yyyy')}`;
}
