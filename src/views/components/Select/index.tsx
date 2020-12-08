import React, { SelectHTMLAttributes } from 'react'
import { Label } from 'reactstrap'

export interface CategoyProps {
  id: string
  name: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label: string
  categories: CategoyProps[]
}

const Select: React.FC<SelectProps> = ({ label, name, categories, ...rest }) => {
  return (
    <>
      <Label>{label}</Label>
      <select className="custom-select" name={name} {...rest}>
        <option value="">Selecione um item</option>
        {categories.map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          )
        })}
      </select>
    </>
  )
}

export default Select
