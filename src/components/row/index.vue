<!--
 * @Author: your name
 * @Date: 2021-04-10 12:31:53
 * @LastEditTime: 2021-04-11 13:17:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /evan_you_demo_1/src/components/table/index.vue
-->
<template>
  <div class="row-container">
    <div class="row">
      <div
        class="sub-row-arrow"
        v-if="activeSubArrow"
        @click="clickSubRowArrow"
      >
        <span class="sub-row-arrow-icon"><i :class="['el-icon-arrow-right', 'transition', rowData.isExpand  ? 'rotate' : 'recover-rotate']" /></span>
      </div>
      <Cell
        :cellData="rowData.select"
        center
        width="50"
      >
        <template v-slot:content>
          <el-checkbox
            v-model="rowData.select"
            @change="singleTableRowChangeSelect"
          ></el-checkbox>
        </template>
      </Cell>
      <div class="row-cells-container">
        <Cell
          v-for="(item, index) in columns"
          :key="index"
          :cellData="rowData[item.prop]"
        ></Cell>
      </div>
      <slot name="operations"></slot>
    </div>
    <div v-show="rowData.isExpand">
      <slot name="expand-table"></slot>
    </div>
  </div>
</template>
<script>
import Cell from "./../cell";
import { Loading, Checkbox } from 'element-ui';

export default {
  components: {
    Cell,
    [Checkbox.name]: Checkbox
  },

  data() {
    return {
      loadingInstance: null,
    }
  },

  mounted() {

  },

  props: {
    columns: {
      type: Array,
    },
    rowData: {
      type: Object,
    },

    activeSubArrow: {
      type: Boolean,
      // TODO 兼容其他
      default: true,
    },

    index: {
      type: Number
    },
    isSelectAll: {
      type: Boolean
    },
  },

  watch: {
    'rowData.select': {
      async handler(value) {
        // 主要是为了监听 点击全选的时候一种情况
        if (value) {
          // 有一个要变成 选中状态
          // 发起原因是全选
          // 我就要对所有的进行全选，不止这一个了。
          if (this.isSelectAll) this.$emit('selectAllSubTable')
        } else {
          await this.$nextTick()
          if (this.loadingInstance) {
            this.loadingInstance.close()
            this.loadingInstance = null
          }
          this.singleTableRowChangeSelect(value)
        }
      },
      deep: false,
    },

    'rowData.isExpand': {
      async handler() {
        await this.$nextTick()
        if (this.loadingInstance) {
          this.loadingInstance.close()
          this.loadingInstance = null
        }
      },
      deep: false,
    }
  },

  methods: {
    singleTableRowChangeSelect(value) {
      // 手动选择的情况
      if (value && !this.rowData.isLoaded) {
        console.log('loading')
        this.loadingInstance = Loading.service({ target: document.querySelectorAll('.sub-row-arrow-icon')[this.index] })
      }
      this.$emit('singleTableRowChangeSelect', value)
    },

    clickSubRowArrow(e) {
      if (this.loadingInstance) {
        console.log('loading...')
      } else {
          this.loadingInstance = Loading.service({ target: document.querySelectorAll('.sub-row-arrow-icon')[this.index] })
        this.$emit("clickSubRowArrow",this.rowData.isExpand, e);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.rotate {
  transform: rotate(90deg);
}

.recover-rotate {
  transform: rotate(0deg);
}

.sub-row-arrow {
  position: absolute;
  left: 50px;
  height: 100%;
  line-height: 42px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
}

.row {
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
}

.sub-row-arrow-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transition {
  transition: all .3s ease;
}

.row-cells-container {
  flex: 1;
  display: flex;
  margin-left: 40px;
  // margin-right: 200px;
  // overflow: scroll;
}
</style>
