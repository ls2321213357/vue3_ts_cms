<template>
  <div class="user">
    <userSearch></userSearch>
    <userContent></userContent>
  </div>
</template>
<script setup lang="ts">
import userSearch from '@/views/main/system/user/components/userSearch.vue'
import userContent from '@/views/main/system/user/components/userContent.vue'
</script>
<style scoped lang="less">
.user {
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}
</style>
