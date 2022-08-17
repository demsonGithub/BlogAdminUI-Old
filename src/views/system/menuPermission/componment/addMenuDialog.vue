<template>
  <el-dialog
    title="新增菜单"
    v-model="addMenuVisible"
    :append-to-body="false"
    width="600px"
    @open="loadMenu"
    :before-close="handleClose"
    draggable
  >
    <el-form
      ref="addMenuFormRef"
      :rules="addMenuRules"
      :model="addMenuEntity"
      label-width="auto"
      label-position="right"
      size="default"
    >
      <el-form-item label="上级菜单">
        <el-tree-select
          v-model="addMenuEntity.parentMenu"
          :data="parentMenuData"
          check-strictly
          :render-after-expand="false"
        />
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio-group v-model="addMenuEntity.linkType">
          <el-radio label="0">目录</el-radio>
          <el-radio label="1">菜单</el-radio>
          <el-radio label="2">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="addMenuEntity.menuName" />
      </el-form-item>
      <el-form-item label="请求地址" prop="linkUrl">
        <el-input v-model="addMenuEntity.linkUrl" />
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="addMenuEntity.icon" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="addMenuEntity.description" type="textarea" />
      </el-form-item>
      <el-form-item label="显示排序号">
        <el-input v-model="addMenuEntity.sortNumber" />
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
  addMenuVisible: { type: Boolean, required: true }
})
const emits = defineEmits(['submit', 'hide'])

const addMenuFormRef = ref()

const addMenuEntity = ref({
  parentMenu: '0',
  linkType: '0',
  menuName: '',
  linkUrl: '',
  icon: '',
  description: '',
  sortNumber: 0
})

const addMenuRules = ref({
  menuName: [{ required: true, message: '请输入菜单名称', trigger: 'change' }],
  linkUrl: [{ required: true, message: '请输入请求地址', trigger: 'change' }]
})

const handleConfirm = () => {
  addMenuFormRef.value.validate(valid => {
    if (valid) {
      if (!addMenuEntity.value.linkUrl.startsWith('/')) {
        ElMessage.error("请求地址需要以' / '开头")
        return
      }
      emits('submit', addMenuEntity.value)
    }
  })
}

const handleClose = () => {
  emits('hide')
}

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
}
</script>

<style lang="scss" scoped>
.btn-wrapper {
  width: 100%;
  margin-top: 20px;
  margin-right: 60px;
  text-align: center;

  .el-button {
    width: 100px;
    margin-right: 30px;
  }
}
</style>
