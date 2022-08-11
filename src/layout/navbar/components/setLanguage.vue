<template>
  <div @click="click">
    <svg-icon :icon="langIcon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import i18n from '@/lang'

const langIcon = computed(() =>
  i18n.global.locale === 'zh' ? 'langZh' : 'langEn'
)
const click = () => {
  // ElMessage.info('正在开发中...')
  i18n.global.locale = i18n.global.locale === 'zh' ? 'en' : 'zh'
}
</script>

<style></style>
