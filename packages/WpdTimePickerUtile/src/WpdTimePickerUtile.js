import moment from "moment";

export default {
  // 获取开始时间后指定步数的时间
  indexTimeGet: (bTime, periodType, periodTypeNum, index) => {
    bTime = moment(bTime);
    let result = null;
    switch (periodType) {
      case "SECOND":
        result = bTime
          .add(Number(periodTypeNum) * Number(index), "seconds");
        break;
      case "MINUTE":
        result = bTime
          .add(Number(periodTypeNum) * Number(index), "minutes");
        break;
      case "HOUR":
        result = bTime
          .add(Number(periodTypeNum) * Number(index), "hours");
        break;
      case "DAY":
        result = bTime
          .add(Number(periodTypeNum) * Number(index), "days");
        break;
      case "WEEK":
        result = bTime
          .add(Number(periodTypeNum) * Number(index), "weeks");
        break;
      case "TENDAY":
        {
          // 进行规整，旬只取到1,11,21
          result = moment(Object.assign({}, bTime));
          // 初始时刻规整
          if (Number(periodTypeNum) * Number(index) === 0) {
            if (result.get("date") <= 10) {
              result.set("date", 1);
            } else if (result.get("date") <= 20) {
              result.set("date", 11);
            } else {
              result.set("date", 21);
            }
          }
          for (let i = 0; i < Number(periodTypeNum) * Number(index); i++) {
            if (result.get("date") <= 10) {
              result.set("date", 11);
            } else if (result.get("date") <= 20) {
              result.set("date", 21);
            } else {
              result.set("date", 1);
              result.add(1, "months");
            }
          }

          // let text = "下旬";
          // switch (result.get("date")) {
          //   case 1:
          //     text = "上旬";
          //     break;
          //   case 11:
          //     text = "中旬";
          //     break;
          //   default:
          //     break;
          // }
          // result = result.format("YYYY-MM-DD");
        }
        break;
      case "MONTH":
        result = bTime
          .add(Number(periodTypeNum) * Number(index), "months");
        break;
      case "SEASON":
        result = bTime
          .add(Number(periodTypeNum) * Number(index), "quarters");
        break;
      case "YEAR":
        result = bTime
          .add(Number(periodTypeNum) * Number(index), "years");
        break;
      case "NONE":
        result = bTime;
        break;
      default:
        result = bTime;
        break;
    }
    return result;
  },
};
