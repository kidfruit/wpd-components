<template>
  <div>
    <usage-setting-comp/>
  </div>
</template>
<script>
import UsageSettingComp from '../../packages/UsageSettingComp/src/UsageSettingComp.vue'
export default {
  components: { UsageSettingComp },
  name: 'UsageSettingCompTest',
  data() {
    return {
      usageData: [
        {
          name: '荆江河段',
          index: 1,
          id:'jingjiang',
          stationCode: '60108300',
          children: [
            {
              name: '上荆江',
              id: 'ZTMYJJ0001',
              capacity: 8.6,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            },
            {
              name: '下荆江',
              id: 'ZTMYJJ0002',
              capacity: 30,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            }
          ]
        },
        {
          name: '城陵矶河段',
          index: 2,
          id:'chenglingji',
          stationCode: '61512000',
          children: [
            {
              name: '四口水系',
              id: 'ZTMYCLJ001',
              capacity: 1.5,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            },
            {
              name: '洞庭湖区',
              id: 'ZTMYCLJ002',
              capacity: 7.5,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            },
            {
              name: '澧水',
              id: 'ZTMYCLJ003',
              capacity: 1,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            },
            {
              name: '沅江',
              id: 'ZTMYCLJ004',
              capacity: 1,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            },
            {
              name: '资水',
              id: 'ZTMYCLJ005',
              capacity: 1,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            },
            {
              name: '湘江',
              id: 'ZTMYCLJ006',
              capacity: 1,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            },
            {
              name: '长江干流',
              id: 'ZTMYCLJ007',
              capacity: 13.3,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            }
          ]
        },
        {
          name: '武汉河段',
          index: 3,
          id:'wuhan',
          stationCode: '60112200',
          children: [
            {
              name: '长江干流',
              id: 'ZTMYHK001',
              capacity: 9.1,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            },
            {
              name: '汉江',
              id: 'ZTMYHK002',
              capacity: 0.54,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            }
          ]
        },
        {
          name: '沙洋河段',
          index: 3,
          id:'shayang',
          stationCode: '61804210',
          children: [
            {
              name: '小江湖',
              id: 'ZTMYSY0001',
              capacity: 0,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            },
            {
              name: '邓家湖',
              id: 'ZTMYSY0002',
              capacity: 0,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            }
          ]
        },
        {
          name: '湖口河段',
          index: 4,
          id:'hukou',
          stationCode: '62601600',
          children: [
            {
              name: '修水尾闾',
              id: 'ZTMYUK001',
              capacity: 5.8,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            },
            {
              name: '赣江尾闾',
              id: 'ZTMYUK002',
              capacity: 1.7,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            },
            {
              name: '信江尾闾',
              id: 'ZTMYUK003',
              capacity: 2.4,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            },
            {
              name: '饶河尾闾',
              id: 'ZTMYUK004',
              capacity: 6,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            },
            {
              name: '长江干流-湖口',
              id: 'ZTMYUK005',
              capacity: 6.8,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            },
            {
              name: '鄱阳湖盆区',
              id: 'ZTMYUK006',
              capacity: 39.6,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            },
            {
              name: '抚河尾闾',
              id: 'ZTMYUK007',
              capacity: 0.2,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            }
          ]
        },
        {
          name: '湖口-大通河段',
          index: 3,
          id:'hukoudatong',
          stationCode: '60112200',
          children: [
            {
              name: '长江干流',
              id: 'ZTMYDT001',
              capacity: 17.9,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            },
            {
              name: '皖河',
              id: 'ZTMYDT002',
              capacity: 1,
              isOpen: false,
              v: 0,
              time: '',
              used: 0,
              duration: 2
            }
          ]
        }
      ]
    }
  },
}
</script>
<style scoped></style>
