export function formatTime(value) {
  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(value));
}

export function formatDateTime(value) {
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(value));
}

export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;

  if (!hours) return `${restMinutes} 分钟`;
  return `${hours} 小时 ${restMinutes} 分钟`;
}
