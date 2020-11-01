import React, { SelectHTMLAttributes } from 'react'
import { Label } from 'reactstrap'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label: string
  options: Array<{
    id: number
    name: string
  }>
}

const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
  return (
    <>
      <Label>{label}</Label>
      <select className="custom-select" name={name} {...rest}>
        <option value="">Selecione uma Categoria</option>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          )
        })}
      </select>
    </>
  )
}

export default Select
