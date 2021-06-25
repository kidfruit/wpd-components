import moment from "moment";

export default {
  // 获取开始时间后指定步数的时间
  indexTimeGet: (bTime, periodType, periodTypeNum, index) => {
    bTime = moment(bTime);
    let result = null;
    switch (periodType) {
      case "SECOND":
        result = bTime
          .add(Number(periodTypeNum) * Number(index), "seconds")
          .format("YYYY-MM-DD HH:mm:ss");
        break;
      case "MINUTE":
        result = bTime
          .add(Number(periodTypeNum) * Number(index), "minutes")
          .format("YYYY-MM-DD HH:mm");
        break;
      case "HOUR":
        result = bTime
          .add(Number(periodTypeNum) * Number(index), "hours")
          .format("YYYY-MM-DD HH");
        break;
      case "DAY":
        result = bTime
          .add(Number(periodTypeNum) * Number(index), "days")
          .format("YYYY-MM-DD");
        break;
      case "WEEK":
        result = bTime
          .add(Number(periodTypeNum) * Number(index), "weeks")
          .format("YYYY-MM-DD");
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

          let text = "下旬";
          console.log(result.get("date"));
          switch (result.get("date")) {
            case 1:
              text = "上旬";
              break;
            case 11:
              text = "中旬";
              break;
            default:
              break;
          }
          result = result.format("YYYY-MM") + " " + text;
        }
        break;
      case "MONTH":
        result = bTime
          .add(Number(periodTypeNum) * Number(index), "months")
          .format("YYYY-MM");
        break;
      case "SEASON":
        result = bTime
          .add(Number(periodTypeNum) * Number(index), "quarters")
          .format("YYYY-MM");
        break;
      case "YEAR":
        result = bTime
          .add(Number(periodTypeNum) * Number(index), "years")
          .format("YYYY");
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
