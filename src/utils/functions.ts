export const setCorrectPhrase = (date: Date) => {
  let d = date.getHours();
  let SeyTime = Number(d) + 2;
  if (SeyTime < 10) return "Good morning, Beryl";
  if (SeyTime < 16) return "Good day, Beryl";
  if (SeyTime < 21) return "Good evening, beryl";
  return "Good night, Beryl";
};
