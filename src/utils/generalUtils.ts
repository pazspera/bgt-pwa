export const findInitials = (name: string) => {
  const arrayWords = name.split(" ");
  
  if(arrayWords.length === 1) {
    return name.slice(0,2).toUpperCase();
  }

  return arrayWords[0].charAt(0) + arrayWords[1].charAt(0);
}

export const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min) + min);
}
