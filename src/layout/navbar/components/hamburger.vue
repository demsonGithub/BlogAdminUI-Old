<template>
  <div style="padding: 0 15px" @click="toggleClick">
    <svg-icon
      icon="hamburger"
      class="hamburger"
      :class="{ 'is-active': !isActive }"
    ></svg-icon>
  </div>
</template>

<script setup>
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['toggleClick'])

const toggleClick = () => {
  emits('toggleClick')
}
</script>

<style lang="scss" scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
