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
    <div>
      <el-button type="primary" @click="handleAddMenu">新增</el-button>
      <el-button
        type="success"
        @click="handleUpdateMenu"
        :disabled="updateDisable"
      >
        修改
      </el-button>
      <el-button
        type="danger"
        @click="handleDeleteMenu"
        :disabled="deleteDisable"
      >
        删除
      </el-button>
      <el-button type="warning" @click="handExpandAll">展开/折叠</el-button>
    </div>
    <el-table
      ref="menuDataRef"
      :data="menuData"
      row-key="id"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px; margin-bottom: 20px"
      :row-style="{ height: '40px' }"
      :cell-style="{ padding: '3px' }"
      :header-cell-style="{
        background: '#eef1f6',
        color: '#606266',
        height: '50px',
        'text-align': 'center'
      }"
      @current-change="handleCurrentChange"
    >
      <!-- <el-table-column prop="id" label="ID标识" sortable /> -->
      <el-table-column prop="menuName" label="菜单名称" />
      <el-table-column prop="linkType" label="类型" align="center" width="100">
        <template #default="{ row }">
          <div
            class="link-tips"
            :class="{
              'catalog-tips': row.linkType == '0',
              'menu-tips': row.linkType == '1',
              'button-tips': row.linkType == '2'
            }"
          >
            {{ formatterLinkType(row.linkType) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="linkUrl" label="请求地址" />
      <el-table-column prop="description" label="描述" />
      <el-table-column
        prop="sortNumber"
        label="显示顺序"
        align="center"
        sortable
        width="120"
      />
      <el-table-column
        prop="status"
        label="状态"
        align="center"
        width="100"
        sortable
      >
        <template #default="{ row }">
          <div
            class="status-tips"
            :class="{
              'status0-tips': row.status == '0',
              'status1-tips': row.status == '1',
              'status2-tips': row.status == '2'
            }"
          >
            {{ formatterStatus(row.status) }}
          </div>
        </template>
      </el-table-column>
    </el-table>

    <add-menu-dialog
      :addMenuVisible="addMenuVisible"
      @submit="addMenu"
      @hide="hideAddMenuDialog"
    ></add-menu-dialog>
    <update-menu-dialog
      v-if="!updateDisable"
      :updateMenuVisible="updateMenuVisible"
      :sourceMenuData="currentRow"
      @submit="updateMenu"
      @hide="hideUpdateMenuDialog"
    ></update-menu-dialog>
  </el-card>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  getMenuPermissionListApi,
  addMenuPermissionApi,
  deleteMenuPermissionApi,
  updateMenuPermissionApi
} from '@/api/menuPermission'
import AddMenuDialog from './componment/addMenuDialog.vue'
import updateMenuDialog from './componment/updateMenuDialog.vue'

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
const isExpandAll = ref(false)
//#endregion

//#region formatter
const formatterLinkType = val => {
  switch (val) {
    case 0:
      return '目录'
    case 1:
      return '菜单'
    case 2:
      return '按钮'
  }
}
const formatterStatus = val => {
  switch (val) {
    case 0:
      return '生效'
    case 1:
      return '失效'
    case 2:
      return '已删除'
  }
}
//#endregion

const handleCurrentChange = val => {
  currentRow.value = val
}

const handExpandAll = () => {
  //todo
}

//#region 新增
const addMenuVisible = ref(false)
// 弹出新增窗口
const handleAddMenu = () => {
  addMenuVisible.value = true
}

const addMenu = async parameter => {
  let apiParams = {
    parentId: parameter.parentMenu,
    linkType: parameter.linkType,
    name: parameter.menuName,
    linkUrl: parameter.linkUrl,
    icon: parameter.icon,
    description: parameter.description,
    sortNumber: parameter.sortNumber
  }
  let result = await addMenuPermissionApi(apiParams)
  addMenuVisible.value = false
  // 刷新列表
  getMenuPermissionList()
}
// 隐藏新增窗口
const hideAddMenuDialog = () => {
  addMenuVisible.value = false
}
//#endregion

//#region 删除
const deleteDisable = computed(() => typeof currentRow.value == 'undefined')

const handleDeleteMenu = () => {
  ElMessageBox.confirm('确认删除吗？', '温馨提示', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      let apiParams = currentRow.value.id
      var result = await deleteMenuPermissionApi(apiParams)
      getMenuPermissionList()
    })
    .catch(() => {})
}
//#endregion

//#region 修改
const updateDisable = computed(() => typeof currentRow.value == 'undefined')

const updateMenuVisible = ref(false)
// 弹出新增窗口
const handleUpdateMenu = () => {
  updateMenuVisible.value = true
}

const updateMenu = async parameter => {
  let apiParams = {
    id: parameter.id,
    parentId: parameter.parentMenu,
    linkType: parameter.linkType,
    name: parameter.menuName,
    linkUrl: parameter.linkUrl,
    icon: parameter.icon,
    description: parameter.description,
    sortNumber: parameter.sortNumber,
    status: parameter.status
  }
  let result = await updateMenuPermissionApi(apiParams)

  if (result.code == '00000') {
    updateMenuVisible.value = false
    getMenuPermissionList()
  } else {
    console.log(result)
  }
}

const hideUpdateMenuDialog = () => {
  updateMenuVisible.value = false
}
//#endregion

//#region 查询
const handleSearch = () => {
  getMenuPermissionList()
}

const getMenuPermissionList = params => {
  let apiParams = {}
  getMenuPermissionListApi(apiParams).then(res => {
    menuData.value = res.data
  })
}
//#endregion

onMounted(() => {
  getMenuPermissionList()
})
</script>

<style lang="scss" scoped>
.search-wrapper {
  width: 100%;

  span {
    line-height: 30px;
    margin: 0 0px 0 50px;
    font-weight: 300;
    font-size: 16px;
  }
}

.link-tips {
  color: #ffffff;
  border-radius: 5px;
  text-align: center;
  border-width: 50px;
}
.catalog-tips {
  background-color: #1c84c6;
}
.menu-tips {
  background-color: #1ab394;
}
.button-tips {
  background-color: #f8ac59;
}

.status-tips {
  color: #ffffff;
  border-radius: 40px;
  text-align: center;
  width: 70px;
}
.status0-tips {
  background-color: #1ab394;
}
.status1-tips {
  background-color: #fee082;
}
.status2-tips {
  background-color: #d90214;
}
</style>
