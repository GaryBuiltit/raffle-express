export function formatPublicContestantName(contestant) {
  if (!contestant) return "Anonymous";

  const first = String(
    contestant.firstName ||
      contestant.fullName?.split(/\s+/)[0] ||
      contestant.name?.split(/\s+/)[0] ||
      "",
  ).trim();

  const last = String(
    contestant.lastName ||
      contestant.fullName?.split(/\s+/).slice(1).join(" ") ||
      contestant.name?.split(/\s+/).slice(1).join(" ") ||
      "",
  ).trim();

  const lastInitial = last ? `${last.charAt(0).toUpperCase()}.` : "";

  if (first && lastInitial) return `${first} ${lastInitial}`;
  if (first) return first;
  return "Anonymous";
}
