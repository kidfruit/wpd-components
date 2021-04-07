<template>
  <div>
    <tree-table :tableData="tableData" :treeData="treeData"></tree-table>
  </div>
</template>
<script>
import TreeTable from '../../packages/TreeTable/src/TreeTable.vue'
export default {
  components: { TreeTable },
  name: 'TreeTableTest',
  data() {
    return {
      tableData: [
        {
          nodeId: '11',
          nodeName: '乌东德',
          nodeType: 'WPStationRR',
          nodeTypeName: '水库',
          key: '11',
          flow1: {
            key: 'RR-link-SYN',
            title: '流量衔接',
            order: 1,
            selectedId: 'FR_LINK',
            options: [
              {
                id: 'FR_LINK',
                name: '流量衔接',
                modelParamId: '__vue_devtool_undefined__',
              },
            ],
          },
          flow2: {
            key: 'RR-dsp-SYN',
            title: '防洪调度',
            order: 2,
            selectedId: 'RD_DISQCTRL',
            options: [
              {
                id: 'RD_DISQCTRL',
                name: '调洪演算模型',
                modelParamId: '__vue_devtool_undefined__',
              },
              {
                id: 'RD_CTRLDSP',
                name: '混合控制',
                modelParamId: '__vue_devtool_undefined__',
              },
            ],
          },
          flow3: {
            key: 'RR-assess-SYN',
            title: '分析评估',
            order: 3,
            selectedId: 'FD_DSPASS',
            options: [
              {
                id: 'FD_DSPASS',
                name: '调度评估',
                modelParamId: '__vue_devtool_undefined__',
              },
            ],
          },
        },
        {
          nodeId: 'RCH301',
          nodeName: '乌东德-白鹤滩',
          nodeType: 'WPRiverReach',
          nodeTypeName: '河段',
          key: 'RCH301',
          flow1: {
            key: 'RCH-flow-SYN',
            title: '河道演算',
            order: 1,
            selectedId: 'FR_RHLAGTM',
            options: [
              {
                id: 'FR_RHLAGTM',
                name: '滞时演算模型',
                modelParamId: '__vue_devtool_undefined__',
              },
            ],
          },
        },
        {
          nodeId: '12',
          nodeName: '白鹤滩',
          nodeType: 'WPStationRR',
          nodeTypeName: '水库',
          key: '12',
          flow1: {
            key: 'RR-link-SYN',
            title: '流量衔接',
            order: 1,
            selectedId: 'FR_LINK',
            options: [
              {
                id: 'FR_LINK',
                name: '流量衔接',
                modelParamId: '__vue_devtool_undefined__',
              },
            ],
          },
          flow2: {
            key: 'RR-dsp-SYN',
            title: '防洪调度',
            order: 2,
            selectedId: 'RD_DISQCTRL',
            options: [
              {
                id: 'RD_DISQCTRL',
                name: '调洪演算模型',
                modelParamId: '__vue_devtool_undefined__',
              },
              {
                id: 'RD_CTRLDSP',
                name: '混合控制',
                modelParamId: '__vue_devtool_undefined__',
              },
            ],
          },
          flow3: {
            key: 'RR-assess-SYN',
            title: '分析评估',
            order: 3,
            selectedId: 'FD_DSPASS',
            options: [
              {
                id: 'FD_DSPASS',
                name: '调度评估',
                modelParamId: '__vue_devtool_undefined__',
              },
            ],
          },
        },
        {
          nodeId: 'RCH302',
          nodeName: '白鹤滩-溪洛渡',
          nodeType: 'WPRiverReach',
          nodeTypeName: '河段',
          key: 'RCH302',
          flow1: {
            key: 'RCH-flow-SYN',
            title: '河道演算',
            order: 1,
            selectedId: 'FR_RHLAGTM',
            options: [
              {
                id: 'FR_RHLAGTM',
                name: '滞时演算模型',
                modelParamId: '__vue_devtool_undefined__',
              },
            ],
          },
        },
      ],
      treeData: [
        {
          children: [
            {
              children: [
                {
                  type: 'WPStationRR',
                  title: '乌东德',
                  key: '11',
                  selected: true,
                },
                {
                  type: 'WPRiverReach',
                  title: '乌东德-白鹤滩',
                  key: 'RCH301',
                  selected: true,
                },
                {
                  type: 'WPStationRR',
                  title: '白鹤滩',
                  key: '12',
                  selected: true,
                },
                {
                  type: 'WPRiverReach',
                  title: '白鹤滩-溪洛渡',
                  key: 'RCH302',
                  selected: true,
                },
                {
                  type: 'WPStationRR',
                  title: '溪洛渡',
                  key: '13',
                  selected: true,
                },
                {
                  type: 'WPRiverReach',
                  title: '溪洛渡-向家坝',
                  key: 'RCH303',
                  selected: true,
                },
                {
                  type: 'WPStationRR',
                  title: '向家坝',
                  key: '14',
                  selected: true,
                },
                {
                  type: 'WPNodeInterval',
                  title: '向家坝-李庄',
                  key: 'ITV100',
                  selected: true,
                },
              ],
              type: 'WPRiver',
              title: '金沙江下游',
              key: '3',
            },
            {
              type: 'WPStationZQ',
              title: '李庄',
              key: '103038',
              selected: true,
            },
            {
              type: 'WPRiverReach',
              title: '李庄-朱沱',
              key: 'RCH101',
              selected: true,
            },
            {
              type: 'WPStationZQ',
              title: '朱沱',
              key: '103001',
              selected: true,
            },
            {
              type: 'WPRiverReach',
              title: '朱沱-寸滩',
              key: 'RCH102',
              selected: true,
            },
            {
              type: 'WPStationZQ',
              title: '寸滩',
              key: '103002',
              selected: true,
            },
            {
              type: 'WPRiverReach',
              title: '寸滩-三峡',
              key: 'RCH103',
              selected: true,
            },
            { type: 'WPStationRR', title: '三峡', key: '18', selected: true },
            {
              type: 'WPRiverReach',
              title: '三峡-葛洲坝',
              key: 'RCH104',
              selected: true,
            },
            {
              type: 'WPStationRR',
              title: '葛洲坝',
              key: '19',
              selected: true,
            },
            {
              type: 'WPRiverReach',
              title: '葛洲坝-宜昌',
              key: 'RCH105',
              selected: true,
            },
            {
              type: 'WPStationZQ',
              title: '宜昌',
              key: '103032',
              selected: true,
            },
            {
              children: [
                {
                  type: 'WPStationRR',
                  title: '水布垭',
                  key: '16',
                  selected: true,
                },
                {
                  type: 'WPRiverReach',
                  title: '水布垭-隔河岩',
                  key: 'RCH201',
                  selected: true,
                },
                {
                  type: 'WPStationRR',
                  title: '隔河岩',
                  key: '17',
                  selected: true,
                },
                {
                  type: 'WPRiverReach',
                  title: '隔河岩-高坝洲',
                  key: 'RCH202',
                  selected: true,
                },
                {
                  type: 'WPStationRR',
                  title: '高坝洲',
                  key: '15',
                  selected: true,
                },
                {
                  type: 'WPNodeInterval',
                  title: '高坝洲-枝城',
                  key: 'ITV101',
                  selected: true,
                },
              ],
              type: 'WPRiver',
              title: '清江',
              key: '2',
            },
            {
              type: 'WPRiverReach',
              title: '宜昌-枝城',
              key: 'RCH106',
              selected: true,
            },
            {
              type: 'WPStationZQ',
              title: '枝城',
              key: '103033',
              selected: true,
            },
            {
              type: 'WPRiverReach',
              title: '枝城-沙市',
              key: 'RCH107',
              selected: true,
            },
            {
              type: 'WPStationZQ',
              title: '沙市',
              key: '103034',
              selected: true,
            },
            {
              type: 'WPRiverReach',
              title: '沙市-监利',
              key: 'RCH108',
              selected: true,
            },
            {
              type: 'WPStationZQ',
              title: '监利',
              key: '103036',
              selected: true,
            },
            {
              type: 'WPRiverReach',
              title: '监利-城陵矶',
              key: 'RCH109',
              selected: true,
            },
            {
              type: 'WPStationZQ',
              title: '城陵矶',
              key: '103037',
              selected: true,
            },
            {
              children: [
                {
                  type: 'WPStationZQ',
                  title: '仙桃',
                  key: '103090',
                  selected: true,
                },
                {
                  type: 'WPNodeInterval',
                  title: '仙桃-汉口',
                  key: 'ITV102',
                  selected: true,
                },
              ],
              type: 'WPRiver',
              title: '汉江',
              key: '9',
            },
            {
              type: 'WPRiverReach',
              title: '城陵矶-汉口',
              key: 'RCH110',
              selected: true,
            },
            {
              type: 'WPStationZQ',
              title: '汉口',
              key: '103039',
              selected: true,
            },
          ],
          type: 'WPRiver',
          title: '长江',
          key: '1',
        },
      ],
    }
  },
}
</script>
<style scoped></style>
