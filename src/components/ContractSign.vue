<template>
  <el-form
    ref="formRef"
    label-position="top"
    require-asterisk-position="right"
    :model="form"
    @submit.prevent="onSubmit"
  >
    <section class="section">
      <h3 class="section__header download">
        <span>1.&nbsp;</span>
        <el-link
          class="download__link"
          type="primary"
          :href="CONTRACT_TEMPLATE_URL"
          :underline="false"
          download
        >
          Скачайте шаблон документа
        </el-link>
      </h3>
    </section>

    <section class="section">
      <h3 class="section__header">
        2. Прикрепите подписанный договор
      </h3>

      <el-form-item
        prop="contract"
        :rules="[requiredRule()]"
      >
        <el-upload
          class="upload"
          v-model:file-list="form.contract"
          :on-preview="onFilePreview"
          :auto-upload="false"
          :limit="1"
          show-file-list
          drag
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Перетащите файл или <em>нажмите чтобы загрузить</em>
          </div>
        </el-upload>
      </el-form-item>
    </section>

    <section>
      <el-row justify="end">
        <el-button
          type="success"
          native-type="submit"
        >
          Сохранить
        </el-button>
      </el-row>
    </section>
  </el-form>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { requiredRule, validate } from '@/utils/validation'

const CONTRACT_TEMPLATE_URL = '/vite.svg'

const emit = defineEmits(['submit'])

const form = ref({})
const formRef = ref({})

const onSubmit = async () => {
  const isFormValid = await validate(formRef.value)

  if (isFormValid)
    emit('submit', form.value)
}

const onFilePreview = file => {
  const url = URL.createObjectURL(
    new Blob([file.raw], { type: file.raw.type })
  )
  window.open(url, '_blank')
}

watchEffect(() => {
  const isFileAttached = form.value.contract?.length

  if (isFileAttached)
    formRef.value.clearValidate()
})
</script>

<style scoped lang="scss">
.upload {
  width: 100%;
}
.download {
  display: flex;
  align-items: center;

  &__link {
    font-weight: 700;
    font-size: 1.17rem;
  }
}
.section {
  &:not(:first-child) &__header {
    margin: 1rem 0;
  }

  &:first-child &__header {
    margin-bottom: 1rem;
  }
}
:deep(.el-upload-list__item) {
  cursor: pointer;
}
</style>
