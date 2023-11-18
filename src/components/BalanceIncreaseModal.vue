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
      :model="form"
      @submit.prevent="onSubmit"
    >
      <el-form-item
        label="Основной счет"
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
          Пополнить
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const form = ref({})
const formRef = ref({})

const onSubmit = () => {
  emit('submit', form.value)
  formRef.value.resetFields()
  closeModal()
}

const closeModal = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped lang="scss">
.balance-increase-modal:deep(.el-dialog__body) {
  padding: var(--el-dialog-padding-primary);
}
</style>
