<template>
  <el-card>
    <div class="select-wrapper">
      <span>角色名称:</span>
      <el-input
        v-model="roleNameInput"
        class="input-roleName"
        placeholder="Please input"
      />
      <span>角色状态:</span>
      <el-select v-model="roleStatus" class="m-2" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="success" style="margin: 0 30px 0 30px">搜索</el-button>
      <el-button type="warning">重置</el-button>
    </div>
  </el-card>
  <el-card>
    <div>
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button type="success" @click="handleUpdate" :disabled="updateDisable">
        修改
      </el-button>
      <el-button type="danger" @click="handleDelete" :disabled="deleteDisable">
        删除
      </el-button>
    </div>
    <el-table
      ref="roleTableRef"
      :data="roleList"
      border
      stripe
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
      <el-table-column prop="id" label="Id标识" />
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="sortNumber" label="显示排序" />
      <el-table-column prop="status" label="状态" />
    </el-table>
  </el-card>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { getRoleListApi } from '@/api/role-api'

let options = ref([
  {
    label: '生效中',
    value: '1'
  },
  {
    label: '已失效',
    value: '2'
  }
])

const roleNameInput = ref('')
const roleStatus = ref()

const roleTableRef = ref()
const currentRow = ref()
let roleList = ref()

const handleCurrentChange = val => {
  console.log('1', val)

  currentRow.value = val
}

const getRoleList = async params => {
  let apiParams = {}
  let result = await getRoleListApi(apiParams)
  if (result.code == '00000') {
    roleList.value = result.data
  } else {
    console.log(result.msg)
  }
}
//#region 新增
const handleAdd = () => {}

//#endregion

//#region 修改
var updateDisable = computed(() => typeof currentRow.value == 'undefined')
const handleUpdate = () => {
  console.log('2', currentRow.value)
}

//#endregion

//#region 删除
const deleteDisable = computed(() => typeof currentRow.value == 'undefined')
const handleDelete = () => {}
//#endregion

onMounted(() => {
  getRoleList()
})
</script>

<style lang="scss" scoped>
.select-wrapper {
  display: flex;

  span {
    line-height: 30px;
    margin: 0 10px 0 50px;
    font-weight: 300;
    font-size: 16px;
  }

  .input-roleName {
    width: 200px;
  }
}
</style>
