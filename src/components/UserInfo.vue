<template>
  <el-form
    ref="formRef"
    label-position="top"
    require-asterisk-position="right"
    :model="form"
    @submit.prevent="onSubmit"
  >
    <section class="section">
      <h3 class="section__header">
        Паспортные данные
      </h3>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item
            prop="fio"
            label="ФИО"
            :rules="[requiredRule()]"
          >
            <el-input
              v-model="form.fio"
              placeholder="Васильев Василий Васильевич"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            prop="birth"
            label="Дата рождения"
            :rules="[requiredRule()]"
          >
            <el-input
              v-model="form.birth"
              v-mask="'##.##.####'"
              placeholder="__.__.____"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item
            prop="fio"
            label="Серия и номер паспорта"
            :rules="[requiredRule()]"
          >
            <el-input
              v-model="form.passportNumbers"
              v-mask="'#### ######'"
              placeholder="0000 000000"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item
                prop="birth"
                label="Дата выдачи"
                :rules="[requiredRule()]"
              >
                <el-input
                  v-model="form.issueDate"
                  v-mask="'##.##.####'"
                  placeholder="__.__.____"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                prop="birth"
                label="Код подразделения"
                :rules="[requiredRule()]"
              >
                <el-input
                  v-model="form.departmentCode"
                  v-mask="'###-###'"
                  placeholder="000-000"
                />
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

      <el-form-item
        prop="phone"
        label="Мобильный телефон"
        :rules="[requiredRule()]"
      >
        <el-input
          v-model="form.phone"
          v-mask="'+7 (###) ###-##-##'"
          placeholder="+7 (000) 000-00-00"
        />
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
import { ref } from 'vue'
import { mask as vMask } from 'vue-the-mask'
import { requiredRule, validate } from '@/utils/validation'

const emit = defineEmits(['submit'])

const form = ref({})
const formRef = ref({})

const onSubmit = async () => {
  const isFormValid = await validate(formRef.value)

  if (isFormValid)
    emit('submit', form.value)
}
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
