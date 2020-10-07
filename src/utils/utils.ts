export const refreshPage = () => {
  window.location.reload(false)
}

export const money_br = (value: string) => {
  return value.replace('.', ',')
}
