<template>
  <div>
    <div class="setting" @click="click">
      <svg-icon icon="settings" />
    </div>
    <!-- 放在layout的index中使用这种 -->
    <!-- <el-button type="primary" class="drawer-container" @click="click">
      <svg-icon icon="settings" />
    </el-button> -->
    <el-drawer v-model="drawer" direction="rtl" size="15%">
      <template #title>
        <h4>偏好设置</h4>
      </template>
      <template #default>
        <div></div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">保存</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)

const click = () => {
  drawer.value = true
}

const cancelClick = () => {
  drawer.value = false
}

const confirmClick = () => {
  ElMessageBox.confirm(`确定修改吗？`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(() => {
      drawer.value = false
    })
    .catch(() => {
      // catch error
    })
}
</script>

<style lang="scss" scoped>
.drawer-container {
  transition: all 0.2s;
  &:hover {
    right: 0;
  }
  position: fixed;
  right: -20px;
  bottom: 15%;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  color: #fff;
  border-radius: 4px 0 0 4px;
  cursor: pointer;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 10%);
}
.setting_body {
  padding: 20px;
  .setting_card {
    margin-bottom: 20px;
  }
  .setting_content {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    > .theme-box {
      display: flex;
    }
    > .color-box {
      div {
        display: flex;
        flex-direction: column;
      }
    }
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-right: 20px;
      .item-top {
        position: relative;
      }
      .check {
        position: absolute;
        font-size: 20px;
        color: #00afff;
        right: 10px;
        bottom: 10px;
      }
      p {
        text-align: center;
        font-size: 12px;
      }
    }
  }
}
</style>
