export const refreshPage = () => {
  window.location.reload(false)
}

export const money_br = (value: string) => {
  return value.replace('.', ',')
}

export const stringForNumber = (value: string) => {
  return parseFloat(value.replace(',', '.')).toFixed(2)
}

export const numberForString = (value: string) => {
  return value.replace('.', ',')
}

export const companyStorage = (): number | null => {
  const user = localStorage.getItem('@SonhosDeNinar:user')
  if (user) {
    const data = JSON.parse(user)

    return data.company_id
  }

  return null
}
