<template>
  <div class="chart-card">
    <el-card class="box-card" :header="header">
      <slot>默认的内容</slot>
    </el-card>
  </div>
</template>
<script setup lang="ts">
type Iprops = {
  header?: string
}
//作用:给props一个默认值
withDefaults(defineProps<Iprops>(), {
  header: '卡片头部的标题'
})
</script>
