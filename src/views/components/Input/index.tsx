import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  id?: string
  inputClass?: string
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  name,
  inputClass,
  ...rest
}) => {
  return (
    <>
      {label ? (
        <>
          <label htmlFor={id}>{label}</label>
          <input
            className={inputClass || 'form-control'}
            autoComplete="off"
            id={id}
            name={name}
            {...rest}
          />
        </>
      ) : (
        <input
          className={inputClass || 'form-control'}
          name={name}
          autoComplete="off"
          {...rest}
        />
      )}
    </>
  )
}

export default Input
