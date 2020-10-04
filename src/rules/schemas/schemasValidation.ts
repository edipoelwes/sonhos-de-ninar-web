import * as Yup from 'yup'

export const registerForm = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório!'),
  email: Yup.string()
    .required('E-mail obrigatório!')
    .email('Digite um e-mail válido!'),
  password: Yup.string().min(6, 'No minimo 6 dígitos!'),
  social_name: Yup.string().required('Empresa obrigatório'),
  alias_name: Yup.string().required('Nome Fantasia obrifatório'),
  document_company: Yup.string().required('CNPJ obrigatório'),
  document_company_secondary: Yup.string()
    .required('Incrição Estadual obrigatório')
})

export const loginForm = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório!')
    .email('Digite um e-mail válido!'),
  password: Yup.string().min(6, 'No minimo 6 dígitos!')
})
