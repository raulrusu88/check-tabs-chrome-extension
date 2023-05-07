export const truncate = (string: string, num: number) => (num > string.length) ? string : `${string.substring(0, num)}...`

