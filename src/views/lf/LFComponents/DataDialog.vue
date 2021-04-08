<!--
 * @Author: 郑曦
 * @Date: 2021-04-08 16:29:47
 * @LastEditors: 郑曦
 * @LastEditTime: 2021-04-08 16:38:43
 * @FilePath: /vue-pro/src/views/lf/LFComponents/DataDialog.vue
 * @Description: 描述
-->
<template>
  <div>
    <vue-json-pretty
      :path="'res'"
      :data="graphData"></vue-json-pretty>
  </div>
</template>
<script>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

export default {
  props: {
    graphData: Object
  },
  components: {
    VueJsonPretty,
  },
}
</script>
<style scoped>
</style>
