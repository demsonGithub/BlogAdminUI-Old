<template>
  <el-dialog
    title="修改菜单"
    v-model="updateMenuVisible"
    :append-to-body="false"
    width="600px"
    @open="loadMenu"
    :before-close="handleClose"
    draggable
  >
    <el-form
      ref="updateMenuFormRef"
      :rules="MenuRules"
      :model="updateMenuObj"
      label-width="auto"
      label-position="right"
      size="default"
    >
      <el-form-item label="上级菜单">
        <el-tree-select
          v-model="updateMenuObj.parentMenu"
          :data="parentMenuData"
          check-strictly
          :render-after-expand="false"
        />
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio-group v-model="updateMenuObj.linkType">
          <el-radio label="0">目录</el-radio>
          <el-radio label="1">菜单</el-radio>
          <el-radio label="2">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="updateMenuObj.menuName" />
      </el-form-item>
      <el-form-item label="请求地址" prop="linkUrl">
        <el-input v-model="updateMenuObj.linkUrl" />
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="updateMenuObj.icon" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="updateMenuObj.description" type="textarea" />
      </el-form-item>
      <el-form-item label="显示排序号">
        <el-input v-model="updateMenuObj.sortNumber" />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="updateMenuObj.status">
          <el-radio label="0">生效</el-radio>
          <el-radio label="1">失效</el-radio>
          <el-radio label="2">已删除</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div class="btn-wrapper">
          <el-button type="primary" @click="handleConfirm">保存</el-button>
          <el-button @click="handleClose">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { getParentMenuData } from '@/utils/common'

const props = defineProps({
  updateMenuVisible: { type: Boolean, required: true },
  sourceMenuData: { type: Object, required: true }
})
const emits = defineEmits(['submit', 'hide'])

const updateMenuFormRef = ref()
const MenuRules = ref({
  menuName: [{ required: true, message: '请输入菜单名称', trigger: 'change' }],
  linkUrl: [{ required: true, message: '请输入请求地址', trigger: 'change' }]
})
const updateMenuObj = ref({
  id: '',
  parentMenu: '0',
  linkType: '0',
  menuName: '',
  linkUrl: '',
  icon: '',
  description: '',
  sortNumber: 0,
  status: '0'
})

const parentMenuData = ref([])
const loadMenu = async () => {
  const rootCatalog = {
    value: '0',
    label: '主目录'
  }
  const formatResult = await getParentMenuData()
  parentMenuData.value = formatResult
  // 添加主目录
  parentMenuData.value.unshift(rootCatalog)

  loadInfo(props.sourceMenuData)
}

const loadInfo = parameter => {
  updateMenuObj.value.id = parameter.id
  updateMenuObj.value.parentMenu = parameter.parentId
  updateMenuObj.value.linkType = parameter.linkType + ''
  updateMenuObj.value.menuName = parameter.menuName
  updateMenuObj.value.linkUrl = parameter.linkUrl
  updateMenuObj.value.icon = parameter.icon
  updateMenuObj.value.description = parameter.description
  updateMenuObj.value.sortNumber = parameter.sortNumber
  updateMenuObj.value.status = parameter.status + ''
}

const handleConfirm = () => {
  emits('submit', updateMenuObj.value)
}

const handleClose = () => {
  emits('hide')
}
</script>

<style lang="scss" scoped></style>
