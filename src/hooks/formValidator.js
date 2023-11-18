import React, { useCallback } from 'react'
import consts from '../utils/consts'

export const useFormValidation = () => {
  const [values, setValues] = React.useState({})
  const [errors, setErrors] = React.useState({})
  const [isValid, setIsValid] = React.useState(false)

  const handleChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value
    setValues({...values, [name]: value})

    if (name === 'email') {
      const isValidEmail = consts.EMAIL_REGEX.test(value)
      setErrors({ ...errors, [name]: isValidEmail ? '' : 'Пожалуйста введите корректный email' })
    } else {
      setErrors({...errors, [name]: target.validationMessage })
    }

    setIsValid(target.closest('form').checkValidity())
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues)
      setErrors(newErrors)
      setIsValid(newIsValid)
    },
    [setValues, setErrors, setIsValid]
  )

  return { values, handleChange, errors, isValid, resetForm }
}