<template>
  <el-dialog
    :model-value="modelValue"
    modal-class="deposit-modal"
    title="Пополнение"
    width="20%"
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
        prop="balance"
      >
        <el-input
          v-model.number="form.balance"
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

const onSubmit = () => {
  emit('submit', form.value)
  closeModal()
}

const closeModal = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped lang="scss">
.deposit-modal:deep(.el-dialog__body) {
  padding: var(--el-dialog-padding-primary);
}
</style>
