/*
 * @Author: 郑曦
 * @Date: 2021-04-08 16:29:47
 * @LastEditors: 郑曦
 * @LastEditTime: 2021-04-08 16:33:47
 * @FilePath: /vue-pro/src/views/lf/registerNode/registerTask.js
 * @Description: 描述
 */
export default function registerTask(lf) {
  lf.register('task', ({ RectNode, RectNodeModel, h }) => {
    class View extends RectNode {
      getShape() {
        const style = this.getShapeStyle()
        console.log(style)
        const { width, height } = style
        const { x, y } = this.getAttributes()
        const position = {
          x: x - width / 2,
          y: y - height / 2
        }
        return h('rect', {
          ...style,
          ...position
        })
      }
    }
    class Model extends RectNodeModel {
      constructor(data, graphModel) {
        super(data, graphModel)
        this.radius = 20
      }
    }
    return {
      view: View,
      model: Model
    }
  })
}
