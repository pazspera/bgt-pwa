export const findInitials = (name: string) => {
  const arrayWords = name.split(" ");
  
  if(arrayWords.length === 1) {
    return name.slice(0,2).toUpperCase();
  }

  return arrayWords[0].charAt(0) + arrayWords[1].charAt(0);
}