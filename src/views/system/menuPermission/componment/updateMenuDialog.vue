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
      :rules="addMenuRules"
      :model="sourceMenuData"
      label-width="auto"
      label-position="right"
      size="default"
    >
      <el-form-item label="上级菜单">
        <el-tree-select
          v-model="sourceMenuData.parentMenu"
          :data="parentMenuData"
          check-strictly
          :render-after-expand="false"
        />
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio-group v-model="sourceMenuData.linkType">
          <el-radio label="0">目录</el-radio>
          <el-radio label="1">菜单</el-radio>
          <el-radio label="2">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="sourceMenuData.menuName" />
      </el-form-item>
      <el-form-item label="请求地址" prop="linkUrl">
        <el-input v-model="sourceMenuData.linkUrl" />
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="sourceMenuData.icon" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="sourceMenuData.description" type="textarea" />
      </el-form-item>
      <el-form-item label="显示排序号">
        <el-input v-model="sourceMenuData.sortNumber" />
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

const props = defineProps({
  updateMenuVisible: { type: Boolean, required: true },
  sourceMenuData: { type: Object, required: true }
})
const emits = defineEmits(['submit', 'hide'])

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

<style lang="scss" scoped></style>
