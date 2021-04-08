/*
 * @Author: 郑曦
 * @Date: 2021-04-08 16:29:47
 * @LastEditors: 郑曦
 * @LastEditTime: 2021-04-08 16:36:41
 * @FilePath: /vue-pro/src/views/lf/config.js
 * @Description: 描述
 */
export const nodeList = [
  {
    text: '开始',
    type: 'start',
    class: 'node-start'
  },
  {
    text: '矩形',
    type: 'rect',
    class: 'node-rect'
  },
  {
    type: 'user',
    text: '用户',
    class: 'node-user'
  },
  {
    type: 'push',
    text: '推送',
    class: 'node-push'
  },
  {
    type: 'download',
    text: '位置',
    class: 'node-download'
  },
  {
    type: 'end',
    text: '结束',
    class: 'node-end'
  }
]

export const BpmnNode = [
  {
    type: 'bpmn:startEvent',
    text: '开始',
    class: 'bpmn-start'
  },
  {
    type: 'bpmn:endEvent',
    text: '结束',
    class: 'bpmn-end'
  },
  {
    type: 'bpmn:exclusiveGateway',
    text: '网关',
    class: 'bpmn-exclusiveGateway'
  },
  {
    type: 'bpmn:userTask',
    text: '用户',
    class: 'bpmn-user'
  }
]
