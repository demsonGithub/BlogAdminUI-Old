<template>
  <el-input v-model="input" placeholder="Please input" />
</template>

<script>
export default {
  name: 'Input'
}
</script>
<script setup>
import { ref } from 'vue'

const input = ref('')
</script>

<style lang="scss" scoped></style>
