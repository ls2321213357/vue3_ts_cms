<template>
  <div class="container">
    <div class="header">
      <span>{{ item.title }}</span>
      <el-tooltip :content="item.tips" effect="light" placement="top">
        <el-icon><InfoFilled /></el-icon>
      </el-tooltip>
    </div>
    <div class="main" ref="main">{{ item.number1 }}</div>
    <div class="footer">
      <span>{{ item.subtitle }}:</span>
      <span ref="number2">{{ item.number2 }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'
type Iprops = {
  item: {
    amount: string
    title: string
    tips: string
    number1: number
    number2: number
    subtitle?: string
  }
}
const props = defineProps<Iprops>()
const main = ref<HTMLElement>()
const number2 = ref<HTMLElement>()
const option = {
  prefix: props.item.amount === 'saleroom' ? '💴' : ''
}
onMounted(() => {
  const countup1 = new CountUp(main.value!, props.item.number1, option)
  const countup2 = new CountUp(number2.value!, props.item.number2, option)
  countup1.start()
  countup2.start()
})
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
