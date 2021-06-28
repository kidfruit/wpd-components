import moment from "moment";

export default {
  // 获取开始时间后指定步数的时间
  indexTimeGet: (form, index) => {
    const bTime = moment(form.bTime);
    let result = null;
    switch (form.periodType) {
      case "SECOND":
        result = bTime.add(
          Number(form.periodTypeNum) * Number(index),
          "seconds"
        );
        break;
      case "MINUTE":
        result = bTime.add(
          Number(form.periodTypeNum) * Number(index),
          "minutes"
        );
        break;
      case "HOUR":
        result = bTime.add(Number(form.periodTypeNum) * Number(index), "hours");
        break;
      case "DAY":
        result = bTime.add(Number(form.periodTypeNum) * Number(index), "days");
        break;
      case "WEEK":
        result = bTime.add(Number(form.periodTypeNum) * Number(index), "weeks");
        break;
      case "TENDAY":
        {
          // 进行规整，旬只取到1,11,21
          result = moment(Object.assign({}, bTime));
          for (let i = 0; i < Number(form.periodTypeNum) * Number(index); i++) {
            if (result.get("date") <= 10) {
              result.set("date", 11);
            } else if (result.get("date") <= 20) {
              result.set("date", 21);
            } else {
              result.set("date", 1);
              result.add(1, "months");
            }
          }
        }
        break;
      case "MONTH":
        result = bTime.add(
          Number(form.periodTypeNum) * Number(index),
          "months"
        );
        break;
      case "SEASON":
        result = bTime.add(
          Number(form.periodTypeNum) * Number(index),
          "quarters"
        );
        break;
      case "YEAR":
        result = bTime.add(Number(form.periodTypeNum) * Number(index), "years");
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
