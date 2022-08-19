<template>
  <div class="app-wrapper" :class="classObj">
    <div
      v-if="device === 'mobile' && currentSidebar.opened"
      class="drawer-bg"
    ></div>
    <sidebar class="sidebar-container"></sidebar>

    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view v-if="showTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import sidebar from './sidebar'
import navbar from './navbar'
import appMain from './appMain'
import tagsView from '@/components/TagsView'

const store = useStore()

const currentSidebar = computed(() => store.getters.sidebar)
const classObj = computed(() => {
  return {
    hideSidebar: !store.getters.sidebar.opened,
    withoutAnimation: store.getters.sidebar.withoutAnimation,
    mobile: store.getters.device === 'mobile'
  }
})
const device = computed(() => store.getters.device)
const fixedHeader = computed(() => store.getters.fixedHeader)
const showTagsView = computed(() => store.getters.tagsView)
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
@import '~@/assets/styles/variables.module.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
</style>
