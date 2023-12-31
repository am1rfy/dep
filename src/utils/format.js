const ruFormatter = new Intl.DateTimeFormat('ru')

const pad = (n) => `${Math.floor(Math.abs(n))}`.padStart(2, '0')

export const getTimeOfDate = (date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`

export const formatDateToRu = (date) =>
  ruFormatter.format(new Date(date)) + ' ' + getTimeOfDate(new Date(date))

export const onlyNumbersFormatter = (str) =>
  str
    .split('')
    .filter((char) => !Number.isNaN(Number(char)))
    .join('')
