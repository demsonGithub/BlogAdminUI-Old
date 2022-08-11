<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
    <div
      v-if="store.getters.showFooter"
      id="el-main-footer"
      class="main-footer"
    >
      <span v-html="store.getters.footerTxt" />
      <span>.</span>
      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">
        {{ store.getters.caseNumber }}
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

const cachedViews = ref([])

watch(
  store.getters.cachedViews,
  (newValue, oldValue) => {
    cachedViews.value = newValue
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.app-main {
  /* 85px= navbar  50 +tagsView 35*/
  min-height: calc(100vh - 90px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.main-footer {
  text-align: center;
}
</style>
<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
