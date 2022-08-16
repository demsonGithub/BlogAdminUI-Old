<template>
  <el-card class="search-wrapper">
    <el-row>
      <span>菜单名称：</span>
      <el-input v-model="inputSearch" style="width: 250px; height: 30px" />

      <span>菜单状态：</span>
      <el-select
        v-model="menuStateValue"
        class="m-2"
        placeholder="Select"
        size="default"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button style="margin-left: 20px" type="primary" @click="handleSearch">
        搜索
      </el-button>
    </el-row>
  </el-card>
  <el-card style="margin-top: 10px">
    <el-table
      ref="menuDataRef"
      :data="menuData"
      highlight-current-row
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      @current-change="handleCurrentChange"
    >
      <!-- <el-table-column prop="id" label="ID标识" sortable /> -->
      <el-table-column prop="menuName" label="菜单名称" sortable />
      <el-table-column prop="name" label="类型" sortable width="180" />
      <el-table-column prop="name" label="显示顺序" sortable width="180" />
      <el-table-column prop="linkUrl" label="请求地址" sortable />
      <el-table-column prop="name" label="状态" sortable width="180" />
    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { getMenuPermissionListApi } from '@/api/menuPermission'

//#region 属性
const inputSearch = ref('')
const options = ref([
  {
    label: '生效中',
    value: '0'
  },
  {
    label: '已禁用',
    value: '1'
  }
])
const menuStateValue = ref('')

const menuDataRef = ref()
const menuData = ref([])
const currentRow = ref()

//#endregion

//#region 方法
const handleSearch = () => {
  getMenuPermissionList()
}

const handleCurrentChange = val => {
  currentRow.value = val
}

const getMenuPermissionList = params => {
  let apiParams = {}
  getMenuPermissionListApi(apiParams).then(res => {
    console.log('1', res)
    menuData.value = res.data
  })
}
//#endregion
</script>

<style lang="scss" scoped>
.search-wrapper {
  width: 100%;

  span {
    line-height: 30px;
    margin: 0 0px 0 50px;
    font-weight: 300;
    font-size: 16px;
    // font-family: yahei;
  }
}
</style>
