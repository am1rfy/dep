export const requiredRule = () => ({
  required: true,
  message: 'Обязательное поле',
  trigger: 'blur',
})

export const validate = async form => {
  let isValid

  try {
    await form.validate()
    isValid = true
  } catch (e) {
    isValid = false
  }

  return isValid
}
