<template>
  <el-dialog
    :model-value="modelValue"
    modal-class="balance-increase-modal"
    title="Пополнение"
    width="30%"
    @closed="closeModal"
  >
    <el-form
      ref="formRef"
      label-position="top"
      require-asterisk-position="right"
      :model="form"
      @submit.prevent="onSubmit"
    >
      <el-row :gutter="10">
        <el-col>
          <el-form-item
            label="Номер карты"
            prop="card_number"
            :rules="[requiredRule(), lengthRule(16)]"
          >
            <el-input
              v-model="form.card_number"
              v-mask="'#### #### #### ####'"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item
            label="Срок действия"
            prop="expiration_date"
            :rules="[requiredRule(), lengthRule(5)]"
          >
            <el-input
              v-model="form.expiration_date"
              v-mask="'##/##'"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            label="CVV"
            prop="cvv"
            :rules="[requiredRule(), lengthRule(3)]"
          >
            <el-input
              v-model="form.cvv"
              v-mask="'###'"
              type="password"
              show-password
            />
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="10">
        <el-col>
          <el-form-item
            label="Сумма"
            prop="cost"
            :rules="[requiredRule()]"
          >
            <el-input
              v-model.number="form.cost"
              :formatter="onlyNumbersFormatter"
            />
          </el-form-item>
        </el-col>
      </el-row>
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
          Пополнить
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { mask as vMask } from 'vue-the-mask'
import { requiredRule, lengthRule, validate } from '@/utils/validation'
import { onlyNumbersFormatter } from '@/utils/format'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const form = ref({})
const formRef = ref({})

const onSubmit = async () => {
  const isValid = await validate(formRef.value)
  if (!isValid)
    return
  
  emit('submit', form.value)
  formRef.value.resetFields()
  closeModal()
}

const closeModal = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped lang="scss">

</style>
