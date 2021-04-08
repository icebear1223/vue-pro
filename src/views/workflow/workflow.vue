<!--
 * @Author: 郑曦
 * @Date: 2021-04-08 14:10:21
 * @LastEditors: 郑曦
 * @LastEditTime: 2021-04-08 17:01:13
 * @FilePath: /vue-pro/src/views/workflow/workflow.vue
 * @Description: 工作流
-->
<template>
  <div
    class="logic-flow-view">
    <control 
      class="demo-control"
      v-if="lf"
      :lf="lf"
      @catData="$_catData"
      @catTurboData="$_catTurboData"
    ></control>
    <node-panel
      v-if="lf"
      :lf="lf"
      :nodeList="nodeList"
    ></node-panel>
    <!-- 画布 -->
    <div id="LF-view"></div>
    <add-panel
      v-if="showAddPanel"
      class="add-panel"
      :style="addPanelStyle"
      :lf="lf"
      :nodeData="addClickNode"
      @addNodeFinish="hideAddPanel"
      >
    </add-panel>
  </div>
</template>
<script>
  import LogicFlow from '@logicflow/core'
  import '@logicflow/core/dist/style/index.css'
  import '@logicflow/extension/lib/style/index.css'
  import { Menu, Snapshot } from '@logicflow/extension'
  import {
    registerStart,
    registerUser,
    registerEnd,
    registerPush,
    registerDownload,
    registerPolyline,
    registerTask,
  } from './registerNode'
  import { nodeList } from './config'
  import NodePanel from './workflowComponent/NodePanel.vue'
  import Control from './workflowComponent/Control'
  import AddPanel from './workflowComponent/AddPanel'
  const demoData = require('./data.json')
  export default {
    name: 'LF',
    components: { NodePanel, Control, AddPanel },
    data () {
      return {
        lf: null,
        nodeList,
        addPanelStyle: {
          top: 0,
          left: 0
        },
        config: {
          background: {
            color: '#f7f9ff'
          },
          grid: {
            size: 10,
            visible: false
          },
          keyboard: {
            enabled: true
          },
          style: {
            rect: {
              radius: 6
            },
            edgeText: { // 边文本样式
              background: {
                fill: '#fff'
              }
            },
          },
          edgeTextDraggable: true,
          guards: {
            beforeClone (data) {
              console.log('beforeClone', data)
              return true
            },
            beforeDelete (data) {
              // 可以根据data数据判断是否允许删除，允许返回true,不允许返回false
              // 文档： http://logic-flow.org/guide/basic/keyboard.html#%E5%A6%82%E4%BD%95%E9%98%BB%E6%AD%A2%E5%88%A0%E9%99%A4%E6%88%96%E8%80%85%E6%8B%B7%E8%B4%9D%E8%A1%8C%E4%B8%BA
              console.log('beforeDelete', data)
              // _this.$message('不允许删除', 'error')
              return true
            }
          }
        },
        addClickNode: null,
        moveData: {},
        clickNode: null,
        graphData: null,
        showAddPanel: false,
      }
    },
    mounted () {
      this.$_initlf()
    },
    methods: {
      $_initlf () {
        // 使用插件
        LogicFlow.use(Menu)
        LogicFlow.use(Snapshot)
        const lf = new LogicFlow({...this.config, container: document.querySelector('#LF-view'),})
        this.lf = lf
        console.log(lf, 'lf')
        lf.setDefaultEdgeType('bpmn:sequenceFlow')

        // 设置主题
        lf.setTheme({
          circle: {
            r: 20,
            stroke: '#000000',
            outlineColor: '#88f',
            strokeWidth: 1
          },
          rect: {
            outlineColor: '#88f',
            strokeWidth: 1
          },
          polygon: {
            strokeWidth: 1
          },
          polyline: {
            stroke: '#000000',
            hoverStroke: '#000000',
            selectedStroke: '#000000',
            outlineColor: '#88f',
            strokeWidth: 1
          },
          nodeText: {
            color: '#000000'
          },
          edgeText: {
            color: '#000000',
            background: {
              fill: '#f7f9ff'
            }
          }
        })
        this.$_registerNode()
      },
      $_registerNode () {
        registerStart(this.lf)
        registerUser(this.lf)
        registerEnd(this.lf)
        registerPush(this.lf, this.clickPlus, this.mouseDownPlus)
        registerDownload(this.lf)
        registerPolyline(this.lf)
        registerTask(this.lf)
        this.$_render()
      },
      $_render () {
        // this.lf.render(demoData)
        this.lf.render()
        this.$_LfEvent()
      },
      $_LfEvent () {
        this.lf.on('node:click', ({data}) => {
          console.log('node:click', data)
          this.$data.clickNode = data
          // 这里可以改成更新右侧表单数据
          this.$data.dialogVisible = true
        })
        this.lf.on('edge:click', ({data}) => {
          console.log('edge:click', data)
          this.$data.clickNode = data
            this.$data.dialogVisible = true
        })
        this.lf.on('element:click', () => {
          this.hideAddPanel()
        })
        this.lf.on('edge:add', ({data}) => {
          console.log('edge:add', data)
        })
        this.lf.on('node:mousemove', ({data}) => {
          console.log('node:mousemove')
          this.moveData = data
        })
        this.lf.on('blank:click', () => {
          this.hideAddPanel()
        })
        this.lf.on('connection:not-allowed', (data) => {
          this.$message.error(data.msg)
        })
        this.lf.on('node:mousemove', () => {
          console.log('on mousemove')
        })
      },
      $_catData () {
        this.$data.graphData = this.$data.lf.getGraphData()
        this.$data.dataVisible = true
      },
      $_catTurboData () {
        console.log('$_catTurboData')
      },
      hideAddPanel () {
        this.$data.showAddPanel = false
        this.$data.addPanelStyle.top = 0
        this.$data.addPanelStyle.left = 0
        this.$data.addClickNode = null
      },
      clickPlus (e, attributes) {
        e.stopPropagation()
        console.log('clickPlus', e, attributes)
        const { clientX, clientY } = e
        console.log(clientX, clientY)
        this.$data.addPanelStyle.top = (clientY - 40) + 'px'
        this.$data.addPanelStyle.left = clientX + 'px'
        this.$data.showAddPanel = true
        this.$data.addClickNode = attributes
      },
      mouseDownPlus (e, attributes) {
        e.stopPropagation()
        console.log('mouseDownPlus', e, attributes)
      },
    }
  }
</script>
<style>
.logic-flow-view {
  height: 100vh;
  position: relative;
}
.demo-title{
  text-align: center;
  margin: 20px;
}
.demo-control{
  position: absolute;
  top: 50px;
  right: 50px;
  z-index: 2;
}
#LF-view{
  width: calc(100% - 100px);
  height: 80%;
  outline: none;
  margin-left: 50px;
}
.time-plus{
  cursor: pointer;
}
.add-panel {
  position: absolute;
  z-index: 11;
  background-color: white;
  padding: 10px 5px;
}
.el-drawer__body {
  height: 80%;
  overflow: auto;
  margin-top: -30px;
  z-index: 3;
}
</style>
