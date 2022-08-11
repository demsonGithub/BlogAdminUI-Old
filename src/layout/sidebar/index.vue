<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-Class="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :router="true"
        :default-active="activeMenu"
        :unique-opened="true"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
      >
        <!-- 递归路由对象 -->
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import variablesSettings from '@/assets/styles/variables.module.scss'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import logo from './logo.vue'
import sidebarItem from './sidebarItem.vue'

const store = useStore()
const router = useRouter()
const variables = computed(() => variablesSettings)

const showLogo = computed(() => store.getters.sidebarLogo)
const isCollapse = computed(() => {
  return !store.getters.sidebar.opened
})

const routes = computed(() => {
  return store.getters.permission_routes
  // return router.options.routes
})
const activeMenu = computed(() => {
  const { meta, path } = router.currentRoute.value
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>

<style lang="scss" scoped></style>
