export const requiredRule = () => ({
	required: true,
	message: 'Обязательное поле',
	trigger: 'change',
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

const lengthValidator = length => (rule, value, callback) => {
	if (value.split(' ').join('').length < length)
		callback(new Error('Некорректное значение'))

	callback()
}

export const lengthRule = length => ({
	validator: lengthValidator(length),
	trigger: 'change',
})
