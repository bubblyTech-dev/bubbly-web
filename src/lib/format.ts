/** Small display helpers shared by the workspace screens. */

export function initials(name: string | null | undefined) {
  return (name ?? '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('');
}

/** 2022-05-14 -> 14/05/2022 */
export function formatDate(value: string | null | undefined) {
  if (!value) return '—';
  const [y, m, d] = value.slice(0, 10).split('-');
  return y && m && d ? `${d}/${m}/${y}` : value;
}

/** 2024-06-01 -> June 2024 */
export function formatMonthYear(value: string | null | undefined) {
  if (!value) return '—';
  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
}

/** 13:30 -> 1:30 PM */
export function formatTime(value: string | null | undefined) {
  if (!value) return '';
  const [h, m] = value.split(':').map(Number);
  if (h === undefined || m === undefined || Number.isNaN(h)) return value;
  const suffix = h >= 12 ? 'PM' : 'AM';
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${suffix}`;
}

export function formatTimeRange(from: string | null | undefined, to: string | null | undefined) {
  if (!from && !to) return '';
  return [formatTime(from), formatTime(to)].filter(Boolean).join(' – ');
}

const WEEKDAYS = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export function formatWorkingDays(days: number[]) {
  if (!days.length) return '—';
  const sorted = [...days].sort();
  const consecutive = sorted.every((d, i) => i === 0 || d === sorted[i - 1]! + 1);
  if (consecutive && sorted.length > 2)
    return `${WEEKDAYS[sorted[0]!]} – ${WEEKDAYS[sorted[sorted.length - 1]!]}`;
  return sorted.map((d) => WEEKDAYS[d]).join(', ');
}

export function greeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export function firstName(name: string | null | undefined) {
  return (name ?? '').trim().split(/\s+/)[0] ?? '';
}
