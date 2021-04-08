<!--
 * @Author: 郑曦
 * @Date: 2021-04-08 15:31:13
 * @LastEditors: 郑曦
 * @LastEditTime: 2021-04-08 15:42:29
 * @FilePath: /vue-pro/src/views/workflow/workflowComponent/Control.vue
 * @Description: 描述
-->
<template>
  <div>
    <a-button-group>
      <a-button  size="small" @click="$_zoomIn">放大</a-button>
      <a-button  size="small" @click="$_zoomOut">缩小</a-button>
      <a-button  size="small" @click="$_zoomReset">大小适应</a-button>
      <a-button  size="small" @click="$_translateRest">定位还原</a-button>
      <a-button  size="small" @click="$_reset">还原(大小&定位)</a-button>
      <a-button  size="small" @click="$_undo" :disabled="undoDisable">上一步(ctrl+z)</a-button>
      <a-button  size="small" @click="$_redo" :disabled="redoDisable">下一步(ctrl+y)</a-button>
      <a-button  size="small" @click="$_download">下载图片</a-button>
      <a-button  size="small" @click="$_catData">查看数据</a-button>
      <a-button v-if="catTurboData"  size="small" @click="$_catTurboData">查看turbo数据</a-button>
    </a-button-group>
  </div>
</template>
<script>
export default {
  name: 'Control',
  props: {
    lf: Object || String,
    catTurboData: Boolean
  },
  data () {
    return {
      undoDisable: true,
      redoDisable: true,
      graphData: null,
      dataVisible: false,
    }
  },
  mounted () {
    this.$props.lf.on('history:change', ({ data: { undoAble, redoAble } }) => {
      this.$data.undoDisable = !undoAble
      this.$data.redoDisable = !redoAble
    })
  },
  methods: {
    $_zoomIn(){
      this.$props.lf.zoom(true)
    },
    $_zoomOut(){
      this.$props.lf.zoom(false)
    },
    $_zoomReset(){
      this.$props.lf.resetZoom()
    },
    $_translateRest(){
      this.$props.lf.resetTranslate()
    },
    $_reset(){
      this.$props.lf.resetZoom()
      this.$props.lf.resetTranslate()
    },
    $_undo(){
      this.$props.lf.undo()
    },
    $_redo(){
      this.$props.lf.redo()
    },
    $_download(){
      this.$props.lf.getSnapshot()
    },
    $_catData(){
      this.$emit('catData')
    },
    $_catTurboData(){
      this.$emit('catTurboData')
    }
  }
}
</script>
<style scoped>
</style>
