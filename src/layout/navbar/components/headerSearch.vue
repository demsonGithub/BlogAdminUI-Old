<template>
  <div :class="{ show: show }" class="header-search" @click="click">
    <svg-icon id="search-icon" icon="search" class="search-icon"></svg-icon>
    <el-select
      id="headerSearchSelect"
      ref="headerSearchSelect"
      v-model="searchContent"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option
        v-for="item in options"
        :key="item.path"
        :value="item"
        :label="item.title.join(' > ')"
      />
    </el-select>
  </div>
</template>

<script setup>
import Fuse from 'fuse.js'
import path from 'path'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const pRoutes = computed(() => store.getters.permission_routes)

watch(
  () => pRoutes,
  (newValue, oldValue) => {
    searchPool.value = generateRoutes(newValue)
  }
)

const show = ref(false)
let headerSearchSelect = ref(null)
const click = () => {
  show.value = !show.value
  if (show.value) {
    headerSearchSelect.value && headerSearchSelect.value.focus()
  }
}
watch(show, (newValue, oldValue) => {
  if (newValue) {
    document.body.addEventListener('click', close, true)
  } else {
    document.body.removeEventListener('click', close, true)
  }
})

const close = event => {
  if (
    event.target.id === 'headerSearchSelect' ||
    event.target.id === 'search-icon'
  ) {
    return false
  }
  show.value = false
  searchContent.value = ''
  options.value = []
}

let options = ref([])
const searchPool = ref([])
watch(searchPool, (a, b) => {
  initFuse(a)
})
const searchContent = ref('')
let fuse = ref()
const initFuse = list => {
  fuse = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}

const querySearch = query => {
  if (query !== '') {
    fuse.search(query).forEach(currentItem => {
      options.value.push(currentItem.item)
    })
  } else {
    options.value = []
  }
}
const change = val => {
  if (ishttp(val.path)) {
    // http(s):// 路径新窗口打开
    window.open(val.path, '_blank')
  } else {
    router.push(val.path)
  }
  searchContent.value = ''
  options.value = []
  // $nextTick(() => {
  //   show.value = false
  // })
}

const ishttp = url => {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
}

const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  let res = []

  for (const router of routes) {
    // skip hidden router
    if (router.hidden) {
      continue
    }

    const data = {
      path: !ishttp(router.path)
        ? path.resolve(basePath, router.path)
        : router.path,
      title: [...prefixTitle]
    }

    if (router.meta && router.meta.title) {
      data.title = [...data.title, router.meta.title]

      if (router.redirect !== 'noRedirect') {
        // only push the routes with title
        // special case: need to exclude parent router without redirect
        res.push(data)
      }
    }

    // recursive child routes
    if (router.children) {
      const tempRoutes = generateRoutes(router.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}

onMounted(() => {
  searchPool.value = generateRoutes(pRoutes.value)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  cursor: pointer;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      //   border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
