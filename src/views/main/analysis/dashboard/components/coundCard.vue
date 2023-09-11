<template>
  <div class="container">
    <div class="header">
      <span>{{ item.title }}</span>
      <el-tooltip :content="item.tips" effect="light" placement="top">
        <el-icon><InfoFilled /></el-icon>
      </el-tooltip>
    </div>
    <div class="main">{{ item.number1 }}</div>
    <div class="footer">
      <span>{{ item.subtitle }}:</span>
      <span>{{ item.number2 }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
type Iprops = {
  item: {
    title?: string
    tips?: string
    number1?: number
    number2?: number
    subtitle?: string
  }
}
defineProps<Iprops>()
</script>
<style scoped lang="less">
.container {
  display: flex;
  padding: 0 20px;
  flex-direction: column;
  height: 130px;
  background-color: #fff;
  justify-content: space-evenly;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  span {
    display: inline-block;
  }
  .header {
    width: 100%;
    height: 38px;
    display: flex;
    color: rgba(0, 0, 0, 0.45);
    align-items: flex-end;
    justify-content: space-between;
  }
  .main {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: flex-start;
    margin-left: 0px;
    font-size: 26px;
  }
  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    border-top: 1px solid #f0f0f0;
    span {
      &:last-child {
        color: red;
        font-size: 18px;
      }
    }
  }
}
</style>
