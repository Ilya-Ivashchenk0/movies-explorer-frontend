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

    let newErrors = { ...errors }

    if (name === 'email') {
      const isValidEmail = consts.EMAIL_REGEX.test(value)
      newErrors = { ...newErrors, [name]: isValidEmail ? '' : 'Пожалуйста введите корректный email' }
    } else {
      newErrors = { ...newErrors, [name]: target.validationMessage }
    }

    setErrors(newErrors)
    setIsValid(Object.values(newErrors).every(error => error === '') && target.closest('form').checkValidity())
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