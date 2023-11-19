<template>
  <el-tooltip
    content="Назад"
    placement="top"
  >
    <el-button
      icon="ArrowLeft"
      type="primary"
      size="small"
      v-bind="attrs"
    />
  </el-tooltip>
</template>

<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
