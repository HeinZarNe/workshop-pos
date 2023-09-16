export const isValidPhoneNumber = (phoneNumber) => {
  const parsedPhoneNumber = Number(phoneNumber);
  const desiredLength = 9; // Adjust to your desired phone number length

  return !isNaN(parsedPhoneNumber) && phoneNumber.length >= desiredLength;
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
