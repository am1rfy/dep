<template>
	<el-form ref="formRef" label-position="top" require-asterisk-position="right" :model="form" @submit.prevent="onSubmit">
		<section class="section">
			<h3 class="section__header">
				Паспортные данные
			</h3>

			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item prop="fio" label="ФИО" :rules="[requiredRule()]">
						<el-input v-model="form.fio" placeholder="Васильев Василий Васильевич" disabled />
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item prop="birth" label="Дата рождения" :rules="[requiredRule(), lengthRule(10)]">
						<el-input v-model="form.birth" v-mask="'##.##.####'" placeholder="__.__.____" />
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item prop="passportNumbers" label="Серия и номер паспорта" :rules="[requiredRule(), lengthRule(10)]">
						<el-input v-model="form.passportNumbers" v-mask="'#### ######'" placeholder="0000 000000" />
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-row :gutter="10">
						<el-col :span="12">
							<el-form-item prop="issueDate" label="Дата выдачи" :rules="[requiredRule(), lengthRule(10)]">
								<el-input v-model="form.issueDate" v-mask="'##.##.####'" placeholder="__.__.____" />
							</el-form-item>
						</el-col>

						<el-col :span="12">
							<el-form-item prop="departmentCode" label="Код подразделения" :rules="[requiredRule(), lengthRule(7)]">
								<el-input v-model="form.departmentCode" v-mask="'###-###'" placeholder="000-000" />
							</el-form-item>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</section>

		<section class="section">
			<h3 class="section__header">
				Контактные данные
			</h3>

			<el-form-item prop="phone" label="Мобильный телефон" :rules="[requiredRule(), lengthRule(16)]">
				<el-input v-model="form.phone" v-mask="'+7 (###) ###-##-##'" placeholder="+7 (000) 000-00-00" />
			</el-form-item>
		</section>

		<section>
			<el-row justify="end">
				<el-button type="info" @click="resetForm">
					<el-icon class="el-icon--left">
						<Refresh />
					</el-icon>
					Очистить
				</el-button>

				<el-button type="success" native-type="submit">
					<el-icon class="el-icon--left">
						<Check />
					</el-icon>
					Сохранить
				</el-button>
			</el-row>
		</section>
	</el-form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { mask as vMask } from 'vue-the-mask'
import { useStore } from '@/stores'
import { requiredRule, lengthRule, validate } from '@/utils/validation'
import { deepClone } from '@/utils'

const emit = defineEmits(['submit'])

const store = useStore()

const form = ref({})
const formRef = ref({})

const resetForm = () => {
	form.value = {}
}

const onSubmit = async () => {
	const isFormValid = await validate(formRef.value)
	if (!isFormValid)
		return

	store.account.investment_balance_info = deepClone(form.value)
	emit('submit', form.value)
}

onMounted(() => {
	form.value.fio = store.account.fio
})
</script>

<style scoped lang="scss">
.section {
	&:not(:first-child) &__header {
		margin: 1rem 0;
	}

	&:first-child &__header {
		margin-bottom: 1rem;
	}
}
</style>
