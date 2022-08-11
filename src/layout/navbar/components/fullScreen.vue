<template>
  <div @click="click">
    <svg-icon :icon="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
  </div>
</template>

<script setup>
import screenfull from 'screenfull'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const isFullscreen = ref(false)

const click = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning('浏览器全屏功能失败!')
    return false
  }
  screenfull.toggle()
}

const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

const init = () => {
  if (screenfull.isEnabled) {
    screenfull.on('change', change)
  }
}

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  screenfull.off('change', change)
})
</script>

<style lang="scss" scoped></style>
