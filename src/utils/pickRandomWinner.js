export function getContestantDisplayName(contestant) {
  if (!contestant) return "";
  return (
    contestant.firstName ||
    contestant.fullName?.split(" ")[0] ||
    contestant.name?.split(" ")[0] ||
    "Unknown"
  );
}

export function pickRandomWinner(contestants) {
  if (!Array.isArray(contestants) || contestants.length === 0) {
    return null;
  }
  const index = Math.floor(Math.random() * contestants.length);
  return contestants[index];
}
