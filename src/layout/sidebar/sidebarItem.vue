<template>
  <div v-if="!item.hidden">
    <!--  只有一个子节点 -->
    <template v-if="hasOneShowChild(item.children, item)">
      <el-menu-item
        :key="onlyOneChild.path"
        :index="onlyOneChild.path"
        :route="onlyOneChild.path"
        :class="{ 'submenu-title-noDropdown': !isNest }"
      >
        <i><svg-icon :icon="onlyOneChild.meta.icon"></svg-icon></i>
        <template #title>
          <span>{{ onlyOneChild.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <el-sub-menu v-else ref="subMenu" :index="item.path" popper-append-to-body>
      <template #title>
        <i><svg-icon :icon="item.meta.icon"></svg-icon></i>
        <span>{{ item.meta.title }}</span>
      </template>
      <!--children 进行递归调用自身组件-->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="child.path"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

// 声明props
const props = defineProps({
  item: { type: Object, required: true },
  isNest: { type: Boolean, default: false },
  basePath: { type: String, default: '' }
})

const store = useStore()
// 是否只有一个子节点
const onlyOneChild = ref(null)
const basePath = props.basePath

const hasOneShowChild = (children = [], parent) => {
  // 过滤不需要显示的
  const showChild = children.filter(item => {
    if (item.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })

  // 当只有一个子路由，默认情况下会显示该子路由(如果需要父子节点延伸注释以下这行代码)
  if (showChild.length === 1) {
    return true
  }

  // 如果没有需要显示的子路由，则显示父级路由
  if (showChild.length === 0) {
    onlyOneChild.value = props.item
    return true
  }
  return false
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 18px;
  height: 18px;
}
</style>
