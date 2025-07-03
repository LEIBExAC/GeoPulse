import {
  format,
  isToday,
  parseISO,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears
} from 'date-fns';

export function formatLastLogin(dateString) {
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  const now = new Date();

  const secondsDiff = differenceInSeconds(now, date);
  const minutesDiff = differenceInMinutes(now, date);
  const hoursDiff = differenceInHours(now, date);
  const daysDiff = differenceInDays(now, date);
  const weeksDiff = differenceInWeeks(now, date);
  const monthsDiff = differenceInMonths(now, date);
  const yearsDiff = differenceInYears(now, date);

  if (secondsDiff < 60) {
    return `${secondsDiff} sec${secondsDiff !== 1 ? 's' : ''} ago`;
  }

  if (minutesDiff < 60) {
    return `${minutesDiff} min${minutesDiff !== 1 ? 's' : ''} ago`;
  }

  if (hoursDiff < 6) {
    return `${hoursDiff} hr${hoursDiff !== 1 ? 's' : ''} ago`;
  }

  if (isToday(date)) {
    return `Today at ${format(date, 'hh:mm a')}`;
  }

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
