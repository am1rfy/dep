<template>
  <el-empty>
    <template #description>
      <h1 class="el-empty__description">
        404
      </h1>
    </template>

    <el-button
      type="primary"
      @click="goHome"
    >
      <el-icon class="el-icon--left">
        <HomeFilled />
      </el-icon>
      На главную
    </el-button>
  </el-empty>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push({ name: 'index' })
}
</script>

<style scoped lang="scss">
.el-empty__description {
  color: white;
}
</style>