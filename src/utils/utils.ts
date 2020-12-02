export const refreshPage = () => {
  window.location.reload(false)
}

export const cpf = (value: string) => {
  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export const cellphone = (value: string) => {
  return value.replace(/(\d{2})(\d{5})/, '($1) $2 - ')
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

export const userStorage = (): object | null => {
  const user = localStorage.getItem('@SonhosDeNinar:user')

  if (user) {
    return { user: JSON.parse(user) }
  }

  return null
}

export const nameStorage = (): string | null  => {
  const user = localStorage.getItem('@SonhosDeNinar:user')

  if (user) {
    const userName = JSON.parse(user)
    return userName.name
  }

  return null
}
