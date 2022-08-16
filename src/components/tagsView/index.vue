<template>
  <div class="tags" v-if="showTags" :class="{ 'isHide-Tags': isHideTags }">
    <ul>
      <li
        class="tags-li"
        v-for="(item, index) in tagsList"
        :class="{ active: isActive(item.path) }"
        :key="index"
      >
        <router-link :to="item.path" class="tags-li-title">
          {{ item.title }}
        </router-link>
        <span class="tags-li-icon" @click="closeTags(index)">
          <svg-icon icon="closeTag" />
        </span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="small" type="primary">
          标签选项
          <svg-icon icon="tagDrowdown" />
        </el-button>
        <template #dropdown>
          <el-dropdown-menu size="small">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()

const isActive = value => value === route.path

const showTags = computed(() => store.getters.tagsView)
const tagsList = computed(() => {
  return store.getters.tagsList
})

const chooseTag = item => {
  router.push({ path: item.path })
}

// 设置标签
const setTags = route => {
  const isExist = tagsList.value.some(item => {
    return item.path === route.fullPath
  })
  if (!isExist) {
    if (tagsList.value.length >= 8) {
      store.dispatch('tagsView/delTag', { index: 0 })
    }
    const obj = {
      name: route.name,
      title: route.meta.title,
      path: route.fullPath,
      noCache: Boolean(route.meta.noCache)
    }
    store.dispatch('tagsView/setTag', obj)
  }
}

const closeTags = index => {
  const delItem = tagsList.value[index]
  store.dispatch('tagsView/delTag', { index })
  const item = tagsList.value[index]
    ? tagsList.value[index]
    : tagsList.value[index - 1]
  if (item) {
    delItem.path === route.fullPath && router.push(item.path)
  } else {
    router.push('/')
  }
}

const handleTags = command => {
  command === 'other' ? closeOther() : closeAll()
}
// 关闭全部标签
const closeAll = () => {
  store.dispatch('tagsView/clearAll')
  if (route.name === 'Dashboard') {
    setTags(route)
  }
  router.push('/')
}
// 关闭其他标签
const closeOther = () => {
  const curItem = tagsList.value.filter(item => {
    return item.path === route.fullPath
  })
  store.dispatch('tagsView/closeOther', curItem)
}

const isHideTags = computed(() => {
  return store.getters.tagsList.length === 0
})

onMounted(() => {
  setTags(route)
})

watch(route, (newValue, oldValue) => {
  setTags(newValue)
})
</script>

<style lang="scss" scoped>
.tags {
  background-color: #fff;
  position: relative;
  height: 30px;
  overflow: hidden;
  box-shadow: 0 5px 10px #ddd;
  margin-bottom: 5px;

  ::v-deep .el-scrollbar__wrap {
    background-color: red;
    width: 90%;
    overflow-y: hidden;
    overflow-x: auto;
  }
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row; //横向排列
}
.tags-li {
  display: inline;
  float: left;
  margin-top: -10px;
  margin-left: 5px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: #fff;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}
.tags-li:not(.active):hover {
  background: #f8f8f8;
}
.tags-li.active {
  background: #409eff;
}

.tags-li-title {
  display: block;
  float: left;
  max-width: 100px;
  min-width: 60px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 10px;
  margin-left: 10px;
}
.tags-li.active .tags-li-title {
  color: #fff;
}
.tags-li-icon {
  margin-right: 5px;
}

.tags-li-icon :hover {
  border-radius: 5em;
  background-color: rgb(194, 188, 188);
}
.tags-close-box {
  position: absolute;
  right: 15px;
  top: 0;
  box-sizing: border-box;
  padding-top: 3px;
  text-align: center;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
.isHide-Tags {
  display: none;
}
</style>
