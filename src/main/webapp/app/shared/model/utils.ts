export function toSafeArray(potentialArray: any | any[]) {
  return Array.isArray(potentialArray) ? potentialArray : [potentialArray];
}
