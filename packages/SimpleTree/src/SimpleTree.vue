<template>
  <a-tree
    :expanded-keys="expandedKeys"
    :auto-expand-parent="autoExpandParent"
    :selected-keys="selectedKeys"
    :tree-data="treeData"
    :defaultExpandAll="true"
    :defaultExpandParent="true"
    @expand="onExpand"
    @select="onSelect"
  />
</template>
<script>
export default {
  data() {
    return {
      expandedKeys: [],
      autoExpandParent: true,
      selectedKeys: [],
    };
  },
  props: {
    treeData: {
      type: Array,
    },
  },
  watch: {
    treeData: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val.length > 0) {
          this.expandedKeys = [val[0].key];
          this.selectedKeys = [val[0].key];
        }
      },
    },
  },
  mounted() {},
  methods: {
    onExpand(expandedKeys) {
      console.log("onExpand", expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onSelect(selectedKeys, info) {
      this.selectedKeys = selectedKeys;
      console.log("onSelect", info, selectedKeys);
      this.$emit("select", selectedKeys);
    },
  },
};
</script>
