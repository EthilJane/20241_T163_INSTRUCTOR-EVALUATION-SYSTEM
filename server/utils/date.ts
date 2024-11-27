export function isTokenExpired(timestamp: number) {
  const expirationTime = timestamp * 1000; // Convert to milliseconds
  const currentTime = Date.now();
  // Check if expired
  return currentTime > expirationTime;
}
