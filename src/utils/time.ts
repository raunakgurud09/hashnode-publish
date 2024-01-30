function getISTinUTCFormat(time: string) {
  // Get the current date and time in UTC
  const currentUTC = new Date();
  const ISTTimeInput = new Date(time);
  console.log(ISTTimeInput);

  // Offset for Indian Standard Time (IST) is UTC+5:30
  const istOffset = 5.5 * 60 * 60 * 1000; // Convert to milliseconds

  // Calculate the IST time by adding the offset
  const istTimeInMillis = ISTTimeInput.getTime() + istOffset;

  // Create a new Date object for IST
  const istTime = new Date(istTimeInMillis);

  // Format the date and time in UTC format
  const utcFormat = istTime.toISOString();

  return utcFormat;
}

// Example usage
const istInUTCFormat = getISTinUTCFormat("2024-01-30T11:00:00");
console.log(istInUTCFormat);
