<template>
  <div @click="clickDoc">
    <svg-icon icon="doc" />
  </div>
</template>

<script setup>
const clickDoc = () => {
  window.open('https://gitee.com/wang_zhixiong/dashboard/projects', '_blank')
}
</script>

<style lang="scss" scoped></style>
