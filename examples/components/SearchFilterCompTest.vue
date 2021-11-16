<template>
  <div>
    <search-filter-comp
        :placeHoder="placeHolder"
        :displayTitle="displayTitle"
        :searchBy="searchBy"
        ref="searchFilterComp"
        :data="data"
    ></search-filter-comp>
  </div>
</template>
<script>
import SearchFilterComp from "../../packages/SearchFilterComp/src/SearchFilterComp";

export default {
  name: "SchemeTableTest",
  components: {
    SearchFilterComp
  },
  data() {
    return {
      placeHolder: '搜索',
      searchBy: ['title', 'key'
      ],
      displayTitle: 'title',
      displayKey: 'key', //可为null
      data: [
        {
          "title": "渠段",
          "key": "WPChannelReach",
          "children": []
        },
        {
          "title": "机组",
          "key": "WPGenerator",
          "children": [
            {
              "title": "三峡左岸1F机组",
              "key": "60106980GE001"
            },
            {
              "title": "三峡左岸2F机组",
              "key": "60106980GE002"
            },
            {
              "title": "三峡左岸3F机组",
              "key": "60106980GE003"
            },
            {
              "title": "三峡左岸4F机组",
              "key": "60106980GE004"
            },
            {
              "title": "三峡左岸5F机组",
              "key": "60106980GE005"
            },
            {
              "title": "三峡左岸6F机组",
              "key": "60106980GE006"
            },
            {
              "title": "三峡左岸7F机组",
              "key": "60106980GE007"
            },
            {
              "title": "三峡左岸8F机组",
              "key": "60106980GE008"
            },
            {
              "title": "三峡左岸9F机组",
              "key": "60106980GE009"
            },
            {
              "title": "三峡左岸10F机组",
              "key": "60106980GE010"
            },
            {
              "title": "三峡左岸11F机组",
              "key": "60106980GE011"
            },
            {
              "title": "三峡左岸12F机组",
              "key": "60106980GE012"
            },
            {
              "title": "三峡左岸13F机组",
              "key": "60106980GE013"
            },
            {
              "title": "三峡左岸14F机组",
              "key": "60106980GE014"
            },
            {
              "title": "三峡右岸15F机组",
              "key": "60106980GE015"
            },
            {
              "title": "三峡右岸16F机组",
              "key": "60106980GE016"
            },
            {
              "title": "三峡右岸17F机组",
              "key": "60106980GE017"
            },
            {
              "title": "三峡右岸18F机组",
              "key": "60106980GE018"
            },
            {
              "title": "三峡右岸19F机组",
              "key": "60106980GE019"
            },
            {
              "title": "三峡右岸20F机组",
              "key": "60106980GE020"
            },
            {
              "title": "三峡右岸21F机组",
              "key": "60106980GE021"
            },
            {
              "title": "三峡右岸22F机组",
              "key": "60106980GE022"
            },
            {
              "title": "三峡右岸23F机组",
              "key": "60106980GE023"
            },
            {
              "title": "三峡右岸24F机组",
              "key": "60106980GE024"
            },
            {
              "title": "三峡右岸25F机组",
              "key": "60106980GE025"
            },
            {
              "title": "三峡右岸26F机组",
              "key": "60106980GE026"
            },
            {
              "title": "三峡地下27F机组",
              "key": "60106980GE027"
            },
            {
              "title": "三峡地下28F机组",
              "key": "60106980GE028"
            },
            {
              "title": "三峡地下29F机组",
              "key": "60106980GE029"
            },
            {
              "title": "三峡地下30F机组",
              "key": "60106980GE030"
            },
            {
              "title": "三峡地下31F机组",
              "key": "60106980GE031"
            },
            {
              "title": "三峡地下32F机组",
              "key": "60106980GE032"
            },
            {
              "title": "三峡电源电站1F机组",
              "key": "60106980GE033"
            },
            {
              "title": "三峡电源电站2F机组",
              "key": "60106980GE034"
            }
          ]
        },
        {
          "title": "蒸发站",
          "key": "WPStationEV",
          "children": []
        },
        {
          "title": "河流",
          "key": "WPRiver",
          "children": [
            {
              "title": "红水河",
              "key": "AHA01006"
            },
            {
              "title": "南盘江",
              "key": "AHA00006"
            },
            {
              "title": "黔江",
              "key": "AHA02006"
            },
            {
              "title": "浔江",
              "key": "AHA03006"
            },
            {
              "title": "西江",
              "key": "AHA04006"
            },
            {
              "title": "北盘江",
              "key": "AHA22006"
            },
            {
              "title": "融江",
              "key": "AHA36006"
            },
            {
              "title": "柳江",
              "key": "AHA37006"
            },
            {
              "title": "贝江",
              "key": "AHA37806"
            },
            {
              "title": "右江",
              "key": "AHA40006"
            },
            {
              "title": "邕江",
              "key": "AHA41006"
            },
            {
              "title": "郁江",
              "key": "AHA42006"
            },
            {
              "title": "左江",
              "key": "AHA42A06"
            },
            {
              "title": "漓江",
              "key": "AHA51006"
            },
            {
              "title": "桂江",
              "key": "AHA52006"
            },
            {
              "title": "西溪河",
              "key": "F25A0000000L"
            },
            {
              "title": "细沙河",
              "key": "F273AA00000L"
            },
            {
              "title": "西宁河",
              "key": "F27C0000000L"
            },
            {
              "title": "中都河",
              "key": "F27D0000000L"
            },
            {
              "title": "大汶溪",
              "key": "F27E0000000R"
            },
            {
              "title": "牛栏江",
              "key": "F2E00000000R"
            },
            {
              "title": "美姑河",
              "key": "F2F00000000L"
            },
            {
              "title": "横江",
              "key": "F2G00000000U"
            },
            {
              "title": "南广河",
              "key": "F31A0000000R"
            },
            {
              "title": "沱江",
              "key": "F3A00000000L"
            },
            {
              "title": "赤水河",
              "key": "F3B00000000R"
            },
            {
              "title": "五布河",
              "key": "F41C0000000R"
            },
            {
              "title": "御临河",
              "key": "F4A00000000L"
            },
            {
              "title": "大洪河",
              "key": "F4AB0000000L"
            },
            {
              "title": "龙溪河",
              "key": "F4B00000000L"
            },
            {
              "title": "龙河",
              "key": "F51B0000000R"
            },
            {
              "title": "汤溪河",
              "key": "F52A0000000L"
            },
            {
              "title": "磨刀溪",
              "key": "F52B0000000R"
            },
            {
              "title": "沿渡河",
              "key": "F53A0000000L"
            },
            {
              "title": "香溪河",
              "key": "F53C0000000L"
            },
            {
              "title": "小江",
              "key": "F5A00000000L"
            },
            {
              "title": "普里河",
              "key": "F5AB0000000R"
            },
            {
              "title": "大宁河",
              "key": "F5B00000000L"
            },
            {
              "title": "清江",
              "key": "F5C00000000R"
            },
            {
              "title": "陆水",
              "key": "F63A0000000R"
            },
            {
              "title": "水阳江",
              "key": "F8B1B000000M"
            },
            {
              "title": "滁河",
              "key": "F8C00000000L"
            },
            {
              "title": "团结河",
              "key": "F8DHA000000P"
            },
            {
              "title": "雅砻江",
              "key": "FA000000000L"
            },
            {
              "title": "綦江",
              "key": "FA7005"
            },
            {
              "title": "东河",
              "key": "FA7215"
            },
            {
              "title": "大渡河",
              "key": "FB000000000L"
            },
            {
              "title": "长江",
              "key": "FB0101"
            },
            {
              "title": "金沙江",
              "key": "FB9999"
            },
            {
              "title": "青弋江",
              "key": "FBB00000000L"
            },
            {
              "title": "岷江",
              "key": "FBC00000000L"
            },
            {
              "title": "白龙江",
              "key": "FCB00000000R"
            },
            {
              "title": "清江河",
              "key": "FCBC0000000R"
            },
            {
              "title": "大溪河",
              "key": "FD8A0000000L"
            },
            {
              "title": "洞庭湖",
              "key": "FDTH00000000"
            },
            {
              "title": "嘉陵江",
              "key": "FE0102"
            },
            {
              "title": "璧北河",
              "key": "FE0103"
            },
            {
              "title": "黑水滩河",
              "key": "FE0104"
            },
            {
              "title": "虎溪",
              "key": "FE0105"
            },
            {
              "title": "梁滩河",
              "key": "FE0106"
            },
            {
              "title": "麻柳河",
              "key": "FE0107"
            },
            {
              "title": "三庙河",
              "key": "FE0108"
            },
            {
              "title": "兴隆河",
              "key": "FE0109"
            },
            {
              "title": "澧水",
              "key": "FE1A0000000H"
            },
            {
              "title": "渫水",
              "key": "FE1AB000000L"
            },
            {
              "title": "沅江",
              "key": "FE1B0000000H"
            },
            {
              "title": "资水",
              "key": "FE1C0000000H"
            },
            {
              "title": "西河",
              "key": "FE2105"
            },
            {
              "title": "渠江",
              "key": "FE2204"
            },
            {
              "title": "大蟠溪",
              "key": "FE2205"
            },
            {
              "title": "代峨溪",
              "key": "FE2206"
            },
            {
              "title": "龙安河",
              "key": "FE2207"
            },
            {
              "title": "上马桥溪",
              "key": "FE2208"
            },
            {
              "title": "施家河",
              "key": "FE2209"
            },
            {
              "title": "文化河",
              "key": "FE2210"
            },
            {
              "title": "袁驿河",
              "key": "FE2211"
            },
            {
              "title": "涪江",
              "key": "FE2304"
            },
            {
              "title": "巴川河",
              "key": "FE2305"
            },
            {
              "title": "白羊河",
              "key": "FE2306"
            },
            {
              "title": "板桥河",
              "key": "FE2307"
            },
            {
              "title": "打柴沟溪",
              "key": "FE2308"
            },
            {
              "title": "古溪河",
              "key": "FE2309"
            },
            {
              "title": "滑滩子河",
              "key": "FE2310"
            },
            {
              "title": "淮远河",
              "key": "FE2311"
            },
            {
              "title": "久远河",
              "key": "FE2312"
            },
            {
              "title": "莲花石溪",
              "key": "FE2313"
            },
            {
              "title": "鹭鸶河",
              "key": "FE2314"
            },
            {
              "title": "侣俸河",
              "key": "FE2315"
            },
            {
              "title": "穆家河",
              "key": "FE2316"
            },
            {
              "title": "双江河",
              "key": "FE2317"
            },
            {
              "title": "太平河",
              "key": "FE2318"
            },
            {
              "title": "塘坝河",
              "key": "FE2319"
            },
            {
              "title": "小安溪",
              "key": "FE2320"
            },
            {
              "title": "雍溪河",
              "key": "FE2321"
            },
            {
              "title": "琼江",
              "key": "FE2395"
            },
            {
              "title": "鄂东北支流",
              "key": "FEDB00000000"
            },
            {
              "title": "汉江",
              "key": "FF000000000L"
            },
            {
              "title": "乌江",
              "key": "FF0303"
            },
            {
              "title": "郁江",
              "key": "FF2405"
            },
            {
              "title": "芙蓉江",
              "key": "FF2505"
            },
            {
              "title": "梅江",
              "key": "FF2535"
            },
            {
              "title": "修水",
              "key": "FG1A0000000H"
            },
            {
              "title": "赣江",
              "key": "FG1B0000000E"
            },
            {
              "title": "抚河",
              "key": "FG1C0000000H"
            },
            {
              "title": "泸州北岸河流",
              "key": "FLZ00000000L"
            },
            {
              "title": "鄱阳湖",
              "key": "FPYH00000000"
            },
            {
              "title": "测试河流",
              "key": "RIVERTEST"
            }
          ]
        },
        {
          "title": "区间汇流",
          "key": "WPNodeInterval",
          "children": []
        },
        {
          "title": "河段",
          "key": "WPRiverReach",
          "children": [
            {
              "title": "城陵矶河段（城陵矶-东荆河口）",
              "key": "CLJHD"
            },
            {
              "title": "城陵矶-汉口",
              "key": "CLJHK"
            },
            {
              "title": "湖口河段（武穴-湖口）",
              "key": "HKHD"
            },
            {
              "title": "汉口-湖口",
              "key": "HKHK "
            },
            {
              "title": "荆江河段（枝城-城陵矶）",
              "key": "JJHD"
            },
            {
              "title": "碧口-宝珠寺",
              "key": "RCHBLJ01"
            },
            {
              "title": "朱沱-寸滩",
              "key": "RCHCJ01"
            },
            {
              "title": "溪洛渡-向家坝",
              "key": "RCHCJ02"
            },
            {
              "title": "向家坝-宜宾",
              "key": "RCHCJ03"
            },
            {
              "title": "宜宾-李庄",
              "key": "RCHCJ04"
            },
            {
              "title": "李庄-泸州",
              "key": "RCHCJ05"
            },
            {
              "title": "泸州-朱沱",
              "key": "RCHCJ06"
            },
            {
              "title": "寸滩-三峡",
              "key": "RCHCJ07"
            },
            {
              "title": "三峡-枝城",
              "key": "RCHCJ08"
            },
            {
              "title": "枝城-莲花塘",
              "key": "RCHCJ09"
            },
            {
              "title": "螺山-汉口",
              "key": "RCHCJ10"
            },
            {
              "title": "莲花塘-螺山",
              "key": "RCHCJ11"
            },
            {
              "title": "梨园-阿海",
              "key": "RCHCJ12"
            },
            {
              "title": "阿海-金安桥",
              "key": "RCHCJ13"
            },
            {
              "title": "金安桥-龙开口",
              "key": "RCHCJ14"
            },
            {
              "title": "龙开口-鲁地拉",
              "key": "RCHCJ15"
            },
            {
              "title": "鲁地拉-观音岩",
              "key": "RCHCJ16"
            },
            {
              "title": "观音岩-溪洛渡",
              "key": "RCHCJ17"
            },
            {
              "title": "溪洛渡-向家坝",
              "key": "RCHCJ18"
            },
            {
              "title": "向家坝-三峡",
              "key": "RCHCJ19"
            },
            {
              "title": "洪门-廖坊",
              "key": "RCHFH01"
            },
            {
              "title": "廖坊-廖家湾",
              "key": "RCHFH02"
            },
            {
              "title": "廖家湾-李家渡",
              "key": "RCHFH03"
            },
            {
              "title": "射洪-渭沱",
              "key": "RCHFJ"
            },
            {
              "title": "射洪-小河坝",
              "key": "RCHFJ01"
            },
            {
              "title": "小河坝-渭沱",
              "key": "RCHFJ02"
            },
            {
              "title": "万安-峡江",
              "key": "RCHGJ01"
            },
            {
              "title": "峡江-樟树",
              "key": "RCHGJ02"
            },
            {
              "title": "樟树-外洲",
              "key": "RCHGJ03"
            },
            {
              "title": "亭子口-金银台",
              "key": "RCHJLJ01"
            },
            {
              "title": "金银台-南充",
              "key": "RCHJLJ02"
            },
            {
              "title": "南充-武胜",
              "key": "RCHJLJ03"
            },
            {
              "title": "武胜-草街",
              "key": "RCHJLJ04"
            },
            {
              "title": "草街-北碚",
              "key": "RCHJLJ05"
            },
            {
              "title": "亭子口-草街",
              "key": "RCHJLJ06"
            },
            {
              "title": "江垭-石门",
              "key": "RCHLS01"
            },
            {
              "title": "安居-油房",
              "key": "RCHQIJ"
            },
            {
              "title": "安居-柏梓",
              "key": "RCHQIJ01"
            },
            {
              "title": "柏梓-泰安",
              "key": "RCHQIJ02"
            },
            {
              "title": "泰安-中和",
              "key": "RCHQIJ03"
            },
            {
              "title": "罗渡溪-渠嘉",
              "key": "RCHQUJ01"
            },
            {
              "title": "彭水-武隆",
              "key": "RCHWJ01"
            },
            {
              "title": "武隆-清溪场",
              "key": "RCHWJ02"
            },
            {
              "title": "构皮滩-思林",
              "key": "RCHWJ03"
            },
            {
              "title": "思林-沙沱",
              "key": "RCHWJ04"
            },
            {
              "title": "沙沱-彭水",
              "key": "RCHWJ05"
            },
            {
              "title": "柘林-虬津",
              "key": "RCHXS01"
            },
            {
              "title": "虬津-永修",
              "key": "RCHXS02"
            },
            {
              "title": "凤滩-五强溪",
              "key": "RCHYJ01"
            },
            {
              "title": "五强溪-桃源",
              "key": "RCHYJ02"
            },
            {
              "title": "锦屏一级-二滩",
              "key": "RCHYLJ01"
            },
            {
              "title": "柘溪-桃江",
              "key": "RCHZS01"
            },
            {
              "title": "草街",
              "key": "RSVDBCJ"
            },
            {
              "title": "草街库区",
              "key": "RSVRCHCJ"
            },
            {
              "title": "三峡库区",
              "key": "RSVRCHSX"
            },
            {
              "title": "沙市-城陵矶",
              "key": "SSCCLJ"
            },
            {
              "title": "武汉河段（东荆河口-武穴）",
              "key": "WHHD"
            },
            {
              "title": "枝城-沙市",
              "key": "RCHCJ30"
            },
            {
              "title": "沙市-石首",
              "key": "RCHCJ31"
            },
            {
              "title": "石首-监利",
              "key": "RCHCJ32"
            },
            {
              "title": "监利-莲花塘",
              "key": "RCHCJ33"
            },
            {
              "title": "汉口-九江",
              "key": "RCHCJ34"
            },
            {
              "title": "九江-湖口",
              "key": "RCHCJ35"
            },
            {
              "title": "湖口-八里江",
              "key": "RCHCJ36"
            },
            {
              "title": "二滩-溪洛渡",
              "key": "RCHYLJ02"
            },
            {
              "title": "瀑布沟-三峡",
              "key": "RCHDDH01"
            },
            {
              "title": "紫坪铺-三峡",
              "key": "RCHMJ01"
            },
            {
              "title": "宝珠寺-亭子口",
              "key": "RCHBLJ02"
            },
            {
              "title": "草街-三峡",
              "key": "RCHJLJ07"
            },
            {
              "title": "彭水-三峡",
              "key": "RCHWJ06"
            },
            {
              "title": "桃江-莲花塘",
              "key": "RCHZS02"
            },
            {
              "title": "桃源-莲花塘",
              "key": "RCHYJ03"
            },
            {
              "title": "皂市-石门",
              "key": "RCHXIESHUI01"
            },
            {
              "title": "石门-莲花塘",
              "key": "RCHLS02"
            },
            {
              "title": "外洲-湖口",
              "key": "RCHGJ04"
            },
            {
              "title": "李家渡-湖口",
              "key": "RCHFH04"
            },
            {
              "title": "永修-湖口",
              "key": "RCHXS03"
            },
            {
              "title": "三峡-宜昌",
              "key": "RCHCJ08-2"
            }
          ]
        },
        {
          "title": "取水口",
          "key": "WPIntake",
          "children": []
        },
        {
          "title": "水电站",
          "key": "WPStationHP",
          "children": [
            {
              "title": "三峡电站",
              "key": "601069800HP001"
            }
          ]
        },
        {
          "title": "流域",
          "key": "WPBasin",
          "children": [
            {
              "title": "长江流域",
              "key": "F000000"
            },
            {
              "title": "金沙江流域",
              "key": "F010000"
            }
          ]
        },
        {
          "title": "分水口",
          "key": "WPDivide",
          "children": []
        },
        {
          "title": "水位站",
          "key": "WPStationZZ",
          "children": []
        },
        {
          "title": "水库",
          "key": "WPStationRR",
          "children": [
            {
              "title": "梨园",
              "key": "60101398"
            },
            {
              "title": "阿海",
              "key": "60101498"
            },
            {
              "title": "金安桥",
              "key": "60101698"
            },
            {
              "title": "龙开口",
              "key": "60101750"
            },
            {
              "title": "鲁地拉",
              "key": "60101850"
            },
            {
              "title": "观音岩",
              "key": "60101998"
            },
            {
              "title": "溪洛渡",
              "key": "60103165"
            },
            {
              "title": "向家坝",
              "key": "60103385"
            },
            {
              "title": "三峡",
              "key": "60106980"
            },
            {
              "title": "二滩",
              "key": "603KD005"
            },
            {
              "title": "锦屏一级",
              "key": "603KW000"
            },
            {
              "title": "大沟",
              "key": "605K0095"
            },
            {
              "title": "英勇",
              "key": "605K1237"
            },
            {
              "title": "紫坪铺",
              "key": "606KA001"
            },
            {
              "title": "瀑布沟",
              "key": "606KT012"
            },
            {
              "title": "草街",
              "key": "60703780"
            },
            {
              "title": "碧口",
              "key": "60706825"
            },
            {
              "title": "竹丰",
              "key": "60713750"
            },
            {
              "title": "三块石",
              "key": "60715915"
            },
            {
              "title": "丛刊",
              "key": "60718200"
            },
            {
              "title": "青云",
              "key": "60718400"
            },
            {
              "title": "渭沱",
              "key": "60718500"
            },
            {
              "title": "玄天湖",
              "key": "60718943"
            },
            {
              "title": "小北海",
              "key": "60719015"
            },
            {
              "title": "三江",
              "key": "60719110"
            },
            {
              "title": "富金坝",
              "key": "60736210"
            },
            {
              "title": "胜天",
              "key": "60736510"
            },
            {
              "title": "海底沟",
              "key": "60736520"
            },
            {
              "title": "安居",
              "key": "60749710"
            },
            {
              "title": "红旗(合川)",
              "key": "60794500"
            },
            {
              "title": "双河(合川)",
              "key": "60794550"
            },
            {
              "title": "朝阳",
              "key": "607K0330"
            },
            {
              "title": "花石",
              "key": "607K0390"
            },
            {
              "title": "桂花桥",
              "key": "607K0410"
            },
            {
              "title": "幺磨咀",
              "key": "607K0450"
            },
            {
              "title": "曹家沟",
              "key": "607K0470"
            },
            {
              "title": "葫芦坝",
              "key": "607K0480"
            },
            {
              "title": "敬家沟",
              "key": "607K0500"
            },
            {
              "title": "关门寺",
              "key": "607K0510"
            },
            {
              "title": "向阳",
              "key": "607K0525"
            },
            {
              "title": "烂桥",
              "key": "607K0540"
            },
            {
              "title": "藏粮",
              "key": "607K0555"
            },
            {
              "title": "龙桥沟",
              "key": "607K0590"
            },
            {
              "title": "螃蟹屋基",
              "key": "607K0600"
            },
            {
              "title": "三星桥",
              "key": "607K0605"
            },
            {
              "title": "墩子河",
              "key": "607K0610"
            },
            {
              "title": "卫星",
              "key": "607K0635"
            },
            {
              "title": "超英",
              "key": "607K0640"
            },
            {
              "title": "碴口石",
              "key": "607K0645"
            },
            {
              "title": "人民沟",
              "key": "607K0650"
            },
            {
              "title": "会龙",
              "key": "607K0660"
            },
            {
              "title": "火箭",
              "key": "607K0668"
            },
            {
              "title": "双龙",
              "key": "607K0676"
            },
            {
              "title": "车家沟",
              "key": "607K0682"
            },
            {
              "title": "上游(合川)",
              "key": "607K0690"
            },
            {
              "title": "新农",
              "key": "607K0706"
            },
            {
              "title": "生龙",
              "key": "607K0714"
            },
            {
              "title": "月亮岩",
              "key": "607K0718"
            },
            {
              "title": "兴无",
              "key": "607K0726"
            },
            {
              "title": "拱桥",
              "key": "607K0732"
            },
            {
              "title": "龙井沟",
              "key": "607K0742"
            },
            {
              "title": "东风",
              "key": "607K0750"
            },
            {
              "title": "石壁沟",
              "key": "607K0758"
            },
            {
              "title": "长山沟",
              "key": "607K0766"
            },
            {
              "title": "拦天河",
              "key": "607K0774"
            },
            {
              "title": "南办红星",
              "key": "607K0784"
            },
            {
              "title": "张家湖",
              "key": "607K0792"
            },
            {
              "title": "梁家沟",
              "key": "607K0802"
            },
            {
              "title": "邹家沟",
              "key": "607K0835"
            },
            {
              "title": "河坝",
              "key": "607K0841"
            },
            {
              "title": "观测滩",
              "key": "607K0876"
            },
            {
              "title": "称沱湾",
              "key": "607K0881"
            },
            {
              "title": "胜利",
              "key": "607K0886"
            },
            {
              "title": "石梁",
              "key": "607K0896"
            },
            {
              "title": "联合",
              "key": "607K0901"
            },
            {
              "title": "伍家",
              "key": "607K0911"
            },
            {
              "title": "石桥",
              "key": "607K0916"
            },
            {
              "title": "响水岩",
              "key": "607K0921"
            },
            {
              "title": "桥亭",
              "key": "607K0928"
            },
            {
              "title": "九龙",
              "key": "607K0935"
            },
            {
              "title": "拦河埝",
              "key": "607K0944"
            },
            {
              "title": "三元桥",
              "key": "607K0946"
            },
            {
              "title": "龙门桥",
              "key": "607K0954"
            },
            {
              "title": "巴岳",
              "key": "607K0962"
            },
            {
              "title": "黎家沟",
              "key": "607K0970"
            },
            {
              "title": "大田湾",
              "key": "607K0978"
            },
            {
              "title": "上游(铜梁)",
              "key": "607K0988"
            },
            {
              "title": "西郭",
              "key": "607K0998"
            },
            {
              "title": "大滩",
              "key": "607K1008"
            },
            {
              "title": "新胜",
              "key": "607K1056"
            },
            {
              "title": "红旗(大足)",
              "key": "607K1072"
            },
            {
              "title": "鸡公岩",
              "key": "607K1090"
            },
            {
              "title": "五马归槽",
              "key": "607K1108"
            },
            {
              "title": "通天河一库",
              "key": "607K1124"
            },
            {
              "title": "跃进",
              "key": "607K1130"
            },
            {
              "title": "胜天湖",
              "key": "607K1144"
            },
            {
              "title": "龙景湖",
              "key": "607K1190"
            },
            {
              "title": "双河口",
              "key": "607K1240"
            },
            {
              "title": "观音堂",
              "key": "607K1255"
            },
            {
              "title": "鲤鱼石",
              "key": "607K1260"
            },
            {
              "title": "复生桥",
              "key": "607K1280"
            },
            {
              "title": "佛尔岩",
              "key": "607K1300"
            },
            {
              "title": "邓家岩",
              "key": "607K1310"
            },
            {
              "title": "花滩",
              "key": "607K1320"
            },
            {
              "title": "三旦",
              "key": "607K1340"
            },
            {
              "title": "千秋堰",
              "key": "607K1360"
            },
            {
              "title": "双河(璧山)",
              "key": "607K1385"
            },
            {
              "title": "大林",
              "key": "607K1425"
            },
            {
              "title": "运河",
              "key": "607K1470"
            },
            {
              "title": "回龙桥",
              "key": "607K1530"
            },
            {
              "title": "龙滩子",
              "key": "607K1560"
            },
            {
              "title": "工农(北碚)",
              "key": "607K1600"
            },
            {
              "title": "石堰口",
              "key": "607K1638"
            },
            {
              "title": "幸福",
              "key": "607K1650"
            },
            {
              "title": "石马山",
              "key": "607K1662"
            },
            {
              "title": "杨家沟",
              "key": "607K1674"
            },
            {
              "title": "普照寺",
              "key": "607K1686"
            },
            {
              "title": "干堰塘",
              "key": "607K1698"
            },
            {
              "title": "工农(沙坪坝)",
              "key": "607K1710"
            },
            {
              "title": "桂花",
              "key": "607K1724"
            },
            {
              "title": "廖家沟",
              "key": "607K1755"
            },
            {
              "title": "大河沟",
              "key": "607K1770"
            },
            {
              "title": "宋家沟",
              "key": "607K1790"
            },
            {
              "title": "龙潭沟",
              "key": "607K1815"
            },
            {
              "title": "龙井湖",
              "key": "607K1880"
            },
            {
              "title": "五一",
              "key": "607K1900"
            },
            {
              "title": "宝珠寺",
              "key": "607KH001"
            },
            {
              "title": "亭子口",
              "key": "607KH002"
            },
            {
              "title": "思林",
              "key": "60801650"
            },
            {
              "title": "沙沱",
              "key": "60802350"
            },
            {
              "title": "构皮滩",
              "key": "60802450"
            },
            {
              "title": "银盘",
              "key": "60802600"
            },
            {
              "title": "彭水",
              "key": "60802620"
            },
            {
              "title": "江口",
              "key": "60893300"
            },
            {
              "title": "水布垭",
              "key": "61002791"
            },
            {
              "title": "隔河岩",
              "key": "61003101"
            },
            {
              "title": "柘溪",
              "key": "61201300"
            },
            {
              "title": "五强溪",
              "key": "61302350"
            },
            {
              "title": "凤滩",
              "key": "61312550"
            },
            {
              "title": "江垭",
              "key": "61401900"
            },
            {
              "title": "皂市",
              "key": "61402350"
            },
            {
              "title": "丹江口",
              "key": "61802700"
            },
            {
              "title": "万安",
              "key": "62301230"
            },
            {
              "title": "峡江",
              "key": "62301780"
            },
            {
              "title": "廖坊",
              "key": "62401300"
            },
            {
              "title": "洪门",
              "key": "62403400"
            },
            {
              "title": "柘林",
              "key": "62512600"
            },
            {
              "title": "天生桥一级",
              "key": "AHA0000601R"
            },
            {
              "title": "天生桥二级",
              "key": "AHA0000602R"
            },
            {
              "title": "平班",
              "key": "AHA0000603R"
            },
            {
              "title": "龙滩",
              "key": "AHA0100601R"
            },
            {
              "title": "岩滩",
              "key": "AHA0100602R"
            },
            {
              "title": "大化",
              "key": "AHA0100603R"
            },
            {
              "title": "百龙滩",
              "key": "AHA0100604R"
            },
            {
              "title": "乐滩",
              "key": "AHA0100605R"
            },
            {
              "title": "桥巩",
              "key": "AHA0100606R"
            }
          ]
        },
        {
          "title": "雨量站",
          "key": "WPStationPP",
          "children": []
        },
        {
          "title": "引调水工程",
          "key": "WPTransWater",
          "children": []
        },
        {
          "title": "流域单元",
          "key": "WPBasinUnit",
          "children": []
        },
        {
          "title": "根节点",
          "key": "WPRoot",
          "children": []
        },
        {
          "title": "水文站",
          "key": "WPStationZQ",
          "children": [
            {
              "title": "攀枝花(二)",
              "key": "60102100"
            },
            {
              "title": "六城",
              "key": "60102900"
            },
            {
              "title": "宜宾(二)",
              "key": "60103800"
            },
            {
              "title": "李庄",
              "key": "60104100"
            },
            {
              "title": "泸州(三)",
              "key": "60104500"
            },
            {
              "title": "泸州北岸",
              "key": "60104599"
            },
            {
              "title": "朱沱(三)",
              "key": "60104800"
            },
            {
              "title": "滩盘",
              "key": "60104830"
            },
            {
              "title": "塔坪",
              "key": "60104870"
            },
            {
              "title": "落中子",
              "key": "60105010"
            },
            {
              "title": "寸滩",
              "key": "60105400"
            },
            {
              "title": "清溪场(三)",
              "key": "60105700"
            },
            {
              "title": "宜昌",
              "key": "60107300"
            },
            {
              "title": "枝城",
              "key": "60107400"
            },
            {
              "title": "沙市",
              "key": "60108300"
            },
            {
              "title": "石首",
              "key": "60109400"
            },
            {
              "title": "监利(二)",
              "key": "60110500"
            },
            {
              "title": "城陵矶（莲花塘）",
              "key": "60111200"
            },
            {
              "title": "螺山",
              "key": "60111300"
            },
            {
              "title": "汉口",
              "key": "60112200"
            },
            {
              "title": "九江",
              "key": "60112900"
            },
            {
              "title": "黄石",
              "key": "60113400"
            },
            {
              "title": "八里江",
              "key": "60113500"
            },
            {
              "title": "大通(二)",
              "key": "60115000"
            },
            {
              "title": "新华(二)",
              "key": "60405600"
            },
            {
              "title": "昭觉",
              "key": "60406000"
            },
            {
              "title": "美姑",
              "key": "60406650"
            },
            {
              "title": "横江(二)",
              "key": "60407100"
            },
            {
              "title": "福溪",
              "key": "60505000"
            },
            {
              "title": "五岔",
              "key": "60509700"
            },
            {
              "title": "东泉",
              "key": "60511150"
            },
            {
              "title": "大洪河",
              "key": "60512050"
            },
            {
              "title": "石柱",
              "key": "60512400"
            },
            {
              "title": "花林",
              "key": "60513220"
            },
            {
              "title": "金子",
              "key": "60513400"
            },
            {
              "title": "巫溪",
              "key": "60513820"
            },
            {
              "title": "石板坪",
              "key": "60514050"
            },
            {
              "title": "兴山",
              "key": "60514300"
            },
            {
              "title": "菜园坝",
              "key": "60515290"
            },
            {
              "title": "高场(五)",
              "key": "60603300"
            },
            {
              "title": "富顺",
              "key": "60613950"
            },
            {
              "title": "广元",
              "key": "60701850"
            },
            {
              "title": "苍溪",
              "key": "60702300"
            },
            {
              "title": "河溪",
              "key": "60702600"
            },
            {
              "title": "金溪",
              "key": "60702900"
            },
            {
              "title": "南充",
              "key": "60703100"
            },
            {
              "title": "武胜",
              "key": "60703700"
            },
            {
              "title": "东津沱",
              "key": "60703740"
            },
            {
              "title": "北碚(三)",
              "key": "60703800"
            },
            {
              "title": "童家溪",
              "key": "60703801"
            },
            {
              "title": "磁器口",
              "key": "60703845"
            },
            {
              "title": "三磊坝（二）",
              "key": "60707000"
            },
            {
              "title": "上寺（二）",
              "key": "60708800"
            },
            {
              "title": "清泉乡",
              "key": "60709859"
            },
            {
              "title": "肖家",
              "key": "60710650"
            },
            {
              "title": "罗渡溪(二)",
              "key": "60712000"
            },
            {
              "title": "利泽",
              "key": "60714250"
            },
            {
              "title": "码头",
              "key": "60714310"
            },
            {
              "title": "射洪",
              "key": "60715400"
            },
            {
              "title": "南北堰",
              "key": "60715700"
            },
            {
              "title": "玉溪·金堆",
              "key": "60715900"
            },
            {
              "title": "渠嘉",
              "key": "60715930"
            },
            {
              "title": "小河坝(三)",
              "key": "60715955"
            },
            {
              "title": "高楼",
              "key": "60715980"
            },
            {
              "title": "安居·油房",
              "key": "60716010"
            },
            {
              "title": "遂宁·安居",
              "key": "60718250"
            },
            {
              "title": "柏梓",
              "key": "60718295"
            },
            {
              "title": "泰安",
              "key": "60718300"
            },
            {
              "title": "中和",
              "key": "60718420"
            },
            {
              "title": "米心·竹台",
              "key": "60748650"
            },
            {
              "title": "上和",
              "key": "607H0580"
            },
            {
              "title": "钱塘（花园）",
              "key": "607H0663"
            },
            {
              "title": "小沔·鼎罐",
              "key": "607H0700"
            },
            {
              "title": "太和·石岭",
              "key": "607H0735"
            },
            {
              "title": "金银台",
              "key": "607KR011"
            },
            {
              "title": "武隆",
              "key": "60803000"
            },
            {
              "title": "保家楼",
              "key": "60811600"
            },
            {
              "title": "长坝",
              "key": "60812000"
            },
            {
              "title": "五家院子",
              "key": "60812500"
            },
            {
              "title": "沿塘",
              "key": "60812700"
            },
            {
              "title": "河溶",
              "key": "60908000"
            },
            {
              "title": "长阳",
              "key": "61004000"
            },
            {
              "title": "湘潭",
              "key": "61102000"
            },
            {
              "title": "桃江",
              "key": "61202100"
            },
            {
              "title": "桃源",
              "key": "61302800"
            },
            {
              "title": "石门",
              "key": "61400900"
            },
            {
              "title": "四水合成",
              "key": "6151190X"
            },
            {
              "title": "城陵矶(七)",
              "key": "61512000"
            },
            {
              "title": "长轩岭",
              "key": "61609200"
            },
            {
              "title": "红安",
              "key": "61610400"
            },
            {
              "title": "柳子港",
              "key": "61612400"
            },
            {
              "title": "马甲谭",
              "key": "61615600"
            },
            {
              "title": "西河译",
              "key": "61619600"
            },
            {
              "title": "蒲圻",
              "key": "61705023"
            },
            {
              "title": "皇庄",
              "key": "61804110"
            },
            {
              "title": "隔蒲潭",
              "key": "62201400"
            },
            {
              "title": "花园",
              "key": "62205600"
            },
            {
              "title": "樟树",
              "key": "62302000"
            },
            {
              "title": "外洲",
              "key": "62302250"
            },
            {
              "title": "廖家湾",
              "key": "62401800"
            },
            {
              "title": "李家渡",
              "key": "62402400"
            },
            {
              "title": "梅港",
              "key": "62413000"
            },
            {
              "title": "杜峰坑",
              "key": "62501800"
            },
            {
              "title": "虎山",
              "key": "62505000"
            },
            {
              "title": "虬津",
              "key": "62513000"
            },
            {
              "title": "永修",
              "key": "62513200"
            },
            {
              "title": "万家埠",
              "key": "62517400"
            },
            {
              "title": "湖口",
              "key": "62601600"
            },
            {
              "title": "鄱阳五河",
              "key": "6260160X"
            },
            {
              "title": "五岔上",
              "key": "88888888"
            },
            {
              "title": "钓二嘴",
              "key": "C6012200"
            },
            {
              "title": "涞滩镇",
              "key": "PSC03578"
            },
            {
              "title": "官渡",
              "key": "PSC03582"
            },
            {
              "title": "铜溪",
              "key": "PSC03766"
            },
            {
              "title": "渭沱",
              "key": "PSC04044"
            },
            {
              "title": "双槐",
              "key": "PSC04516"
            },
            {
              "title": "云门",
              "key": "PSC04520"
            },
            {
              "title": "花滩",
              "key": "PSC04521"
            },
            {
              "title": "大沙店",
              "key": "S0405350"
            },
            {
              "title": "大毛村",
              "key": "S0405450"
            },
            {
              "title": "何家湾",
              "key": "S0405500"
            },
            {
              "title": "欧家村",
              "key": "S0407050"
            },
            {
              "title": "龙山村",
              "key": "S0407300"
            },
            {
              "title": "赤水",
              "key": "S0506800"
            },
            {
              "title": "狮子滩",
              "key": "S0512080"
            },
            {
              "title": "温泉",
              "key": "S0512600"
            },
            {
              "title": "长滩",
              "key": "S0513500"
            },
            {
              "title": "测试站",
              "key": "STTEST"
            },
            {
              "title": "测试站2",
              "key": "STTEST2"
            },
            {
              "title": "白莲河",
              "key": "bailianhe"
            },
            {
              "title": "叼叉湖",
              "key": "diaochahu"
            },
            {
              "title": "洞庭湖区间",
              "key": "dongtint"
            },
            {
              "title": "汉-九",
              "key": "hanjiu"
            },
            {
              "title": "湖-大",
              "key": "huda"
            },
            {
              "title": "鄱阳湖区间",
              "key": "poyint"
            },
            {
              "title": "阳新",
              "key": "yangxin"
            },
            {
              "title": "宜-螺",
              "key": "yiluo"
            }
          ]
        },
        {
          "title": "断面集",
          "key": "WPSectionGroup",
          "children": [
            {
              "title": "射洪-渭沱FJ01",
              "key": "RCHFJ_36"
            },
            {
              "title": "射洪-渭沱FJ02",
              "key": "RCHFJ_35"
            },
            {
              "title": "射洪-渭沱FJ03",
              "key": "RCHFJ_34"
            },
            {
              "title": "射洪-渭沱FJ04",
              "key": "RCHFJ_33"
            },
            {
              "title": "射洪-渭沱FJ05",
              "key": "RCHFJ_32"
            },
            {
              "title": "射洪-渭沱FJ06",
              "key": "RCHFJ_31"
            },
            {
              "title": "射洪-渭沱FJ07",
              "key": "RCHFJ_30"
            },
            {
              "title": "射洪-渭沱FJ08",
              "key": "RCHFJ_29"
            },
            {
              "title": "射洪-渭沱FJ09",
              "key": "RCHFJ_28"
            },
            {
              "title": "射洪-渭沱FJ10",
              "key": "RCHFJ_27"
            },
            {
              "title": "射洪-渭沱FJ11",
              "key": "RCHFJ_26"
            },
            {
              "title": "射洪-渭沱FJ12",
              "key": "RCHFJ_25"
            },
            {
              "title": "射洪-渭沱FJ13",
              "key": "RCHFJ_24"
            },
            {
              "title": "射洪-渭沱FJ14",
              "key": "RCHFJ_23"
            },
            {
              "title": "射洪-渭沱FJ15",
              "key": "RCHFJ_22"
            },
            {
              "title": "射洪-渭沱FJ16",
              "key": "RCHFJ_21"
            },
            {
              "title": "射洪-渭沱FJ17",
              "key": "RCHFJ_20"
            },
            {
              "title": "射洪-渭沱FJ18",
              "key": "RCHFJ_19"
            },
            {
              "title": "射洪-渭沱FJ19",
              "key": "RCHFJ_18"
            },
            {
              "title": "射洪-渭沱FJ20",
              "key": "RCHFJ_17"
            },
            {
              "title": "射洪-渭沱FJ21",
              "key": "RCHFJ_16"
            },
            {
              "title": "射洪-渭沱FJ22",
              "key": "RCHFJ_15"
            },
            {
              "title": "射洪-渭沱FJ23",
              "key": "RCHFJ_14"
            },
            {
              "title": "射洪-渭沱FJ24",
              "key": "RCHFJ_13"
            },
            {
              "title": "射洪-渭沱FJ25",
              "key": "RCHFJ_12"
            },
            {
              "title": "射洪-渭沱FJ26",
              "key": "RCHFJ_11"
            },
            {
              "title": "射洪-渭沱FJ27",
              "key": "RCHFJ_10"
            },
            {
              "title": "射洪-渭沱FJ28",
              "key": "RCHFJ_9"
            },
            {
              "title": "射洪-渭沱FJ29",
              "key": "RCHFJ_8"
            },
            {
              "title": "射洪-渭沱FJ30",
              "key": "RCHFJ_7"
            },
            {
              "title": "射洪-渭沱FJ31",
              "key": "RCHFJ_6"
            },
            {
              "title": "射洪-渭沱FJ32",
              "key": "RCHFJ_5"
            },
            {
              "title": "射洪-渭沱FJ33",
              "key": "RCHFJ_4"
            },
            {
              "title": "射洪-渭沱FJ34",
              "key": "RCHFJ_3"
            },
            {
              "title": "射洪-渭沱FJ35",
              "key": "RCHFJ_2"
            },
            {
              "title": "射洪-渭沱FJ36",
              "key": "RCHFJ_1"
            },
            {
              "title": "安居-油房FQJ01",
              "key": "RCHQIJ_0"
            },
            {
              "title": "安居-油房FQJ02",
              "key": "RCHQIJ_1"
            },
            {
              "title": "安居-油房FQJ03",
              "key": "RCHQIJ_2"
            },
            {
              "title": "安居-油房FQJ04",
              "key": "RCHQIJ_3"
            },
            {
              "title": "安居-油房FQJ05",
              "key": "RCHQIJ_4"
            },
            {
              "title": "安居-油房FQJ06",
              "key": "RCHQIJ_5"
            },
            {
              "title": "安居-油房FQJ07",
              "key": "RCHQIJ_6"
            },
            {
              "title": "安居-油房FQJ08",
              "key": "RCHQIJ_7"
            },
            {
              "title": "安居-油房FQJ09",
              "key": "RCHQIJ_8"
            },
            {
              "title": "安居-油房FQJ10",
              "key": "RCHQIJ_9"
            },
            {
              "title": "安居-油房FQJ11",
              "key": "RCHQIJ_10"
            },
            {
              "title": "安居-油房FQJ12",
              "key": "RCHQIJ_11"
            },
            {
              "title": "安居-油房FQJ13",
              "key": "RCHQIJ_12"
            },
            {
              "title": "安居-油房FQJ14",
              "key": "RCHQIJ_13"
            },
            {
              "title": "安居-油房FQJ15",
              "key": "RCHQIJ_14"
            },
            {
              "title": "安居-油房FQJ16",
              "key": "RCHQIJ_15"
            },
            {
              "title": "安居-油房FQJ17",
              "key": "RCHQIJ_16"
            },
            {
              "title": "安居-油房FQJ18",
              "key": "RCHQIJ_17"
            },
            {
              "title": "安居-油房FQJ19",
              "key": "RCHQIJ_18"
            },
            {
              "title": "安居-油房FQJ20",
              "key": "RCHQIJ_19"
            },
            {
              "title": "安居-油房FQJ21",
              "key": "RCHQIJ_20"
            },
            {
              "title": "安居-油房FQJ22",
              "key": "RCHQIJ_21"
            },
            {
              "title": "安居-油房FQJ23",
              "key": "RCHQIJ_22"
            },
            {
              "title": "安居-油房FQJ24",
              "key": "RCHQIJ_23"
            },
            {
              "title": "安居-油房FQJ25",
              "key": "RCHQIJ_24"
            },
            {
              "title": "安居-油房FQJ26",
              "key": "RCHQIJ_25"
            },
            {
              "title": "安居-油房FQJ27",
              "key": "RCHQIJ_26"
            },
            {
              "title": "武胜-草街JLJ01",
              "key": "RCHJLJ04_36"
            },
            {
              "title": "武胜-草街JLJ02",
              "key": "RCHJLJ04_35"
            },
            {
              "title": "武胜-草街JLJ03",
              "key": "RCHJLJ04_34"
            },
            {
              "title": "武胜-草街JLJ04",
              "key": "RCHJLJ04_33"
            },
            {
              "title": "武胜-草街JLJ05",
              "key": "RCHJLJ04_32"
            },
            {
              "title": "武胜-草街JLJ06",
              "key": "RCHJLJ04_31"
            },
            {
              "title": "武胜-草街JLJ07",
              "key": "RCHJLJ04_30"
            },
            {
              "title": "武胜-草街JLJ08",
              "key": "RCHJLJ04_29"
            },
            {
              "title": "武胜-草街JLJ09",
              "key": "RCHJLJ04_28"
            },
            {
              "title": "武胜-草街JLJ10",
              "key": "RCHJLJ04_27"
            },
            {
              "title": "武胜-草街JLJ11",
              "key": "RCHJLJ04_26"
            },
            {
              "title": "武胜-草街JLJ12",
              "key": "RCHJLJ04_25"
            },
            {
              "title": "武胜-草街JLJ13",
              "key": "RCHJLJ04_24"
            },
            {
              "title": "武胜-草街JLJ14",
              "key": "RCHJLJ04_23"
            },
            {
              "title": "武胜-草街JLJ15",
              "key": "RCHJLJ04_22"
            },
            {
              "title": "武胜-草街JLJ16",
              "key": "RCHJLJ04_21"
            },
            {
              "title": "武胜-草街JLJ17",
              "key": "RCHJLJ04_20"
            },
            {
              "title": "武胜-草街JLJ18",
              "key": "RCHJLJ04_19"
            },
            {
              "title": "武胜-草街JLJ19",
              "key": "RCHJLJ04_18"
            },
            {
              "title": "武胜-草街JLJ20",
              "key": "RCHJLJ04_17"
            },
            {
              "title": "武胜-草街JLJ21",
              "key": "RCHJLJ04_16"
            },
            {
              "title": "武胜-草街JLJ22",
              "key": "RCHJLJ04_15"
            },
            {
              "title": "武胜-草街JLJ23",
              "key": "RCHJLJ04_14"
            },
            {
              "title": "武胜-草街JLJ24",
              "key": "RCHJLJ04_13"
            },
            {
              "title": "武胜-草街JLJ25",
              "key": "RCHJLJ04_12"
            },
            {
              "title": "武胜-草街JLJ26",
              "key": "RCHJLJ04_11"
            },
            {
              "title": "武胜-草街JLJ27",
              "key": "RCHJLJ04_10"
            },
            {
              "title": "武胜-草街JLJ28",
              "key": "RCHJLJ04_9"
            },
            {
              "title": "武胜-草街JLJ29",
              "key": "RCHJLJ04_8"
            },
            {
              "title": "武胜-草街JLJ30",
              "key": "RCHJLJ04_7"
            },
            {
              "title": "武胜-草街JLJ31",
              "key": "RCHJLJ04_6"
            },
            {
              "title": "武胜-草街JLJ32",
              "key": "RCHJLJ04_5"
            },
            {
              "title": "武胜-草街JLJ33",
              "key": "RCHJLJ04_4"
            },
            {
              "title": "武胜-草街JLJ34",
              "key": "RCHJLJ04_3"
            },
            {
              "title": "武胜-草街JLJ35",
              "key": "RCHJLJ04_2"
            },
            {
              "title": "武胜-草街JLJ36",
              "key": "RCHJLJ04_1"
            },
            {
              "title": "罗渡溪-渠嘉QJ01",
              "key": "RCHQUJ01_21"
            },
            {
              "title": "罗渡溪-渠嘉QJ02",
              "key": "RCHQUJ01_20"
            },
            {
              "title": "罗渡溪-渠嘉QJ03",
              "key": "RCHQUJ01_19"
            },
            {
              "title": "罗渡溪-渠嘉QJ04",
              "key": "RCHQUJ01_18"
            },
            {
              "title": "罗渡溪-渠嘉QJ05",
              "key": "RCHQUJ01_17"
            },
            {
              "title": "罗渡溪-渠嘉QJ06",
              "key": "RCHQUJ01_16"
            },
            {
              "title": "罗渡溪-渠嘉QJ07",
              "key": "RCHQUJ01_15"
            },
            {
              "title": "罗渡溪-渠嘉QJ08",
              "key": "RCHQUJ01_14"
            },
            {
              "title": "罗渡溪-渠嘉QJ09",
              "key": "RCHQUJ01_13"
            },
            {
              "title": "罗渡溪-渠嘉QJ10",
              "key": "RCHQUJ01_12"
            },
            {
              "title": "罗渡溪-渠嘉QJ11",
              "key": "RCHQUJ01_11"
            },
            {
              "title": "罗渡溪-渠嘉QJ12",
              "key": "RCHQUJ01_10"
            },
            {
              "title": "罗渡溪-渠嘉QJ13",
              "key": "RCHQUJ01_9"
            },
            {
              "title": "罗渡溪-渠嘉QJ14",
              "key": "RCHQUJ01_8"
            },
            {
              "title": "罗渡溪-渠嘉QJ15",
              "key": "RCHQUJ01_7"
            },
            {
              "title": "罗渡溪-渠嘉QJ16",
              "key": "RCHQUJ01_6"
            },
            {
              "title": "罗渡溪-渠嘉QJ17",
              "key": "RCHQUJ01_5"
            },
            {
              "title": "罗渡溪-渠嘉QJ18",
              "key": "RCHQUJ01_4"
            },
            {
              "title": "罗渡溪-渠嘉QJ19",
              "key": "RCHQUJ01_3"
            },
            {
              "title": "罗渡溪-渠嘉QJ20",
              "key": "RCHQUJ01_2"
            },
            {
              "title": "罗渡溪-渠嘉QJ21",
              "key": "RCHQUJ01_1"
            },
            {
              "title": "三峡库区SX001",
              "key": "RSVRCHSX_1"
            },
            {
              "title": "三峡库区SX002",
              "key": "RSVRCHSX_2"
            },
            {
              "title": "三峡库区SX003",
              "key": "RSVRCHSX_3"
            },
            {
              "title": "三峡库区SX004",
              "key": "RSVRCHSX_4"
            },
            {
              "title": "三峡库区SX005",
              "key": "RSVRCHSX_5"
            },
            {
              "title": "三峡库区SX006",
              "key": "RSVRCHSX_6"
            },
            {
              "title": "三峡库区SX007",
              "key": "RSVRCHSX_7"
            },
            {
              "title": "三峡库区SX008",
              "key": "RSVRCHSX_8"
            },
            {
              "title": "三峡库区SX009",
              "key": "RSVRCHSX_9"
            },
            {
              "title": "三峡库区SX010",
              "key": "RSVRCHSX_10"
            },
            {
              "title": "三峡库区SX011",
              "key": "RSVRCHSX_11"
            },
            {
              "title": "三峡库区SX012",
              "key": "RSVRCHSX_12"
            },
            {
              "title": "三峡库区SX013",
              "key": "RSVRCHSX_13"
            },
            {
              "title": "三峡库区SX014",
              "key": "RSVRCHSX_14"
            },
            {
              "title": "三峡库区SX015",
              "key": "RSVRCHSX_15"
            },
            {
              "title": "三峡库区SX016",
              "key": "RSVRCHSX_16"
            },
            {
              "title": "三峡库区SX017",
              "key": "RSVRCHSX_17"
            },
            {
              "title": "三峡库区SX018",
              "key": "RSVRCHSX_18"
            },
            {
              "title": "三峡库区SX019",
              "key": "RSVRCHSX_19"
            },
            {
              "title": "三峡库区SX020",
              "key": "RSVRCHSX_20"
            },
            {
              "title": "三峡库区SX021",
              "key": "RSVRCHSX_21"
            },
            {
              "title": "三峡库区SX022",
              "key": "RSVRCHSX_22"
            },
            {
              "title": "三峡库区SX023",
              "key": "RSVRCHSX_23"
            },
            {
              "title": "三峡库区SX024",
              "key": "RSVRCHSX_24"
            },
            {
              "title": "三峡库区SX025",
              "key": "RSVRCHSX_25"
            },
            {
              "title": "三峡库区SX026",
              "key": "RSVRCHSX_26"
            },
            {
              "title": "三峡库区SX027",
              "key": "RSVRCHSX_27"
            },
            {
              "title": "三峡库区SX028",
              "key": "RSVRCHSX_28"
            },
            {
              "title": "三峡库区SX029",
              "key": "RSVRCHSX_29"
            },
            {
              "title": "三峡库区SX030",
              "key": "RSVRCHSX_30"
            },
            {
              "title": "三峡库区SX031",
              "key": "RSVRCHSX_31"
            },
            {
              "title": "三峡库区SX032",
              "key": "RSVRCHSX_32"
            },
            {
              "title": "三峡库区SX033",
              "key": "RSVRCHSX_33"
            },
            {
              "title": "三峡库区SX034",
              "key": "RSVRCHSX_34"
            },
            {
              "title": "三峡库区SX035",
              "key": "RSVRCHSX_35"
            },
            {
              "title": "三峡库区SX036",
              "key": "RSVRCHSX_36"
            },
            {
              "title": "三峡库区SX037",
              "key": "RSVRCHSX_37"
            },
            {
              "title": "三峡库区SX038",
              "key": "RSVRCHSX_38"
            },
            {
              "title": "三峡库区SX039",
              "key": "RSVRCHSX_39"
            },
            {
              "title": "三峡库区SX040",
              "key": "RSVRCHSX_40"
            },
            {
              "title": "三峡库区SX041",
              "key": "RSVRCHSX_41"
            },
            {
              "title": "三峡库区SX042",
              "key": "RSVRCHSX_42"
            },
            {
              "title": "三峡库区SX043",
              "key": "RSVRCHSX_43"
            },
            {
              "title": "三峡库区SX044",
              "key": "RSVRCHSX_44"
            },
            {
              "title": "三峡库区SX045",
              "key": "RSVRCHSX_45"
            },
            {
              "title": "三峡库区SX046",
              "key": "RSVRCHSX_46"
            },
            {
              "title": "三峡库区SX047",
              "key": "RSVRCHSX_47"
            },
            {
              "title": "三峡库区SX048",
              "key": "RSVRCHSX_48"
            },
            {
              "title": "三峡库区SX049",
              "key": "RSVRCHSX_49"
            },
            {
              "title": "三峡库区SX050",
              "key": "RSVRCHSX_50"
            },
            {
              "title": "三峡库区SX051",
              "key": "RSVRCHSX_51"
            },
            {
              "title": "三峡库区SX052",
              "key": "RSVRCHSX_52"
            },
            {
              "title": "三峡库区SX053",
              "key": "RSVRCHSX_53"
            },
            {
              "title": "三峡库区SX054",
              "key": "RSVRCHSX_54"
            },
            {
              "title": "三峡库区SX055",
              "key": "RSVRCHSX_55"
            },
            {
              "title": "三峡库区SX056",
              "key": "RSVRCHSX_56"
            },
            {
              "title": "三峡库区SX057",
              "key": "RSVRCHSX_57"
            },
            {
              "title": "三峡库区SX058",
              "key": "RSVRCHSX_58"
            },
            {
              "title": "三峡库区SX059",
              "key": "RSVRCHSX_59"
            },
            {
              "title": "三峡库区SX060",
              "key": "RSVRCHSX_60"
            },
            {
              "title": "三峡库区SX061",
              "key": "RSVRCHSX_61"
            },
            {
              "title": "三峡库区SX062",
              "key": "RSVRCHSX_62"
            },
            {
              "title": "三峡库区SX063",
              "key": "RSVRCHSX_63"
            },
            {
              "title": "三峡库区SX064",
              "key": "RSVRCHSX_64"
            },
            {
              "title": "三峡库区SX065",
              "key": "RSVRCHSX_65"
            },
            {
              "title": "三峡库区SX066",
              "key": "RSVRCHSX_66"
            },
            {
              "title": "三峡库区SX067",
              "key": "RSVRCHSX_67"
            },
            {
              "title": "三峡库区SX068",
              "key": "RSVRCHSX_68"
            },
            {
              "title": "三峡库区SX069",
              "key": "RSVRCHSX_69"
            },
            {
              "title": "三峡库区SX070",
              "key": "RSVRCHSX_70"
            },
            {
              "title": "三峡库区SX071",
              "key": "RSVRCHSX_71"
            },
            {
              "title": "三峡库区SX072",
              "key": "RSVRCHSX_72"
            },
            {
              "title": "三峡库区SX073",
              "key": "RSVRCHSX_73"
            },
            {
              "title": "三峡库区SX074",
              "key": "RSVRCHSX_74"
            },
            {
              "title": "三峡库区SX075",
              "key": "RSVRCHSX_75"
            },
            {
              "title": "三峡库区SX076",
              "key": "RSVRCHSX_76"
            },
            {
              "title": "三峡库区SX077",
              "key": "RSVRCHSX_77"
            },
            {
              "title": "三峡库区SX078",
              "key": "RSVRCHSX_78"
            },
            {
              "title": "三峡库区SX079",
              "key": "RSVRCHSX_79"
            },
            {
              "title": "三峡库区SX080",
              "key": "RSVRCHSX_80"
            },
            {
              "title": "三峡库区SX081",
              "key": "RSVRCHSX_81"
            },
            {
              "title": "三峡库区SX082",
              "key": "RSVRCHSX_82"
            },
            {
              "title": "三峡库区SX083",
              "key": "RSVRCHSX_83"
            },
            {
              "title": "三峡库区SX084",
              "key": "RSVRCHSX_84"
            },
            {
              "title": "三峡库区SX085",
              "key": "RSVRCHSX_85"
            },
            {
              "title": "三峡库区SX086",
              "key": "RSVRCHSX_86"
            },
            {
              "title": "三峡库区SX087",
              "key": "RSVRCHSX_87"
            },
            {
              "title": "三峡库区SX088",
              "key": "RSVRCHSX_88"
            },
            {
              "title": "三峡库区SX089",
              "key": "RSVRCHSX_89"
            },
            {
              "title": "三峡库区SX090",
              "key": "RSVRCHSX_90"
            },
            {
              "title": "三峡库区SX091",
              "key": "RSVRCHSX_91"
            },
            {
              "title": "三峡库区SX092",
              "key": "RSVRCHSX_92"
            },
            {
              "title": "三峡库区SX093",
              "key": "RSVRCHSX_93"
            },
            {
              "title": "三峡库区SX094",
              "key": "RSVRCHSX_94"
            },
            {
              "title": "三峡库区SX095",
              "key": "RSVRCHSX_95"
            },
            {
              "title": "三峡库区SX096",
              "key": "RSVRCHSX_96"
            },
            {
              "title": "三峡库区SX097",
              "key": "RSVRCHSX_97"
            },
            {
              "title": "三峡库区SX098",
              "key": "RSVRCHSX_98"
            },
            {
              "title": "三峡库区SX099",
              "key": "RSVRCHSX_99"
            },
            {
              "title": "三峡库区SX100",
              "key": "RSVRCHSX_100"
            },
            {
              "title": "三峡库区SX101",
              "key": "RSVRCHSX_101"
            },
            {
              "title": "三峡库区SX102",
              "key": "RSVRCHSX_102"
            },
            {
              "title": "三峡库区SX103",
              "key": "RSVRCHSX_103"
            },
            {
              "title": "三峡库区SX104",
              "key": "RSVRCHSX_104"
            },
            {
              "title": "三峡库区SX105",
              "key": "RSVRCHSX_105"
            },
            {
              "title": "三峡库区SX106",
              "key": "RSVRCHSX_106"
            },
            {
              "title": "三峡库区SX107",
              "key": "RSVRCHSX_107"
            },
            {
              "title": "三峡库区SX108",
              "key": "RSVRCHSX_108"
            },
            {
              "title": "三峡库区SX109",
              "key": "RSVRCHSX_109"
            },
            {
              "title": "三峡库区SX110",
              "key": "RSVRCHSX_110"
            },
            {
              "title": "三峡库区SX111",
              "key": "RSVRCHSX_111"
            },
            {
              "title": "三峡库区SX112",
              "key": "RSVRCHSX_112"
            },
            {
              "title": "三峡库区SX113",
              "key": "RSVRCHSX_113"
            },
            {
              "title": "三峡库区SX114",
              "key": "RSVRCHSX_114"
            },
            {
              "title": "三峡库区SX115",
              "key": "RSVRCHSX_115"
            },
            {
              "title": "三峡库区SX116",
              "key": "RSVRCHSX_116"
            },
            {
              "title": "三峡库区SX117",
              "key": "RSVRCHSX_117"
            },
            {
              "title": "三峡库区SX118",
              "key": "RSVRCHSX_118"
            },
            {
              "title": "三峡库区SX119",
              "key": "RSVRCHSX_119"
            },
            {
              "title": "三峡库区SX120",
              "key": "RSVRCHSX_120"
            },
            {
              "title": "三峡库区SX121",
              "key": "RSVRCHSX_121"
            },
            {
              "title": "三峡库区SX122",
              "key": "RSVRCHSX_122"
            },
            {
              "title": "三峡库区SX123",
              "key": "RSVRCHSX_123"
            },
            {
              "title": "三峡库区SX124",
              "key": "RSVRCHSX_124"
            },
            {
              "title": "三峡库区SX125",
              "key": "RSVRCHSX_125"
            },
            {
              "title": "三峡库区SX126",
              "key": "RSVRCHSX_126"
            },
            {
              "title": "三峡库区SX127",
              "key": "RSVRCHSX_127"
            },
            {
              "title": "三峡库区SX128",
              "key": "RSVRCHSX_128"
            },
            {
              "title": "三峡库区SX129",
              "key": "RSVRCHSX_129"
            },
            {
              "title": "三峡库区SX130",
              "key": "RSVRCHSX_130"
            },
            {
              "title": "三峡库区SX131",
              "key": "RSVRCHSX_131"
            },
            {
              "title": "三峡库区SX132",
              "key": "RSVRCHSX_132"
            },
            {
              "title": "三峡库区SX133",
              "key": "RSVRCHSX_133"
            },
            {
              "title": "三峡库区SX134",
              "key": "RSVRCHSX_134"
            },
            {
              "title": "三峡库区SX135",
              "key": "RSVRCHSX_135"
            },
            {
              "title": "三峡库区SX136",
              "key": "RSVRCHSX_136"
            },
            {
              "title": "三峡库区SX137",
              "key": "RSVRCHSX_137"
            },
            {
              "title": "三峡库区SX138",
              "key": "RSVRCHSX_138"
            },
            {
              "title": "三峡库区SX139",
              "key": "RSVRCHSX_139"
            },
            {
              "title": "三峡库区SX140",
              "key": "RSVRCHSX_140"
            },
            {
              "title": "三峡-宜昌断面G29",
              "key": "RCHCJ08-2_1"
            },
            {
              "title": "三峡-宜昌断面G28+1",
              "key": "RCHCJ08-2_2"
            },
            {
              "title": "三峡-宜昌断面G28",
              "key": "RCHCJ08-2_3"
            },
            {
              "title": "三峡-宜昌断面G27+1",
              "key": "RCHCJ08-2_4"
            },
            {
              "title": "三峡-宜昌断面G27-1",
              "key": "RCHCJ08-2_5"
            },
            {
              "title": "三峡-宜昌断面G26-1",
              "key": "RCHCJ08-2_6"
            },
            {
              "title": "三峡-宜昌断面G25+1",
              "key": "RCHCJ08-2_7"
            },
            {
              "title": "三峡-宜昌断面G25",
              "key": "RCHCJ08-2_8"
            },
            {
              "title": "三峡-宜昌断面G24",
              "key": "RCHCJ08-2_9"
            },
            {
              "title": "三峡-宜昌断面G23",
              "key": "RCHCJ08-2_10"
            },
            {
              "title": "三峡-宜昌断面G22",
              "key": "RCHCJ08-2_11"
            },
            {
              "title": "三峡-宜昌断面G21+1",
              "key": "RCHCJ08-2_12"
            },
            {
              "title": "三峡-宜昌断面G21",
              "key": "RCHCJ08-2_13"
            },
            {
              "title": "三峡-宜昌断面G20+1",
              "key": "RCHCJ08-2_14"
            },
            {
              "title": "三峡-宜昌断面G20",
              "key": "RCHCJ08-2_15"
            },
            {
              "title": "三峡-宜昌断面G19+1",
              "key": "RCHCJ08-2_16"
            },
            {
              "title": "三峡-宜昌断面G19",
              "key": "RCHCJ08-2_17"
            },
            {
              "title": "三峡-宜昌断面G18",
              "key": "RCHCJ08-2_18"
            },
            {
              "title": "三峡-宜昌断面G17",
              "key": "RCHCJ08-2_19"
            },
            {
              "title": "三峡-宜昌断面G16",
              "key": "RCHCJ08-2_20"
            },
            {
              "title": "三峡-宜昌断面G15",
              "key": "RCHCJ08-2_21"
            },
            {
              "title": "三峡-宜昌断面G14",
              "key": "RCHCJ08-2_22"
            },
            {
              "title": "三峡-宜昌断面G13",
              "key": "RCHCJ08-2_23"
            },
            {
              "title": "三峡-宜昌断面G12",
              "key": "RCHCJ08-2_24"
            },
            {
              "title": "三峡-宜昌断面G11",
              "key": "RCHCJ08-2_25"
            },
            {
              "title": "三峡-宜昌断面G10",
              "key": "RCHCJ08-2_26"
            },
            {
              "title": "三峡-宜昌断面G9",
              "key": "RCHCJ08-2_27"
            },
            {
              "title": "三峡-宜昌断面G8+1",
              "key": "RCHCJ08-2_28"
            },
            {
              "title": "三峡-宜昌断面G8",
              "key": "RCHCJ08-2_29"
            },
            {
              "title": "三峡-宜昌断面G7",
              "key": "RCHCJ08-2_30"
            },
            {
              "title": "三峡-宜昌断面G6+1",
              "key": "RCHCJ08-2_31"
            },
            {
              "title": "三峡-宜昌断面G6",
              "key": "RCHCJ08-2_32"
            },
            {
              "title": "三峡-宜昌断面G5",
              "key": "RCHCJ08-2_33"
            },
            {
              "title": "三峡-宜昌断面G4",
              "key": "RCHCJ08-2_34"
            },
            {
              "title": "三峡-宜昌断面G3",
              "key": "RCHCJ08-2_35"
            },
            {
              "title": "三峡-宜昌断面G2",
              "key": "RCHCJ08-2_36"
            },
            {
              "title": "三峡-宜昌断面G1",
              "key": "RCHCJ08-2_37"
            },
            {
              "title": "三峡-宜昌断面G0",
              "key": "RCHCJ08-2_38"
            }
          ]
        },
        {
          "title": "蓄滞洪区",
          "key": "WPFloodDetentionArea",
          "children": [
            {
              "title": "荆江分洪区",
              "key": "FFA0000011"
            },
            {
              "title": "西凉湖",
              "key": "FFA0000041"
            },
            {
              "title": "东西湖",
              "key": "FFA0000051"
            },
            {
              "title": "武湖",
              "key": "FFA0000061"
            },
            {
              "title": "涨渡湖",
              "key": "FFA0000071"
            },
            {
              "title": "白潭湖",
              "key": "FFA0000081"
            },
            {
              "title": "华阳河",
              "key": "FFA0000091"
            },
            {
              "title": "人民大垸",
              "key": "FFA0000021"
            },
            {
              "title": "洪湖东分块",
              "key": "FFA0000031E"
            },
            {
              "title": "洪湖中分块",
              "key": "FFA0000031M"
            },
            {
              "title": "洪湖西分块",
              "key": "FFA0000031W"
            },
            {
              "title": "荒草二圩",
              "key": "FFAB400011"
            },
            {
              "title": "荒草三圩",
              "key": "FFAB400021"
            },
            {
              "title": "蒿子圩",
              "key": "FFAB400031"
            },
            {
              "title": "汪波东荡",
              "key": "FFAB400041"
            },
            {
              "title": "围堤湖垸",
              "key": "FFF0000011"
            },
            {
              "title": "六角山垸",
              "key": "FFF0000021"
            },
            {
              "title": "九垸",
              "key": "FFF0000031"
            },
            {
              "title": "西官垸",
              "key": "FFF0000041"
            },
            {
              "title": "安澧垸",
              "key": "FFF0000051"
            },
            {
              "title": "澧南垸",
              "key": "FFF0000061"
            },
            {
              "title": "安昌垸",
              "key": "FFF0000071"
            },
            {
              "title": "安化垸",
              "key": "FFF0000081"
            },
            {
              "title": "南顶垸",
              "key": "FFF0000091"
            },
            {
              "title": "和康垸",
              "key": "FFF0000101"
            },
            {
              "title": "南汉垸",
              "key": "FFF0000111"
            },
            {
              "title": "民主垸",
              "key": "FFF0000121"
            },
            {
              "title": "共双茶垸",
              "key": "FFF0000131"
            },
            {
              "title": "城西垸",
              "key": "FFF0000141"
            },
            {
              "title": "屈原垸",
              "key": "FFF0000151"
            },
            {
              "title": "义合垸",
              "key": "FFF0000161"
            },
            {
              "title": "北湖垸",
              "key": "FFF0000171"
            },
            {
              "title": "集成安合垸",
              "key": "FFF0000181"
            },
            {
              "title": "钱粮湖垸",
              "key": "FFF0000191"
            },
            {
              "title": "建设垸",
              "key": "FFF0000201"
            },
            {
              "title": "建新垸",
              "key": "FFF0000211"
            },
            {
              "title": "君山垸",
              "key": "FFF0000221"
            },
            {
              "title": "江南陆城垸",
              "key": "FFF0000241"
            },
            {
              "title": "大通湖东垸",
              "key": "FFF0000231"
            },
            {
              "title": "宛市扩大区",
              "key": "FFF1400251"
            },
            {
              "title": "虎西备蓄区",
              "key": "FFF1500261"
            },
            {
              "title": "杜家台",
              "key": "FFG0000011"
            },
            {
              "title": "康山",
              "key": "FFH0000011"
            },
            {
              "title": "珠湖",
              "key": "FFH0000021"
            },
            {
              "title": "黄湖",
              "key": "FFH0000031"
            },
            {
              "title": "方洲斜塘",
              "key": "FFH0000041"
            }
          ]
        },
        {
          "title": "控制断面",
          "key": "WPControlSection",
          "children": []
        },
        {
          "title": "河道断面",
          "key": "WPRiverSection",
          "children": [
            {
              "title": "CZ56 1",
              "key": "CZ56 1"
            },
            {
              "title": "FJ01",
              "key": "FJ01"
            },
            {
              "title": "FJ02",
              "key": "FJ02"
            },
            {
              "title": "FJ03",
              "key": "FJ03"
            },
            {
              "title": "FJ04",
              "key": "FJ04"
            },
            {
              "title": "FJ05",
              "key": "FJ05"
            },
            {
              "title": "FJ06",
              "key": "FJ06"
            },
            {
              "title": "FJ07",
              "key": "FJ07"
            },
            {
              "title": "FJ08",
              "key": "FJ08"
            },
            {
              "title": "FJ09",
              "key": "FJ09"
            },
            {
              "title": "FJ10",
              "key": "FJ10"
            },
            {
              "title": "FJ11",
              "key": "FJ11"
            },
            {
              "title": "FJ12",
              "key": "FJ12"
            },
            {
              "title": "FJ13",
              "key": "FJ13"
            },
            {
              "title": "FJ14",
              "key": "FJ14"
            },
            {
              "title": "FJ15",
              "key": "FJ15"
            },
            {
              "title": "FJ16",
              "key": "FJ16"
            },
            {
              "title": "FJ17",
              "key": "FJ17"
            },
            {
              "title": "FJ18",
              "key": "FJ18"
            },
            {
              "title": "FJ19",
              "key": "FJ19"
            },
            {
              "title": "FJ20",
              "key": "FJ20"
            },
            {
              "title": "FJ21",
              "key": "FJ21"
            },
            {
              "title": "FJ22",
              "key": "FJ22"
            },
            {
              "title": "FJ23",
              "key": "FJ23"
            },
            {
              "title": "FJ24",
              "key": "FJ24"
            },
            {
              "title": "FJ25",
              "key": "FJ25"
            },
            {
              "title": "FJ26",
              "key": "FJ26"
            },
            {
              "title": "FJ27",
              "key": "FJ27"
            },
            {
              "title": "FJ28",
              "key": "FJ28"
            },
            {
              "title": "FJ29",
              "key": "FJ29"
            },
            {
              "title": "FJ30",
              "key": "FJ30"
            },
            {
              "title": "FJ31",
              "key": "FJ31"
            },
            {
              "title": "FJ32",
              "key": "FJ32"
            },
            {
              "title": "FJ33",
              "key": "FJ33"
            },
            {
              "title": "FJ34",
              "key": "FJ34"
            },
            {
              "title": "FJ35",
              "key": "FJ35"
            },
            {
              "title": "FJ36",
              "key": "FJ36"
            },
            {
              "title": "FQJ01",
              "key": "FQJ01"
            },
            {
              "title": "FQJ02",
              "key": "FQJ02"
            },
            {
              "title": "FQJ03",
              "key": "FQJ03"
            },
            {
              "title": "FQJ04",
              "key": "FQJ04"
            },
            {
              "title": "FQJ05",
              "key": "FQJ05"
            },
            {
              "title": "FQJ06",
              "key": "FQJ06"
            },
            {
              "title": "FQJ07",
              "key": "FQJ07"
            },
            {
              "title": "FQJ08",
              "key": "FQJ08"
            },
            {
              "title": "FQJ09",
              "key": "FQJ09"
            },
            {
              "title": "FQJ10",
              "key": "FQJ10"
            },
            {
              "title": "FQJ11",
              "key": "FQJ11"
            },
            {
              "title": "FQJ12",
              "key": "FQJ12"
            },
            {
              "title": "FQJ13",
              "key": "FQJ13"
            },
            {
              "title": "FQJ14",
              "key": "FQJ14"
            },
            {
              "title": "FQJ15",
              "key": "FQJ15"
            },
            {
              "title": "FQJ16",
              "key": "FQJ16"
            },
            {
              "title": "FQJ17",
              "key": "FQJ17"
            },
            {
              "title": "FQJ18",
              "key": "FQJ18"
            },
            {
              "title": "FQJ19",
              "key": "FQJ19"
            },
            {
              "title": "FQJ20",
              "key": "FQJ20"
            },
            {
              "title": "FQJ21",
              "key": "FQJ21"
            },
            {
              "title": "FQJ22",
              "key": "FQJ22"
            },
            {
              "title": "FQJ23",
              "key": "FQJ23"
            },
            {
              "title": "FQJ24",
              "key": "FQJ24"
            },
            {
              "title": "FQJ25",
              "key": "FQJ25"
            },
            {
              "title": "FQJ26",
              "key": "FQJ26"
            },
            {
              "title": "FQJ27",
              "key": "FQJ27"
            },
            {
              "title": "JLJ01",
              "key": "JLJ01"
            },
            {
              "title": "JLJ02",
              "key": "JLJ02"
            },
            {
              "title": "JLJ03",
              "key": "JLJ03"
            },
            {
              "title": "JLJ04",
              "key": "JLJ04"
            },
            {
              "title": "JLJ05",
              "key": "JLJ05"
            },
            {
              "title": "JLJ06",
              "key": "JLJ06"
            },
            {
              "title": "JLJ07",
              "key": "JLJ07"
            },
            {
              "title": "JLJ08",
              "key": "JLJ08"
            },
            {
              "title": "JLJ09",
              "key": "JLJ09"
            },
            {
              "title": "JLJ10",
              "key": "JLJ10"
            },
            {
              "title": "JLJ11",
              "key": "JLJ11"
            },
            {
              "title": "JLJ12",
              "key": "JLJ12"
            },
            {
              "title": "JLJ13",
              "key": "JLJ13"
            },
            {
              "title": "JLJ14",
              "key": "JLJ14"
            },
            {
              "title": "JLJ15",
              "key": "JLJ15"
            },
            {
              "title": "JLJ16",
              "key": "JLJ16"
            },
            {
              "title": "JLJ17",
              "key": "JLJ17"
            },
            {
              "title": "JLJ18",
              "key": "JLJ18"
            },
            {
              "title": "JLJ19",
              "key": "JLJ19"
            },
            {
              "title": "JLJ20",
              "key": "JLJ20"
            },
            {
              "title": "JLJ21",
              "key": "JLJ21"
            },
            {
              "title": "JLJ22",
              "key": "JLJ22"
            },
            {
              "title": "JLJ23",
              "key": "JLJ23"
            },
            {
              "title": "JLJ24",
              "key": "JLJ24"
            },
            {
              "title": "JLJ25",
              "key": "JLJ25"
            },
            {
              "title": "JLJ26",
              "key": "JLJ26"
            },
            {
              "title": "JLJ27",
              "key": "JLJ27"
            },
            {
              "title": "JLJ28",
              "key": "JLJ28"
            },
            {
              "title": "JLJ29",
              "key": "JLJ29"
            },
            {
              "title": "JLJ30",
              "key": "JLJ30"
            },
            {
              "title": "JLJ31",
              "key": "JLJ31"
            },
            {
              "title": "JLJ32",
              "key": "JLJ32"
            },
            {
              "title": "JLJ33",
              "key": "JLJ33"
            },
            {
              "title": "JLJ34",
              "key": "JLJ34"
            },
            {
              "title": "JLJ35",
              "key": "JLJ35"
            },
            {
              "title": "JLJ36",
              "key": "JLJ36"
            },
            {
              "title": "QJ01",
              "key": "QJ01"
            },
            {
              "title": "QJ02",
              "key": "QJ02"
            },
            {
              "title": "QJ03",
              "key": "QJ03"
            },
            {
              "title": "QJ04",
              "key": "QJ04"
            },
            {
              "title": "QJ05",
              "key": "QJ05"
            },
            {
              "title": "QJ06",
              "key": "QJ06"
            },
            {
              "title": "QJ07",
              "key": "QJ07"
            },
            {
              "title": "QJ08",
              "key": "QJ08"
            },
            {
              "title": "QJ09",
              "key": "QJ09"
            },
            {
              "title": "QJ10",
              "key": "QJ10"
            },
            {
              "title": "QJ11",
              "key": "QJ11"
            },
            {
              "title": "QJ12",
              "key": "QJ12"
            },
            {
              "title": "QJ13",
              "key": "QJ13"
            },
            {
              "title": "QJ14",
              "key": "QJ14"
            },
            {
              "title": "QJ15",
              "key": "QJ15"
            },
            {
              "title": "QJ16",
              "key": "QJ16"
            },
            {
              "title": "QJ17",
              "key": "QJ17"
            },
            {
              "title": "QJ18",
              "key": "QJ18"
            },
            {
              "title": "QJ19",
              "key": "QJ19"
            },
            {
              "title": "QJ20",
              "key": "QJ20"
            },
            {
              "title": "QJ21",
              "key": "QJ21"
            },
            {
              "title": "三斗坪坝址",
              "key": "SX001"
            },
            {
              "title": "太平溪",
              "key": "SX002"
            },
            {
              "title": "柳林溪",
              "key": "SX003"
            },
            {
              "title": "九湾溪",
              "key": "SX004"
            },
            {
              "title": "新滩",
              "key": "SX005"
            },
            {
              "title": "香溪",
              "key": "SX006"
            },
            {
              "title": "秭归站",
              "key": "SX007"
            },
            {
              "title": "沙镇溪",
              "key": "SX008"
            },
            {
              "title": "泄滩镇",
              "key": "SX009"
            },
            {
              "title": "谢家河",
              "key": "SX010"
            },
            {
              "title": "骆驼河",
              "key": "SX011"
            },
            {
              "title": "巴东二站",
              "key": "SX012"
            },
            {
              "title": "巴东县",
              "key": "SX013"
            },
            {
              "title": "官渡口",
              "key": "SX014"
            },
            {
              "title": "杨家棚",
              "key": "SX015"
            },
            {
              "title": "黄花口",
              "key": "SX016"
            },
            {
              "title": "冷水碛",
              "key": "SX017"
            },
            {
              "title": "培石",
              "key": "SX018"
            },
            {
              "title": "青岩子",
              "key": "SX019"
            },
            {
              "title": "青石",
              "key": "SX020"
            },
            {
              "title": "向家湾",
              "key": "SX021"
            },
            {
              "title": "大青溪",
              "key": "SX022"
            },
            {
              "title": "巫山县",
              "key": "SX023"
            },
            {
              "title": "上安坪",
              "key": "SX024"
            },
            {
              "title": "关上",
              "key": "SX025"
            },
            {
              "title": "曲尺盘",
              "key": "SX026"
            },
            {
              "title": "大溪镇",
              "key": "SX027"
            },
            {
              "title": "风箱峡",
              "key": "SX028"
            },
            {
              "title": "关苗沱",
              "key": "SX029"
            },
            {
              "title": "奉节县",
              "key": "SX030"
            },
            {
              "title": "口前",
              "key": "SX031"
            },
            {
              "title": "三沱",
              "key": "SX032"
            },
            {
              "title": "安坪",
              "key": "SX033"
            },
            {
              "title": "庙坪",
              "key": "SX034"
            },
            {
              "title": "拖板",
              "key": "SX035"
            },
            {
              "title": "罐子口",
              "key": "SX036"
            },
            {
              "title": "故陵镇",
              "key": "SX037"
            },
            {
              "title": "东洋子",
              "key": "SX038"
            },
            {
              "title": "新津口",
              "key": "SX039"
            },
            {
              "title": "云阳镇",
              "key": "SX040"
            },
            {
              "title": "山坝溪",
              "key": "SX041"
            },
            {
              "title": "复兴场",
              "key": "SX042"
            },
            {
              "title": "盘石",
              "key": "SX043"
            },
            {
              "title": "双江镇",
              "key": "SX044"
            },
            {
              "title": "白水滩",
              "key": "SX045"
            },
            {
              "title": "糟房院子",
              "key": "SX046"
            },
            {
              "title": "大周溪",
              "key": "SX047"
            },
            {
              "title": "拖路口",
              "key": "SX048"
            },
            {
              "title": "晒网坝",
              "key": "SX049"
            },
            {
              "title": "万县市",
              "key": "SX050"
            },
            {
              "title": "沱口水尺",
              "key": "SX051"
            },
            {
              "title": "潭绍溪",
              "key": "SX052"
            },
            {
              "title": "新开田",
              "key": "SX053"
            },
            {
              "title": "冯家码头",
              "key": "SX054"
            },
            {
              "title": "杨河溪",
              "key": "SX055"
            },
            {
              "title": "壤渡场",
              "key": "SX056"
            },
            {
              "title": "复兴场",
              "key": "SX057"
            },
            {
              "title": "武陵镇",
              "key": "SX058"
            },
            {
              "title": "毛磊滩",
              "key": "SX059"
            },
            {
              "title": "石槽溪",
              "key": "SX060"
            },
            {
              "title": "石宝寨",
              "key": "SX061"
            },
            {
              "title": "坪山坝",
              "key": "SX062"
            },
            {
              "title": "内院嘴",
              "key": "SX063"
            },
            {
              "title": "顺溪场",
              "key": "SX064"
            },
            {
              "title": "复兴场",
              "key": "SX065"
            },
            {
              "title": "陈家院子",
              "key": "SX066"
            },
            {
              "title": "忠县站",
              "key": "SX067"
            },
            {
              "title": "曹溪河",
              "key": "SX068"
            },
            {
              "title": "邓家沱",
              "key": "SX069"
            },
            {
              "title": "新生",
              "key": "SX070"
            },
            {
              "title": "野猫溪",
              "key": "SX071"
            },
            {
              "title": "洋渡",
              "key": "SX072"
            },
            {
              "title": "浊溪口",
              "key": "SX073"
            },
            {
              "title": "鲤鱼沱",
              "key": "SX074"
            },
            {
              "title": "高家镇",
              "key": "SX075"
            },
            {
              "title": "白板溪",
              "key": "SX076"
            },
            {
              "title": "弥陀湾",
              "key": "SX077"
            },
            {
              "title": "郎溪",
              "key": "SX078"
            },
            {
              "title": "丰都县",
              "key": "SX079"
            },
            {
              "title": "丰都站",
              "key": "SX080"
            },
            {
              "title": "黄桶碑",
              "key": "SX081"
            },
            {
              "title": "毡帽石",
              "key": "SX082"
            },
            {
              "title": "白银坪",
              "key": "SX083"
            },
            {
              "title": "南沱场",
              "key": "SX084"
            },
            {
              "title": "盐汉溪",
              "key": "SX085"
            },
            {
              "title": "珍溪",
              "key": "SX086"
            },
            {
              "title": "羊西坝",
              "key": "SX087"
            },
            {
              "title": "大沱铺",
              "key": "SX088"
            },
            {
              "title": "清溪场",
              "key": "SX089"
            },
            {
              "title": "韩家沱",
              "key": "SX090"
            },
            {
              "title": "郭家嘴",
              "key": "SX091"
            },
            {
              "title": "涪陵站",
              "key": "SX092"
            },
            {
              "title": "鸣羊嘴",
              "key": "SX093"
            },
            {
              "title": "碧小溪",
              "key": "SX094"
            },
            {
              "title": "李渡镇",
              "key": "SX095"
            },
            {
              "title": "北拱",
              "key": "SX096"
            },
            {
              "title": "盐井沟",
              "key": "SX097"
            },
            {
              "title": "令牌丘",
              "key": "SX098"
            },
            {
              "title": "石沱",
              "key": "SX099"
            },
            {
              "title": "周家院子",
              "key": "SX100"
            },
            {
              "title": "瓦罐",
              "key": "SX101"
            },
            {
              "title": "长寿县",
              "key": "SX102"
            },
            {
              "title": "长寿站",
              "key": "SX103"
            },
            {
              "title": "唐家湾",
              "key": "SX104"
            },
            {
              "title": "芝麻坪",
              "key": "SX105"
            },
            {
              "title": "杨家湾",
              "key": "SX106"
            },
            {
              "title": "婿家湾",
              "key": "SX107"
            },
            {
              "title": "下刘家坪",
              "key": "SX108"
            },
            {
              "title": "中湾",
              "key": "SX109"
            },
            {
              "title": "木洞",
              "key": "SX110"
            },
            {
              "title": "温家沱",
              "key": "SX111"
            },
            {
              "title": "大塘坝",
              "key": "SX112"
            },
            {
              "title": "弹子田",
              "key": "SX113"
            },
            {
              "title": "广场坝",
              "key": "SX114"
            },
            {
              "title": "郭家沱",
              "key": "SX115"
            },
            {
              "title": "唐家沱",
              "key": "SX116"
            },
            {
              "title": "生基塘",
              "key": "SX117"
            },
            {
              "title": "寸滩站",
              "key": "SX118"
            },
            {
              "title": "嘉陵江口下",
              "key": "SX119"
            },
            {
              "title": "重庆站",
              "key": "SX120"
            },
            {
              "title": "风水寺",
              "key": "SX121"
            },
            {
              "title": "黄桶堡",
              "key": "SX122"
            },
            {
              "title": "葛家岩",
              "key": "SX123"
            },
            {
              "title": "郭家坪",
              "key": "SX124"
            },
            {
              "title": "大渡口站",
              "key": "SX125"
            },
            {
              "title": "茄子溪",
              "key": "SX126"
            },
            {
              "title": "贾家湾",
              "key": "SX127"
            },
            {
              "title": "滩河湾",
              "key": "SX128"
            },
            {
              "title": "学塘堡",
              "key": "SX129"
            },
            {
              "title": "白沙沱站",
              "key": "SX130"
            },
            {
              "title": "猫儿峡站",
              "key": "SX131"
            },
            {
              "title": "铜罐驿",
              "key": "SX132"
            },
            {
              "title": "中山坝",
              "key": "SX133"
            },
            {
              "title": "羊角滩",
              "key": "SX134"
            },
            {
              "title": "花红堡",
              "key": "SX135"
            },
            {
              "title": "断面136",
              "key": "SX136"
            },
            {
              "title": "断面137",
              "key": "SX137"
            },
            {
              "title": "断面138",
              "key": "SX138"
            },
            {
              "title": "断面139",
              "key": "SX139"
            },
            {
              "title": "断面140",
              "key": "SX140"
            },
            {
              "title": "ZJR7-1",
              "key": "ZJR7-1"
            },
            {
              "title": "利11",
              "key": "利11"
            },
            {
              "title": "荆45",
              "key": "荆45"
            },
            {
              "title": "两坝间断面G0",
              "key": "G0"
            },
            {
              "title": "两坝间断面G1",
              "key": "G1"
            },
            {
              "title": "两坝间断面G2",
              "key": "G2"
            },
            {
              "title": "两坝间断面G3",
              "key": "G3"
            },
            {
              "title": "两坝间断面G4",
              "key": "G4"
            },
            {
              "title": "两坝间断面G5",
              "key": "G5"
            },
            {
              "title": "两坝间断面G6",
              "key": "G6"
            },
            {
              "title": "两坝间断面G6+1",
              "key": "G6+1"
            },
            {
              "title": "两坝间断面G7",
              "key": "G7"
            },
            {
              "title": "两坝间断面G8",
              "key": "G8"
            },
            {
              "title": "两坝间断面G8+1",
              "key": "G8+1"
            },
            {
              "title": "两坝间断面G9",
              "key": "G9"
            },
            {
              "title": "两坝间断面G10",
              "key": "G10"
            },
            {
              "title": "两坝间断面G11",
              "key": "G11"
            },
            {
              "title": "两坝间断面G12",
              "key": "G12"
            },
            {
              "title": "两坝间断面G13",
              "key": "G13"
            },
            {
              "title": "两坝间断面G14",
              "key": "G14"
            },
            {
              "title": "两坝间断面G15",
              "key": "G15"
            },
            {
              "title": "两坝间断面G16",
              "key": "G16"
            },
            {
              "title": "两坝间断面G17",
              "key": "G17"
            },
            {
              "title": "两坝间断面G18",
              "key": "G18"
            },
            {
              "title": "两坝间断面G19",
              "key": "G19"
            },
            {
              "title": "两坝间断面G19+1",
              "key": "G19+1"
            },
            {
              "title": "两坝间断面G20",
              "key": "G20"
            },
            {
              "title": "两坝间断面G20+1",
              "key": "G20+1"
            },
            {
              "title": "两坝间断面G21",
              "key": "G21"
            },
            {
              "title": "两坝间断面G21+1",
              "key": "G21+1"
            },
            {
              "title": "两坝间断面G22",
              "key": "G22"
            },
            {
              "title": "两坝间断面G23",
              "key": "G23"
            },
            {
              "title": "两坝间断面G24",
              "key": "G24"
            },
            {
              "title": "两坝间断面G25",
              "key": "G25"
            },
            {
              "title": "两坝间断面G25+1",
              "key": "G25+1"
            },
            {
              "title": "两坝间断面G26-1",
              "key": "G26-1"
            },
            {
              "title": "两坝间断面G27-1",
              "key": "G27-1"
            },
            {
              "title": "两坝间断面G27+1",
              "key": "G27+1"
            },
            {
              "title": "两坝间断面G28",
              "key": "G28"
            },
            {
              "title": "两坝间断面G28+1",
              "key": "G28+1"
            },
            {
              "title": "两坝间断面G29",
              "key": "G29"
            }
          ]
        }
      ]
    };
  },
  methods: {},
};
</script>
<style scoped></style>
