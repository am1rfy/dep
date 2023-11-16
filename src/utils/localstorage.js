export const getFromStorage = key => {
  const value = localStorage.getItem(key)
  return value
    ? JSON.parse(value)
    : null
}

export const setToStorage = (key, value) => {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  )
}
