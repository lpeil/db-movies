export default function toTime(value) {
  if (!value) return '';

  const hours = Math.floor(value / 60);
  const minutes = Math.floor(value % 60);

  return `${hours ? `${hours}h ` : ''} ${minutes}m`;
}
