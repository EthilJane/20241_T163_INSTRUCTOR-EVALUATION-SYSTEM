export function formatDate(date: Date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12

  // Add leading zero to minutes if needed
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  // Return the formatted date string
  return `${month} ${day}, ${year} ${hours}:${formattedMinutes} ${ampm}`;
}
