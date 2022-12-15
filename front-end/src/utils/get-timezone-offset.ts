export function getTimezoneOffsetInHours() {
  const offset = new Date().getTimezoneOffset();
  const offsetInHours = (offset / 60) * -1;
  return offsetInHours.toString();
}
