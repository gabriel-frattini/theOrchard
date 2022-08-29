export const setCorrectPhrase = (date: Date) => {
  let d = date.getHours();
  let SeyTime = Number(d) + 2;
  if (SeyTime < 10)
    return `Good morning, ${process.env.NEXT_PUBLIC_ADMIN_NAME}`;
  if (SeyTime < 16) return `Good day, ${process.env.NEXT_PUBLIC_ADMIN_NAME}`;
  if (SeyTime < 22)
    return `Good evening, ${process.env.NEXT_PUBLIC_ADMIN_NAME}`;
  return `Good night, ${process.env.NEXT_PUBLIC_ADMIN_NAME}`;
};
