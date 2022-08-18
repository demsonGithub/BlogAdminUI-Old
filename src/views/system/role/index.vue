<template>
  <el-card>
    <div class="select-wrapper">
      <span>角色名称:</span>
      <el-input
        v-model="roleNameSearch"
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
</template>

<script setup></script>

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
