export const generateRafflePin = (length = 6, includeLetters = true) => {
  const numbers = "0123456789";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const characters = includeLetters ? numbers + letters : numbers;

  let pin = "";
  for (let i = 0; i < length; i++) {
    pin += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return pin;
};

export const generateUniqueRafflePin = async (
  RaffleModel,
  length = 4,
  includeLetters = true
) => {
  let pin;
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 100; // Prevent infinite loops

  while (!isUnique && attempts < maxAttempts) {
    pin = generateRafflePin(length, includeLetters);

    // Check if PIN already exists
    const existingRaffle = await RaffleModel.findOne({ pin: pin });
    if (!existingRaffle) {
      isUnique = true;
    }

    attempts++;
  }

  if (!isUnique) {
    throw new Error("Unable to generate unique PIN after maximum attempts");
  }

  return pin;
};
