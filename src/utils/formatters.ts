export function formatCalories(value: number): string {
  return value.toLocaleString();
}

export function formatMacro(value: number, unit: string = 'g'): string {
  return `${value}${unit}`;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatPercentage(value: number, total: number): string {
  if (total === 0) return '0%';
  return `${Math.round((value / total) * 100)}%`;
}

export function formatGoalProgress(current: number, goal: number): string {
  return `${formatCalories(current)}/${formatCalories(goal)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}
