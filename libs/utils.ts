export const createClassName = (...classNames: string[]) => {
    return classNames.join(" ");
  };


export const createRandomString = (round: number = 0): string => {
  let result = "";
  for(let i = round + 1; i > 0; i--){
    result = result + Math.random().toString(36).slice(2)
  }
  return result
}