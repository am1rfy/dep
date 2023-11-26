<template>
  <el-dialog
    :model-value="modelValue"
    :title="payment.name"
    modal-class="payment-modal"
    width="30%"
    @closed="closeModal"
  >
    <el-form
      ref="formRef"
      require-asterisk-position="right"
      label-position="top"
      :model="form"
      :rules="formRules"
      @submit.prevent="onSubmit"
    >
      <el-form-item
        label="Организация"
        prop="payment_org"
      >
        <el-select
          v-model="form.payment_org"
          style="width: 100%;"
        >
          <el-option
            v-for="item of payment.options"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        :label="`Счет${form.balance_account_name ? ` - ${store.account[form.balance_account_name]} руб.` : ''}`"
        prop="balance_account_name"
      >
        <el-select
          v-model="form.balance_account_name"
          style="width: 100%;"
        >
          <el-option
            v-for="item of balanceAccounts"
            :key="item.name"
            :label="item.label"
            :value="item.name"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="Сумма"
        prop="cost"
      >
        <el-input
          v-model.number="form.cost"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button
          @click="closeModal"
        >
          Отмена
        </el-button>

        <el-button
          type="primary"
          native-type="submit"
          @click="onSubmit"
        >
          Подтвердить
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores'
import { useLoadingStore } from '@/stores'
import { requiredRule, validate } from '@/utils/validation'
import { ElNotification } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  payment: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const router = useRouter()

const store = useStore()
const { startLoading, stopLoading } = useLoadingStore()

const balanceAccounts = ref([])

onMounted(() => {
  balanceAccounts.value.push(
    { name: 'primary_balance', label: 'Баланс - Основной счет' },
  )

  if (
    store.account.investment_balance !== undefined &&
    store.account.savings_balance !== undefined
  )
    balanceAccounts.value.push(
      { name: 'investment_balance', label: 'Вклад - Основной счет' },
      { name: 'savings_balance', label: 'Вклад - Накопительный счет' },
    )
})

const form = ref({})
const formRef = ref({})

const formRules = computed(
  () => ({
    payment_org: [requiredRule()],
    balance_account_name: [requiredRule()],
    cost: [{ validator: costFieldValidator, trigger: 'blur' }, requiredRule()]
  })
)

const costFieldValidator = (rule, value, callback) => {
  if (!form.value.balance_account_name)
    callback(new Error('Не выбран счет'))

  const balance = store.account[form.value.balance_account_name]

  if (form.value.cost === 0)
    callback(new Error('Некорректная сумма'))

  if (form.value.cost > balance)
    callback(new Error('Недостаточно средств'))

  callback()
}

const onSubmit = async () => {
  const isValid = await validate(formRef.value)
  if (!isValid)
    return

  const balanceAccount = balanceAccounts.value.find(
    account => account.name === form.value.balance_account_name
  )

  const data = {
    label: balanceAccount.label,
    balanceAccount: balanceAccount.name,
    cost: form.value.cost,
    paymentLabel: `${props.payment.name} - ${form.value.payment_org}`,
  }

  ElNotification.success('Успешно')

  setTimeout(() => {
    startLoading()
    setTimeout(() => {
      stopLoading()
      router.push({ name: 'home' })
    }, 3000)
  }, 1500)
  
  emit('submit', data)
  formRef.value.resetFields()
  closeModal()
}

const closeModal = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped lang="scss">

</style>
