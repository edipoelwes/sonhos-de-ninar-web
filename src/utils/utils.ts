export const refreshPage = () => {
  window.location.reload(false)
}

export const money_br = (value: string) => {
  return value.replace('.', ',')
}

export const stringForNumber = (value: string) => {
  return parseFloat(value.replace(',', '.')).toFixed(2)
}
