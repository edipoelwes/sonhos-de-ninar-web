export const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const cnpjMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2}).(\d{3})(\d)/, '$1.$2.$3')
    .replace(/.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const ieMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{8})(\d)/, '$1-$2')
    .replace(/(-\d{1})\d+?$/, '$1')
}

export const cepMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1')
}

export const moneyMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d)(\d{2})$/, '$1,$2')
    .replace(/(?=(\d{3})+(\D))\B/g, '.')
}

export const dataMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/.(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
}

export const phoneMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d\d)(\d)/g, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')
}

export const telephoneMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d\d)(\d)/g, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')
}
