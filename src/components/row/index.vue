<!--
 * @Author: your name
 * @Date: 2021-04-10 12:31:53
 * @LastEditTime: 2021-04-10 16:50:14
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
      > <span class="sub-row-arrow-icon">{{ rowData.isExpand ? 'expand' : 'fold' }}</span>
      </div>
      <Cell
        v-for="(item, index) in columns"
        :key="index"
        :cellData="rowData[item.prop]"
      ></Cell>
    </div>
    <div v-show="rowData.isExpand">
      <slot name="expand-table"></slot>
    </div>
  </div>
</template>
<script>
import Cell from "./../cell";
import { Loading } from 'element-ui';


export default {
  components: {
    Cell,
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
    }
  },

  watch: {
    'rowData.isExpand': {
      handler() {
        this.$nextTick(() => {
          if (this.loadingInstance) {
            this.loadingInstance.close()
            this.loadingInstance = null
          }
        })
      },
      deep: false,
    }
  },

  methods: {
    clickSubRowArrow(e) {
      if (!this.loadingInstance) this.loadingInstance = Loading.service({ target: document.querySelectorAll('.sub-row-arrow-icon')[this.index] })
      this.$emit("clickSubRowArrow",this.rowData.isExpand, e);
    },
  },
};
</script>

<style lang="less" scoped>
.sub-row-arrow {
  position: absolute;
  left: 20px;
  height: 100%;
  line-height: 42px;
}

.row {
  position: relative;
  display: flex;
  border-bottom: 1px solid #eeeeee;
}

.sub-row-arrow-icon {
  position: relative;
}
</style>
