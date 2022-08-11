<template>
  <div class="navbar">
    <hamburger
      id="Hamburger"
      :is-active="opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <header-search id="header-search" class="right-menu-item" />

        <el-tooltip
          :content="$t('navbar.explainDoc')"
          effect="dark"
          placement="bottom"
        >
          <explain-doc class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-tooltip content="全屏缩放" effect="dark" placement="bottom">
          <full-screen id="screenfull" class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-tooltip content="中英文切换" effect="dark" placement="bottom">
          <set-language class="right-menu-item hover-effect" />
        </el-tooltip>
        <el-tooltip content="偏好设置" effect="dark" placement="bottom">
          <settings class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="AvatarUrl" class="user-avatar" />
          <span class="sysName">{{ nickName }}</span>
          <svg-icon icon="drowdown" class="el-icon-caret-bottom"></svg-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <span style="display: block" @click="checkMsg">
              <el-dropdown-item>我的消息</el-dropdown-item>
            </span>
            <router-link to="/">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <span style="display: block" @click="exitSystem">
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </span>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- <el-divider direction="vertical" class="divider" border-style="dashed" /> -->
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

import hamburger from './components/hamburger.vue'
import breadcrumb from './components/breadcrumb.vue'
import headerSearch from './components/headerSearch.vue'
import explainDoc from './components/explainDoc.vue'
import fullScreen from './components/fullScreen.vue'
import setLanguage from './components/setLanguage.vue'
import settings from './components/settings.vue'
import Avatar from '@/assets/images/avatar.png'

const props = defineProps({
  primary: {
    type: String,
    default: '#fff'
  }
})
const store = useStore()

const opened = computed(() => store.getters.sidebar.opened)
const device = computed(() => store.getters.device)

const nickName = ref('管理员')
const AvatarUrl = ref(Avatar)

const toggleSideBar = () => {
  store.dispatch('app/toggleSideBar')
}

const checkMsg = () => {
  ElMessage.info('正在开发中...')
}

const exitSystem = () => {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      logout()
    })
    .catch(msg => {})
}

const logout = () => {
  store.dispatch('user/logout').then(() => {
    location.reload()
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 100px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .sysName {
          cursor: pointer;
          position: absolute;
          width: 100%;
          font-size: 12px;
          display: inline-block;
          text-align: center;
          top: 15px;
          margin-left: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          font-size: 12px;
          right: -65px;
          top: 15px;
        }
      }
    }

    .divider {
      height: 100%;
      vertical-align: top;
    }
  }
}
</style>
